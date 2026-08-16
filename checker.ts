/** You'll implement this. */

import { EditDistance } from "./distance";

export class Checker {
    private dictionary: Map<string, number>;
    private ed: EditDistance;

    constructor(dictionary: Map<string, number>) {
        this.dictionary = dictionary;
        this.ed = new EditDistance();
    }

    suggest(word: string, maxDistance: number = 2, maxSuggestions: number = 5): string[] {
        // Use the EditDistance helper to find candidate words within maxDistance.
        // closestWords already returns tuples of [word, distance, frequency]
        // sorted by distance (ascending) then frequency (descending).
        const candidates = this.ed.closestWords(word, this.dictionary, maxDistance);
        // Take up to maxSuggestions and return only the words.
        return candidates.slice(0, maxSuggestions).map(([w]) => w);
    }
}
