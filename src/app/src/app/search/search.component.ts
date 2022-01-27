import { Component, OnInit } from '@angular/core';
import { debounceTime, mergeMap, Observable, ReplaySubject, startWith, tap } from 'rxjs';
import { DataTypes } from '../models/data-types.model';
import { Query } from '../models/query.model';
import { SearchResult } from '../models/search.model';
import { CardService } from '../services/card.service';
import { DataTypesService } from '../services/data-types.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  dataTypes$: Observable<DataTypes>;
  query: Query = new Query();
  searchResult$: Observable<SearchResult>;
  search: ReplaySubject<void> = new ReplaySubject<void>();

  constructor(public cardService: CardService, public dataTypeService: DataTypesService) {
    this.searchResult$ = this.search.pipe(
      startWith(0),
      debounceTime(500),
      tap(_ => { console.log('search') }),
      mergeMap(() => this.cardService.search(this.query)),
    );

    this.dataTypes$ = this.dataTypeService.getDataTypes();
  }
  

  ngOnInit(): void {
  }

}
