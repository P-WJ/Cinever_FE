<script setup>
import BaseReview from "../common/BaseReview.vue";
import BaseInput from "../common/BaseInput.vue";
import BaseButton from "../common/BaseButton.vue";
import BaseStarRating from "../common/BaseStarRating.vue";
import BaseTextArea from "../common/BaseTextarea.vue";
import { ref, computed } from "vue";
import { createReview, updateReview, deleteReview } from "../../api/reviewApi";
import { useUserStore } from "../../stores/userStore";
import WordCloud from "vue3-word-cloud";

const keyword = ref("");
const rating = ref(0);
const userStore = useUserStore();
const currentMemberId = computed(() => userStore.user?.memberId ?? null);
const isLoading = ref(false);

const props = defineProps({
  dataList: Object,
  movieId: Number,
  keywordList: Object,
});

const filteredReviews = computed(() =>
  props.dataList?.filter((r) => r.isMine == false)
);

const myReviews = computed(() => props.dataList?.filter((r) => r.isMine));

const isEditing = ref(false);

const cancelEdit = () => {
  isEditing.value = false;
  keyword.value = "";
  rating.value = 0;
};

const startEdit = () => {
  const myReview = myReviews.value[0];
  if (myReview) {
    keyword.value = myReview.context;
    rating.value = myReview.rating;
    isEditing.value = true;
  }
};

const handleUpdate = async () => {
  if (!currentMemberId.value) {
    alert("로그인이 필요합니다.");
    return;
  }

  if (!keyword.value.trim()) {
    alert("리뷰를 입력해주세요.");
    return;
  }

  if (!rating.value || rating.value < 0.5) {
    alert("별점을 입력해주세요.");
    return;
  }

  try {
    await updateReview(props.movieId, {
      memberId: currentMemberId.value,
      context: keyword.value,
      rating: rating.value,
      movieId: props.movieId,
    });

    alert("리뷰가 수정되었습니다!");
    window.location.reload();
  } catch (error) {
    console.error("리뷰 수정 실패:", error);
    alert("리뷰 수정 중 오류가 발생했습니다.");
  }
};

const handleSubmit = async () => {
  if (!currentMemberId.value) {
    alert("로그인이 필요합니다.");
    return;
  }

  if (!keyword.value.trim()) {
    alert("리뷰를 입력해주세요.");
    return;
  }

  if (!rating.value || rating.value < 0.5) {
    alert("별점을 입력해주세요.");
    return;
  }

  try {
    isLoading.value = true; // 로딩 시작

    await createReview(props.movieId, {
      memberId: currentMemberId.value,
      context: keyword.value,
      rating: rating.value,
      movieId: props.movieId,
    });

    // alert("리뷰가 등록되었습니다!");
    window.location.reload();
  } catch (error) {
    console.error("리뷰 등록 실패:", error);
    alert("리뷰 등록 중 오류가 발생했습니다.");
  } finally {
    isLoading.value = false; // 로딩 끝
  }
};

const handleDelete = async () => {
  const myReview = myReviews.value[0];
  if (!myReview) {
    alert("삭제할 리뷰가 없습니다.");
    return;
  }

  if (confirm("정말 삭제하시겠습니까?")) {
    try {
      await deleteReview(myReview.id);
      alert("리뷰가 삭제되었습니다!");
      window.location.reload();
    } catch (error) {
      console.error("리뷰 삭제 실패:", error);
      alert("리뷰 삭제 중 오류가 발생했습니다.");
    }
  }
};
console.log(myReviews.value);
const averageRating = computed(() => {
  const all = props.dataList ?? [];
  const sum = all.reduce((acc, r) => acc + r.rating, 0);
  return all.length ? sum / all.length : 0;
});

// 별점별 개수
const starCounts = computed(() => {
  const counts = {};
  (props.dataList ?? []).forEach((r) => {
    const rounded = Math.round(r.rating);
    counts[rounded] = (counts[rounded] || 0) + 1;
  });
  return counts;
});

const getStarPercentage = (star) => {
  const total = props.dataList?.length || 0;
  return total ? ((starCounts.value[star] || 0) / total) * 100 : 0;
};

const wordData = computed(() => {
  const map = props.keywordList ?? {};
  return Object.entries(map);
});

// 동적 색상 계산 함수
const getColorByWeight = ([, weight]) => {
  const weights = wordData.value.map(([, w]) => w);
  const min = Math.min(...weights);
  const max = Math.max(...weights);

  if (min === max) {
    // 모든 값이 같으면 단일 색상
    return "#FDC500";
  }

  const range = max - min;
  const step = range / 3;

  if (weight <= min + step) {
    return "#FFFBE1"; // 가장 약함
  } else if (weight <= min + step * 2) {
    return "#FFF066"; // 중간
  } else {
    return "#FDC500"; // 가장 강함
  }
};
</script>

