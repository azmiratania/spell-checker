/** Tests for Checker. Outlines for optional tests, maybe useful after Checker is functioning. */

import { Checker } from "./checker";
import { getTestDictionary, getLargeDictionary } from "./dictionary";

test("test_basic_suggestion", () => {
    const checker = new Checker(getTestDictionary());
    const suggestions = checker.suggest("teh", 2, 3);
    // Uncomment these assertions once Checker is implemented:
    // expect(suggestions.length).toBeGreaterThan(0);
    // expect(suggestions[0]).toBe("the");
});

// test("test_multiple_misspellings", () => {
//     const checker = new Checker(getTestDictionary());
//     const words = ["helo", "thier", "hourse", "knwo"];
//     for (const word of words) {
//         const suggestions = checker.suggest(word, 2, 3);
//         expect(suggestions.length).toBeGreaterThan(0);
//     }
// });

// test("test_large_dictionary_performance", () => {
//     const checker = new Checker(getLargeDictionary());
//     const misspelled = ["teh", "helo", "thier", "hourse", "knwo",
//                         "abotu", "thign", "peple", "knowl", "herat"];
//     const start = Date.now();
//     for (const word of misspelled) {
//         const suggestions = checker.suggest(word, 2, 5);
//         expect(suggestions.length).toBeGreaterThan(0);
//     }
//     const elapsed = (Date.now() - start) / 1000;
//     expect(elapsed).toBeLessThan(1.0);
// });
