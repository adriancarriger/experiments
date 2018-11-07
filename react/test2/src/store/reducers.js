import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from './action-types';

const initialState = { todos: [], todoId: 0 };

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      const todoId = state.todoId + 1;
      return {
        ...state,
        todoId,
        todos: [...state.todos, { id: todoId, text: action.payload, complete: false }]
      };
    case REMOVE_TODO:
      return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) };
    case TOGGLE_TODO:
      const todos = state.todos.map(todo => {
        if (todo.id === action.payload) {
          todo.complete = !todo.complete;
        }

        return todo;
      });

      return { ...state, todos };
    default:
      return state;
  }
};
