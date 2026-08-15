/**
 * Runs your Solver. It's useful to see how Solver is called.
 * You may want to change how Solver is constructed.
 */

import { Checker } from "./checker";
import { getTestDictionary } from "./dictionary";

function banner(legend: string): void {
    const border = "#".repeat(legend.length + 8);
    console.log(border);
    console.log(`#   ${legend}   #`);
    console.log(border);
}

function main(): void {
    banner("BEGIN CODE OUTPUT");

    const dictionary = getTestDictionary();
    const checker = new Checker(dictionary);

    const misspelled = ["teh", "helo", "thier", "hourse", "knwo"];
    for (const word of misspelled) {
        const suggestions = checker.suggest(word, 2, 3);
        if (suggestions.length > 0) {
            console.log(`  '${word}' -> ${JSON.stringify(suggestions)}`);
        } else {
            console.log(`  '${word}' -> no suggestions`);
        }
    }

    banner("END CODE OUTPUT");
}

main();
