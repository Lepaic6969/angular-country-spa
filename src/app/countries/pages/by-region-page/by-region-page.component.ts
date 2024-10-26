import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/country.service';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit{
  public countries:Country[]=[];
  public isLoading:boolean=false;
  //public regions:string[]=['Africa','Americas','Asia','Europe','Oceania'];
  public regions:Region[]=['Africa','Americas','Asia','Europe','Oceania'];

  public selectedRegion?:Region;  //Este es para añadirle un estilo al botón que está activo

  constructor(private countryService:CountriesService){}

  ngOnInit(): void {
    this.selectedRegion=this.countryService.cacheStore.byRegion.term;
    this.countries=this.countryService.cacheStore.byRegion.countries;
  }

  searchByRegion(region:Region):void{
    this.selectedRegion=region;
    this.isLoading=true;
    this.countryService.searchRegion(region)
      .subscribe(countries=>{
        this.countries=countries;
        this.isLoading=false;
      });
  }
}
