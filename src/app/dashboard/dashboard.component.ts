import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../hero';
import { HeroService } from '../hero.service';
import { debounceTime } from 'rxjs/operators';
import { __await } from 'tslib';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  pokemons: Pokemon[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(pokemons => this.pokemons = pokemons.results);
    
  }

 async nextPokemons(){
    await(this.heroService.nextPokemons());
    this.getHeroes();
  }

  previousPokemons(){
    this.heroService.previousPokemons();
    this.getHeroes();
  }
  

}

