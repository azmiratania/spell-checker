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
        return [];
    }
}
