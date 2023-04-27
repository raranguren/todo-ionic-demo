import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TodoItem } from 'src/app/model/todo-item.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  todoList : Observable<TodoItem[]>;

  // Component state
  editMode = false;
  createMode = false;
  editingIndex? : number;
  editingText = "";

  private todoService : TodoService;

  constructor(todoService: TodoService) {
    this.todoService = todoService;
    this.todoList = todoService.getAll();
  }

  public openEditDialog(index: number) {
    let item = this.todoService.getById(index);
    if (item) {
      this.editMode = true;
      this.editingIndex = index;
      this.editingText = item.description;  
    }
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
    this.todoService.update(
      this.editingIndex!, 
      this.editingText);
    this.closeDialog();
  }

  public saveCreate() {
    this.todoService.add(
      this.editingText
    );
    this.closeDialog();
  }

  public deleteAll() {
    this.todoService.deleteAll();
  }

}
