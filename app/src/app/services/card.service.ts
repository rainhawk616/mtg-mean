import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, merge, mergeMap, Observable, of, tap } from 'rxjs';
import { Query } from '../models/query.model';
import { SearchResult } from '../models/search.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) { }

  public search(query:Query): Observable<SearchResult> {
    console.log('cards.service.searchCards()');
    return this.http.post<SearchResult>('/api/search', query)
       .pipe(
         catchError(this.handleError<SearchResult>('searchCards', {cards:[],pageIndex:1,pageSize:50,length:0}))
        );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
