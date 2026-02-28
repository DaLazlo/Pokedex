
import { State } from './state.js';
import { Pokemon } from './pokeapi.js';

export async function commandPokedex(state: State, ...args: string[]) {
    console.log("Your Pokedex:");
    for (const critter of Object.keys(state.pokedex)) {
        console.log(` - ${critter}`);
    }
}

