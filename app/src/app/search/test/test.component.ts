import { Component, EventEmitter, Input, OnInit, Output, Query } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, Observable, startWith, tap } from 'rxjs';
import { DataTypes } from 'src/app/models/data-types.model';
import { QueryClause } from 'src/app/models/query-clause.model';

@Component({
  selector: 'app-test[dataTypes]',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  @Input() dataTypes!: DataTypes;

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
