import { Component, Input, inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, LoadingController } from '@ionic/angular/standalone';
import { PokemonService } from 'src/app/services/pokemon';
import { IPokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.page.html',
  styleUrls: ['./detail-pokemon.page.scss'],
  standalone: true,
  imports: [IonContent, JsonPipe]
})
export class DetailPokemonPage  {

private pokemonService: PokemonService = inject(PokemonService);
 private loadingController: LoadingController = inject(LoadingController);

  @Input() id!:number;

  public pokemon!: IPokemon;

  async ionViewWillEnter() {
    console.log('id', this.id);
      const  loading = await this.loadingController.create({
        message: 'Cargando...',
      //duration: 3000,
      });
      loading.present();

    this.pokemonService.getPokemonById(this.id).then((pokemon:IPokemon) => {
      this.pokemon = pokemon;
    }).finally(() => {
      loading.dismiss();
    });
  }

}
