const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
const profileUrl = (id) => `https://i.pravatar.cc/240?img=${id}`;
const posterUrl = (path) => `${TMDB_IMAGE_BASE_URL}${path}`;

const netflixLogo =
  "https://upload.wikimedia.org/wikipedia/commons/0/0c/Netflix_2015_N_logo.svg";
const disneyLogo =
  "https://static.kinolights.com/icon/btn_squircle_disneyplus.png";

export const mockMovies = [
  {
    movieId: 101,
    title: "Inception",
    posterPath: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdropPath: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    releaseDate: "2010-07-15",
    release_date: "2010-07-15",
    averageScore: 4.7,
    tmdbScore: 8.8,
    cumulativeAttendance: 5832104,
    isAdult: false,
    runtime: 148,
    description:
      "A skilled extractor enters dreams to plant an idea that can change a life and a company.",
    teaserVideo: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    video_path: "YoHD9XEInc0",
    genre: ["SF", "Thriller", "Action"],
    languages: ["English", "Japanese", "French"],
    director: [
      {
        personId: 501,
        name: "Christopher Nolan",
        originalName: "Christopher Nolan",
        gender: "male",
        popularity: 9.5,
        profilePath: profileUrl(11),
      },
    ],
    actors: [
      {
        personId: 601,
        name: "Leonardo DiCaprio",
        originalName: "Leonardo DiCaprio",
        gender: "male",
        character: "Dom Cobb",
        popularity: 9.6,
        profilePath: profileUrl(12),
      },
      {
        personId: 602,
        name: "Joseph Gordon-Levitt",
        originalName: "Joseph Gordon-Levitt",
        gender: "male",
        character: "Arthur",
        popularity: 8.4,
        profilePath: profileUrl(13),
      },
    ],
    productionCompanies: [
      { name: "/ky0xOc5OrhzkZ1N6KyUxacfQsCk.png", logo_path: "Legendary" },
      { name: "/5UQsZrfbfG2dYJbx8DxfoTr2Bvu.png", logo_path: "Warner Bros." },
    ],
    stillcutPath: {
      first: posterUrl("/s3TBrRGB1iav7gFOCNx3H31MoES.jpg"),
      second: posterUrl("/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg"),
      third: posterUrl("/7u3pxc0K1wx32IleAkLv78MKgrw.jpg"),
      fourth: posterUrl("/aCHn2TXYJfzPXQKA6r9mKPbMlUB.jpg"),
    },
    ottList: [
      { ottId: 11, ottName: "Netflix", logoPath: netflixLogo },
      { ottId: 350, ottName: "Disney+", logoPath: disneyLogo },
    ],
    isWishlisted: true,
    wishListCount: 1234,
    isReviewed: false,
    reviewCount: 82,
    keywordMap: { dream: 12, layered: 8, tension: 7, ending: 10, nolan: 6 },
  },
  {
    movieId: 102,
    title: "Interstellar",
    posterPath: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdropPath: "/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    releaseDate: "2014-11-06",
    release_date: "2014-11-06",
    averageScore: 4.8,
    tmdbScore: 8.7,
    cumulativeAttendance: 10342125,
    isAdult: false,
    runtime: 169,
    description:
      "A former pilot travels through a wormhole to find a future for humanity.",
    teaserVideo: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    video_path: "zSWdZVtXT7E",
    genre: ["SF", "Drama", "Adventure"],
    languages: ["English"],
    director: [
      {
        personId: 501,
        name: "Christopher Nolan",
        originalName: "Christopher Nolan",
        gender: "male",
        popularity: 9.5,
        profilePath: profileUrl(11),
      },
    ],
    actors: [
      {
        personId: 603,
        name: "Matthew McConaughey",
        originalName: "Matthew McConaughey",
        gender: "male",
        character: "Cooper",
        popularity: 8.9,
        profilePath: profileUrl(14),
      },
      {
        personId: 604,
        name: "Anne Hathaway",
        originalName: "Anne Hathaway",
        gender: "female",
        character: "Brand",
        popularity: 8.7,
        profilePath: profileUrl(15),
      },
    ],
    productionCompanies: [
      { name: "/5UQsZrfbfG2dYJbx8DxfoTr2Bvu.png", logo_path: "Warner Bros." },
      { name: "/ky0xOc5OrhzkZ1N6KyUxacfQsCk.png", logo_path: "Legendary" },
    ],
    stillcutPath: {
      first: posterUrl("/xJHokMbljvjADYdit5fK5VQsXEG.jpg"),
      second: posterUrl("/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg"),
      third: posterUrl("/pbrkL804c8yAv3zBZR4QPEafpAR.jpg"),
      fourth: posterUrl("/w2PMyoyLU22YvrGK3smVM9fW1jj.jpg"),
    },
    ottList: [{ ottId: 11, ottName: "Netflix", logoPath: netflixLogo }],
    isWishlisted: false,
    wishListCount: 981,
    isReviewed: false,
    reviewCount: 97,
    keywordMap: { space: 11, family: 13, time: 9, music: 8, emotion: 12 },
  },
  {
    movieId: 103,
    title: "Parasite",
    posterPath: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    backdropPath: "/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg",
    releaseDate: "2019-05-30",
    release_date: "2019-05-30",
    averageScore: 4.6,
    tmdbScore: 8.5,
    cumulativeAttendance: 10313157,
    isAdult: false,
    runtime: 132,
    description:
      "Two families become entangled in a sharp, escalating story about class and desire.",
    teaserVideo: "https://www.youtube.com/watch?v=5xH0HfJHsaY",
    video_path: "5xH0HfJHsaY",
    genre: ["Drama", "Thriller", "Black Comedy"],
    languages: ["Korean"],
    director: [
      {
        personId: 502,
        name: "Bong Joon-ho",
        originalName: "Bong Joon-ho",
        gender: "male",
        popularity: 9.1,
        profilePath: profileUrl(16),
      },
    ],
    actors: [
      {
        personId: 605,
        name: "Song Kang-ho",
        originalName: "Song Kang-ho",
        gender: "male",
        character: "Kim Ki-taek",
        popularity: 8.8,
        profilePath: profileUrl(17),
      },
      {
        personId: 606,
        name: "Cho Yeo-jeong",
        originalName: "Cho Yeo-jeong",
        gender: "female",
        character: "Yeon-kyo",
        popularity: 8.0,
        profilePath: profileUrl(18),
      },
    ],
    productionCompanies: [
      { name: "/7kqN8B0kMhLDDP5K6B7US7J2C2S.png", logo_path: "Barunson E&A" },
    ],
    stillcutPath: {
      first: posterUrl("/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg"),
      second: posterUrl("/ApiBzeaa95TNYliSbQ8pJv4Fje7.jpg"),
      third: posterUrl("/m1TOfzZtZn4w4bWz8oMi8C7SuWb.jpg"),
      fourth: posterUrl("/1J76hAtF1B1JkduzGtbQwWsYfK2.jpg"),
    },
    ottList: [{ ottId: 87, ottName: "Watcha", logoPath: "" }],
    isWishlisted: true,
    wishListCount: 764,
    isReviewed: false,
    reviewCount: 63,
    keywordMap: { class: 15, tension: 11, satire: 9, basement: 6, family: 7 },
  },
  {
    movieId: 104,
    title: "Dune: Part Two",
    posterPath: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    backdropPath: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    releaseDate: "2024-02-28",
    release_date: "2024-02-28",
    averageScore: 4.5,
    tmdbScore: 8.6,
    cumulativeAttendance: 2231894,
    isAdult: false,
    runtime: 166,
    description:
      "Paul Atreides joins the Fremen and faces a choice between love, revenge, and prophecy.",
    teaserVideo: "https://www.youtube.com/watch?v=Way9Dexny3w",
    video_path: "Way9Dexny3w",
    genre: ["SF", "Adventure", "Drama"],
    languages: ["English"],
    director: [
      {
        personId: 503,
        name: "Denis Villeneuve",
        originalName: "Denis Villeneuve",
        gender: "male",
        popularity: 8.8,
        profilePath: profileUrl(19),
      },
    ],
    actors: [
      {
        personId: 607,
        name: "Timothee Chalamet",
        originalName: "Timothee Chalamet",
        gender: "male",
        character: "Paul Atreides",
        popularity: 9.0,
        profilePath: profileUrl(20),
      },
      {
        personId: 608,
        name: "Zendaya",
        originalName: "Zendaya",
        gender: "female",
        character: "Chani",
        popularity: 9.2,
        profilePath: profileUrl(21),
      },
    ],
    productionCompanies: [
      { name: "/5UQsZrfbfG2dYJbx8DxfoTr2Bvu.png", logo_path: "Warner Bros." },
      { name: "/ky0xOc5OrhzkZ1N6KyUxacfQsCk.png", logo_path: "Legendary" },
    ],
    stillcutPath: {
      first: posterUrl("/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg"),
      second: posterUrl("/h3HsfV8Kn9Sz2QWUYYdP5ya23hx.jpg"),
      third: posterUrl("/jB48AmYhFGw0C3DSEWhPAWXQ7QF.jpg"),
      fourth: posterUrl("/3TNSoa0UHGEzEz5ndXGjJVKo8RJ.jpg"),
    },
    ottList: [{ ottId: 350, ottName: "Disney+", logoPath: disneyLogo }],
    isWishlisted: false,
    wishListCount: 512,
    isReviewed: false,
    reviewCount: 55,
    keywordMap: { desert: 8, scale: 12, destiny: 9, sound: 7, fremen: 5 },
  },
  {
    movieId: 105,
    title: "The Dark Knight",
    posterPath: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdropPath: "/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg",
    releaseDate: "2008-08-06",
    release_date: "2008-08-06",
    averageScore: 4.6,
    tmdbScore: 8.5,
    cumulativeAttendance: 4175526,
    isAdult: false,
    runtime: 152,
    description:
      "Batman, Gordon, and Dent confront a criminal force built to break Gotham's order.",
    teaserVideo: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    video_path: "EXeTwQWrcwY",
    genre: ["Action", "Crime", "Drama"],
    languages: ["English"],
    director: [
      {
        personId: 501,
        name: "Christopher Nolan",
        originalName: "Christopher Nolan",
        gender: "male",
        popularity: 9.5,
        profilePath: profileUrl(11),
      },
    ],
    actors: [
      {
        personId: 609,
        name: "Christian Bale",
        originalName: "Christian Bale",
        gender: "male",
        character: "Bruce Wayne",
        popularity: 8.8,
        profilePath: profileUrl(22),
      },
      {
        personId: 610,
        name: "Heath Ledger",
        originalName: "Heath Ledger",
        gender: "male",
        character: "Joker",
        popularity: 9.3,
        profilePath: profileUrl(23),
      },
    ],
    productionCompanies: [
      { name: "/5UQsZrfbfG2dYJbx8DxfoTr2Bvu.png", logo_path: "Warner Bros." },
    ],
    stillcutPath: {
      first: posterUrl("/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg"),
      second: posterUrl("/oOv2oUXcAaNXakRqUPxYq5lJURz.jpg"),
      third: posterUrl("/hqkIcbrOHL86UncnHIsHVcVmzue.jpg"),
      fourth: posterUrl("/dqK9Hag1054tghRQSqLSfrkvQnA.jpg"),
    },
    ottList: [{ ottId: 11, ottName: "Netflix", logoPath: netflixLogo }],
    isWishlisted: true,
    wishListCount: 1450,
    isReviewed: false,
    reviewCount: 104,
    keywordMap: { joker: 15, gotham: 8, chaos: 12, hero: 7, crime: 9 },
  },
  {
    movieId: 106,
    title: "Spirited Away",
    posterPath: "/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    backdropPath: "/mSDsSDwaP3E7dEfUPWy4J0djt4O.jpg",
    releaseDate: "2002-06-28",
    release_date: "2002-06-28",
    averageScore: 4.9,
    tmdbScore: 8.5,
    cumulativeAttendance: 2001742,
    isAdult: false,
    runtime: 125,
    description:
      "A young girl enters a spirit world and learns courage while trying to save her parents.",
    teaserVideo: "https://www.youtube.com/watch?v=ByXuk9QqQkk",
    video_path: "ByXuk9QqQkk",
    genre: ["Animation", "Fantasy", "Family"],
    languages: ["Japanese"],
    director: [
      {
        personId: 504,
        name: "Hayao Miyazaki",
        originalName: "Hayao Miyazaki",
        gender: "male",
        popularity: 9.4,
        profilePath: profileUrl(24),
      },
    ],
    actors: [
      {
        personId: 611,
        name: "Rumi Hiiragi",
        originalName: "Rumi Hiiragi",
        gender: "female",
        character: "Chihiro",
        popularity: 7.5,
        profilePath: profileUrl(25),
      },
      {
        personId: 612,
        name: "Miyu Irino",
        originalName: "Miyu Irino",
        gender: "male",
        character: "Haku",
        popularity: 7.2,
        profilePath: profileUrl(26),
      },
    ],
    productionCompanies: [
      { name: "/eS79pslnoKbWg7t3PMA9ayl0bGs.png", logo_path: "Studio Ghibli" },
    ],
    stillcutPath: {
      first: posterUrl("/mSDsSDwaP3E7dEfUPWy4J0djt4O.jpg"),
      second: posterUrl("/bSXfU4dwZyBA1vMmXvejdRXBvuF.jpg"),
      third: posterUrl("/6oaL4DP75yABrd5EbC4H2zq5ghc.jpg"),
      fourth: posterUrl("/6s7uwhR4M3zJkPZpKzowvQ4V4lk.jpg"),
    },
    ottList: [{ ottId: 87, ottName: "Watcha", logoPath: "" }],
    isWishlisted: false,
    wishListCount: 899,
    isReviewed: false,
    reviewCount: 71,
    keywordMap: { bathhouse: 8, growth: 12, magic: 10, haku: 7, ghibli: 13 },
  },
  {
    movieId: 107,
    title: "La La Land",
    posterPath: "/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
    backdropPath: "/nlPCdZlHtRNcF6C9hzUH4ebmV1w.jpg",
    releaseDate: "2016-12-07",
    release_date: "2016-12-07",
    averageScore: 4.2,
    tmdbScore: 7.9,
    cumulativeAttendance: 3761728,
    isAdult: false,
    runtime: 128,
    description:
      "A jazz pianist and an aspiring actor fall in love while chasing their dreams in Los Angeles.",
    teaserVideo: "https://www.youtube.com/watch?v=0pdqf4P9MB8",
    video_path: "0pdqf4P9MB8",
    genre: ["Romance", "Music", "Drama"],
    languages: ["English"],
    director: [
      {
        personId: 505,
        name: "Damien Chazelle",
        originalName: "Damien Chazelle",
        gender: "male",
        popularity: 8.2,
        profilePath: profileUrl(27),
      },
    ],
    actors: [
      {
        personId: 613,
        name: "Ryan Gosling",
        originalName: "Ryan Gosling",
        gender: "male",
        character: "Sebastian",
        popularity: 8.8,
        profilePath: profileUrl(28),
      },
      {
        personId: 614,
        name: "Emma Stone",
        originalName: "Emma Stone",
        gender: "female",
        character: "Mia",
        popularity: 8.9,
        profilePath: profileUrl(29),
      },
    ],
    productionCompanies: [
      { name: "/5UQsZrfbfG2dYJbx8DxfoTr2Bvu.png", logo_path: "Summit" },
    ],
    stillcutPath: {
      first: posterUrl("/nlPCdZlHtRNcF6C9hzUH4ebmV1w.jpg"),
      second: posterUrl("/a0VIP4RgjmBdjJgL8B5iFQ0Pu4u.jpg"),
      third: posterUrl("/sC9WkTdD0tC7nmzRZwc7uL1Ng5r.jpg"),
      fourth: posterUrl("/9c2ESj6I0jefpVQK2M6RbrG8tY2.jpg"),
    },
    ottList: [{ ottId: 11, ottName: "Netflix", logoPath: netflixLogo }],
    isWishlisted: true,
    wishListCount: 640,
    isReviewed: false,
    reviewCount: 44,
    keywordMap: { music: 12, dream: 10, love: 9, ending: 8, color: 7 },
  },
  {
    movieId: 108,
    title: "Everything Everywhere All at Once",
    posterPath: "/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
    backdropPath: "/ss0Os3uWJfQAENILHZUdX8Tt1OC.jpg",
    releaseDate: "2022-10-12",
    release_date: "2022-10-12",
    averageScore: 4.4,
    tmdbScore: 7.8,
    cumulativeAttendance: 905322,
    isAdult: false,
    runtime: 140,
    description:
      "A laundromat owner is pulled across the multiverse and into the heart of her family.",
    teaserVideo: "https://www.youtube.com/watch?v=wxN1T1uxQ2g",
    video_path: "wxN1T1uxQ2g",
    genre: ["Adventure", "Comedy", "SF"],
    languages: ["English", "Chinese"],
    director: [
      {
        personId: 506,
        name: "Daniel Kwan",
        originalName: "Daniel Kwan",
        gender: "male",
        popularity: 8.0,
        profilePath: profileUrl(30),
      },
    ],
    actors: [
      {
        personId: 615,
        name: "Michelle Yeoh",
        originalName: "Michelle Yeoh",
        gender: "female",
        character: "Evelyn",
        popularity: 8.8,
        profilePath: profileUrl(31),
      },
      {
        personId: 616,
        name: "Ke Huy Quan",
        originalName: "Ke Huy Quan",
        gender: "male",
        character: "Waymond",
        popularity: 8.4,
        profilePath: profileUrl(32),
      },
    ],
    productionCompanies: [
      { name: "/o86DbpburjxrqAzEDhXZcyE8pDb.png", logo_path: "A24" },
    ],
    stillcutPath: {
      first: posterUrl("/ss0Os3uWJfQAENILHZUdX8Tt1OC.jpg"),
      second: posterUrl("/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"),
      third: posterUrl("/3t0DcVPuW9JR4AIZXlPjSxPSlIu.jpg"),
      fourth: posterUrl("/pUc51UUQb1lMLVVkDCaZVsCo37U.jpg"),
    },
    ottList: [{ ottId: 350, ottName: "Disney+", logoPath: disneyLogo }],
    isWishlisted: false,
    wishListCount: 530,
    isReviewed: false,
    reviewCount: 38,
    keywordMap: { multiverse: 12, family: 11, chaos: 8, bagel: 6, heart: 10 },
  },
];

