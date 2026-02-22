
import { State } from './state.js';
import { ShallowLocations, Location } from './pokeapi.js';

export async function commandMap(state: State) {
    const result = state.pokeapi.fetchLocations(state.nextLocationsURL);
    const locations = await result;
    for (let i = 0; i < 20; i++) {
        try {
            const foo = locations.locations[i];
            console.log(foo.name);
        } catch (err) {
            break;
        }
    }
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.prior;
}

