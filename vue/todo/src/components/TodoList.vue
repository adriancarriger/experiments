<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <label>
        <input type="checkbox" v-model="todo.complete" @change="$emit('toggleTodo', todo.id)" />
        <span class="faux-checkbox"></span>
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
  margin-left: 0.6em;
}

.close {
  position: absolute;
  right: 0;
  opacity: 0;
}

li:hover .close {
  opacity: 1;
}

.faux-checkbox {
  position: absolute;
  left: 0;
  background-color: rgb(0, 185, 218);
  width: 1em;
  height: 1em;
  bottom: 0.6em;
  margin: auto;
}

input:checked + .faux-checkbox:after {
  opacity: 1;
}

.faux-checkbox:after {
  content: '';
  width: 0.23em;
  height: 0.8em;
  position: absolute;
  margin: auto;
  left: 0.1em;
  right: 0;
  top: 0;
  bottom: 0.15em;
  border: solid white 3px;
  opacity: 0;
  transform: rotate(45deg);
  border-top: none;
  border-left: none;
}
</style>
