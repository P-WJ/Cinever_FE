import {
  fullPosterMovie,
  listMovie,
  mockKeywords,
  mockMovies,
  mockReviewers,
  mockReviews,
  mockUsers,
  movieListForUser,
  personSearchData,
} from "./mockData";

const NETWORK_DELAY_MS = 120;

const clone = (value) => JSON.parse(JSON.stringify(value));

const readBody = (data) => {
  if (!data) return {};
  if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch {
      return {};
    }
  }
  return data;
};

const makeResponse = (config, data, status = 200) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: clone(data),
        status,
        statusText: status >= 400 ? "Mock Error" : "OK",
        headers: {},
        config,
        request: {},
      });
    }, NETWORK_DELAY_MS);
  });

const parseRequest = (config) => {
  const url = new URL(config.url || "/", "http://mock.cinever.local");
  const params = new URLSearchParams(url.search);

  Object.entries(config.params || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null) params.set(key, value);
  });

  return {
    method: (config.method || "get").toLowerCase(),
    pathname: url.pathname.replace(/\/+$/, "") || "/",
    params,
    body: readBody(config.data),
  };
};

const toNumber = (value, fallback = 0) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};

const paginate = (items, page = 0, size = 10) => {
  const safePage = Math.max(0, toNumber(page, 0));
  const safeSize = Math.max(1, toNumber(size, 10));
  const start = safePage * safeSize;
  const content = items.slice(start, start + safeSize);
  const totalPages = Math.max(1, Math.ceil(items.length / safeSize));

  return {
    content,
    totalPages,
    totalElements: items.length,
    number: safePage,
    size: safeSize,
    last: safePage >= totalPages - 1,
  };
};

const findMovie = (movieId) =>
  mockMovies.find((movie) => String(movie.movieId) === String(movieId)) ||
  mockMovies[0];

const findReviewer = (memberId) =>
  mockReviewers.find(
    (reviewer) => String(reviewer.memberId) === String(memberId)
  );

const findUser = (memberId) => {
  const user = mockUsers.find((item) => String(item.memberId) === String(memberId));
  if (user) return user;

  const reviewer = findReviewer(memberId) || mockReviewers[0];
  return {
    memberId: reviewer.memberId,
    token: "mock-user-token",
    email: `${reviewer.nickname}@cinever.local`,
    nickname: reviewer.nickname,
    name: reviewer.nickname,
    profilePath: reviewer.profile_img_url,
    gender: "none",
    birth: "1995-01-01",
    roleName: reviewer.role,
    preferenceGenre: reviewer.genre_preference.map((item) => item.genre),
    isFollowing: false,
    followingCount: 3,
    followerCount: reviewer.follower_cnt,
    followingList: mockReviewers.slice(0, 3).map((item) => ({
      memberId: item.memberId,
      nickname: item.nickname,
      profilePath: item.profile_img_url,
    })),
    followerList: mockReviewers.slice(3, 8).map((item) => ({
      memberId: item.memberId,
      nickname: item.nickname,
      profilePath: item.profile_img_url,
    })),
    wishList: reviewer.wishlist.map((movie) => movie.movieId),
  };
};

const findReview = (reviewId) =>
  Object.values(mockReviews)
    .flat()
    .find((review) => String(review.reviewId || review.id) === String(reviewId));

const moviePage = (kind, params) => {
  const page = params.get("page") ?? 0;
  const size = params.get("size") ?? 20;
  const movies = [...mockMovies];

  if (kind === "popular") {
    movies.sort((a, b) => b.cumulativeAttendance - a.cumulativeAttendance);
  }

  if (kind === "top-rated") {
    movies.sort((a, b) => b.averageScore - a.averageScore);
  }

  if (kind === "latest") {
    movies.sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
  }

  return {
    data: paginate(
      movies.map((movie) => listMovie(movie)),
      page,
      size
    ),
  };
};

const ottKeyById = {
  1: "recentlyReleaseMovieList",
  2: "recentlyReleaseMovieList",
  3: "recentlyReleaseMovieList",
  4: "recentlyReleaseMovieList",
  11: "netflixMovieList",
  87: "watchaMovieList",
  350: "disneyPlusMovieList",
  371: "waveMovieList",
};

