import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/country.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit{
  constructor(private activatedRoute:ActivatedRoute //Para recibir el id de la URL
    ,private countriesService:CountriesService //Mi propio servicio, para realizar las peticiones
    ,private router:Router //Para poder redirigir al usuario en determinada situación
  ){}

  ngOnInit(): void {

    //Observable hell
   this.activatedRoute.params
    .subscribe(({id}) => {
        this.searchCountry(id); //ESta función es para evitar el Observable hell
    });
  }

  searchCountry(code:string){
    this.countriesService.searchCountryByAlphaCode(code)
      .subscribe(country=>{
        //Si lo que recibo es null, debo sacar al usuario de esta pantalla(No hay país para mostrar)
        if(!country){
          return this.router.navigateByUrl('');
        }

        console.log("Habemus País")
        console.log({country});
        return;
      });
  }

  /*
  //Para evitar el observable hell
  this.activatedRoute.params
      .pipe(
        switchMap(({id})=>this.countriesService.searchCountryByAlphaCode(id))
      )
      .subscribe(country=>{
        console.log({country});
      });
    } */
}
