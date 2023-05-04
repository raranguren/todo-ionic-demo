import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';

import * as TodoActions from './todo.actions';
import { TodoService } from 'src/app/services/todo.service';
import { selectTodoList } from './todo.selectors';
import { Store } from '@ngrx/store';

/**
 * Handles side effects for the Todo state.
 */
@Injectable()
export class TodoEffects {
    /**
   * @param {Actions} actions$ - Observable stream of actions.
   * @param {TodoService} todoService - Service to manage todo list.
   * @param {Store} store - The ngrx store instance.
   */
  constructor(
    private actions$: Actions,
    private todoService: TodoService,
    private store: Store
  ) {}

  /**
   * Begins the save process of the todo list when the save action is called,
   * retrieving the current todolist and starting a new action with it
   * @type {Observable<Action>}
   */
  beginSaveTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.saveTodoList),
      withLatestFrom(this.store.select(selectTodoList)),
      map(([_, todoList]) => TodoActions.executeSaveTodoList({ todoList }))
    )
  );

  /**
   * Saves the todo list and handles success or error.
   * @type {Observable<Action>}
   */
  saveTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.executeSaveTodoList),
      switchMap(({ todoList }) =>
        this.todoService.saveTodoList(todoList).pipe(
          map(() => TodoActions.saveTodoListSuccess()),
          catchError(error => of(TodoActions.saveTodoListError({ error })))
        )
      )
    )
  );

  fetchTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.fetchTasks),
      switchMap(() =>
        this.todoService.getTodoList().pipe(
          map((todoList) => TodoActions.setTodoList({ todoList: todoList })),
          catchError((error) => of(TodoActions.fetchTodoListError({ error })))
        )
      )
    )
  );
}
