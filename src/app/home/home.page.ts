import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { TodoItem } from '../model/todo-item.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public todoList : TodoItem[];

  constructor(todoService: TodoService) {
    this.todoList = todoService.todoList;
  }

  public edit(index: number) {
    //TODO pop-up to edit
  }

}
