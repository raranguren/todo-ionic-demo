import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TodoItem } from 'src/app/model/todo-item.model';
import { createTask, deleteAllTasks, toggleTask, updateTask, saveTodoList, fetchTasks } from 'src/app/state/todo.actions';
import { TodoStatus } from 'src/app/state/todo.reducer';
import { selectTodoList, selectTodoIsSaving, selectTodoStatus } from 'src/app/state/todo.selectors';

/**
 * The view-model for the todo page, responsible for managing the todo list state.
 * Uses the NgRx library to manage the application State in a reactive way.
 * Uses selectors to obtain a stream of the relevant parts of the State.
 * Uses dispatch actions to modify the State in an immutable way.
 */
@Component({
  selector: 'app-todo',
  templateUrl: 'todo.page.html',
  styleUrls: ['todo.page.scss'],
})
export class TodoPage {
  /** Values for the status$ observable.
   * Example of usage in HTML:  *ngIf="(status$ | async) == STATUS_IS_LOADED"
   */
  STATUS_IS_SAVING = TodoStatus.Saving;
  STATUS_IS_FETCHING = TodoStatus.Fetching;
  STATUS_IS_LOADED = TodoStatus.Loaded;
  STATUS_IS_ERROR = TodoStatus.Error;

  /** A stream indicating the current status of the Todo list */
  status$: Observable<TodoStatus> = this.store.select(selectTodoStatus);
  /** A stream of the current todo list value in the State */
  todoList$: Observable<TodoItem[]> = this.store.select(selectTodoList);

  /** Whether the component is in edit mode: modifying a task. */
  editMode = false;
  /** Whether the component is in create mode: adding a task. */
  createMode = false;
  /** The index of the task being edited. */
  editingIndex?: number;
  /** The text of the task being edited or created. */
  editingText = '';

  constructor(private store: Store) {}

  /**
   * When the view is loaded, it starts fetching
   */
  ngOnInit() {
    this.startFetching();
  }

  /**
   * Opens the edit dialog for a task.
   * @param {number} index - The index of the task to edit.
   * @param {string} text - The text of the task to edit.
   */
  public openEditDialog(index: number, text: string) {
    this.editMode = true;
    this.editingIndex = index;
    this.editingText = text;
  }

  /** Opens the create dialog. */
  public openCreateDialog() {
    this.createMode = true;
    this.editingText = '';
  }

  /** Closes any open dialog. */
  public closeDialog() {
    this.editMode = false;
    this.createMode = false;
  }

  /** Saves the edited task to the State using a dispatch action. */
  public saveEdit() {
    this.store.dispatch(
      updateTask({ id: this.editingIndex!, description: this.editingText })
    );
    this.closeDialog();
  }

  /** Saves the newly created task to the State using a dispatch action. */
  public saveCreate() {
    this.store.dispatch(createTask({ description: this.editingText }));
    this.closeDialog();
  }

  /** Deletes all tasks from the State using a dispatch action. */
  public deleteAll() {
    this.store.dispatch(deleteAllTasks());
  }

  /**
   * Toggles the completed status of a task in the State using a dispatch action.
   * @param {number} id - The id of the task to toggle.
   */
  public toggle(id: number) {
    this.store.dispatch(toggleTask({ id: id }));
  }

  /**
   * Starts saving the changes to the database
   */
  public saveToDatabase() {
    this.store.dispatch(saveTodoList());
  }

  /**
   * When an error happens, there is the option to retry
   * The logic for now is that it simply restarts the view and starts fetching
   */
  retryAfterError() {
    this.startFetching();
  }

  /**
   * Starts fetching the list from the database
   */
  startFetching() {
    this.store.dispatch(fetchTasks());
  }
}
