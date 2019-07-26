import { Component, OnInit } from '@angular/core';

import { Pokemon } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  pokemons: Pokemon[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(pokemons => this.pokemons = pokemons.results);
  }

  nextPokemons(){
    this.heroService.nextPokemons();
  }

  previousPokemons(){
    this.heroService.previousPokemons();
  }

}