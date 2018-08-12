<template>
  <div class="callback">
    <h1>This is the callback page</h1>
  </div>
</template>

<script>
export default {
  name: 'callback',
  mounted() {
    this.$auth.handleAuthentication().then((data) => {
      this.$router.push({ name: 'home' })
    })
  }
};
</script>
