import { Component, inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, LoadingController, IonGrid, IonRow,
   IonCol, IonImg, IonText, IonInfiniteScroll, IonInfiniteScrollContent, InfiniteScrollCustomEvent } from '@ionic/angular/standalone';

import { PokemonService } from '../../services/pokemon';
import { IPokemon } from 'src/app/models/pokemon.model';
@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.page.html',
  styleUrls: ['./list-pokemons.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, 
    JsonPipe, IonGrid, IonRow, IonCol, IonImg, IonText, IonInfiniteScroll, IonInfiniteScrollContent ]
})
export class ListPokemonsPage  {

  private pokemonService: PokemonService = inject(PokemonService);
  private loadingController: LoadingController = inject(LoadingController);
  private router = inject(Router);
  public pokemons: IPokemon[] = [];

  ionViewWillEnter() {

    this.morePokemons( );
  }


  async morePokemons(event?: InfiniteScrollCustomEvent ) {

    const promisePokemons = this.pokemonService.getPokemon();
    let loading: any; 
    if(promisePokemons) {

      if(!event){
        loading = await this.loadingController.create({
        message: 'Cargando...',
      //duration: 3000,
      });
      loading.present();
      }
      

      promisePokemons.then((pokemons) => {
        console.log('pokemons', pokemons);
        this.pokemons = this.pokemons .concat( pokemons);
        
      })
      .catch(error=>{
        console.error(error);
      })
      .finally(() => {
        loading?.dismiss();
        event?.target.complete(); 
      });
    }
  }

  goDetail(pokemon: IPokemon) {
    this.router.navigate(['/detail-pokemon', pokemon.id]);
    console.log('pokemon', pokemon);
  }
}
