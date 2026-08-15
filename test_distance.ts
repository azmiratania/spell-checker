/** Tests for EditDistance — Bug Finding phase. */

import { EditDistance } from "./distance";

interface ComputeCase {
    source: string;
    target: string;
    expected: number;
}

test("test_compute_basic", () => {
    const allCases: ComputeCase[] = [
        { source: "", target: "", expected: 0 },
        { source: "abc", target: "", expected: 3 },
        { source: "cat", target: "bat", expected: 1 },
    ];

    const ed = new EditDistance();
    const failures: string[] = [];
    for (const tc of allCases) {
        const actual = ed.compute(tc.source, tc.target);
        if (actual !== tc.expected) {
            failures.push(
                `compute('${tc.source}', '${tc.target}') = ${actual}, ` +
                `expected ${tc.expected}`
            );
        }
    }

    if (failures.length > 0) {
        throw new Error(
            "\n=== TEST CASE FAILURES ===\n" + failures.join("\n") + "\n=== END ==="
        );
    }
});

test("test_compute_same_length", () => {
    const ed = new EditDistance();
    const result = ed.compute("abc", "bca");
    expect(result).toBe(2);
});

test("test_closest_words_basic", () => {
    const ed = new EditDistance();

    const results = ed.closestWords(
        "ca",
        new Map([["cat", 500], ["catch", 200], ["dog", 100]]),
        3
    );
    expect(results.length).toBe(3);
    expect(results[0][0]).toBe("cat");
    expect(results[0][1]).toBe(1);
    expect(results[0][2]).toBe(500);
});
