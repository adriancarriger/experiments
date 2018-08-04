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
.my-button-content {
  border: solid red 1px;
}
</style>
