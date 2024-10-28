import { Country } from "./country.interface";
import { Region } from "./region.type";

export interface CacheStore{
  byCapital:TermCountries,
  byCountries:TermCountries;
  byRegion:RegionCountries
}

export interface TermCountries{
  term:string;
  countries:Country[]
}
export interface RegionCountries{
  term:Region; //Opcional porque cuando recién entramos a la page, no hay ninguna regió seleccionada
  countries:Country[]
}
