
import { State } from './state.js';
import { Pokemon } from './pokeapi.js';

export async function commandCatch(state: State, ...args: string[]) {
    if (args[0] === undefined) {
        console.log("Enter the name of a pokemon to catch");
        return;
    }
    console.log(`Throwing a Pokeball at ${args[0]}...`);
    const result = await state.pokeapi.fetchPokemon(args[0]);
    if ((Math.random() * 1000) > result.baseExperience) {
        console.log(`${args[0]} was caught!`);
        state.pokedex[args[0]] = result;
    } else {
        console.log('${args[0] escaped!');
    }
}
