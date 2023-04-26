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
    this.todoList.splice(0,this.todoList.length);
  }

  public add(description: string) {
    this.todoList.push(new TodoItem(description));
  }

  public update(id: number, description: string) {
    if (id >= this.todoList.length || id < 0) return;
    this.todoList[id].description = description;
  }

  public getById(id: number) : TodoItem|null {
    if (id >= this.todoList.length || id < 0) return null;
    return this.todoList[id];
  }

}
