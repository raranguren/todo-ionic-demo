import { Action, createReducer, on } from '@ngrx/store';
import * as HomePageActions from './todo.actions';
import { TodoItem } from '../model/todo-item.model';

/**
 * Represents the feature key for the to-do list.
 */
export const todoFeatureKey = 'todo';

/**
 * Represents the state of the to-do list.
 */
export interface State {
    /** The list of to-do items. */
    todoList: TodoItem[];
    /** Indicates whether the to-do list is currently being loaded. */
    loading: boolean;
}

/**
 * Represents the initial state of the to-do list.
 */
export const initialState: State = {
    todoList: [],
    loading: false,
}

/**
 * Represents the reducer function for the to-do list.
 */
export const todoReducer = createReducer(
    initialState,

    /**
     * Updates the state to include a new to-do item based on the given description.
     * @param state - The current state of the to-do list.
     * @param description - The description of the new to-do item.
     * @returns The updated state of the to-do list.
     */
    on(HomePageActions.createTask, (state, { description } ) => ({
        ...state,
        todoList: [
          ...state.todoList,
          new TodoItem(description)
        ],
        loading: false
      })),

    /**
     * Updates the state to clear all items in the to-do list.
     * @param state - The current state of the to-do list.
     * @returns The updated state of the to-do list.
     */
    on(HomePageActions.deleteAllTasks, state => ( initialState )),
    
    /**
     * Updates the state to toggle the completed status of the item with the given ID.
     * @param state - The current state of the to-do list.
     * @param id - The ID of the to-do item to be updated.
     * @returns The updated state of the to-do list.
     */
    on(HomePageActions.toggleTask, (state, { id }) => {
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
          loading: false
        }
      }),
    
    /**
     * Updates the state to change the description of the item with the given ID.
     * @param state - The current state of the to-do list.
     * @param id - The ID of the to-do item to be updated.
     * @param description - The new description of the to-do item.
     * @returns The updated state of the to-do list.
     */
    on(HomePageActions.updateTask, (state, {id, description}: { id: number, description: string }) => 
    ({ todoList: updatedTodoList(state.todoList, id, description, state.todoList[id].completed ) 
        , loading: false})),
);

/**
 * Returns a new list of to-do items that has the item with the given ID updated.
 * @param list - The current list of to-do items.
 * @param id - The ID of the to-do item to be updated.
 * @param description - The new description of the to-do item.
 * @param completed - The new completion status of the to-do item.
 * @returns A new list of to-do items with the item with the given ID updated.
 */
const updatedTodoList = (list: TodoItem[], id: number, description: string, completed: boolean): TodoItem[] => {
    let item = new TodoItem(description);
    item.completed = completed;
    return [...list.slice(0, id), item, ...list.slice(id+1)];
};
