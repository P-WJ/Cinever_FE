<script setup>
import { computed, ref, watch } from "vue";
import BaseProfileImage from "../../components/common/BaseProfileImage.vue";
import BaseModal from "../../components/common/BaseModal.vue";
import { useUserStore } from "../../stores/userStore";
import { useRouter } from "vue-router";
import UserEdit from "./UserEdit.vue";
import { getReviewerRoleMeta } from "../../utils/reviewerRole";

const router = useRouter();
const props = defineProps({
  userInfo: Object,
  reviewCount: Number,
  isFollowing: Boolean,
});
const emit = defineEmits(["toggle-follow"]);

const userStore = useUserStore();
const isOwnProfile = computed(() => {
  return props.userInfo?.memberId === userStore.user?.memberId;
});

watch(
  () => props.userInfo?.memberId,
  () => {
    isFollowersModalOpen.value = false;
    isFollowingModalOpen.value = false;
  }
);

const imgSrc = ref(props.userInfo?.profilePath);
const isFollowingModalOpen = ref(false);
const isFollowersModalOpen = ref(false);

const birthLabel = computed(() => {
  if (!props.userInfo?.birth) return "-";
  const date = new Date(props.userInfo.birth);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
});

const openFollowingModal = () => {
  isFollowingModalOpen.value = true;
};
const openFollowersModal = () => {
  isFollowersModalOpen.value = true;
};

const isUserModalOpen = ref(false);

const openUserModal = () => {
  isUserModalOpen.value = true;
};

const goToUserPage = (userId) => {
  router.push({
    name: "User",
    params: { id: userId },
    query: { tab: "profile" },
  });
};
</script>

