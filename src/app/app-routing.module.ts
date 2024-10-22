import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';

const routes: Routes = [
  {
    path:'',
    component:HomePageComponent
  },
  {
    path:'about',
    component:AboutPageComponent
  },
  {
    path:'contact',
    component:ContactPageComponent
  },
  {
    path:'countries',
    loadChildren:()=>import('./countries/countries.module').then(modulo=>modulo.CountriesModule)
  },
  {
    path:'**',//Cualquier otra ruta
    redirectTo:''
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //Lo defino como primer router de nuestra app(Ruta Padre)
  exports: [RouterModule]
})
export class AppRoutingModule { }
