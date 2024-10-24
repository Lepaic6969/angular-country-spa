import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of,map } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({providedIn: 'root'})
export class CountriesService {
  private apiUrl:string='https://restcountries.com/v3.1';


  constructor(private http: HttpClient) { }

  searchCapital(term:string):Observable<Country[]>{
    const url=`${this.apiUrl}/capital/${term}`;
    return this.http.get<Country[]>(url) //Aquí aún no hago la solicitud debo primero realizar el subscribe
    .pipe(
      catchError(error=>of([])) //Regreso un nuevo Observable sin paises en caso de error en la petición
    );                          //(Producida por un mal patrón de búsqueda)

  }
  searchCountry(term:string):Observable<Country[]>{
    const url=`${this.apiUrl}/name/${term}`;
    return this.http.get<Country[]>(url)
    .pipe(
      catchError(error=>of([]))
    );
  }
  searchRegion(region:string):Observable<Country[]>{
    const url=`${this.apiUrl}/region/${region}`;
    return this.http.get<Country[]>(url)
    .pipe(
      catchError(error=>of([]))
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
