import { createAction, props } from '@ngrx/store';

export const deleteAllTasks = createAction('[Home Page] Delete all tasks');
export const createTask = createAction('[Home Page] Create new task', props<{description: string}>());
export const updateTask = createAction('[Home Page] Update task text', props<{id: number, description: string}>());
export const toggleTask = createAction('[Home page] Toggle completed', props<{id: number}>())
