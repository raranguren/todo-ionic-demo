import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { createTask, deleteAllTasks, updateTask } from 'src/app/state/home-page.actions';
import { selectTodoList } from 'src/app/state/todo.selectors';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  todoList$ = this.store.select(selectTodoList);

  // Component state
  editMode = false;
  createMode = false;
  editingIndex? : number;
  editingText = "";

  constructor(private store: Store) { }

  public openEditDialog(index: number, text: string) {
    this.editMode = true;
    this.editingIndex = index;
    this.editingText = text;
  }

  public openCreateDialog() {
    this.createMode = true;
    this.editingText = "";
  }

  public closeDialog() {
    this.editMode = false;
    this.createMode = false;
  }

  public saveEdit() {
    this.store.dispatch(updateTask({id: this.editingIndex!, description: this.editingText}));
    this.closeDialog();
  }

  public saveCreate() {
    this.store.dispatch(createTask({description: this.editingText}));
    this.closeDialog();
  }

  public deleteAll() {
    this.store.dispatch(deleteAllTasks());
  }

}
