import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';



import { AppComponent }  from './app.component';
import { HeroDetailComponent } from './hero-details.component';
import { HeroesComponent }     from './heroes.component';
import { HeroService }         from './hero.service';
import {DashboardComponent} from './dashboard.component';
import { AppRoutingModule }     from './app-routing.module';
@NgModule({
  imports:      [ BrowserModule ,FormsModule, AppRoutingModule],  //other modules the app depends on
  declarations: [ AppComponent ,HeroDetailComponent,
                  HeroesComponent,DashboardComponent],// declare all derectives and components
  bootstrap:    [ AppComponent ],// root component to bootstarp
  providers: [HeroService]

})
export class AppModule { }
