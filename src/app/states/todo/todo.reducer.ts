import { createReducer, on } from '@ngrx/store';
import * as TodoActions from './todo.actions';
import { TodoItem } from '../../models/todo-item.model';
import { TodoState, TodoStatus } from './todo.state';

/** Represents the feature key for the to-do list. */
export const todoFeatureKey = 'todo';

/** Initial state of the to-do list. */
export const initialState: TodoState = {
  todoList: [],
  status: TodoStatus.Loaded,
};

/** Reducers that handle each action */
export const todoReducer = createReducer(
  initialState,

  /**
   * Updates the state to include a new to-do item based on the given description.
   * @param state - The current state of the to-do list.
   * @param description - The description of the new to-do item.
   * @returns The updated state of the to-do list.
   */
  on(TodoActions.createTask, (state, { description }) => ({
    ...state,
    todoList: [...state.todoList, new TodoItem(description)],
  })),

  /**
   * Updates the state to clear all items in the to-do list.
   * @param state - The current state of the to-do list.
   * @returns The updated state of the to-do list.
   */
  on(TodoActions.deleteAllTasks, (state) => ({
    ...state,
    todoList: initialState.todoList,
  })),

  /**
   * Updates the state to toggle the completed status of the item with the given ID.
   * @param state - The current state of the to-do list.
   * @param id - The ID of the to-do item to be updated.
   * @returns The updated state of the to-do list.
   */
  on(TodoActions.toggleTask, (state, { id }) => {
    const updatedTodoList = state.todoList.map((item, index) => {
      if (index === id) {
        return new TodoItem(item.description, !item.completed);
      } else {
        return item;
      }
    });

    return {
      ...state,
      todoList: updatedTodoList,
    };
  }),

  /**
   * Updates the state to change the description of the item with the given ID.
   * @param state - The current state of the to-do list.
   * @param id - The ID of the to-do item to be updated.
   * @param description - The new description of the to-do item.
   * @returns The updated state of the to-do list.
   */
  on(
    TodoActions.updateTask,
    (state, { id, description }: { id: number; description: string }) => {
      const updatedTodoList = state.todoList.map((item, index) => {
        if (index === id) {
          return new TodoItem(description, item.completed);
        } else {
          return item;
        }
      });

      return {
        ...state,
        todoList: updatedTodoList,
      };
    }
  ),

  /**
   * Sets the status to 'Fetching' when the fetchTasks action is dispatched.
   * @param state - The current state of the to-do list.
   * @returns The updated state of the to-do list.
   */
  on(TodoActions.fetchTasks, (state) => ({
    ...state,
    status: TodoStatus.Fetching,
  })),

  /**
   * Sets the todo list to the specified value and the status to 'Loaded'
   * when the setTodoList action is dispatched.
   * @param state - The current state of the to-do list.
   * @param todoList - The list of tasks to set in the store.
   * @returns The updated state of the to-do list.
   */
  on(TodoActions.setTodoList, (state, { todoList }) => ({
    ...state,
    todoList,
    status: TodoStatus.Loaded,
  })),

  /**
   * Sets the status to 'Saving' when the saveTodoList action is dispatched.
   * @param state - The current state of the to-do list.
   * @returns The updated state of the to-do list.
   */
  on(TodoActions.saveTodoList, (state) => ({
    ...state,
    status: TodoStatus.Saving,
  })),

  /**
   * Sets the status to 'Loaded' when the saveTodoListSuccess action is dispatched.
   * @param state - The current state of the to-do list.
   * @returns The updated state of the to-do list.
   */
  on(TodoActions.saveTodoListSuccess, (state) => ({
    ...state,
    status: TodoStatus.Loaded,
  })),

  /**
   * Sets the status to 'Error' and logs the error when the saveTodoListError action is dispatched.
   * @param state - The current state of the to-do list.
   * @param error - The error that occurred while saving the tasks.
   * @returns The updated state of the to-do list.
   */
  on(TodoActions.saveTodoListError, (state, { error }) => {
    console.error(error);
    return {
      ...state,
      status: TodoStatus.Error,
    };
  })
);
