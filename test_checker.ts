/** Tests for Checker — Optimization phase. */

import { Checker } from "./checker";
import { getTestDictionary, getLargeDictionary } from "./dictionary";

test("test_basic_suggestion", () => {
    const checker = new Checker(getTestDictionary());
    const suggestions = checker.suggest("teh", 2, 3);
    expect(suggestions.length).toBeGreaterThan(0);
    expect(suggestions[0]).toBe("the");
});

test("test_multiple_misspellings", () => {
    const checker = new Checker(getTestDictionary());
    const words = ["helo", "thier", "hourse", "knwo"];
    for (const word of words) {
        const suggestions = checker.suggest(word, 2, 3);
        expect(suggestions.length).toBeGreaterThan(0);
    }
});

test("test_max_suggestions_limit", () => {
    const checker = new Checker(getTestDictionary());
    const suggestions = checker.suggest("he", 2, 3);
    if (suggestions.length > 3) {
        throw new Error(`expected at most 3 suggestions, got ${suggestions.length}`);
    }
    expect(suggestions.length).toBeGreaterThan(0);
});

test("test_large_dictionary_performance", () => {
    const checker = new Checker(getLargeDictionary());
    const misspelled = ["teh", "helo", "thier", "hourse", "knwo",
                        "abotu", "thign", "peple", "knowl", "herat"];
    const start = Date.now();
    for (const word of misspelled) {
        const suggestions = checker.suggest(word, 2, 5);
        expect(suggestions.length).toBeGreaterThan(0);
    }
    const elapsed = (Date.now() - start) / 1000;
    expect(elapsed).toBeLessThan(5.0);
});
