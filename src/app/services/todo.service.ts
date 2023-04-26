import { Injectable } from '@angular/core';
import { TodoItem } from '../model/todo-item.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // temporarily hardcoded
  public todoList : TodoItem[] = [
    new TodoItem("Comprar verduras del mercado"),
    new TodoItem("Lavar la furgoneta"),
  ];

  constructor() { }

  public deleteAll() {
    this.todoList = [];
  }

  public add(description: string) {
    this.todoList.unshift(new TodoItem(description));
  }

  public update(id: number, description: string) {
    if (id >= this.todoList.length) return;
    this.todoList[id].description = description;
  }

}
