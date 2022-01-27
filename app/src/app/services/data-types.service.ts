import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { DataTypes } from '../models/data-types.model';

@Injectable({
  providedIn: 'root'
})
export class DataTypesService {

  constructor(private http: HttpClient) { }

  public getDataTypes(): Observable<DataTypes> {
    return this.http.get<DataTypes>('/api/data-types')
      .pipe(
        catchError(this.handleError<DataTypes>('data-types', undefined))
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
