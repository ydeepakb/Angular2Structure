import { Component,OnInit } from '@angular/core';
import { HeroService } from './hero.service';
import { Hero } from './hero';
import {Router} from '@angular/router'


@Component({
  selector: 'my-heros',
  templateUrl:'./hero-list.component.html',
  styleUrls: ['./app.component-style.css'],
  // providers: [HeroService]
})
export class HeroesComponent  implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  title = 'Tour of Heroes';
 
  constructor(private heroService: HeroService,private router:Router) { }
  getHeroes(): void {
    this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
  }
  ngOnInit(): void {
    this.getHeroes();
  }
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}
