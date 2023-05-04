import { TodoItem } from "src/app/models/todo-item.model";

/** Represents the feature key for the to-do list. */
export const todoFeatureKey = 'todo';

/** Definition of the state for the to-do list feature. */
export interface TodoState {
  /** The list of to-do items. */
  todoList: TodoItem[];
  /** Indicates whether the to-do list is currently being loaded. */
  status: TodoStatus;
}

/** An enumeration of the possible status for a to-do list. */
export enum TodoStatus {
  /** The to-do list is currently being fetched from a data source. */
  Fetching,
  /** Has been successfully loaded from a data source. */
  Loaded,
  /** Currently being saved to a data source. */
  Saving,
  /** An error occurred */
  Error,
}

/** Initial state of the to-do list. */
export const initialState: TodoState = {
  todoList: [],
  status: TodoStatus.Loaded,
};