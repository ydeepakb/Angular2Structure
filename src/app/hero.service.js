"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var mock_heroes_1 = require("./mock-heroes");
var HeroService = (function () {
    function HeroService(http) {
        this.http = http;
        this.heroesUrl = 'http://10.169.224.160/From26services/Form26service.svc/';
        this.headers = new http_1.Headers();
    }
    HeroService.prototype.getHeroesApi = function () {
        return this.http.get(this.heroesUrl + 'getHeroList')
            .map(this.extractData)
            .catch(this.handleError);
    };
    HeroService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    HeroService.prototype.getHeroesMock = function () {
        return Promise.resolve(mock_heroes_1.HEROES);
    };
    HeroService.prototype.getHeroesSlowly = function () {
        var _this = this;
        return new Promise(function (resolve) {
            // Simulate server latency with 2 second delay
            setTimeout(function () { return resolve(_this.getHeroesMock()); }, 2000);
        });
    };
    HeroService.prototype.getHeroById = function (id) {
        return this.getHeroesMock()
            .then(function (heroes) { return heroes.find(function (hero) { return hero.id === id; }); });
    };
    HeroService.prototype.getHeroByIdApi = function (id) {
        var item;
        this.http.get(this.heroesUrl + 'getHeroList')
            .map(function (Response) { return Response.json(); })
            .subscribe(function (data) {
            item = data.find(function (p) { return p.id === id; }); //data.find(hero=>hero.id===id)
        });
        return item;
    };
    HeroService.prototype.addHeroApi = function (hero) {
        this.headers.append('Content-Type', 'application/json');
        this.options = new http_1.RequestOptions({ headers: this.headers });
        this.http.post(this.heroesUrl + 'addItemHeroList', hero, this.options)
            .map(function (Response) { console.log('res' + Response); })
            .catch(this.handleError)
            .subscribe();
    };
    HeroService.prototype.handleError = function (error) {
        // In a real world app, you might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    return HeroService;
}());
HeroService = __decorate([
    core_1.Injectable() //The @Injectable() decorator tells TypeScript to emit metadata about the service.
    ,
    __metadata("design:paramtypes", [http_1.Http])
], HeroService);
exports.HeroService = HeroService;
//# sourceMappingURL=hero.service.js.map