export const mockReviewers = Array.from({ length: 24 }, (_, index) => {
  const roles = ["USER", "CRITIC", "INFLUENCER", "USER", "CRITIC", "ADMIN"];
  const genres = ["SF", "Drama", "Action", "Romance", "Animation", "Thriller"];
  const movieA = mockMovies[index % mockMovies.length];
  const movieB = mockMovies[(index + 2) % mockMovies.length];
  const movieC = mockMovies[(index + 4) % mockMovies.length];

  return {
    memberId: index === 0 ? 112 : 200 + index,
    nickname:
      index === 0
        ? "demo_user"
        : ["cinephile", "frame_critic", "movie_note", "scene_hunter"][
            index % 4
          ] + `_${index}`,
    profile_img_url: profileUrl((index % 60) + 1),
    role: roles[index % roles.length],
    follower_cnt: 1800 - index * 47,
    review_count: 96 - index * 2,
    review_avg: Number((4.8 - (index % 8) * 0.13).toFixed(1)),
    genre_preference: [
      { genre: genres[index % genres.length] },
      { genre: genres[(index + 2) % genres.length] },
      { genre: genres[(index + 3) % genres.length] },
    ],
    wishlist: [movieA, movieB, movieC].map((movie) => ({
      movieId: movie.movieId,
      title: movie.title,
      posterPath: posterUrl(movie.posterPath),
    })),
    isBanned: index === 7 || index === 18,
  };
});

