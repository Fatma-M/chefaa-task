<template>
  <div
    v-if="post"
    class="mb-6 mx-auto bg-white rounded p-5 shadow-md max-w-3xl">
    <!-- POST HEADER, TITLE & CONTENT -->
    <div class="flex flex-col">
      <div class="flex items-center">
        <img
          :src="user.image"
          alt="user image"
          class="w-[70px] rounded-full bg-[#45555F] mr-3"
          loading="lazy" />
        <div>
          <NuxtLink :to="`/users/${user.id}`" target="_blank">
            <p class="text-xl">{{ user.firstName }} {{ user.lastName }}</p>
          </NuxtLink>
          <p>@{{ user.username }}</p>
        </div>
      </div>

      <div class="my-5 px-8">
        <h1>{{ post.title }}</h1>
        <p>
          {{ showFullText ? post.body : post.body.slice(0, 50)
          }}<span
            v-if="!showFullText"
            @click="showText"
            class="cursor-pointer text-[#45555F]"
            >....Show More</span
          >
        </p>
      </div>

      <div class="w-100 h-[3px] bg-black mt-7"></div>
    </div>

    <!-- POST ACTIONS -->
    <div class="flex items-center justify-between mt-5 px-5">
      <div class="flex items-center">
        <span
          class="count bg-gray-200 w-[25px] h-[25px] rounded-full flex justify-center items-center text-sm">
          {{ addReact ? post.reactions + 1 : post.reactions }}
        </span>
        <button
          :class="`ml-1 hover:text-[#10364E] hover:cursor-pointer ${
            addReact ? 'text-[#10364E]' : 'text-black'
          }`"
          @click="toggleReaction">
          Like
        </button>
      </div>
      <button
        :class="`hover:cursor-pointer hover:text-[#10364E] ${
          showAddComment ? 'text-[#10364E]' : 'text-black'
        }`"
        @click="toggleComments">
        Comment
      </button>
      <button
        class="hover:cursor-pointer hover:text-[#10364E]"
        @click="$emit(`toggleModal`)">
        Share
      </button>
    </div>

    <!-- COMMENT LIST & ADD COMMENT -->
    <CommentsList :id="post.id" :user="user" :showAddComment="showAddComment" />
  </div>
</template>

<script>
export default {
  props: ["post"],

  data() {
    return {
      user: [],
      showAddComment: false,
      addReact: false,
      showFullText: false,
    };
  },

  methods: {
    async getUser() {
      const { data } = await useFetch(
        "https://dummyjson.com/users/" + this.post.id
      );
      this.user = data.value;
    },

    toggleComments() {
      this.showAddComment = !this.showAddComment;
    },

    toggleReaction() {
      this.addReact = !this.addReact;
    },

    showText() {
      this.showFullText = true;
    },
  },

  created() {
    this.getUser();
  },
};
</script>
