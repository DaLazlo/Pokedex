
import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache = new Cache(1000);

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
      try {
            let activeURL = "";
            if (pageURL !== undefined && pageURL !== null) {
                activeURL = `${pageURL}`;
            } else {
                activeURL = `${PokeAPI.baseURL}/location-area/`;
            }
            let response: (Response | undefined) = this.#cache.get(activeURL);
            if (response === undefined) {
                response = await fetch(activeURL);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                this.#cache.add(activeURL, response);
            }
            const result = await response.json();
            const nexturl = result.next;
            const prevurl = result.previous;
            const raw = result.results;
            const data: Location[] = result.results;
            const betterdata: Location[] = [];
            for (let i = 0; i < 20; i++) {
                betterdata.push(await this.fetchLocation(result.results[i].name));
            }

            return { prior: prevurl, next: nexturl, locations: betterdata};
        } catch (err) {
            console.log(err);
            throw new Error("Unable to fetch");
        }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    try {
      const activeURL = `${PokeAPI.baseURL}/location-area/${locationName}`;
      let response: (Response | undefined) = this.#cache.get(activeURL);
      if (response === undefined) {
        response = await fetch(activeURL);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        this.#cache.add(activeURL, response);
      }
      const result = await response.json();
      let pokestring = "";
      for (const pokemon of result.pokemon_encounters) {
          pokestring += ` - ${pokemon.pokemon.name}\n`;
      }

      return { name: locationName, url: pokestring };
    } catch (err) {
        console.log(err);
        throw new Error("Unable to fetch");
    }
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    try {
        const activeURL = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
        let response: (Response | undefined) = this.#cache.get(activeURL);
        if (response === undefined) {
            response = await fetch(activeURL);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            this.#cache.add(activeURL, response);
        }
        const result = await response.json();
        return {    name: pokemonName, 
                    baseExperience: result.base_experience, 
                    height: result.height, 
                    weight: result.weight, 
                    stats: result.stats,
                    types: result.types };
    } catch (err) {
        console.log(err);
        throw new Error("Unable to fetch");
    }
  }
}

export type ShallowLocations = {
    prior: string;
    next: string;
    locations: Location[];
};

export type Location = {
    name: string;
    url: string;
};

export type Pokemon = {
    name: string;
    baseExperience: number;
    height: number;
    weight: number;
    stats: { base_stat: number; effort: number; stat: { name: string; url: string; }}[];
    types: { slot: number; type: { name: string; url: string; }; }[];
}