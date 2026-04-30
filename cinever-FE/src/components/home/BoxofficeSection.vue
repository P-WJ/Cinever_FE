<script setup>
import { ref, onMounted, defineEmits } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import BaseYoutubeVideo from "../common/BaseYoutubeVideo.vue";
import BaseBadge from "../common/BaseBadge.vue";
import BaseRankingBadge from "../common/BaseRankingBadge.vue";
import { getBoxOfficeRanking } from "../../api/movieApi";
import { useRouter } from "vue-router";

const router = useRouter();
const boxOfficeMovieList = ref();
const selectedMovie = ref(null);
const emit = defineEmits(["loaded"]);
const isLoading = ref(true);

onMounted(() => {
  getBoxOfficeMovieList();
  emit("loaded");
});

const getBoxOfficeMovieList = async () => {
  isLoading.value = true;
  try {
    const res = await getBoxOfficeRanking();
    boxOfficeMovieList.value = res.data.movieList;
    selectedMovie.value = boxOfficeMovieList.value[0];
  } catch (e) {
    console.error("박스오피스 데이터 불러오기 실패", e);
  } finally {
    isLoading.value = false;
  }
};

const handleMovieClick = (movie) => {
  if (window.innerWidth < 768) {
    router.push(`/movie/${movie.movieId}`);
  } else {
    selectedMovie.value = movie;
  }
};
</script>

<template>
  <!-- 로딩 화면 -->
  <div
    v-if="isLoading"
    class="w-full h-[90vh] flex flex-col justify-center items-center bg-black text-white gap-6"
  >
    <!-- 로딩 애니메이션 -->
    <div class="relative w-16 h-16">
      <div
        class="absolute inset-0 rounded-full border-4 border-amber-400 border-t-transparent animate-spin"
      ></div>
      <div
        class="absolute inset-2 rounded-full bg-black flex items-center justify-center"
      >
        <svg
          class="w-6 h-6 text-amber-400 animate-pulse"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.75 3.75L14.25 12L9.75 20.25"
          />
        </svg>
      </div>
    </div>

    <!-- 로딩 텍스트 -->
    <p class="text-sm sm:text-base text-gray-300 animate-pulse">
      박스오피스 인기 영화를 불러오는 중입니다...
    </p>
  </div>
  <div
    v-if="selectedMovie"
    class="relative w-full md:min-h-[100vh] md:bg-black text-white overflow-hidden md:top-12 flex justify-center items-center item-center"
  >
    <div class="absolute top-0 left-0 w-full h-[95%] z-0 hidden md:block">
      <BaseYoutubeVideo
        :videoId="selectedMovie.teaserVideo?.split('v=')[1]"
        class="w-full h-full object-cover"
        :thumbnailUrl="
          'https://img.youtube.com/vi/' +
          selectedMovie.teaserVideo?.split('v=')[1] +
          '/maxresdefault.jpg'
        "
      />
      <div
        class="fade-overlay bottom-0 left-0 w-full h-48"
        style="--direction: to top"
      />
      <div
        class="fade-overlay top-0 left-0 h-full w-48"
        style="--direction: to right"
      />
      <div
        class="fade-overlay top-0 right-0 h-full w-48"
        style="--direction: to left"
      />
    </div>

    <div class="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
      <div
        class="w-full lg:w-[50%] h-full bg-gradient-to-r from-black/60 via-black/40 to-transparent"
      />
    </div>

    <div
      class="relative z-20 flex flex-col items-center gap-20 px-4 pt-24 pb-4 md:py-24 lg:py-36"
    >
      <div class="w-full max-w-6xl text-white hidden md:block">
        <div class="relative w-12 h-6 sm:w-14 sm:h-8">
          <div
            class="absolute top-0 left-0 w-full h-full bg-red-600 text-white text-xs sm:text-sm font-bold flex justify-center items-center rounded-t-md"
          >
            {{ selectedMovie?.rank || 1 }}위
          </div>
        </div>

        <h1
          class="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight md:mt-2"
        >
          {{ selectedMovie.title }}
        </h1>

        <p class="text-xs sm:text-sm text-gray-300 mt-2">
          감독
          <span class="ml-1">
            {{ selectedMovie.director.map((d) => d.name).join(", ") }}
          </span>
        </p>

        <div class="mt-2">
          <BaseBadge :dataList="selectedMovie.genre" index="#" />
        </div>

        <p class="text-sm sm:text-base mt-4 font-medium">
          개봉일
          <span class="ml-2 text-amber-400 font-semibold">
            {{ new Date(selectedMovie.release_date).toLocaleDateString() }}
          </span>
        </p>

        <p class="text-sm sm:text-base font-medium mt-2">
          누적 관객 수
          <span class="ml-2 text-amber-400 font-semibold">
            {{ selectedMovie.cumulativeAttendance.toLocaleString() }}명
          </span>
        </p>

        <div class="pt-10">
          <router-link
            :to="`/movie/${selectedMovie.movieId}`"
            class="inline-block border border-amber-400 text-amber-400 text-sm sm:text-base px-4 py-1.5 sm:px-5 sm:py-2 rounded font-semibold transition hover:bg-amber-400 hover:text-black"
          >
            + 자세히
          </router-link>
        </div>
      </div>

      <div class="w-full max-w-6xl">
        <Swiper
          :centered-slides="true"
          :loop="(boxOfficeMovieList?.length || 0) > 5"
          :space-between="6"
          :grab-cursor="true"
          :slide-to-clicked-slide="true"
          :effect="'coverflow'"
          :coverflow-effect="{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1.5,
            slideShadows: false,
            slidesPerView: 5,
          }"
          :breakpoints="{
            1280: { slidesPerView: 5 },
            1024: { slidesPerView: 4 },
            768: { slidesPerView: 3 },
            480: { slidesPerView: 2 },
            0: { slidesPerView: 1.3 },
          }"
        >
          <SwiperSlide
            v-for="movie in [...boxOfficeMovieList, ...boxOfficeMovieList]"
            :key="movie.movieId"
            class="flex justify-center items-center"
            @click="handleMovieClick(movie)"
          >
            <div class="relative transition-transform duration-300 ease-in-out">
              <div class="absolute top-2 left-2 z-10 w-6 sm:w-8">
                <BaseRankingBadge :rank="movie.rank" />
              </div>

              <img
                :src="'https://image.tmdb.org/t/p/original' + movie.posterPath"
                alt=""
                class="w-64 sm:w-72 md:w-80 h-40 sm:h-44 object-cover rounded-md shadow-md max-w-none"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<style scoped>
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide > div {
  transform: scale(0.85);
  z-index: 1;
}

.swiper-slide-active > div {
  transform: scale(1);
  z-index: 10;
}

.swiper-slide-prev > div,
.swiper-slide-next > div {
  transform: scale(0.95);
  z-index: 5;
}

.fade-overlay {
  position: absolute;
  pointer-events: none;
  z-index: 20;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: linear-gradient(
    var(--direction),
    rgba(0, 0, 0, 0.4),
    transparent
  );
  -webkit-mask-image: linear-gradient(var(--direction), black, transparent);
  mask-image: linear-gradient(var(--direction), black, transparent);
}
.loader {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
