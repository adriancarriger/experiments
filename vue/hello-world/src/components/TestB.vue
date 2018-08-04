<template>
  <div class="my-button-content">Component B</div>
</template>

<script>
export default {
  name: 'component-b',
  created () {
    console.log('my test test test', this.$root)
  }
}
</script>

<style>
.my-button-content {
  background-color: yellow;
}
</style>
