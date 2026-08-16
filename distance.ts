/** Read this first. */

// Define and export the EditDistance class for computing string edit distances
export class EditDistance {
    // Method that computes the edit distance between a source and target string
    // Implements Damerau-Levenshtein (allows adjacent transposition) using full DP
    compute(source: string, target: string): number {

        const m = source.length;
        const n = target.length;

        // Create a 2D DP table with (m+1) rows and (n+1) columns
        const dp: number[][] = [];
        for (let i = 0; i <= m; i++) {
            dp.push(new Array(n + 1).fill(0));
        }

        for (let i = 0; i <= m; i++) dp[i][0] = i;
        for (let j = 0; j <= n; j++) dp[0][j] = j;

        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                const cost = source[i - 1] === target[j - 1] ? 0 : 1;
                const substitute = dp[i - 1][j - 1] + cost;
                const insert = dp[i][j - 1] + 1;
                const del = dp[i - 1][j] + 1;

                let cell = Math.min(insert, del, substitute);

                // Check for transposition (adjacent swap)
                if (
                    i > 1 &&
                    j > 1 &&
                    source[i - 1] === target[j - 2] &&
                    source[i - 2] === target[j - 1]
                ) {
                    cell = Math.min(cell, dp[i - 2][j - 2] + 1);
                }

                dp[i][j] = cell;
            }
        }

        return dp[m][n];
    }

    // Bounded edit distance with transposition support.
    // Uses only three rolling rows for O(n) space.
    computeBounded(source: string, target: string, maxDistance: number): number {
        const m = source.length;
        const n = target.length;

        // Quick length difference check
        if (Math.abs(m - n) > maxDistance) {
            return maxDistance + 1;
        }

        // Allocate three rows: prevPrev (i-2), prev (i-1), curr (i)
        let prevPrev: number[] = new Array(n + 1).fill(0);
        let prev: number[] = new Array(n + 1).fill(0);
        let curr: number[] = new Array(n + 1).fill(0);

        for (let j = 0; j <= n; j++) {
            prev[j] = j;
            prevPrev[j] = j; // initially prevPrev = row0 as well
        }

        for (let i = 1; i <= m; i++) {
            curr[0] = i;

            // We'll compute full columns; for performance this could be banded
            for (let j = 1; j <= n; j++) {
                const cost = source[i - 1] === target[j - 1] ? 0 : 1;
                const substitute = prev[j - 1] + cost;
                const insert = curr[j - 1] + 1;
                const del = prev[j] + 1;

                let cell = Math.min(insert, del, substitute);

                // Transposition check using prevPrev (row i-2)
                if (
                    i > 1 &&
                    j > 1 &&
                    source[i - 1] === target[j - 2] &&
                    source[i - 2] === target[j - 1]
                ) {
                    cell = Math.min(cell, prevPrev[j - 2] + 1);
                }

                curr[j] = cell;
            }

            // Early termination: if all entries in curr exceed maxDistance we can stop
            let allTooLarge = true;
            for (let j = 0; j <= n; j++) {
                if (curr[j] <= maxDistance) { allTooLarge = false; break; }
            }
            if (allTooLarge) return maxDistance + 1;

            // Rotate rows: prevPrev <- prev, prev <- curr, curr <- prevPrev (reuse array)
            const temp = prevPrev;
            prevPrev = prev;
            prev = curr;
            curr = temp;
        }

        const result = prev[n];
        return result > maxDistance ? maxDistance + 1 : result;
    }

    // Method that finds all candidate words within a given edit distance of the input word
    closestWords(
        word: string,                        // The misspelled or query word
        candidates: Map<string, number>,     // Map of dictionary words to their frequencies
        maxDistance: number                  // Maximum allowed edit distance
    ): [string, number, number][] {          // Returns array of [word, distance, frequency] tuples
        const results: [string, number, number][] = [];
        for (const [candidate, freq] of candidates) {
            const dist = this.computeBounded(word, candidate, maxDistance); // Use bounded computation
            if (dist <= maxDistance) {
                results.push([candidate, dist, freq]);
            }
        }
        // Sort results: primarily by edit distance (ascending), then by frequency (descending)
        results.sort((a, b) => {
            if (a[1] !== b[1]) return a[1] - b[1];
            return b[2] - a[2];
        });
        return results; // Return the sorted list of close matches
    }
}