<template>
  <div
    class="w-full flex flex-col md:flex-row justify-between px-6 pb-5 pt-6 gap-6"
  >
    <div class="md:w-1/2 w-full">
      <p class="text-white text-sm mb-3">
        평균 별점:
        <span class="text-yellow-400 text-xl font-bold">{{
          averageRating.toFixed(1)
        }}</span>
        / 5
      </p>

      <div
        v-for="star in [5, 4, 3, 2, 1]"
        :key="star"
        class="flex items-center gap-2 text-white text-sm"
      >
        <span class="w-8">{{ star }}점</span>
        <div class="bg-white/20 rounded h-4 flex-1 relative">
          <div
            class="bg-yellow-400 h-4 rounded"
            :style="{ width: getStarPercentage(star) + '%' }"
          />
        </div>
        <span class="w-6 text-right">{{ starCounts[star] || 0 }}</span>
      </div>
    </div>

    <div class="md:w-1/2 w-full">
      <div class="w-full h-40 md:h-full relative" v-if="wordData?.length">
        <WordCloud
          :words="wordData"
          :color="getColorByWeight"
          font-family="Roboto"
        />
      </div>
      <div
        v-else
        class="hidden md:flex w-full h-40 md:h-full flex-col items-center justify-center text-sm text-gray-400"
      >
        아직 키워드 데이터가 충분하지 않아요.
        <span class="ml-1 text-yellow-400"
          >리뷰를 작성하면 워드클라우드가 생성돼요!</span
        >
      </div>
    </div>
  </div>
  <div v-if="myReviews?.length === 0" class="p-4 rounded-md">
    <div class="mb-2 flex">
      <BaseStarRating v-model="rating" />
    </div>

    <div class="flex gap-2 justify-center items-center">
      <BaseTextArea
        v-model="keyword"
        placeholder="리뷰를 작성해주세요"
        minRows="4"
        maxRows="4"
      />
    </div>
    <div class="flex gap-2 justify-end mt-3">
      <BaseButton
        :label="isLoading ? '' : '등록'"
        :disabled="isLoading"
        class="md:w-[15%] bg-yellow-400 hover:bg-yellow-500 text-black h-9 px-2 flex justify-center items-center"
        @click="handleSubmit"
      >
        <svg
          v-if="isLoading"
          class="animate-spin h-4 w-4 text-black"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
          ></path>
        </svg>
        <span v-if="isLoading" class="ml-2 text-sm">등록 중...</span>
      </BaseButton>
    </div>
  </div>
  <div class="bg-[#16130f] px-2 py-6 md:p-6 space-y-4 gap-1 mb-4">
    <p class="text-white">
      <span class="text-amber-500 text-xl font-semibold">My</span> 리뷰
    </p>
    <BaseReview
      v-if="!isEditing"
      v-for="review in myReviews"
      :key="review.id"
      :avatar="review.profile_img_url"
      :rating="review.rating"
      :content="review.context"
      :nickname="review.nickname"
      starColor="text-amber-500"
      :userId="currentMemberId"
      :keywords="review.keywords"
    />

    <!-- 작성/수정 폼 -->
    <div v-if="!myReviews?.length === 0 || isEditing" class="p-4 rounded-md">
      <div class="mb-2 flex">
        <BaseStarRating v-model="rating" />
      </div>

      <div class="flex gap-2 justify-center items-center">
        <BaseTextArea
          v-model="keyword"
          placeholder="리뷰를 작성해주세요"
          minRows="4"
          maxRows="4"
        />
      </div>

      <div class="flex gap-2 justify-end mt-3">
        <!-- 수정 모드 -->
        <BaseButton
          v-if="isEditing"
          label="취소"
          class="w-[15%] bg-yellow-400 hover:bg-yellow-500 text-black h-9 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-[min(3.5vw,14px)]"
          @click="cancelEdit"
        />
        <BaseButton
          v-if="isEditing"
          label="수정 완료"
          class="w-[15%] bg-yellow-400 hover:bg-yellow-500 text-black h-9 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-[min(3.5vw,14px)]"
          @click="handleUpdate"
        />
      </div>
    </div>
    <div class="flex gap-2 justify-end mt-3">
      <BaseButton
        v-if="myReviews?.length > 0 && !isEditing"
        label="수정"
        class="w-[15%] bg-yellow-400 hover:bg-yellow-500 text-black h-9 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-[min(3.5vw,14px)]"
        @click="startEdit"
      />
      <BaseButton
        v-if="myReviews?.length > 0 && !isEditing"
        label="삭제"
        class="w-[15%] bg-yellow-400 hover:bg-yellow-500 text-black h-9 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-[min(3.5vw,14px)]"
        @click="handleDelete"
      />
    </div>
  </div>

  <div class="min-h-screen bg-[#16130f] px-2 py-6 md:p-6 space-y-4">
    <p class="text-white">
      <span class="text-amber-500 text-xl font-semibold">{{
        filteredReviews?.length
      }}</span>
      건의 리뷰
    </p>
    <BaseReview
      v-for="review in filteredReviews"
      :key="review.id"
      :avatar="review.profile_img_url"
      :rating="review.rating"
      :content="review.context"
      :nickname="review.nickname"
      starColor="text-amber-500"
      :userId="review.memberId"
      :keywords="review.keywords"
    />
  </div>
  <!-- 전체화면 로딩 오버레이 -->
  <div
    v-if="isLoading"
    class="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50"
  >
    <div class="flex flex-col items-center space-y-4">
      <svg
        class="animate-spin h-12 w-12 text-yellow-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
        ></path>
      </svg>
      <p class="text-white text-lg font-semibold">리뷰 등록 중...</p>
    </div>
  </div>
</template>

<style scoped>
/* ✅ scrollbar 숨기기 */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