const ottPayload = (ottId, offset = 0) => {
  const movies = mockMovies
    .slice(offset)
    .concat(mockMovies.slice(0, offset))
    .map((movie) => listMovie(movie));
  const key = ottKeyById[ottId] || "netflixMovieList";

  return {
    data: {
      [key]: movies,
      recentlyReleaseMovieList: movies,
      netflixMovieList: movies,
      watchaMovieList: movies.slice().reverse(),
      disneyPlusMovieList: movies.slice(2).concat(movies.slice(0, 2)),
      waveMovieList: movies.slice(3).concat(movies.slice(0, 3)),
    },
  };
};

const searchMovies = ({ searchType, content, page, size }) => {
  const keyword = (content || "").toLowerCase();
  const matchesKeyword = (value) =>
    !keyword || String(value).toLowerCase().includes(keyword);

  if (searchType === "REVIEWER") {
    const reviewers = mockReviewers.filter((reviewer) =>
      matchesKeyword(reviewer.nickname)
    );
    return { data: { reviewerList: paginate(reviewers, page, size) } };
  }

  if (searchType === "DIRECTOR" || searchType === "ACTOR") {
    const list = personSearchData(searchType).filter((person) =>
      matchesKeyword(person.name)
    );
    const key = searchType === "DIRECTOR" ? "directorList" : "actorList";
    return { data: { [key]: paginate(list, page, size) } };
  }

  const movies = mockMovies
    .filter(
      (movie) =>
        matchesKeyword(movie.title) ||
        movie.director.some((director) => matchesKeyword(director.name))
    )
    .map((movie) => listMovie(movie));

  return { data: { movieList: paginate(movies, page, size) } };
};

const userReviewList = (memberId) => {
  const reviewer = findReviewer(memberId) || mockReviewers[0];

  return mockMovies.slice(0, 6).map((movie, index) => ({
    id: memberId * 1000 + index,
    reviewId: memberId * 1000 + index,
    movieId: movie.movieId,
    title: movie.title,
    posterPath: `https://image.tmdb.org/t/p/original${movie.posterPath}`,
    rating: Number((4.8 - index * 0.25).toFixed(1)),
    context:
      index % 2 === 0
        ? "The movie balances spectacle and character in a memorable way."
        : "A reliable recommendation when you want strong craft and mood.",
    reviewdDate: `2026-04-${String(18 - index).padStart(2, "0")}T10:00:00`,
    reviewedDate: `2026-04-${String(18 - index).padStart(2, "0")}`,
    likeCount: 21 + index * 3,
    nickname: reviewer.nickname,
    profile_img_url: reviewer.profile_img_url,
    keywords: mockKeywords.slice(0, 3),
  }));
};

const followingReviews = () =>
  Object.entries(mockReviews)
    .flatMap(([movieId, reviews]) => {
      const movie = findMovie(movieId);
      return reviews.map((review) => ({
        ...review,
        followingMemId: review.memberId,
        followingNickname: review.nickname,
        followingProfilePath: review.profile_img_url,
        followingRole: findReviewer(review.memberId)?.role || "USER",
        roleName: findReviewer(review.memberId)?.role || "USER",
        title: movie.title,
        releaseDate: movie.releaseDate,
        averageScore: movie.averageScore,
        posterPath: `https://image.tmdb.org/t/p/original${movie.posterPath}`,
      }));
    })
    .sort((a, b) => b.reviewedDate.localeCompare(a.reviewedDate));

const adminReviewList = () =>
  Object.entries(mockReviews).flatMap(([movieId, reviews]) => {
    const movie = findMovie(movieId);
    return reviews.map((review) => ({
      movie: {
        movieId: movie.movieId,
        title: movie.title,
        posterPath: `https://image.tmdb.org/t/p/original${movie.posterPath}`,
      },
      review: {
        reviewId: review.reviewId || review.id,
        memberId: review.memberId,
        nickname: review.nickname,
        rating: review.rating,
        content: review.context,
        isBanned: Boolean(review.isBanned),
      },
    }));
  });

