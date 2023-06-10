<template>
  <img
    v-if="loading"
    src="../../assets/images/loading.webp"
    alt="loading"
    class="w-[100px] mx-auto"
    loading="lazy" />
  <div v-else v-for="post in posts" :key="post.id">
    <UserPostItem :post="post" @toggleModal="toggleModal(post.id)" />
  </div>
  <div
    class="container mx-auto mb-6 bg-white rounded p-5 shadow-md text-center text-2xl"
    v-if="!loading && noPostsFound">
    <h1>No Posts Found For This User</h1>
  </div>
  <Modal
    v-if="showModal"
    :showModal="showModal"
    :link="link"
    @onClose="toggleModal" />
</template>

<script>
export default {
  emits: ["toggleModal", "onClose"],

  data() {
    return {
      id: this.$route.params.userId.toString(),
      posts: [],
      showModal: false,
      link: "",
      loading: true,
      noPostsFound: false,
    };
  },

  methods: {
    async getUserPosts() {
      this.loading = true;
      const { data } = await useFetch(
        "https://dummyjson.com/posts/user/" + this.id
      );
      this.posts = data.value.posts;
      this.loading = false;
      if (this.posts.length === 0) return (this.noPostsFound = true);
    },
    toggleModal(id) {
      this.link = `https://dummyjson.com/posts/${id}`;
      this.showModal = !this.showModal;
    },
  },

  created() {
    this.getUserPosts();
  },
};
</script>
