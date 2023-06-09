<template>
  <div
    data-aos="zoom-in-up"
    class="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center flex-col bg-[#000000da]">
    <div
      class="text-center bg-white h-[500px] w-[90%] max-w-md py-[6px] rounded-lg flex flex-col justify-between items-center">
      <div class="ml-[16px] cursor-pointer self-end p-5">
        <img
          class="w-[25px]"
          src="../assets/images/close.png"
          alt="close icon"
          @click="$emit('onClose')"
          loading="lazy" />
      </div>
      <p>
        Here is the post link: <br />
        {{ link }}
      </p>
      <button
        class="px-8 py-3 border-4 border-[#45555F] mb-12 hover:bg-[#45555F] hover:text-white"
        @click="copyLink">
        Copy
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["link"],

  data() {
    return {};
  },

  created() {},

  methods: {
    copyLink() {
      navigator.clipboard.writeText(this.link);
      this.$emit("onClose");
    },
  },
};
</script>