const countList = (type, base) => {
  const length = type === "day" ? 30 : 12;
  return Array.from({ length }, (_, index) => ({
    [index + 1]: base + ((index * 7) % 19),
  }));
};

const updateReviewerBan = (memberIds, isBanned) => {
  memberIds.forEach((memberId) => {
    const reviewer = findReviewer(memberId);
    if (reviewer) reviewer.isBanned = isBanned;
  });
};

const updateReviewBan = (reviewIds, isBanned) => {
  reviewIds.forEach((reviewId) => {
    const review = findReview(reviewId);
    if (review) review.isBanned = isBanned;
  });
};

const updateReviewerRole = (memberId, role) => {
  const reviewer = findReviewer(memberId);
  if (reviewer) reviewer.role = role;
};

const createReview = (movieId, body) => {
  const user = findUser(body.memberId || 112);
  const movie = findMovie(movieId);
  const id = Date.now();
  const review = {
    id,
    reviewId: id,
    memberId: user.memberId,
    nickname: user.nickname,
    profile_img_url: user.profilePath,
    rating: Number(body.rating || 0),
    context: body.context || "",
    content: body.context || "",
    keywords: mockKeywords.slice(0, 3),
    isMine: true,
    likeCount: 0,
    isLiked: false,
    movieId: movie.movieId,
    title: movie.title,
    posterPath: `https://image.tmdb.org/t/p/original${movie.posterPath}`,
    reviewedDate: "2026-04-20",
    reviewdDate: "2026-04-20T12:00:00",
  };

  if (!mockReviews[movie.movieId]) mockReviews[movie.movieId] = [];
  mockReviews[movie.movieId].unshift(review);
  movie.reviewCount += 1;
  return review;
};

const handleMovieRoutes = ({ method, pathname, params, body }) => {
  if (method === "get" && pathname === "/movie/boxoffice") {
    return {
      data: {
        movieList: mockMovies
          .slice(0, 8)
          .map((movie, index) => ({ ...listMovie(movie), rank: index + 1 })),
      },
    };
  }

  if (method === "get" && pathname === "/movie/famous") {
    return {
      data: {
        movieId: mockMovies[0].movieId,
        content: "You must not be afraid to dream a little bigger.",
      },
    };
  }

  if (method === "get" && pathname === "/movie/latest") return moviePage("latest", params);
  if (method === "get" && pathname === "/movie/popular") return moviePage("popular", params);
  if (method === "get" && pathname === "/movie/top-rated")
    return moviePage("top-rated", params);

  if (method === "get" && pathname === "/movie/top100") {
    return {
      data: {
        movieList: mockMovies.map((movie) =>
          listMovie(movie, { fullPoster: true })
        ),
      },
    };
  }

  const ottMatch = pathname.match(/^\/movie\/ott\/([^/]+)\/(expect|recently)\/release$/);
  if (method === "get" && ottMatch) {
    return ottPayload(ottMatch[1], ottMatch[2] === "expect" ? 1 : 0);
  }

  const wishMatch = pathname.match(/^\/movie\/([^/]+)\/wish$/);
  if ((method === "post" || method === "delete") && wishMatch) {
    const movie = findMovie(wishMatch[1]);
    const nextValue = method === "post";
    movie.isWishlisted = nextValue;
    movie.wishListCount += nextValue ? 1 : -1;
    return { status: 200, data: { movieId: movie.movieId } };
  }

  if (method === "get" && pathname === "/movie") {
    return searchMovies({
      searchType: params.get("searchType") || "TITLE",
      content: params.get("content") || "",
      page: params.get("page") ?? 0,
      size: params.get("size") ?? 10,
    });
  }

  const detailMatch = pathname.match(/^\/movie\/([^/]+)$/);
  if (method === "get" && detailMatch) {
    return { data: fullPosterMovie(findMovie(detailMatch[1])) };
  }

  return null;
};

