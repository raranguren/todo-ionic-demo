import { Action, createReducer, on } from '@ngrx/store';
import * as HomePageActions from '../state/home-page.actions';
import { TodoItem } from '../model/todo-item.model';

export const todoFeatureKey = 'todo';

export interface State {
    todoList: TodoItem[];
    loading: boolean;
}

export const initialState: State = {
    todoList: [],
    loading: false,
}

export const todoReducer = createReducer(
    initialState,
    on(HomePageActions.createTask, (state, { description } ) => 
        ({ todoList: [...state.todoList, new TodoItem(description)] , loading: false})),
    on(HomePageActions.deleteAllTasks, state => ( initialState )),
    on(HomePageActions.toggleTask, (state, {id}) => 
        ({ todoList: updatedTodoList(state.todoList, id, state.todoList[id].description, !state.todoList[id].completed )
            , loading: false })),
    on(HomePageActions.updateTask, (state, {id, description}) => 
    ({ todoList: updatedTodoList(state.todoList, id, description, state.todoList[id].completed ) 
        , loading: false})),
  );

const updatedTodoList = (list: TodoItem[], id: number, description: string, completed: boolean) => {
    let item = new TodoItem(description);
    item.completed = completed;
    return [...list.slice(0, id), item, ...list.slice(id+1)];
};