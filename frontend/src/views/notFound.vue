<template>
  <div>
    <h1>Page not Found</h1>
    <router-link @click="scrollToTop" to="/">back to home !!!</router-link>
  </div>
</template>

<script>
export default {
  setup() {
    function scrollToTop() {
      window.scrollTo(0, 0);
    }

    return { scrollToTop };
  },
};
</script>

<style scoped>
div {
  text-align: center;
  margin-top: 3rem;
  gap: 0 20px;
  font-size: 3rem;
}

div h1 {
  color: red;
  font-weight: bold;
}
</style>
