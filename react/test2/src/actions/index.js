import { ADD_TODO } from '../constants/action-types';

export function addTodo(todo) {
  return { type: ADD_TODO, payload: todo };
}
