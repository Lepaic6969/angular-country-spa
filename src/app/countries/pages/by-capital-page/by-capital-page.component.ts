import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit{
  public countries:Country[]=[];
  public isLoading:boolean=false;
  public initialValue:string=''; //Este es el valor que toma el input al inicializarse este componente
  //El constructor en Angular está destinado a la Inyección de dependencias
  constructor(private countryService:CountriesService){}

  ngOnInit(): void {
    this.countries=this.countryService.cacheStore.byCapital.countries;
    this.initialValue=this.countryService.cacheStore.byCapital.term;
  }

  searchByCapital(term:string):void{
    this.isLoading=true;
    this.countryService.searchCapital(term)
    .subscribe(countries=>{
      this.countries=countries;
      this.isLoading=false;
    });
  }

}
