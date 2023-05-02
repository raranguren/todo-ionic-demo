import { createAction, props } from '@ngrx/store';

/**
 * Actions for managing tasks in the home page.
 */
export const deleteAllTasks = createAction(
  '[Home Page] Delete all tasks'
);

/**
 * Action for creating a new task.
 * @param {string} description - The description of the new task.
 */
export const createTask = createAction(
  '[Home Page] Create new task',
  props<{ description: string }>()
);

/**
 * Action for updating the text of an existing task.
 * @param {number} id - The ID of the task to update.
 * @param {string} description - The new description of the task.
 */
export const updateTask = createAction(
  '[Home Page] Update task text',
  props<{ id: number, description: string }>()
);

/**
 * Action for toggling the completed state of a task.
 * @param {number} id - The ID of the task to toggle.
 */
export const toggleTask = createAction(
  '[Home page] Toggle completed',
  props<{ id: number }>()
);

