import { IStat } from "./stats.model";

export interface IPokemon{
    id: number;
    name: string;
    type1: string;
    type2?: string;
    sprite: string;
    height: number;
    weight: number;
    abilities: string[];    
    hiddenAbilities?: string;
    stats: IStat[];

}