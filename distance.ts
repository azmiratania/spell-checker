/** Read this first. */

// Define and export the EditDistance class for computing string edit distances
export class EditDistance {
    // Method that computes the edit distance between a source and target string
    compute(source: string, target: string): number {

        const m = source.length; // Number of characters in source
        const n = target.length; // Number of characters in target

        // Create a 2D DP table with (m+1) rows and (n+1) columns, initialized to 0
        const dp: number[][] = [];
        for (let i = 0; i <= m; i++) {
            dp.push(new Array(n + 1).fill(0)); // Add a new row of (n+1) zeros for each source index
        }

        // Base case: transforming source[0..i] to an empty string requires i deletions
        for (let i = 0; i <= m; i++) {
            dp[i][0] = i;
        }
        // Base case: transforming an empty string to target[0..j] requires j insertions
        for (let j = 0; j <= n; j++) {
            dp[0][j] = j;
        }

        // Fill in the DP table row by row
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                let substitute: number; // Cost of a substitution operation
                if (source[i - 1] === target[j - 1]) { // If current characters match...
                    substitute = dp[i - 1][j - 1]; // ...no cost, carry over diagonal value
                } else {
                    substitute = dp[i - 1][j - 1] + 1; // ...otherwise, add 1 for substitution
                }

                const insert = dp[i][j - 1] + 1;  // Cost of inserting a character into source
                const del = dp[i - 1][j] + 1;      // Cost of deleting a character from source

                // The best edit distance at [i][j] is the minimum of all three operations
                dp[i][j] = Math.min(insert, del, substitute);
            }
        }

        return dp[m][n]; // The bottom-right cell holds the final edit distance
    }

    // Bounded edit distance: stops early if distance exceeds maxDistance
    computeBounded(source: string, target: string, maxDistance: number): number {
        const m = source.length;
        const n = target.length;

        // Length difference is a lower bound on edit distance
        if (Math.abs(m - n) > maxDistance) {
            return maxDistance + 1; // Exceeds bound, return sentinel value
        }

        // Allocate only necessary columns: we only need current and previous row
        let prev: number[] = new Array(n + 1).fill(0);
        let curr: number[] = new Array(n + 1).fill(0);
        
        for (let j = 0; j <= n; j++) {
            prev[j] = j;
        }

        for (let i = 1; i <= m; i++) {
            curr[0] = i;
            
            for (let j = 1; j <= n; j++) {
                let substitute: number;
                if (source[i - 1] === target[j - 1]) {
                    substitute = prev[j - 1];
                } else {
                    substitute = prev[j - 1] + 1;
                }

                const insert = curr[j - 1] + 1;
                const del = prev[j] + 1;

                curr[j] = Math.min(insert, del, substitute);
            }

            // Early termination: if all values in curr row exceed maxDistance, we can stop
            if (curr.every(val => val > maxDistance)) {
                return maxDistance + 1;
            }

            // Swap rows
            [prev, curr] = [curr, prev];
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
        const results: [string, number, number][] = []; // Accumulator for matching candidates
        for (const [candidate, freq] of candidates) {   // Iterate over each dictionary entry
            const dist = this.computeBounded(word, candidate, maxDistance); // Use bounded computation
            if (dist <= maxDistance) {                  // Only keep candidates within max distance
                results.push([candidate, dist, freq]);  // Store the candidate with its distance and frequency
            }
        }
        // Sort results: primarily by edit distance (ascending), then by frequency (descending)
        results.sort((a, b) => {
            if (a[1] !== b[1]) return a[1] - b[1]; // Sort by distance first
            return b[2] - a[2];                     // Break ties by frequency (higher freq first)
        });
        return results; // Return the sorted list of close matches
    }
}
