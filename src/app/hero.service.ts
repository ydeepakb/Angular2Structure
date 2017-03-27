import { Injectable } from '@angular/core';
import { Http, Response,RequestOptions,Headers   }  from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';



@Injectable()//The @Injectable() decorator tells TypeScript to emit metadata about the service.
export class HeroService {

 constructor (private http: Http) {}
 
  private heroesUrl= 'http://10.169.224.160/From26services/Form26service.svc/';   
  private options: RequestOptions;
  private headers = new Headers();
  getHeroesApi(): Observable<Hero[]> {
       

    return this.http.get(this.heroesUrl+'getHeroList')
                    .map(this.extractData)
                    .catch(this.handleError);
  }

 private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

   getHeroesMock(): Promise<Hero[]> {
            return Promise.resolve(HEROES);
         }

    getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
        // Simulate server latency with 2 second delay
        setTimeout(() => resolve(this.getHeroesMock()), 2000);
    });      
}
  getHeroById(id: number): Promise<Hero> {
            return this.getHeroesMock()
                        .then(heroes => heroes.find(hero => hero.id === id));
                        
  }
  
  getHeroByIdApi(id: number): Hero {
       let item:Hero;
       this.http.get(this.heroesUrl+'getHeroList')
                    .map(Response=> Response.json())
                   .subscribe((data:Hero[])=>{
                     item=  data.find(p=>p.id===id) //data.find(hero=>hero.id===id)
                   });
       return item;             
  }

addHeroApi(hero:Hero):void{
  
  this.headers.append('Content-Type', 'application/json');
  this.options = new RequestOptions({headers:this.headers});

    this.http.post(this.heroesUrl+'addItemHeroList',hero,this.options)   
    .map(Response=> {console.log('res'+Response)})                 
    .catch(this.handleError)
    .subscribe();
}

 private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}

