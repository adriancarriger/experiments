<template>
  <form @submit="$emit('newTodo', {event: $event, text: todoText}); todoText = ''">
    <input placeholder="What needs to be done?" v-model="todoText" />
  </form>
</template>

<script>
export default {
  name: 'todo-input',
  data() {
    return {
      todoText: ''
    };
  }
};
</script>

<style scoped>
input {
  width: 90%;
}
</style>
