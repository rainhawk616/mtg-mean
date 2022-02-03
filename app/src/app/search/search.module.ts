import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SearchComponent } from './search.component';
import { LiveInputComponent } from './live-input/live-input.component';
import { ListInputComponent } from './list-input/list-input.component';
import { TypeSearchComponent } from './type-search/type-search.component';

@NgModule({
  declarations: [
    LiveInputComponent,
    ListInputComponent,
    SearchComponent,
    TypeSearchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    ReactiveFormsModule,
  ]
})
export class SearchModule { }
