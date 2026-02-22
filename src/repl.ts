import { createInterface } from "readline";

import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
import { commandMap } from './command_map.js';
import { commandMapb } from './command_mapb.js';
import { CLICommand, State, initState } from "./state.js";

export function cleanInput(input: string): string[] {
    return input.trim().toLowerCase().split(/ +/);
}

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Displays next 20 map locations",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Displays previous 20 map locations",
      callback: commandMapb,
    }
  };
}
export function startREPL(state: State): void {
    const rl = state.rl;
    rl.prompt();
    rl.on('line', async (line: string) => {
        const words = cleanInput(line);
        if (words.length > 0) {
            try {
                const callback = getCommands()[words[0]].callback;
                try {
                    const foo = await callback(state);
                } catch (err) {
                    console.log(`An error occurred: ${err}`);
                }
            } catch {
                console.log("Unknown command");
            };
        }
        rl.prompt();
    });
}

