<template>
  <img
    v-if="loading"
    src="../assets/images/loading.webp"
    alt="loading"
    class="w-[100px] mx-auto"
    loading="lazy" />
  <div
    class="container mx-auto"
    v-for="post in posts"
    :key="post.id"
    v-else
    data-aos="fade-up-right">
    <PostItem :post="post" @toggleModal="toggleModal(post.id)" />
  </div>
  <div
    class="mb-10 flex items-center justify-center"
    v-if="!loading && !hideShowMore">
    <button
      class="bg-white text-center text-xl px-4 py-2"
      @click="showMorePosts">
      Show More Posts
    </button>
  </div>
  <div
    class="container mx-auto mb-6 bg-white rounded p-5 shadow-md text-center text-2xl"
    v-if="!loading && noPostsFound">
    <h1>No Posts Found</h1>
  </div>
  <div
    v-if="!newPosts"
    class="container mx-auto text-center text-xl text-white mb-4">
    No More New Posts
  </div>
  <Modal v-if="showModal" :link="link" @onClose="toggleModal" />
</template>

<script>
export default {
  emits: ["toggleModal", "onClose", "addComment"],

  data() {
    return {
      posts: [],
      postsTemp: [],
      postsLimit: 10,
      newPosts: true,
      showModal: false,
      link: "",
      loading: true,
      noPostsFound: false,
      hideShowMore: false,
    };
  },

  methods: {
    async getPosts() {
      this.loading = true;
      const { data } = await useFetch(`https://dummyjson.com/posts`, {
        lazy: true,
      });
      this.postsTemp = await data.value.posts;
      this.posts = this.postsTemp.slice(0, 3);

      this.loading = false;
      if (this.posts.length === 0) return (this.noPostsFound = true);
    },

    showMorePosts() {
      this.loading = true;

      this.postsLimit += 6;
      this.posts = this.postsTemp.slice(0, this.postsLimit);
      this.loading = false;

      if (this.posts.length === this.postsTemp.length) {
        this.hideShowMore = true;
        this.newPosts = false;
      }
    },

    toggleModal(id) {
      this.link = `https://dummyjson.com/posts/${id}`;
      this.showModal = !this.showModal;
    },
  },

  created() {
    this.getPosts();
  },
};
</script>
