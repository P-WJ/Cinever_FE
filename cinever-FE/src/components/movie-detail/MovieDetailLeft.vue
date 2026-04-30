<script setup>
import { computed, ref } from "vue";
import RatingInput from "../common/BaseStarRating.vue";
import BaseCard from "../common/BaseCard.vue";
import { createReview } from "../../api/reviewApi";
import { useUserStore } from "../../stores/userStore";
import { EyeIcon, HeartIcon } from "@heroicons/vue/24/solid";
import { toggleWishlist } from "../../api/movieApi";

const props = defineProps({
  dataList: Object,
});

const userStore = useUserStore();
const currentMemberId = computed(() => userStore.user?.memberId ?? null);
const showRatingInput = ref(false);
const tempRating = ref(0);
const isWishlisted = ref(props.dataList.isWishlisted);
const wishlistCount = ref(props.dataList.wishListCount);

const handelWishlisted = async () => {
  try {
    await toggleWishlist(props.dataList.movieId, isWishlisted.value);
    isWishlisted.value = !isWishlisted.value;
    wishlistCount.value += isWishlisted.value ? 1 : -1;
    props.dataList.isWishlisted = isWishlisted.value;
    props.dataList.wishListCount = wishlistCount.value;
  } catch (err) {
    console.error("위시리스트 처리 실패", err);
  }
};

const handelReviewed = () => {
  showRatingInput.value = true;
};

const submitReview = async () => {
  if (!currentMemberId.value) {
    alert("로그인이 필요합니다.");
    showRatingInput.value = false;
    tempRating.value = 0;
    return;
  }

  try {
    const payload = {
      memberId: currentMemberId.value,
      movieId: props.dataList.movieId,
      context: "",
      rating: tempRating.value,
    };

    await createReview(props.dataList.movieId, payload);
    props.dataList.isReviewed = true;
    props.dataList.reviewCount++;
    showRatingInput.value = false;
    tempRating.value = 0;
    alert("리뷰가 등록되었습니다.");
    window.location.reload();
  } catch (error) {
    console.error("리뷰 등록 실패", error);
  }
};
</script>

<template>
  <img :src="dataList.posterPath" class="rounded-lg shadow-lg" />
  <div class="flex flex-col gap-2">
    <BaseCard
      backgroundColor="neutral-800"
      :title="
        showRatingInput ? '점' : dataList.reviewCount.toLocaleString() + '명'
      "
      titleClass="text-sm text-white"
      :divClass="
        showRatingInput
          ? 'flex items-center justify-end'
          : 'flex items-center justify-between'
      "
    >
      <template #icon>
        <button
          @click="handelReviewed"
          :disabled="props.dataList.isReviewed"
          class="w-8 h-8 flex items-center justify-center rounded-md transition cursor-pointer hover:bg-white/10"
          :class="
            props.dataList.isReviewed ? 'pointer-events-none opacity-50' : ''
          "
        >
          <EyeIcon
            v-if="!showRatingInput"
            :class="[
              'w-5 h-5',
              props.dataList.isReviewed ? 'text-yellow-400' : 'text-gray-400',
            ]"
          />
        </button>

        <div v-if="showRatingInput">
          <RatingInput v-model="tempRating" @update:modelValue="submitReview" />
        </div>

        <div v-if="showRating" class="mt-2">
          <BaseStarRating
            :score="rating"
            @click="
              (e) => {
                rating = e;
                submitReview(e);
              }
            "
          />
        </div>
      </template>
    </BaseCard>

    <BaseCard
      backgroundColor="neutral-800"
      :title="wishlistCount.toLocaleString() + '명'"
      titleClass="text-sm text-white"
      divClass="flex items-center justify-between"
    >
      <template #icon>
        <button
          @click="handelWishlisted"
          class="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/10 transition cursor-pointer"
          type="button"
        >
          <HeartIcon
            :class="[
              'w-5 h-5',
              isWishlisted ? 'text-yellow-400' : 'text-gray-400',
            ]"
          />
        </button>
      </template>
    </BaseCard>

    <BaseCard backgroundColor="neutral-800">
      <template #contents>
        <div class="flex gap-2 w-full flex-wrap">
          <div v-for="ott in dataList.ottList?.slice(0, 6)" :key="ott.ottId">
            <img v-if="ott.logoPath" :src="ott.logoPath" class="w-10 h-10" />
            <p
              v-else
              class="text-xs bg-amber-500 text-black px-3 py-1 rounded-full"
            >
              #{{ ott.ottName }}
            </p>
          </div>
        </div>
      </template>
    </BaseCard>
  </div>
</template>
