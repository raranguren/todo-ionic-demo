import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { todoReducer } from './todo.reducer';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  todo: todoReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
