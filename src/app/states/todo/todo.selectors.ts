/**
 * Provides selectors for the todo feature state.
 */
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TodoState } from './todo.state';

/**
 * Selects the 'todo' feature state.
 * @param {TodoState} state - The root feature state.
 * @returns {TodoState} The 'todo' feature state.
 */
export const selectTodoFeature = createFeatureSelector<TodoState>('todo');

/**
 * Selects the todo list from the 'todo' feature state.
 * @param {TodoState} state - The 'todo' feature state.
 * @returns {any} The todo list.
 * @description This selector retrieves the todo list from the 'todo' feature state using the 'createSelector' function from '@ngrx/store'.
 */
export const selectTodoList = createSelector(
  selectTodoFeature,
  (state: TodoState) => state.todoList
);

/**
 * Selects the status of the todo list from the 'todo' feature state
 * @param {TodoState} state - the 'todo' feature state.
 * @returns {any} The status as listed in enum TodoListStatus
 */
export const selectTodoStatus = createSelector(
  selectTodoFeature,
  (state: TodoState) => state.status
);