const baseReviewTexts = [
  "A confident movie with enough emotional weight to revisit.",
  "The pacing stays sharp, and the images linger after the credits.",
  "Strong direction and performances make the familiar parts work.",
  "The last act ties the theme together better than expected.",
  "It is easy to recommend because the craft is visible in every scene.",
];

export const mockReviews = mockMovies.reduce((acc, movie, movieIndex) => {
  acc[movie.movieId] = Array.from({ length: 5 }, (_, reviewIndex) => {
    const reviewer = mockReviewers[(movieIndex + reviewIndex + 1) % 12];
    const id = movie.movieId * 100 + reviewIndex + 1;
    return {
      id,
      reviewId: id,
      memberId: reviewer.memberId,
      nickname: reviewer.nickname,
      profile_img_url: reviewer.profile_img_url,
      rating: Number((4.8 - reviewIndex * 0.3).toFixed(1)),
      context: baseReviewTexts[reviewIndex % baseReviewTexts.length],
      content: baseReviewTexts[reviewIndex % baseReviewTexts.length],
      keywords: ["visual", "story", "acting"].slice(0, (reviewIndex % 3) + 1),
      isMine: false,
      likeCount: 42 + reviewIndex * 11,
      isLiked: reviewIndex % 2 === 0,
      movieId: movie.movieId,
      title: movie.title,
      posterPath: posterUrl(movie.posterPath),
      reviewedDate: `2026-04-${String(19 - reviewIndex).padStart(2, "0")}`,
      reviewdDate: `2026-04-${String(19 - reviewIndex).padStart(2, "0")}T09:30:00`,
    };
  });
  return acc;
}, {});