const handleReviewRoutes = ({ method, pathname, params, body }) => {
  const movieReviewMatch = pathname.match(/^\/review\/movie\/([^/]+)$/);
  if (method === "get" && movieReviewMatch) {
    const movieId = movieReviewMatch[1];
    return { data: { reviewList: mockReviews[findMovie(movieId).movieId] || [] } };
  }

  if (method === "post" && movieReviewMatch) {
    return { status: 201, data: createReview(movieReviewMatch[1], body) };
  }

  if (method === "patch" && movieReviewMatch) {
    const mine = (mockReviews[findMovie(movieReviewMatch[1]).movieId] || []).find(
      (review) => review.isMine
    );
    if (mine) {
      mine.context = body.context || mine.context;
      mine.content = mine.context;
      mine.rating = Number(body.rating || mine.rating);
    }
    return { status: 200, data: mine || createReview(movieReviewMatch[1], body) };
  }

  if (method === "get" && pathname === "/review/following/reviews") {
    return { reviewList: followingReviews() };
  }

  if (method === "get" && pathname === "/review/admin") {
    return { data: { reviewList: adminReviewList() } };
  }

  const trendMatch = pathname.match(/^\/review\/admin\/stats\/trend$/);
  if (method === "get" && trendMatch) {
    return {
      year: new Date().getFullYear(),
      reviewCountList: countList(params.get("dateType") || "month", 11),
    };
  }

  if (method === "get" && pathname === "/review/admin/stats/total") {
    return { totalReview: Object.values(mockReviews).flat().length };
  }

  const multiReviewBanMatch = pathname.match(/^\/review\/(block|unblock)\/multi$/);
  if (method === "patch" && multiReviewBanMatch) {
    updateReviewBan(
      (body.reviewList || []).map((item) => item.reviewId),
      multiReviewBanMatch[1] === "block"
    );
    return { status: 200 };
  }

  const reviewBanMatch = pathname.match(/^\/review\/(block|unblock)\/([^/]+)$/);
  if (method === "patch" && reviewBanMatch) {
    updateReviewBan([reviewBanMatch[2]], reviewBanMatch[1] === "block");
    return { status: 200 };
  }

  const likeMatch = pathname.match(/^\/review\/([^/]+)\/like$/);
  if ((method === "post" || method === "delete") && likeMatch) {
    const review = findReview(likeMatch[1]);
    if (review) {
      review.isLiked = method === "post";
      review.likeCount += method === "post" ? 1 : -1;
    }
    return { status: 200 };
  }

  const deleteMatch = pathname.match(/^\/review\/([^/]+)$/);
  if (method === "delete" && deleteMatch) {
    Object.keys(mockReviews).forEach((movieId) => {
      mockReviews[movieId] = mockReviews[movieId].filter(
        (review) => String(review.reviewId || review.id) !== String(deleteMatch[1])
      );
    });
    return { status: 200 };
  }

  return null;
};

const handleReviewerRoutes = ({ method, pathname, params, body }) => {
  if (method === "get" && pathname === "/reviewer/all/admin") {
    return { data: { reviewerList: mockReviewers } };
  }

  if (method === "get" && pathname === "/reviewer/single/admin") {
    return { data: { reviewer: mockReviewers[0] } };
  }

  if (method === "get" && pathname === "/reviewer/all") {
    return {
      data: {
        reviewerList: paginate(mockReviewers, params.get("page") ?? 0, 10),
      },
    };
  }

  const multiReviewerBanMatch = pathname.match(
    /^\/reviewer\/(block|unblock)\/multi$/
  );
  if (method === "patch" && multiReviewerBanMatch) {
    updateReviewerBan(
      (body.reviewerList || []).map((item) => item.memberId),
      multiReviewerBanMatch[1] === "block"
    );
    return { status: 200 };
  }

  if (method === "patch" && pathname === "/reviewer/role/multi") {
    (body.reviewerList || []).forEach((item) =>
      updateReviewerRole(item.memberId, item.role)
    );
    return { status: 200 };
  }

  const reviewerBanMatch = pathname.match(/^\/reviewer\/(block|unblock)\/([^/]+)$/);
  if (method === "patch" && reviewerBanMatch) {
    updateReviewerBan([reviewerBanMatch[2]], reviewerBanMatch[1] === "block");
    return { status: 200 };
  }

  const roleMatch = pathname.match(/^\/reviewer\/role\/([^/]+)$/);
  if (method === "patch" && roleMatch) {
    updateReviewerRole(roleMatch[1], body.role || "USER");
    return { status: 200 };
  }

  const detailMatch = pathname.match(/^\/reviewer\/([^/]+)$/);
  if (method === "get" && detailMatch) {
    const keyword = decodeURIComponent(detailMatch[1]).toLowerCase();
    return {
      data: {
        reviewerList: mockReviewers.filter((reviewer) =>
          reviewer.nickname.toLowerCase().includes(keyword)
        ),
      },
    };
  }

  return null;
};

