<template>
  <img
    v-if="loading"
    src="../assets/images/loading.webp"
    alt="loading"
    class="w-[100px] mx-auto"
    loading="lazy" />
  <div
    v-else
    data-aos="zoom-in-down"
    data-aos-anchor=".CommentsList"
    data-aos-duration="500"
    class="flex flex-col bg-white pt-1 [&:not(:last-of-type)]:border-b-2 border-black pb-2">
    <div class="flex items-center">
      <img
        :src="commentUserImage"
        alt="user image"
        class="w-[50px] rounded-full bg-[#45555F] m-3"
        loading="lazy" />
      <div>
        <NuxtLink :to="`/users/${comment.user.id}`" target="_blank">
          <p class="sm:text-xl">{{ commentUserName }}</p>
        </NuxtLink>
        <!-- <p class="sm:text-xl">{{ commentUserName }}</p> -->
        <p>@{{ comment.user.username }}</p>
      </div>
    </div>

    <div class="mt-2 px-8">
      <p>
        {{ comment.body }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["comment"],

  data() {
    return {
      commentUserName: "",
      commentUserImage: "",
      loading: true,
    };
  },

  methods: {
    async getCommentUserInfo() {
      this.loading = true;
      const { data } = await useFetch(
        "https://dummyjson.com/users/" + this.comment.user.id
      );
      const { firstName, lastName, image } = data.value;
      this.commentUserName = `${firstName} ${lastName}`;
      this.commentUserImage = image;

      this.loading = false;
    },
  },

  created() {
    this.getCommentUserInfo();
  },
};
</script>
