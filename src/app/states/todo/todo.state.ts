import { TodoItem } from "src/app/models/todo-item.model";

/**
 * Represents the key of the todo feature state.
 */
export const todoFeatureKey = 'todo';

/**
 * Represents the state of the todo feature.
 */
export interface TodoState {
  /**
   * The list of todo items.
   */
  todoList: TodoItem[];
  /**
   * The status of the todo list, as described by the TodoStatus enum.
   * Used in the TodoComponent to display different content depending on the status of the todo list.
   */
  status: TodoStatus;
}

/**
 * Represents the status of the todo list.
 * - Fetching: The document is being retrieved from the cloud.
 * - Loaded: The document has been retrieved from the cloud.
 * - Saving: The document is being saved to the cloud.
 * - Error: An error occurred while retrieving or saving the document.
 */
export enum TodoStatus {
  Fetching,
  Loaded,
  Saving,
  Error,
}

/**
 * Represents the initial state of the todo feature.
 * The todo list is initially empty and the status is 'Loaded'.
 */
export const initialState: TodoState = {
  todoList: [],
  status: TodoStatus.Loaded,
};