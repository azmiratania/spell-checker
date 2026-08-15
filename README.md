# Spell Checker

## `compute('kit', 'kitten')`

Walk through what happens when `compute('kit', 'kitten')` is called.

The strings have different lengths, so trace through how the DP table gets built. What does `dp[i][j]` represent?

## `closestWords()`

How does `closestWords()` decide the order of its results? If two candidate words have the same edit distance from the input, which one ranks first?

Based on the code in `distance.ts`, the `closestWords()` method decides the order of its results using a **two-level sort**:

1. **Primary sort:** Results are first sorted by **edit distance** (`a[1]` and `b[1]`) in ascending order. Words with smaller edit distances rank first.

2. **Secondary sort:** If two candidate words have the **same edit distance**, they are sorted by **frequency** (`a[2]` and `b[2]`) in ascending order. The word with the **lower frequency ranks first**.

Therefore, when there is a tie in edit distance, the word that appears **less frequently** in the language corpus gets ranked first.

This is somewhat counterintuitive because most spell-checkers would typically rank more frequent words first. However, this implementation does the opposite.
