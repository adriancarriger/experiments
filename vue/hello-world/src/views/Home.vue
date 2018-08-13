<template>
  <div class="home">
    <md-button @click="logout">logout</md-button>
    <md-button @click="apiRequest">API request</md-button>
    <img src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  methods: {
    logout() {
      this.$auth.logout()
    },
    apiRequest() {
      this.$http.get('secured/ping').then((response) => {
        console.log(response.body)
      })
    }
  }
};
</script>
