import { Component, Input, inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, LoadingController,IonFab, IonFabButton, IonIcon, IonImg, IonCard,
   IonCardHeader, IonCardTitle, IonCardContent,
   IonRow, IonCol, IonText, IonGrid} from '@ionic/angular/standalone';
import { PokemonService } from 'src/app/services/pokemon';
import { IPokemon } from 'src/app/models/pokemon.model';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.page.html',
  styleUrls: ['./detail-pokemon.page.scss'],
  standalone: true,
  imports: [IonContent, IonFab, IonFabButton, IonIcon, IonImg,
     IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonRow, IonCol, IonText, IonGrid]
})
export class DetailPokemonPage  {

  private pokemonService: PokemonService = inject(PokemonService);
  private loadingController: LoadingController = inject(LoadingController);
  private router: Router = inject(Router);

  @Input() id!:number;

  public pokemon!: IPokemon;

  constructor() { 

    addIcons({
      closeOutline
    });

  }

  async ionViewWillEnter() {
    console.log('id', this.id);
      const  loading = await this.loadingController.create({
        message: 'Cargando...',
      //duration: 3000,
      });
      loading.present();

    this.pokemonService.getPokemonById(this.id).then((pokemon:IPokemon) => {
      this.pokemon = pokemon;
    }).catch((error) =>{
      this.goBack();
    })
    .finally(() => {
      loading.dismiss();
    });
  }

  goBack() {
    this.router.navigateByUrl('list-pokemons');
  }
}
