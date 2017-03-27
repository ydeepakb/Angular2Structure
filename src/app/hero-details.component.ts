import { Component, Input,OnInit  } from '@angular/core';
import { Hero } from './hero';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { HeroService } from './hero.service';
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'hero-detail',
  template: `
    <div *ngIf="hero">
  <h2>{{hero.name}} details!</h2>
  <div>
  <div  class="col-md-2">
    <label>id: </label>{{hero.id}}
  </div>
  <div class="col-md-4">
  name:
    <input [(ngModel)]="hero.name" placeholder="name" class="form-control"/>
  </div>
  <div class="col-md-6">
   <button (click)="goBack()" class="btn btn-primary">Back</button>
   <button (click)="addItem()" class="btn btn-primary">+ item</button>
  </div>
  </div>
 
</div>
  `
})
export class HeroDetailComponent implements OnInit {
    constructor(
  private heroService: HeroService,
  private route: ActivatedRoute,
  private location: Location
) {}
  @Input() hero: Hero;

  ngOnInit(): void {
  this.route.params
    .switchMap((params: Params) => this.heroService.getHeroById(+params['id']))
    .subscribe(hero => this.hero = hero);
}
goBack(): void {
      this.location.back();
    }
  addItem():void{
      let item:Hero={id:15,name:'john'};
      this.heroService.addHeroApi(item);
  }
}