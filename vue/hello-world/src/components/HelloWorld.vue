<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <my-button :md-ripple="false" class="md-raised md-accent"></my-button>
  </div>
</template>

<script>
import MyButton from './MyButton'

export default {
  name: 'HelloWorld',
  components: { MyButton },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
