<!-- src/pages/FolloweesReviewsPage.vue -->
<script setup>
// ───────────────── import ─────────────────
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import BaseBackground from "../components/common/BaseBackground.vue";
import BaseRating from "../components/common/BaseRating.vue";
import { CalendarIcon } from "@heroicons/vue/24/outline";
import { getFollowingReview } from "../api/reviewApi";
import BaseProfileImage from "../components/common/BaseProfileImage.vue";
import { getReviewerRoleMeta } from "../utils/reviewerRole";

// const allReviews = [
//   {
//     movieId: 101,
//     title: "Inception",
//     posterPath: "https://image.tmdb.org/t/p/w500/inception.jpg",
//     date: "2010-07-16",
//     averageScore: 4.8,
//     isAdult: false,
//     following_role: "Critic",
//     following_profilepath: "https://example.com/profiles/user1.jpg",
//     following_nickname: "Dreamer",
//     following_memId: "1",
//     rating: 5.0,
//     reviewdDate: "2025-07-20",
//     Context: "A mind-bending sci-fi classic.",
//     likeCount: 120,
//     isLiked: true,
//   },
// ];
const allReviews = ref([]);
/* ──────────────────────────────────────────
  2) 무한스크롤 상태
────────────────────────────────────────── */
const PAGE_SIZE = 6;
const page = ref(0);
const visibleReviews = ref([]);
const endReached = ref(false);

/** 다음 페이지를 visibleReviews에 push */
const loadNextPage = async () => {
  if (endReached.value) return;
  const start = page.value * PAGE_SIZE;
  const next = allReviews.value?.slice(start, start + PAGE_SIZE);
  if (next.length) {
    visibleReviews.value.push(...next);
    page.value++;
  }
  if (visibleReviews.value.length >= allReviews.value?.length)
    endReached.value = true;
};

/* ──────────────────────────────────────────
  3) 날짜별 그룹화 (YYYY-MM-DD)
────────────────────────────────────────── */
const grouped = computed(() => {
  const map = new Map();
  visibleReviews.value.forEach((r) => {
    if (!map.has(r.reviewedDate)) map.set(r.reviewedDate, []);
    map.get(r.reviewedDate).push(r);
  });

  // 그룹 내 리뷰들은 reverse() 해서 최신순으로 바꿈
  const entries = [...map.entries()].map(([date, reviews]) => {
    return [date, reviews.slice().reverse()];
  });

  // 날짜별 그룹은 최신 날짜부터 정렬
  return entries.sort((a, b) => b[0].localeCompare(a[0]));
});

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

/* ──────────────────────────────────────────
  4) 화면에 표시될 현재 날짜 (스택용)
────────────────────────────────────────── */
const currentYear = ref("");
const currentMonth = ref("");
const currentDay = ref("");

/* ──────────────────────────────────────────
  5) 그룹 DOM 레퍼런스 & 날짜 옵저버
────────────────────────────────────────── */
const groupEls = ref([]); // v-for 그룹 DOM 배열
let dateObserver = null; // IntersectionObserver

/** v-for 그룹의 ref 콜백 */
const setGroupRef = (el, idx) => {
  if (!Array.isArray(groupEls.value)) groupEls.value = [];

  if (el) {
    groupEls.value[idx] = el;
    //  새로 생긴 DOM 즉시 관찰
    if (dateObserver) dateObserver.observe(el);
  } else {
    //  언마운트 시 unobserve
    if (groupEls.value[idx] && dateObserver)
      dateObserver.unobserve(groupEls.value[idx]);
    groupEls.value[idx] = null;
  }
};

/** 날짜 스택 IntersectionObserver 초기화 */
const initDateObserver = async () => {
  dateObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const d = entry.target.dataset.date; // YYYY-MM-DD
          currentYear.value = d.slice(0, 4);
          currentMonth.value = d.slice(5, 7);
          currentDay.value = d.slice(8);
        }
      });
    },
    {
      rootMargin: "-30% 0px -100% 0px",
      threshold: 0,
    }
  );
  // 이미 렌더된 첫 페이지 그룹 관찰
  groupEls.value.forEach((el) => el && dateObserver.observe(el));
};

/* ──────────────────────────────────────────
  6) 무한스크롤 IntersectionObserver
────────────────────────────────────────── */
const sentinel = ref(null);
let scrollObserver = null;

const initScrollObserver = async () => {
  scrollObserver = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && loadNextPage()),
    { threshold: 1 }
  );
  if (sentinel.value) scrollObserver.observe(sentinel.value);
};

/* ──────────────────────────────────────────
  7) 생명주기
────────────────────────────────────────── */
onMounted(async () => {
  await getReviewList();
  await loadNextPage(); // 첫 페이지
  await nextTick(); // DOM 그린 뒤
  await initDateObserver(); // 날짜 스택 옵저버
  await initScrollObserver(); // 무한스크롤 옵저버
});

onBeforeUnmount(() => {
  if (scrollObserver && sentinel.value)
    scrollObserver.unobserve(sentinel.value);
  if (dateObserver && Array.isArray(groupEls.value)) {
    groupEls.value.forEach((el) => el && dateObserver.unobserve(el));
  }
});

const getReviewList = async () => {
  const res = await getFollowingReview();
  allReviews.value = res.reviewList;
  console.log(allReviews);
};
</script>

