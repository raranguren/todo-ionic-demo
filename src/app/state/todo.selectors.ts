/**
 * Provides selectors for the todo feature state.
 */
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from './todo.reducer';

/**
 * Selects the 'todo' feature state.
 * @param {State} state - The root feature state.
 * @returns {State} The 'todo' feature state.
 */
export const selectTodoFeature = createFeatureSelector<State>('todo');

/**
 * Selects the todo list from the 'todo' feature state.
 * @param {State} state - The 'todo' feature state.
 * @returns {any} The todo list.
 * @description This selector retrieves the todo list from the 'todo' feature state using the 'createSelector' function from '@ngrx/store'.
 */
export const selectTodoList = createSelector(
  selectTodoFeature,
  (state: State) => state.todoList
);
