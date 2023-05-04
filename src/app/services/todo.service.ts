import { Injectable } from '@angular/core';
import {
  Firestore,
  DocumentData,
  setDoc,
  doc,
  DocumentReference,
  getDoc,
} from '@angular/fire/firestore';
import { Observable, from, map, of } from 'rxjs';

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
  /** Reference to the Firestore document instance
   * that contains the tasks as a map
   */
  private todoDocumentRef: DocumentReference<DocumentData>;

  /**
   * @param firestore is the Firestore object initialized in app.module.ts
   */
  constructor(private firestore: Firestore) {
    this.todoDocumentRef = doc(this.firestore, 'todo/todo');
  }

  /**
   * Read todo list from the database
   * @returns an observable that produces an array or returns throwError(error)
   */
  getTodoList(): Observable<TodoItem[]> {
    return from(getDoc(this.todoDocumentRef)).pipe(
      map((documentSnapshot) => {
        if (!documentSnapshot.exists()) return [];
        const data = documentSnapshot.data()['tasks'];
        if (!data) return [];
        return data.map(
          (task: any) => new TodoItem(task.description, task.completed)
        );
      })
    );
  }

  /**
   * Write the todo list on the database
   * @returns an empty observable when finished, or returns throwError(error)
   */
  saveTodoList(todoList: TodoItem[]) {
    return of(
      setDoc(this.todoDocumentRef, {
        tasks: todoList.map(({ description, completed }) => ({
          description,
          completed,
        })),
      })
    );
  }
}
