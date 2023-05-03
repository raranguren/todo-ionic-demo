import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { todoReducer } from './todo/todo.reducer';

/**
 * Represents the model that is common to all features.
 * Each feature has a reducer that exports their own State interface as needed.
 */
export interface State {

}

/**
 * Represents the map of action reducers for each feature of the application.
 */
export const reducers: ActionReducerMap<State> = {
  todo: todoReducer,
};

/**
 * Represents an array of meta reducers to enhance the behavior of action reducers.
 * This array is empty in production mode.
 * @type {MetaReducer<State>[]}
 */
export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
