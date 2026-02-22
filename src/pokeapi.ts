
import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache = new Cache(30);

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
      try {
            let activeURL = "";
            if (pageURL !== undefined && pageURL !== null) {
                activeURL = `${pageURL}`;
            } else {
                activeURL = `${PokeAPI.baseURL}/location-area/`;
            }
            console.log(activeURL);
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

            return { prior: prevurl, next: nexturl, locations: data};
        } catch (err) {
            console.log(err);
            throw new Error("Unable to fetch");
        }
  }

  async fetchLocation(locationName: string): Promise<Location> {
      const activeURL = `${PokeAPI.baseURL}/location-area/${locationName}`;
      try {
          const response = await fetch(activeURL);
          if (!response.ok) {
              throw new Error(`Response status ${response.status}`);
          }
          const result = await response.json();
          const fake: Location = { name: "TBD", url: "TBD" };
          return fake;
      } catch (err) {
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
