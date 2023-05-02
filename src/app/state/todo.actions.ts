import { createAction, props } from '@ngrx/store';
import { TodoItem } from '../model/todo-item.model';

/**
 * Actions for managing tasks in the Todo page.
 */
export const deleteAllTasks = createAction('[Todo] Delete all tasks');

/**
 * Action for creating a new task.
 * @param {string} description - The description of the new task.
 */
export const createTask = createAction(
  '[Todo] Create new task',
  props<{ description: string }>()
);

/**
 * Action for updating the text of an existing task.
 * @param {number} id - The ID of the task to update.
 * @param {string} description - The new description of the task.
 */
export const updateTask = createAction(
  '[Todo] Update task text',
  props<{ id: number; description: string }>()
);

/**
 * Action for toggling the completed state of a task.
 * @param {number} id - The ID of the task to toggle.
 */
export const toggleTask = createAction(
  '[Todo] Toggle completed',
  props<{ id: number }>()
);

/**
 * Action for fetching the list of tasks from the database.
 */
export const fetchTasks = createAction('[Todo] Fetch tasks');

/**
 * Action for setting the list of tasks in the store after they have been fetched.
 * @param {TodoItem[]} todoList - The list of tasks to set in the store.
 */
export const setTodoList = createAction(
  '[Todo] Set todo list',
  props<{ todoList: TodoItem[] }>()
);

/**
 * Action for saving the list of tasks to the database.
 */
export const saveTodoList = createAction('[Todo] Save todo list');

/**
 * Action for indicating that the list of tasks has been successfully saved to the database.
 */
export const saveTodoListSuccess = createAction(
  '[Todo] Save todo list success'
);

/**
 * Action for indicating that there was an error while saving the list of tasks to the database.
 * @param {any} error - The error that occurred while saving the tasks.
 */
export const saveTodoListError = createAction(
  '[Todo] Save todo list error',
  props<{ error: any }>()
);
