import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TodoState } from './todo.state';

/**
 * A selector that returns the entire to-do feature state.
 */
export const selectTodoFeature = createFeatureSelector<TodoState>('todo');

/**
 * A selector that returns only the list of to-do items from the state.
 */
export const selectTodoList = createSelector(
  selectTodoFeature,
  (state: TodoState) => state.todoList
);

/**
 * A selector that returns only the status of the to-do list from the state.
 */
export const selectTodoStatus = createSelector(
  selectTodoFeature,
  (state: TodoState) => state.status
);
