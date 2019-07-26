import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {HttpParams} from "@angular/common/http";

import { Observable, of, Subscription } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Pokemon } from './hero';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class HeroService {

  private pokemonsUrl = 'https://pokeapi.co/api/v2/pokemon'  // URL to web api
  private next=this.pokemonsUrl;
  pokemonlist: Observable<Pokemon[]>;

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

/** GET heroes from the server */
getHeroes (): Observable<Pokemon[]> {
  console.log('getHeroes');
  return this.pokemonlist=this.http.get<Pokemon[]>(this.next)
    .pipe(
     tap(_ => this.log('fetched pokemons')),
     catchError(this.handleError<Pokemon[]>('getHeroes', []))
    );
  
}

/** GET pokemon by name. Will 404 if id not found */
getHero(name: string): Observable<Pokemon> {
    const url = `${this.pokemonsUrl}/${name}`;
    return this.http.get<Pokemon>(url)
    .pipe(
      tap(_ => this.log(`fetched hero name=${name}`)),
      catchError(this.handleError<Pokemon>(`getHero name=${name}`))
  );
  }

getEvolution(evolutionUrl: string, id: number){
  
  return this.pokemonlist=this.http.get<Pokemon[]>(evolutionUrl)
  .pipe(
   tap(_ => this.log('fetched evolution')),
   catchError(this.handleError<Pokemon[]>('getEvolution', []))
  );
}


  /* GET heroes whose name contains search term */
searchHeroes(term: string): Observable<Pokemon[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Pokemon[]>(`${this.pokemonsUrl}/?name=${term}`).pipe(
    tap(_ => this.log(`found pokemons matching "${term}"`)),
    catchError(this.handleError<Pokemon[]>('searchHeroes', []))
  );
}

async nextPokemons(){
  var a=0;
  this.getHeroes().subscribe((res:any[])=>{
    
    this.next=res.next;
    console.log(this.next);
    a=1;
  })
  return a;
}

async previousPokemons(){
 this.getHeroes().subscribe((res:any[])=>{
    if (res.previous!=null)
      this.next=res.previous;
  });
  return true;
}
/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}