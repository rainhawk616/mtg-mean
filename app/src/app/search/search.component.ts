import { Component, OnInit } from '@angular/core';
import { debounceTime, mergeMap, Observable, ReplaySubject, startWith, tap } from 'rxjs';
import { Query } from '../models/query.model';
import { SearchResult } from '../models/search.model';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  query: Query = new Query();
  searchResult$: Observable<SearchResult>;
  search: ReplaySubject<void> = new ReplaySubject<void>();

  constructor(public cardService: CardService) {
    this.searchResult$ = this.search.pipe(
      startWith(0),
      debounceTime(500),
      tap(_ => { console.log('search') }),
      mergeMap(() => this.cardService.search(this.query)),
    );
  }
  

  ngOnInit(): void {
  }

}
