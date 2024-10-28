import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of,map,delay, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {
  private apiUrl:string='https://restcountries.com/v3.1';

  //Esto es para hacer persistentes los datos cuando me cambio de una página a otra
  public cacheStore:CacheStore={
    byCapital:{term:'',countries:[]}, //Guardamos tanto el término de búsqueda, como los paises resultantes
    byCountries:{term:'',countries:[]},
    byRegion:{term:'',countries:[]}
  }

  //Métodos para guardar y cargar datos de local storage
  private saveToLocalStorage(){
    localStorage.setItem("cacheStore",JSON.stringify(this.cacheStore));
  }
  private loadFromLocalStorage(){
    if(!localStorage.getItem('cacheStore')) return;
    this.cacheStore=JSON.parse(localStorage.getItem("cacheStore")!);
  }
  //Esta es la petición que hago para buscar por capital, país y región.
  private getCountriesRequest(url:string):Observable<Country[]>{
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(error=>of([])),
        delay(2000) //Este sólo sirve para ver el loader de buscando un par de segundos :v
      );
  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  searchCapital(term:string):Observable<Country[]>{
    const url=`${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries=>this.cacheStore.byCapital={term,countries}),
      tap(()=>this.saveToLocalStorage())
    );

  }
  searchCountry(term:string):Observable<Country[]>{
    const url=`${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url).pipe(
      tap(countries=>this.cacheStore.byCountries={term,countries}),
      tap(()=>this.saveToLocalStorage())
    );
  }
  searchRegion(region:Region):Observable<Country[]>{
    const url=`${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url).pipe(
      tap(countries=>this.cacheStore.byRegion={term:region,countries}),
      tap(()=>this.saveToLocalStorage())
    );
  }


  searchCountryByAlphaCode(code:string):Observable<Country|null>{
    const url=`${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url)
    .pipe(
      map(countries=>countries.length>0?countries[0]:null), //Para quitar la envoltura del arreglo
      catchError(error=>of(null))
    );
  }

}
