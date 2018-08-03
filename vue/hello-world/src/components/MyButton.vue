<script>
import Vue from 'vue'
import TestB from './TestB'


const base = {
  name: 'MyButton',
  extends: TestB,
  extendsScopedStyle: true
}

export default {
  ...base
}
</script>

<style scoped>
/deep/ .my-button-content {
  background: yellow;
}
</style>
