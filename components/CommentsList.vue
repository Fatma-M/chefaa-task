<template>
  <div
    class="container mx-auto mt-3 mx-3 sm:px-9 px-2 py-5 max-h-[520px] overflow-auto rounded bg-[#45555F] flex flex-col">
    <div class="" v-if="comments.length != 0">
      <CommentItem
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment" />
      <button
        class="mt-1 self-end underline text-white"
        @click="showMoreComments"
        v-if="!hideShowMore">
        Show more
      </button>
    </div>
    <div class="text-white mx-auto" v-else>No comments for this post</div>
  </div>

  <div
    v-if="showAddComment"
    data-aos="zoom-out-down"
    data-aos-anchor=".CommentsList"
    class="flex items-center justify-between flex-wrap gap-3 mt-5 px-5 bg-white container mx-auto border-0">
    <img
      :src="user.image"
      alt="user image"
      class="w-[50px] rounded-full bg-[#45555F] m-3"
      loading="lazy" />
    <input
      type="text"
      class="bg-[#45555F] flex-initial w-[400px] h-[45px] focus:outline-none text-white px-2 placeholder:italic placeholder:text-white"
      placeholder="Write comment here..."
      v-model="newComment" />
    <button
      class="bg-[#45555F] px-7 text-white h-[45px] mt-2 md:mt-0"
      @click="addComment">
      Add
    </button>
  </div>
</template>

<script>
export default {
  props: ["id", "user", "showAddComment"],

  data() {
    return {
      comments: [],
      commentsTemp: [],
      commentLimit: 2,
      hideShowMore: false,
      newComment: "",
    };
  },

  methods: {
    async getComments() {
      const { data } = await useFetch(
        `https://dummyjson.com/comments/post/${this.id}`
      );
      this.commentsTemp = data.value.comments;
      this.comments = this.commentsTemp.slice(0, 2);

      if (this.commentsTemp.length <= 2) {
        this.hideShowMore = true;
      }
    },

    showMoreComments() {
      this.commentLimit += 3;
      this.comments = this.commentsTemp.slice(0, this.commentLimit);

      if (this.comments.length === this.commentsTemp.length) {
        this.hideShowMore = true;
      }
    },

    addComment() {
      const { image, username, id: uId } = this.user;

      const newC = {
        body: this.newComment,
        postId: this.id,
        image,
        user: {
          id: uId,
          username,
        },
      };
      this.comments.unshift(newC);
      this.newComment = "";
    },
  },

  created() {
    this.getComments();
  },
};
</script>
