import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

import { TodoItem } from '../models/todo-item.model';

/**
 * This service represents the Data layer for the todo-list
 * It's responsibility is to provide access to the Firebase database for the feature
 * and it should only be called by the state effects
 */
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  /**
   * @param firestore is the Firestore object initialized in app.module.ts
   */
  constructor(private firestore: Firestore) {}

  /**
   * Read todo list from the database
   * @returns an observable that produces an array or returns throwError(error) 
   */
  getTodoList(): Observable<TodoItem[]> {
    console.log('[TodoService] getTodoList()');
    // TODO use Firestore to read
    return of([
      {'description': 'Conectar app a firebase', 'completed': false},
      {'description': 'Subir tareas de forma síncrona', 'completed': false},
      {'description': 'Refactorizar con redux', 'completed': true},
      {'description': 'Separar el state de Todo y Auth', 'completed': false},
      {'description': 'Añadir router con AuthPage', 'completed': false},
      {'description': 'Auth con Firebase', 'completed': false},
    ]);
  }

  /**
   * Write the todo list on the database
   * @returns an empty observable when finished, or returns throwError(error) 
   */
  saveTodoList(todoList : TodoItem[]) {
    console.log('[TodoService] saveTodoList() - array size: ' + todoList.length);
    // TODO use Firestore to save
    return of(null);
  }
  
}
