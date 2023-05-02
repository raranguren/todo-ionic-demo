import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { createTask, deleteAllTasks, toggleTask, updateTask } from 'src/app/state/todo.actions';
import { selectTodoList } from 'src/app/state/todo.selectors';

/**
 * The view-model for the HomePage component, responsible for managing the todo list state.
 * Uses the NgRx library to manage the application State in a reactive way.
 * Uses selectors to obtain a stream of the relevant parts of the State.
 * Uses dispatch actions to modify the State in an immutable way.
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  /** A stream of the current todo list value in the State, obtained using a selector. */
  todoList$ = this.store.select(selectTodoList)

  /** Whether the component is in edit mode: modifying a task. */
  editMode = false;
  /** Whether the component is in create mode: adding a task. */
  createMode = false;
  /** The index of the task being edited. */
  editingIndex?: number;
  /** The text of the task being edited or created. */
  editingText = "";

  constructor(private store: Store) { }

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
    this.editingText = "";
  }

  /** Closes any open dialog. */
  public closeDialog() {
    this.editMode = false;
    this.createMode = false;
  }

  /** Saves the edited task to the State using a dispatch action. */
  public saveEdit() {
    this.store.dispatch(updateTask({id: this.editingIndex!, description: this.editingText}));
    this.closeDialog();
  }

  /** Saves the newly created task to the State using a dispatch action. */
  public saveCreate() {
    this.store.dispatch(createTask({description: this.editingText}));
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
    this.store.dispatch(toggleTask({id: id}));
  }

}