const handleUserRoutes = ({ method, pathname, body }) => {
  const userMovieMatch = pathname.match(
    /^\/user\/([^/]+)\/(wishlist|recent-movie|favorite-movie|dislike-movie|reviews)$/
  );

  if (method === "get" && userMovieMatch) {
    const [, memberId, type] = userMovieMatch;

    if (type === "reviews") {
      const reviewList = userReviewList(toNumber(memberId, 112));
      return { data: { reviewList, totalReviewCount: reviewList.length } };
    }

    const offsets = {
      wishlist: 0,
      "recent-movie": 1,
      "favorite-movie": 2,
      "dislike-movie": 3,
    };

    return { data: { movieList: movieListForUser(offsets[type] || 0) } };
  }

  const followMatch = pathname.match(/^\/user\/([^/]+)\/follow$/);
  if ((method === "post" || method === "delete") && followMatch) {
    const user = findUser(followMatch[1]);
    user.isFollowing = method === "post";
    user.followerCount += method === "post" ? 1 : -1;
    return { status: 200 };
  }

  const userMatch = pathname.match(/^\/user\/([^/]+)$/);
  if (method === "get" && userMatch) {
    return { data: findUser(userMatch[1]) };
  }

  if (method === "patch" && userMatch) {
    const user = findUser(userMatch[1]);
    user.nickname = body.nickname || user.nickname;
    user.profilePath = body.profilePath || user.profilePath;
    return { data: user };
  }

  return null;
};

const handleAuthRoutes = ({ method, pathname, body }) => {
  if (method === "post" && pathname === "/login") {
    const isAdmin = String(body.email || "").toLowerCase().includes("admin");
    const user = isAdmin ? mockUsers[1] : mockUsers[0];

    return {
      status: 200,
      data: {
        ...user,
        token: isAdmin ? "mock-admin-token" : "mock-user-token",
      },
    };
  }

  if (method === "post" && pathname === "/signup") {
    return {
      status: 201,
      data: {
        memberId: Date.now(),
        email: body.email,
        nickname: body.name || "new_user",
      },
    };
  }

  return null;
};

const handleAdminStatsRoutes = ({ method, pathname }) => {
  const withdrawalMatch = pathname.match(
    /^\/member\/admin\/stats\/withdrawal\/([^/]+)$/
  );
  if (method === "get" && withdrawalMatch) {
    return {
      year: new Date().getFullYear(),
      withdrawalCountList: countList(withdrawalMatch[1], 2),
    };
  }

  const registerMatch = pathname.match(/^\/member\/admin\/stats\/register\/([^/]+)$/);
  if (method === "get" && registerMatch) {
    return {
      year: new Date().getFullYear(),
      registerCountList: countList(registerMatch[1], 8),
    };
  }

  if (method === "get" && pathname === "/member/admin/stats/total") {
    return { totalMember: mockReviewers.length + mockUsers.length };
  }

  return null;
};

export const mockAdapter = (config) => {
  const request = parseRequest(config);
  const routeHandlers = [
    handleAuthRoutes,
    handleAdminStatsRoutes,
    handleMovieRoutes,
    handleReviewerRoutes,
    handleReviewRoutes,
    handleUserRoutes,
  ];

  for (const handler of routeHandlers) {
    const data = handler(request);
    if (data) return makeResponse(config, data);
  }

  console.warn(`[mock-api] Unhandled request: ${request.method.toUpperCase()} ${request.pathname}`);
  return makeResponse(config, { data: {} });
};
