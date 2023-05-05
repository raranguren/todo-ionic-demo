import { Type, Expose, plainToClass } from 'class-transformer';
import { TodoItem } from './todo-item.model';

/**
 * Represents a Firestore document containing a list of todo items.
 * 
 * @property {TodoItem[]} tasks - An array of todo items.
 */
export class TodoDocument {
  @Expose()
  tasks: TodoItem[];

  constructor(todoList : TodoItem[] = []) {
    this.tasks = todoList;
  }

}