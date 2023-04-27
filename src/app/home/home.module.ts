import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { StoreModule } from '@ngrx/store';
import { todoFeatureKey, todoReducer } from '../reducers/todo.reducer';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    StoreModule.forFeature(todoFeatureKey, todoReducer),
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
