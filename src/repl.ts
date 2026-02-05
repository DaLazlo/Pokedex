import { createInterface } from "readline";

import commandExit from command_exit.js;

export function cleanInput(input: string): string[] {
    return input.trim().toLowerCase().split(/ +/);
}

export type CLICommand = {
    name: string;
    description: string;
    callback: (commands: Record<string, CLICommand>) => void;
};

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    // can add more commands here
  };
}
export function startREPL(): void {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });
    rl.prompt();
    rl.on('line', (line: string) => {
        const words = cleanInput(line);
        if (words.length > 0) {
            try {
                getCommands(words[0]).callback();
            } catch {};
        }
        rl.prompt();
    });
}

