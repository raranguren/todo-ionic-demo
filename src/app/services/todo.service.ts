import { Injectable } from '@angular/core';
import { TodoItem } from '../models/todo-item.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // temporarily hardcoded
  private todoList : TodoItem[] = [
    new TodoItem("Comprar verduras del mercado"),
    new TodoItem("Lavar la furgoneta"),
  ];
  private todoList$ = new BehaviorSubject(this.todoList);

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

  public getAll() {
    return this.todoList$.asObservable();
  }

}
