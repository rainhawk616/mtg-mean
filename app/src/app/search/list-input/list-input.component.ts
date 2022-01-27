import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, ValidationErrors, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { distinctUntilChanged, map, Observable, startWith, Subject } from 'rxjs';

@Component({
  selector: 'app-list-input[description][placeholder][possibleValues]',
  templateUrl: './list-input.component.html',
  styleUrls: ['./list-input.component.scss']
})
export class ListInputComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @Input() description!:string;
  @Input() placeholder!:string;
  @Input() possibleValues!:string[];
  filteredValues: Observable<string[]>;
  selectedValues: string[] = [];
  valueCtrl = new FormControl();
  @ViewChild('valueInput') valueInput!: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredValues = this.valueCtrl.valueChanges.pipe(
      startWith(null),
      map((value: string | null) => (value ? this._filter(value) : this.possibleValues.slice())),
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim().toLowerCase();

    const matchingIndex = this.possibleValues.map(value=>value.toLowerCase()).indexOf(value);

    // Add our value
    if (~matchingIndex) {
      this.selectedValues.push(this.possibleValues[matchingIndex]);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.valueCtrl.setValue(null);
  }

  remove(value: string): void {
    const index = this.selectedValues.indexOf(value);

    if (index >= 0) {
      this.selectedValues.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const value = (event.option.viewValue || '').trim().toLowerCase();

    const matchingIndex = this.possibleValues.map(value=>value.toLowerCase()).indexOf(value);

    // Add our value
    if (~matchingIndex) {
      this.selectedValues.push(this.possibleValues[matchingIndex]);
      this.valueInput.nativeElement.value = '';
      this.valueCtrl.setValue(null);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.possibleValues.filter(value => value.toLowerCase().includes(filterValue));
  }

}
