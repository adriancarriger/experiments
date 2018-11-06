<template>
  <div id="app" class="container">
    <h1>Shopping list</h1>
    <todo-input @newTodo="onNewTodo"></todo-input>
    <todo-list @removeTodo="onRemoveTodo" :todos="todos" @toggleTodo="onToggleTodo"></todo-list>
    <div v-if="todos.length === 0 || completedTodos !== 0">{{completedTodos}} todo{{completedTodos !== 1 ? 's' : ''}} left</div>
    <div v-else>You did it! 🙋</div>
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue';
import TodoInput from './components/TodoInput.vue';

export default {
  name: 'app',
  components: {
    TodoList,
    TodoInput
  },
  computed: {
    completedTodos() {
      return this.todos.reduce((p, c) => {
        if (!c.completed) {
          p++;
        }

        return p;
      }, 0);
    }
  },
  methods: {
    onRemoveTodo(id) {
      const index = this.todos.findIndex(todo => todo.id === id);
      this.todos.splice(index, 1);
      this.saveState();
    },
    onToggleTodo(id) {
      const index = this.todos.findIndex(todo => todo.id === id);
      this.todos[index].completed = !this.todos[index].completed;
      this.$nextTick(() => this.saveState());
    },
    onNewTodo({ event, text }) {
      event.preventDefault();
      if (!text) {
        return;
      }
      ++this.id;
      localStorage.setItem('id', `${this.id}`);
      const todo = { text, completed: false, id: this.id };
      this.todos.push(todo);
      this.saveState();
    },
    saveState() {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    },
    getState() {
      this.id = Number(localStorage.getItem('id')) || 0;
      this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    }
  },
  mounted() {
    this.getState();
  },
  data() {
    return {
      id: 0,
      todos: []
    };
  }
};
</script>

<style>
* {
  box-sizing: content-box;
}

:focus {
  outline: 0;
}

html {
  height: 100%;
}

body {
  min-height: 100%;
  font: 400 24px/1.3 --apple-system, BlinkMacSystemFont, Helvetica, sans-serif;
  /* color: white;
  background: black; */
}

input,
button {
  border: 0;
  color: inherit;
  font: inherit;
}

.container {
  width: 90%;
  max-width: 20em;
  margin: 0 auto;
}

input {
  border: 1px solid black;
  padding: 0.5em 1em;
}
</style>