<template>
  <div
    class="w-full max-w-4xl mx-auto px-6 pt-2 md:pt-12 text-white"
    v-if="userInfo"
  >
    <div
      class="flex flex-col md:flex-row items-center md:items-start gap-5 md:gap-10"
    >
      <BaseProfileImage :src="userInfo.profilePath" size="160px" />
      <div class="flex-1 w-full">
        <div class="flex items-center justify-center md:justify-between">
          <div class="flex flex-col gap-1">
            <div class="flex gap-2 items-center flex-wrap">
              <h2 class="text-2xl font-bold">
                {{ userInfo.nickname }}
              </h2>
              <div
                class="w-fit mt-1 px-3 py-1.5 text-sm font-semibold rounded-full border backdrop-blur-md backdrop-saturate-150 whitespace-nowrap"
                :class="getReviewerRoleMeta(userInfo.roleName).badgeClass"
              >
                {{ getReviewerRoleMeta(userInfo.roleName).roleName }}
              </div>
            </div>

            <p class="mt-1 text-sm font-semibold text-gray-500">
              {{ userInfo.gender }} · {{ birthLabel }}
            </p>
            <div class="flex flex-wrap gap-2 mt-3 justify-center">
              <span
                v-for="genre in userInfo.preferenceGenre"
                :key="genre"
                class="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/10 text-white"
              >
                #{{ genre }}
              </span>
            </div>
          </div>

          <!-- 데스크탑 팔로우 버튼 -->
          <button
            v-if="!isOwnProfile"
            class="hidden md:block text-sm border border-white px-4 py-1.5 rounded hover:bg-white/10"
            :class="
              isFollowing
                ? 'border border-gray-400 text-gray-400'
                : 'border-yellow-400 text-yellow-400'
            "
            @click="$emit('toggle-follow')"
          >
            {{ isFollowing ? "팔로우 취소" : "+ 팔로우 하기" }}
          </button>
          <div v-else class="flex flex-col gap-2">
            <button
              class="hidden md:block text-sm border border-white px-4 py-1.5 rounded hover:bg-white/10"
              @click="openUserModal"
            >
              프로필 수정
            </button>
            <!-- <button
              class="hidden md:block text-sm border border-red-500 text-red-500 px-4 py-1.5 rounded hover:bg-red-500/10"
              @click="openUserModal"
            >
              탈퇴하기
            </button> -->
          </div>
        </div>

        <!-- 모바일 팔로우 버튼 -->
        <div class="mt-4 md:hidden w-full flex justify-center">
          <button
            v-if="!isOwnProfile"
            class="text-sm border border-white px-4 py-1.5 rounded hover:bg-white/10 w-1/2"
            :class="
              isFollowing
                ? 'border border-gray-400 text-gray-400'
                : 'border-yellow-400 text-yellow-400'
            "
            @click="$emit('toggle-follow')"
          >
            {{ isFollowing ? "팔로우 취소" : "+ 팔로우 하기" }}
          </button>
          <button
            v-else
            class="text-sm border border-white px-4 py-1.5 rounded hover:bg-white/10 w-1/2"
            @click="openUserModal"
          >
            프로필 수정
          </button>
        </div>

        <!-- 통계 정보 -->
        <div
          class="grid grid-cols-4 gap-4 mt-10 text-center text-sm text-gray-400 md:mx-12"
        >
          <div>
            <p class="text-xl font-bold text-white">{{ reviewCount ?? "-" }}</p>
            <p>Reviews</p>
          </div>
          <div class="cursor-pointer" @click="openFollowingModal">
            <p class="text-xl font-bold text-white">
              {{ userInfo.followingCount ?? "-" }}
            </p>
            <p>Following</p>
          </div>
          <div class="cursor-pointer" @click="openFollowersModal">
            <p class="text-xl font-bold text-white">
              {{ userInfo.followerCount ?? "-" }}
            </p>
            <p>Followers</p>
          </div>
          <div>
            <p class="text-xl font-bold text-white">
              {{ userInfo.wishList?.length ?? "-" }}
            </p>
            <p>Wishlist</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 프로필 수정 모달 -->
  <UserEdit v-model:isUserModalOpen="isUserModalOpen" />
  <!-- 팔로잉 모달 -->
  <BaseModal
    v-model:isOpen="isFollowingModalOpen"
    contentClass="w-full max-w-lg p-6 overflow-y-auto max-h-[80vh]"
  >
    <template #header><h3 class="text-lg font-bold">팔로잉 목록</h3></template>
    <template #default>
      <div v-if="userInfo.followingList?.length">
        <div
          v-for="following in userInfo.followingList"
          :key="following.memberId"
          class="py-3 cursor-pointer"
          @click="goToUserPage(following.memberId)"
        >
          <div class="flex items-center">
            <BaseProfileImage :src="following.profilePath" size="40px" />
            <p class="pl-4 text-white font-medium">{{ following.nickname }}</p>
          </div>
          <hr class="border-gray-700 my-2" />
        </div>
      </div>
      <p v-else class="text-center text-gray-400">팔로잉 사용자가 없습니다.</p>
    </template>
  </BaseModal>

  <!-- 팔로워 모달 -->
  <BaseModal
    v-model:isOpen="isFollowersModalOpen"
    contentClass="w-full max-w-lg p-6 overflow-y-auto max-h-[80vh]"
  >
    <template #header><h3 class="text-lg font-bold">팔로워 목록</h3></template>
    <template #default>
      <div v-if="userInfo.followerList?.length">
        <div
          v-for="follower in userInfo.followerList"
          :key="follower.memberId"
          class="py-3 cursor-pointer"
          @click="goToUserPage(follower.memberId)"
        >
          <div class="flex items-center">
            <BaseProfileImage :src="follower.profilePath" size="40px" />
            <p class="pl-4 text-white font-medium">{{ follower.nickname }}</p>
          </div>
          <hr class="border-gray-700 my-2" />
        </div>
      </div>
      <p v-else class="text-center text-gray-400">팔로워 사용자가 없습니다.</p>
    </template>
  </BaseModal>
</template>
