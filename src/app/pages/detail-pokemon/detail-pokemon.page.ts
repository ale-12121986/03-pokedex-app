import { Component, Input, inject } from '@angular/core';
//import { CommonModule, JsonPipe } from '@angular/common';
///import { FormsModule } from '@angular/forms';
import { IonContent, LoadingController,IonFab, IonFabButton, IonIcon, IonImg, IonCard,
   IonCardHeader, IonCardTitle, IonCardContent,
   IonRow, IonCol, IonText, IonGrid,IonProgressBar} from '@ionic/angular/standalone';
import { PokemonService } from 'src/app/services/pokemon';
import { IPokemon } from 'src/app/models/pokemon.model';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { GetStatPipe } from 'src/app/pipes/get-stat-pipe';
@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.page.html',
  styleUrls: ['./detail-pokemon.page.scss'],
  standalone: true,
  imports: [IonContent, IonFab, IonFabButton, IonIcon, IonImg,
     IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonRow, IonCol, IonText, IonGrid, GetStatPipe, 
     IonProgressBar]
})
export class DetailPokemonPage  {

  private pokemonService: PokemonService = inject(PokemonService);
  private loadingController: LoadingController = inject(LoadingController);
  private router: Router = inject(Router);
  //private getStatPipe: GetStatPipe = inject(GetStatPipe);
  

  @Input() id!:number;

  public pokemon!: IPokemon;
  public pokemonStats: any[] = [
    { 
    name: 'PS',
    stats: 'hp' 
  },
  { 
    name: 'Ataque',
    stats: 'attack' 
  },
  { 
    name: 'Defensa',
    stats: 'defense' 
  },
  { 
    name: 'At. esp.',
    stats: 'special-attack' 
  },
  { 
    name: 'Def. esp.',
    stats: 'special-defense' 
  },
  { 
    name: 'Velocidad',
    stats: 'speed' 
  }
  ];

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
