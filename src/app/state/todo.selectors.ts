import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from './todo.reducer';

export const selectTodoFeature = createFeatureSelector<State>('todo');

export const selectTodoList = createSelector(
  selectTodoFeature,
  (state: State) => state.todoList
);