import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/country.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit{

  public countries:Country[]=[];
  public isLoading:boolean=false;
  public initialValue:string=''; //Para la persistencia de los datos de la tabla al cambiar entre páginas

  constructor(private countryService:CountriesService){}

  ngOnInit(): void {
    this.countries=this.countryService.cacheStore.byCountries.countries;
    this.initialValue=this.countryService.cacheStore.byCountries.term;
  }

  searchByCountry(term:string):void{
    this.isLoading=true;
    this.countryService.searchCountry(term)
      .subscribe(countries=>{
        this.countries=countries;
        this.isLoading=false;
      });
  }
}