export const mockUsers = [
  {
    memberId: 112,
    token: "mock-user-token",
    email: "demo@cinever.local",
    nickname: "demo_user",
    name: "Demo User",
    profilePath: profileUrl(1),
    
    gender: "female",
    birth: "1996-04-12",
    roleName: "USER",
    preferenceGenre: ["SF", "Drama", "Animation"],
    isFollowing: false,
    followingCount: 3,
    followerCount: 128,
    followingList: mockReviewers.slice(1, 4).map((reviewer) => ({
      memberId: reviewer.memberId,
      nickname: reviewer.nickname,
      profilePath: reviewer.profile_img_url,
    })),
    followerList: mockReviewers.slice(4, 9).map((reviewer) => ({
      memberId: reviewer.memberId,
      nickname: reviewer.nickname,
      profilePath: reviewer.profile_img_url,
    })),
    wishList: mockMovies.slice(0, 4).map((movie) => movie.movieId),
  },
  {
    memberId: 1,
    token: "mock-admin-token",
    email: "admin@cinever.local",
    nickname: "manager",
    name: "Manager",
    profilePath: profileUrl(8),
    gender: "none",
    birth: "1990-01-01",
    roleName: "ADMIN",
    preferenceGenre: ["Drama", "Thriller"],
    isFollowing: false,
    followingCount: 0,
    followerCount: 0,
    followingList: [],
    followerList: [],
    wishList: [],
  },
];

