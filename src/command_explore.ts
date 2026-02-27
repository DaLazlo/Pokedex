
import { State } from './state.js';
import { Location } from './pokeapi.js';

export async function commandExplore(state: State, ...args: string[]) {
    console.log(`Exploring ${args[0]}...`);
    if (args[0] === undefined) {
        console.log("Enter an area to explore");
        return;
    }
    const result = await state.pokeapi.fetchLocation(args[0]);
    console.log("Found pokemon:");
    console.log(result.url);
}

