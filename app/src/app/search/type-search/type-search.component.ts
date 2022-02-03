import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, OnInit, Output, Query, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { map, Observable, startWith, tap } from 'rxjs';
import { DataTypes } from 'src/app/models/data-types.model';
import { QueryClause } from 'src/app/models/query-clause.model';

@Component({
  selector: 'app-type-search[dataTypes]',
  templateUrl: './type-search.component.html',
  styleUrls: ['./type-search.component.scss']
})
export class TypeSearchComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  
  @Input() dataTypes!: DataTypes;
  @Input() description!:string;
  @Input() placeholder!:string;

  @Input() supertypes!: QueryClause<string>[];
  @Output() supertypesChange: EventEmitter<QueryClause<string>[]> = new EventEmitter<QueryClause<string>[]>();

  @Input() types!: QueryClause<string>[];
  @Output() typesChange: EventEmitter<QueryClause<string>[]> = new EventEmitter<QueryClause<string>[]>();

  @Input() subtypes!: QueryClause<string>[];
  @Output() subtypesChange: EventEmitter<QueryClause<string>[]> = new EventEmitter<QueryClause<string>[]>();

  valueCtrl = new FormControl();
  filteredSupertypes$: Observable<string[]>;
  filteredTypes$: Observable<string[]>;
  filteredSubtypes$: Observable<string[]>;

  @ViewChild(MatAutocompleteTrigger) autocomplete!: MatAutocompleteTrigger;

  //possibleValues!:{type:string,value:string}[];

  constructor() {
    this.filteredSupertypes$ = this.valueCtrl.valueChanges.pipe(
      startWith(null),
      map((value: string | null) => (value ? this.filterSupertypes(value) : this.dataTypes.card.supertypes.slice())),

    );
    this.filteredTypes$ = this.valueCtrl.valueChanges.pipe(
      startWith(null),
      map((value: string | null) => (value ? this.filterTypes(value) : this.dataTypes.card.types.slice())),

    );
    this.filteredSubtypes$ = this.valueCtrl.valueChanges.pipe(
      startWith(null),
      map((value: string | null) => (value ? this.filterSubtypes(value) : this.dataTypes.card.subtypes.slice())),

    );
  }

  ngOnInit(): void {
  }

  autoCompleteOptionSelected(event: MatAutocompleteSelectedEvent) {
    console.log('autoCompleteOptionSelected');

    const type = event.option.group.label;
    
    if (type === 'Supertypes') {
      this.supertypes.push(new QueryClause<string>(event.option.value));
      this.supertypesChange.emit(this.supertypes);
    }
    else if (type === 'Types') {
      this.types.push(new QueryClause<string>(event.option.value));
      this.typesChange.emit(this.types);
    }
    else if (type === 'Subtypes') {
      this.subtypes.push(new QueryClause<string>(event.option.value));
      this.subtypesChange.emit(this.subtypes);
    }
    this.valueCtrl.setValue(null);
  }

  inputEnd(event:Event) {
    console.log('inputEnd');
    const value = (this.valueCtrl.value || '').trim().toLowerCase();

    let matchingIndex = this.dataTypes.card.supertypes.map(value=>value.toLowerCase()).indexOf(value);
    if (~matchingIndex) {
      this.supertypes.push(new QueryClause<string>(this.dataTypes.card.supertypes[matchingIndex]));
      this.supertypesChange.emit(this.supertypes);
      this.valueCtrl.setValue(null);
      this.autocomplete.closePanel();
      return;
    }

    matchingIndex = this.dataTypes.card.types.map(value=>value.toLowerCase()).indexOf(value);
    if (~matchingIndex) {
      this.types.push(new QueryClause<string>(this.dataTypes.card.types[matchingIndex]));
      this.typesChange.emit(this.types);
      this.valueCtrl.setValue(null);
      this.autocomplete.closePanel();
      return;
    }

    matchingIndex = this.dataTypes.card.subtypes.map(value=>value.toLowerCase()).indexOf(value);
    if (~matchingIndex) {
      this.subtypes.push(new QueryClause<string>(this.dataTypes.card.subtypes[matchingIndex]));
      this.subtypesChange.emit(this.subtypes);
      this.valueCtrl.setValue(null);
      this.autocomplete.closePanel();
      return;
    }
  }

  clear(type: string, index: number) {
    if (type === 'supertype') {
      this.supertypes.splice(index, 1);
      this.supertypesChange.emit(this.supertypes);
    }
    else if (type === 'type') {
      this.types.splice(index, 1);
      this.typesChange.emit(this.types);
    }
    else if (type === 'subtype') {
      this.subtypes.splice(index, 1);
      this.subtypesChange.emit(this.subtypes);
    }
  }

  toggleOperator(type:string, clause: QueryClause<string>) {
    if (clause.operator === 'and') {
      clause.operator = 'or';
    }
    else if (clause.operator === 'or') {
      clause.operator = 'not';
    }
    else if (clause.operator === 'not') {
      clause.operator = 'and';
    }

    if (type === 'supertype') {
      this.supertypesChange.emit(this.supertypes);
    }
    else if (type === 'type') {
      this.typesChange.emit(this.types);
    }
    else if (type === 'subtype') {
      this.subtypesChange.emit(this.subtypes);
    }
  }

  private filterSupertypes(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.dataTypes.card.supertypes.filter(value => value.toLowerCase().includes(filterValue));
  }

  private filterTypes(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.dataTypes.card.types.filter(value => value.toLowerCase().includes(filterValue));
  }

  private filterSubtypes(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.dataTypes.card.subtypes.filter(value => value.toLowerCase().includes(filterValue));
  }
}