<template>
  <BaseBackground>
    <!-- ① 고정(스택) 날짜 표시 -->
    <div
      class="hidden md:flex fixed left-[20%] top-32 z-30 flex-col items-end pointer-events-none"
    >
      <p class="text-base font-bold">{{ currentYear }}</p>
      <p class="mt-2 text-3xl font-semibold text-amber-500">
        {{ currentMonth }}
      </p>
      <p class="mt-1 text-3xl font-semibold text-amber-500">{{ currentDay }}</p>
    </div>

    <!-- ② 리뷰 목록 -->
    <div class="md:mx-auto max-w-4xl pt-20 pb-32 md:py-32 w-full md:w-full">
      <div class="flex flex-col gap-8 sm:gap-10 lg:gap-14 w-full">
        <!-- 그룹 루프 -->
        <div
          v-for="(group, i) in grouped"
          :key="group[0]"
          :data-date="group[0]"
          :ref="(el) => setGroupRef(el, i)"
          class="relative flex sm:gap-6 justify-center"
        >
          <!-- 타임라인 자리 확보(폭 10%) -->
          <div class="md:w-[10%] shrink-0"></div>

          <!-- ── 리뷰 카드 컬럼 ── -->
          <div class="flex w-[90%] flex-col gap-8 sm:gap-10 lg:gap-14">
            <div
              v-for="review in group[1]"
              :key="review.id"
              class="relative w-full overflow-hidden rounded-2xl border border-white/15 p-4 shadow-lg backdrop-blur transition hover:scale-[1.02] hover:bg-white/10 sm:p-6"
            >
              <!-- 유저 + 별점 -->
              <div
                class="flex flex-col pb-2 sm:pb-4 border-b border-white/15 sm:flex-row sm:items-center sm:justify-between"
              >
                <RouterLink
                  :to="`/user/${review.followingMemId}`"
                  class="flex items-center gap-3"
                >
                  <BaseProfileImage
                    size="40px"
                    :src="review.followingProfilePath"
                  />

                  <div>
                    <div
                      class="flex items-center gap-2 text-sm font-semibold text-white sm:text-base"
                    >
                      {{ review.followingNickname }}
                      <span
                        class="w-fit text-xs font-bold text-black px-2 py-0.5 rounded bg-yellow-400"
                      >
                        {{ review.followingRole }}
                      </span>
                      <div
                        class="w-fit px-2 py-0.5 text-xs font-semibold rounded-full border backdrop-blur-md backdrop-saturate-150"
                        :class="getReviewerRoleMeta(review.roleName).badgeClass"
                      >
                        {{ getReviewerRoleMeta(review.roleName).roleName }}
                      </div>
                    </div>
                    <p class="text-[10px] text-white/60 sm:text-xs">
                      <!-- {{ review.user.preference }} -->
                    </p>
                  </div>
                </RouterLink>
                <div class="flex items-center text-amber-400">
                  <BaseRating :score="review.rating" size="20" />
                  <span class="ml-2 text-[20px] font-medium">
                    {{ review.rating ?? "-" }}
                  </span>
                  <span
                    class="text-xs font-medium text-gray-200 opacity-50 mt-2"
                  >
                    {{ review.rating ? "\u00A0/ 5.0" : "" }}
                  </span>
                </div>
              </div>

              <!-- 영화 정보 -->
              <div class="mt-4 flex gap-4">
                <RouterLink :to="`/movie/${review.movieId}`">
                  <img
                    :src="review.posterPath"
                    alt="poster"
                    class="h-20 w-14 rounded object-cover shadow-sm sm:h-24 sm:w-16"
                  />
                </RouterLink>
                <div>
                  <p
                    class="truncate text-sm font-medium text-white sm:text-base"
                  >
                    {{ review.title }}
                  </p>
                  <p class="text-[10px] text-white/60 sm:text-xs">
                    <!-- {{ review.movie.genre }} -->
                  </p>
                  <p class="text-[10px] text-white/60 sm:text-xs flex gap-1">
                    <CalendarIcon class="w-4 h-4" />
                    {{ review.releaseDate }}
                  </p>
                  <p class="mt-1 flex items-center gap-1 text-xs sm:text-sm">
                    평균 평점
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400"
                    >
                      <path
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                      />
                    </svg>
                    {{ review.averageScore.toFixed(1) }}
                  </p>
                </div>
              </div>

              <!-- 리뷰 내용 -->
              <p class="text-xs text-white/60 md:hidden mt-4">
                {{ review.reviewedDate }}
              </p>
              <p
                class="mt-1 pb-4 border-b border-white/15 text-xs leading-relaxed text-white/90 sm:mt-6 sm:text-sm"
              >
                {{ review.context }}
              </p>

              <!-- 좋아요 -->
              <div class="flex justify-end pt-4">
                <button
                  class="flex items-center gap-1 text-xs text-white/60 transition hover:text-amber-400 sm:text-sm"
                  @click="toggleLike(review)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="h-4 w-4 sm:h-5 sm:w-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 21C12 21 3 15 3 8.25C3 5.765 5.015 3.75 7.5 3.75C9.344 3.75 10.9 4.84 11.641 6.38C12.383 4.84 13.939 3.75 15.783 3.75C18.268 3.75 20.283 5.765 20.283 8.25C20.283 15 12.283 21 12.283 21L12 21Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  {{ review.likeCount }}
                </button>
              </div>
            </div>
            <!-- 카드 반복 끝 -->
          </div>
        </div>
        <!-- 그룹 루프 끝 -->
      </div>

      <!-- 무한스크롤 sentinel -->
      <div ref="sentinel" class="h-1" />

      <!-- 목록 끝 메시지 -->
      <p
        v-if="endReached"
        class="mt-32 text-center text-xs text-white/60 sm:text-sm"
      >
        모든 리뷰를 다 확인했어요!
      </p>
    </div>
  </BaseBackground>
</template>

<style scoped>
/* Tailwind line-clamp 플러그인 미사용 시 수동 정의 */
.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
