import { Injectable } from '@angular/core';
import { Observable, from, map, of } from 'rxjs';

import * as fire from '@angular/fire/firestore';
import * as serializer from 'class-transformer';

import { TodoItem } from '../models/todo-item.model';
import { TodoDocument } from '../models/todo-document.model';

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
  private todoDocumentRef: fire.DocumentReference<fire.DocumentData>;

  /**
   * @param firestore is the Firestore object initialized in app.module.ts
   */
  constructor(private firestore: fire.Firestore) {
    this.todoDocumentRef = fire.doc(this.firestore, 'todo/todo');
  }

  /**
   * Read todo list from the database
   * @returns an observable that produces an array or returns throwError(error)
   */
  getTodoList(): Observable<TodoItem[]> {
    return from(fire.getDoc(this.todoDocumentRef)).pipe(
      map((documentSnapshot) => {
        if (!documentSnapshot.exists()) return [];
        const data = documentSnapshot.data();
        if (!data) return [];
        const todoDocument = serializer.plainToInstance(TodoDocument, data);
        return todoDocument.tasks;
      })
    );
  }

  /**
   * Write the todo list on the database
   * @returns an empty observable when finished, or returns throwError(error)
   */
  saveTodoList(todoList: TodoItem[]) {
    return of(
      fire.setDoc(
        this.todoDocumentRef,
        serializer.instanceToPlain(new TodoDocument(todoList))
      )
    );
  }
}
