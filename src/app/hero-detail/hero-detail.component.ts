import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Pokemon }         from '../hero';
import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  pokemon: Pokemon;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const name = this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(name)
      .subscribe((pokemon) => {
        this.pokemon = pokemon;  
        this.pokemon.img=pokemon.sprites.front_default;
        this.pokemon.evolutionUrl=pokemon.species.url;

        for(var a=0; a<pokemon.types.length;a++){
          if (a==0){
            this.pokemon.type_name=pokemon.types[a].type.name;}
          else
          this.pokemon.type_name+=' '+pokemon.types[a].type.name;
        }
        this.heroService.getEvolution(this.pokemon.evolutionUrl,this.pokemon.id)
        .subscribe((evolution)=>{
          this.pokemon.evolution=evolution.evolves_from_species.name;
        })
    });
  }


  goBack(): void {
    this.location.back();
  }
}