import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SearchComponent } from './search.component';
import { LiveInputComponent } from './live-input/live-input.component';

@NgModule({
  declarations: [
    SearchComponent,
    LiveInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatSidenavModule,
    ReactiveFormsModule,
  ]
})
export class SearchModule { }
