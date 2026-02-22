
import { State } from './state.js';

export async function commandHelp(state: State) {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:\n");
    for (const command of Object.keys(state.commands)) {
        console.log(`${command}: ${state.commands[command].description}`);
    }
}

