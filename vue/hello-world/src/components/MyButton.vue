<template>
  <md-button v-bind="$attrs" v-on="$listeners">asdf</md-button>
</template>

<script>

export default {
  name: 'MyButton'
}
</script>

<style scoped>
/deep/ .md-button-content {
  background: yellow;
}
</style>
