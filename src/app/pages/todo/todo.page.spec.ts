import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TodoPage } from './todo.page';
import { StoreModule } from '@ngrx/store';

describe('TodoPage', () => {
  let component: TodoPage;
  let fixture: ComponentFixture<TodoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoPage],
      imports: [
          IonicModule.forRoot(),
          StoreModule.forRoot({}, {}),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
