import { Action, createReducer, on } from '@ngrx/store';
import * as HomePageActions from '../actions/home-page.actions';
import { TodoItem } from '../model/todo-item.model';

export const todoFeatureKey = 'todo';

export interface State {
    todoList: TodoItem[];
}

export const initialState: State = {
    todoList: [],
}

export const todoReducer = createReducer(
    initialState,
    on(HomePageActions.createTask, (state, { description } ) => 
        ({ todoList: [...state.todoList, new TodoItem(description)] })),
    on(HomePageActions.deleteAllTasks, state => ( initialState )),
    on(HomePageActions.toggleTask, (state, {id}) => 
        ({ todoList: updatedTodoList(state.todoList, id, state.todoList[id].description, !state.todoList[id].completed ) })),
    on(HomePageActions.updateTask, (state, {id, description}) => 
    ({ todoList: updatedTodoList(state.todoList, id, description, state.todoList[id].completed ) })),
  );

const updatedTodoList = (list: TodoItem[], id: number, description: string, completed: boolean) => {
    let item = new TodoItem(description);
    item.completed = completed;
    return [...list.slice(0, id), item, ...list.slice(id+1)];
};