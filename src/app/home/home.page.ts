import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { TodoItem } from '../model/todo-item.model';
import { TodoListViewModel } from '../viewmodel/todo-list.viewmodel';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public viewModel = new TodoListViewModel();
  public todoService : TodoService;

  constructor(todoService: TodoService) {
    this.todoService = todoService;
    this.viewModel.list = todoService.todoList;
  }

  public openEditDialog(index: number) {
    let item = this.todoService.getById(index);
    if (item) {
      this.viewModel.editMode = true;
      this.viewModel.editingIndex = index;
      this.viewModel.editingText = item.description;  
    }
  }

  public openCreateDialog() {
    this.viewModel.createMode = true;
    this.viewModel.editingText = "";
  }

  public closeDialog() {
    this.viewModel.editMode = false;
    this.viewModel.createMode = false;
  }

  public saveEdit() {
    this.todoService.update(
      this.viewModel.editingIndex!, 
      this.viewModel.editingText);
    this.closeDialog();
  }

  public saveCreate() {
    this.todoService.add(
      this.viewModel.editingText
    );
    this.closeDialog();
  }

  public deleteAll() {
    //TODO confirmation pop-up
    this.todoService.deleteAll();
  }

}
