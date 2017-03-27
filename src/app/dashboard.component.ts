import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-dashboard',
 templateUrl: './dashboard.component.html',
 styleUrls:['./dashboard.componenet.css']
})
export class DashboardComponent implements OnInit {
  errorMessage: string; 
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    // this.heroService.getHeroes()
    //   .then(heroes => this.heroes = heroes.slice(1, 5));
    
       this.heroService.getHeroesApi()
                   .subscribe(
                     heroes => this.heroes = heroes.slice(1,5),
                     error =>  this.errorMessage = <any>error);
  }
}