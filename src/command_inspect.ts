
import { State } from './state.js';
import { Pokemon } from './pokeapi.js';

export async function commandInspect(state: State, ...args: string[]) {
    try {
        const critter = state.pokedex[args[0]];
        console.log(`Name: ${critter.name}`);
        console.log(`Height: ${critter.height}`);
        console.log(`Weight: ${critter.weight}`);
        console.log("Stats:");
        for (const stat of critter.stats) {
            console.log(`  -${stat.stat.name} ${stat.base_stat}`);
        }
        console.log("Types:");
        for (const type of critter.types) {
            console.log(`  - ${type.type.name}`);
        }

    } catch (err) {
        console.log("You have not caught that pokemon");
    }
}