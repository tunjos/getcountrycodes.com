export default {
  methods: {
    startProgressBar() {
      this.$Progress.start();
    },
    finishProgressBar() {
      this.$Progress.finish();
    },
    failProgressBar() {
      this.$Progress.fail();
    }
  }
};