export const fullPosterMovie = (movie) => ({
  ...movie,
  posterPath: posterUrl(movie.posterPath),
  director: movie.director.map((director) => ({ ...director })),
  actors: movie.actors.map((actor) => ({ ...actor })),
  genre: [...movie.genre],
  languages: [...movie.languages],
  productionCompanies: movie.productionCompanies.map((company) => ({
    ...company,
  })),
  ottList: movie.ottList.map((ott) => ({ ...ott })),
  stillcutPath: { ...movie.stillcutPath },
  keywordMap: { ...movie.keywordMap },
});

export const listMovie = (movie, { fullPoster = false } = {}) => ({
  movieId: movie.movieId,
  title: movie.title,
  posterPath: fullPoster ? posterUrl(movie.posterPath) : movie.posterPath,
  releaseDate: movie.releaseDate,
  release_date: movie.release_date,
  averageScore: movie.averageScore,
  tmdbScore: movie.tmdbScore,
  cumulativeAttendance: movie.cumulativeAttendance,
  isAdult: movie.isAdult,
  director: movie.director.map(({ personId, name }) => ({ personId, name })),
  genre: [...movie.genre],
  teaserVideo: movie.teaserVideo,
});

export const personSearchData = (type) => {
  const key = type === "DIRECTOR" ? "director" : "actors";
  const seen = new Set();

  return mockMovies
    .flatMap((movie) => movie[key])
    .filter((person) => {
      if (seen.has(person.personId)) return false;
      seen.add(person.personId);
      return true;
    })
    .map((person) => ({
      personId: person.personId,
      name: person.name,
      profilePath: "",
    }));
};

export const movieListForUser = (offset = 0) =>
  mockMovies.slice(offset).concat(mockMovies.slice(0, offset)).map((movie) => ({
    movieId: movie.movieId,
    title: movie.title,
    posterPath: posterUrl(movie.posterPath),
    releaseDate: movie.releaseDate,
    averageScore: movie.averageScore,
    tmdbScore: movie.tmdbScore,
    director: movie.director.map(({ personId, name }) => ({ personId, name })),
  }));

export const mockKeywords = [
  "visual",
  "story",
  "acting",
  "sound",
  "ending",
];
