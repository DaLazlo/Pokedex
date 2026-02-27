
import { createInterface, type Interface } from "readline";
import { getCommands } from './repl.js';
import { PokeAPI, Pokemon } from './pokeapi.js';


export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
    pokeapi: PokeAPI;
    pokedex: Record<string, Pokemon>;
    nextLocationsURL?: string;
    prevLocationsURL?: string;
};

export function initState(): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });
    const commands = getCommands();
    const pokeapi = new PokeAPI();
    return { rl: rl, commands: commands, pokeapi: pokeapi , pokedex: {}};
}

