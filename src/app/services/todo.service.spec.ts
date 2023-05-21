import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { Firestore, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FirebaseApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment.test';
import { Store, StoreModule } from '@ngrx/store';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}, {}),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
      ],
    });
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
