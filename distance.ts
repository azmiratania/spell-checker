/** Read this first. */

export class EditDistance {
    compute(source: string, target: string): number {
        if (source.length === target.length) {
            let count = 0;
            for (let i = 0; i < source.length; i++) {
                if (source[i] !== target[i]) {
                    count++;
                }
            }
            return count;
        }

        const m = source.length;
        const n = target.length;

        const dp: number[][] = [];
        for (let i = 0; i <= m; i++) {
            dp.push(new Array(n + 1).fill(0));
        }

        for (let i = 0; i <= m; i++) {
            dp[i][0] = i;
        }
        for (let j = 0; j <= n; j++) {
            dp[0][j] = j;
        }

        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                let substitute: number;
                if (source[i - 1] === target[j - 1]) {
                    substitute = dp[i - 1][j - 1];
                } else {
                    substitute = dp[i - 1][j - 1] + 1;
                }

                const insert = dp[i][j - 1] + 1;
                const del = dp[i - 1][j] + 1;

                dp[i][j] = Math.min(insert, del, substitute);
            }
        }

        return dp[m][n];
    }

    closestWords(
        word: string,
        candidates: Map<string, number>,
        maxDistance: number
    ): [string, number, number][] {
        const results: [string, number, number][] = [];
        for (const [candidate, freq] of candidates) {
            const dist = this.compute(word, candidate);
            if (dist <= maxDistance) {
                results.push([candidate, dist, freq]);
            }
        }
        results.sort((a, b) => {
            if (a[1] !== b[1]) return a[1] - b[1];
            return a[2] - b[2];
        });
        return results;
    }
}
