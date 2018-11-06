<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <label>
        <input type="checkbox" v-model="todo.complete" @change="$emit('toggleTodo', todo.id)" />
        <span>{{ todo.text }}</span>
      </label>
      <button class="close" @click="$emit('removeTodo', todo.id)">x</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'todo-list',
  props: ['todos']
};
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
li {
  position: relative;
  width: 100%;
  padding: 1em 0 0.5em 0;
  border-bottom: 1px solid black;
}
span {
  user-select: none;
}
.close {
  position: absolute;
  right: 0;
  opacity: 0;
}
li:hover .close {
  opacity: 1;
}
</style>
