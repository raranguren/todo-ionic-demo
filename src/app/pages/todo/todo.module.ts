import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { TodoPageRoutingModule } from './todo-routing.module';
import { StoreModule } from '@ngrx/store';
import { todoFeatureKey, todoReducer } from 'src/app/states/todo/todo.reducer';
import { TodoPage } from './todo.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodoPageRoutingModule,
    StoreModule.forFeature(todoFeatureKey, todoReducer),
  ],
  declarations: [TodoPage]
})
export class TodoPageModule {}
