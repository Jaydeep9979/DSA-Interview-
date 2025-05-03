// 1) count the numbe of ways -> Recursion
// 2) find the best among them -> Recursion

// (shortcut) => build the recurrence

// 1) Try to represent the problems in terms of indexes
// according to problem statement try to add paramenter in recursive function
// 2) Do All possible stuffs on that that index according to problem statement
// 3) count all ways => Sum of All stuffs
// 4) find min/max => min/max (of all stuffs)

// 0) use base cases for intialisation
// 1) create dp array of memoised size array
// Recursin

// You are climbing a staircase. It takes n steps to reach the top.
// Each time you can either climb 1 or 2 steps.
//  In how many distinct ways can you climb to the top?

var climbStairs = function (n) {
    function countWays(n) {
        if (n == 0) {
            return 0;
        }

        if (n == 1) {
            return 1;
        }

        return countWays(n - 1) + countWays(n - 2);
    }

    return countWays(n);
};

// memoisation
var climbStairs = function (n) {
    function countWays(n) {
        if (n == 0) {
            return 0;
        }

        if (n == 1) {
            return 1;
        }

        if (memo[n] !== -1) return memo[n];
        memo[n] = countWays(n - 1) + countWays(n - 2);
        return memo[n];
    }
    let memo = Array(n + 1).fill(-1);

    return countWays(n);
};

// dp

var climbStairs = function (n) {
    let dp = Array(n + 1).fill(-1);
    dp[0] = 0;
    dp[1] = 1;
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
    // return countWays(n);
};

// Frog Jumps for each jump cost is ABS(height[j] - Height[i])
// find minimum energy required to reach n'th stair

// there always be a space optimisation if you see index -1 or index +1 in exploration
function solve(arr, index) {
    if (index == 0) {
        return 0;
    }

    if (memo[index] !== -1) {
        return memo[index];
    }

    let left = solve(arr, index - 1) + Math.abs(arr[index] - arr[index - 1]);
    let right = Infinity;
    if (index > 1) {
        right = solve(arr, index - 2) + Math.abs(arr[index] - arr[index - 2]);
    }

    memo[index] = Math.min(left, right);
    // return memo[index];

    // dp

    let dp = new Array(n).fill(-1);

    dp[0] = 0;

    for (let i = 1; i < n; i++) {
        let firstWay = dp[i - 1] + Math.abs(arr[i] - arr[i - 1]);

        let secondWay = Infinty;
        if (i > 1) {
            secondWay = dp[i - 2] + Math.abs(arr[i - 2] - arr[i]);
        }

        dp[i] = Math.min(firstWay, secondWay);
    }

    // return dp[n - 1];

    //Space Optimisation
    prev = 0;
    prev2 = 0;
    for (let i = 1; i < n; i++) {
        let firstWay = prev + Math.abs(arr[i] - arr[i - 1]);

        let secondWay = Infinty;
        if (i > 1) {
            secondWay = prev2 + Math.abs(arr[i - 2] - arr[i]);
        }

        let cur_i = Math.min(firstWay, secondWay);

        prev2 = prev;
        prev = cur_i;
    }

    return prev;
}

memo = Array(n + 1).fill(-1);

// k Jumps

function solve(n, arr) {
    let dp = new Array(n).fill(-1);

    dp[0] = 0;

    for (let i = 1; i < n; i++) {
        let min = Infinity;
        for (let j = 1; j <= k; j++) {
            min = Math.min(
                min,
                i - j >= 0
                    ? dp[i - j] + Math.abs(arr[i] - arr[i - j])
                    : Infinity
            );
        }
        dp[i] = min;
    }

    return dp[n - 1];
}

// House Rober OR
// Given an array of ‘N’  positive integers, we need to
// return the maximum sum of the subsequence such that
// no two elements of the subsequence are adjacent elements in the array.

function solve(arr, n) {
    if (n == 0) {
        return 0;
    }

    if (n == 1) {
        return arr[0];
    }

    let firstWay = arr[n - 1] + solve(arr, n - 2);

    let secondWay = 0 + solve(arr, n - 1);

    return Math.max(firstWay, secondWay);
}

// memoization

function solve(arr, n, memo = {}) {
    if (n in memo) return memo[n];
    if (n == 0) return 0;
    if (n == 1) return arr[0];

    let robCurrent = arr[n - 1] + solve(arr, n - 2, memo);
    let skipCurrent = solve(arr, n - 1, memo);

    memo[n] = Math.max(robCurrent, skipCurrent);
    return memo[n];
}

function solve(arr) {
    let dp = [];
    let n = arr.length;
    dp[0] = 0;
    dp[1] = arr[0];

    for (let i = 2; i <= n; i++) {
        dp[i] = Math.max(arr[i - 1] + dp[i - 2], dp[i - 1]);
    }

    return dp[n];
}

function solve(arr) {
    let n = arr.length;
    if (n == 0) return 0;
    if (n == 1) return arr[0];
    let prev2 = 0;
    let prev = arr[0];

    for (let i = 2; i <= n; i++) {
        let t = Math.max(arr[i - 1] + prev2, prev);

        prev2 = prev;
        prev = t;
    }

    return prev;
}

// ----------------------------------------------------striver-----------------------

// How to identify DP Problems, 1) Optimal 2) they might have given you choices

// BASE CASE : Find the smallest possible input

// find the choices at given point and make the condition for choices

// then find how we are assinging value based on conditon

//Recursive -> memoize -> DP

// 1) Fractional knapsack
// 2) 0/1 knapsack
// 3) Unbounded knapsack

function knapsack(wt, val, capacity, n) {
    if (capacity == 0 || n == 0) {
        return 0;
    }

    if (wt[n - 1] <= capacity) {
        return Math.max(
            val[n - 1] + knapsack(wt, val, capacity - wt[n - 1], n - 1),
            knapsack(wt, val, capacity, n - 1)
        );
    } else {
        return knapsack(wt, val, capacity, n - 1);
    }
}

// memoization
function knapsack(wt, val, capacity, n, memo) {
    // Base case: If no items or no capacity, return 0
    if (n === 0 || capacity === 0) {
        return 0;
    }

    // If the result is already computed, return it
    if (memo[n][capacity] !== -1) {
        return memo[n][capacity];
    }

    // If the current item's weight is within the capacity
    if (wt[n - 1] <= capacity) {
        // Option 1: Include the item
        const include = val[n - 1] + knapsack(wt, val, capacity - wt[n - 1], n - 1, memo);
        // Option 2: Exclude the item
        const exclude = knapsack(wt, val, capacity, n - 1, memo);
        // Store the max of the two options
        memo[n][capacity] = Math.max(include, exclude);
    } else {
        // If the item's weight exceeds capacity, skip it
        memo[n][capacity] = knapsack(wt, val, capacity, n - 1, memo);
    }

    return memo[n][capacity];
}

// Helper function to initialize memo and call knapsack
function solveKnapsack(wt, val, capacity) {
    const n = wt.length;
    // Initialize memo[n+1][capacity+1] with -1
    const memo = Array.from({ length: n + 1 }, () => 
        new Array(capacity + 1).fill(-1)
    );
    return knapsack(wt, val, capacity, n, memo);
}
// in DP Recursion's base conditions gets converted into Intialisation

function knapsack(wt, val, capacity, n) {
    // intialisation

    let dp = Array.from({ length: n + 1 }, () =>
        new Array(capacity + 1).fill(-1)
    );

    for (let w = 0; w < n + 1; w++) {
        for (let v = 0; v < capacity + 1; v++) {
            if (w == 0 || v == 0) {
                dp[w][v] = 0;
            }
        }
    }

    for (let i = 1; i < n + 1; i++) {
        for (let j = 1; j < capacity + 1; j++) {
            if (wt[i - 1] <= j) {
                dp[i][j] = Math.max(
                    val[i - 1] + dp[i - 1][j - wt[i - 1]],
                    dp[i - 1][j]
                );
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }

    return dp[capacity][n];
}

function knapsack(weights, values, capacity) {
    const n = weights.length;
    // Create a 1D array to store the maximum value for each capacity
    const dp = new Array(capacity + 1).fill(0);

    // Iterate over each item
    for (let i = 0; i < n; i++) {
        // Traverse the dp array from right to left
        // Why Right-to-Left Update?
        // Updating from capacity down to weights[i] ensures that we don't reuse
        // the same item multiple times (which would turn it into the unbounded 
        // knapsack problem). Left-to-right updates would allow items to be used repeatedly.
        for (let w = capacity; w >= weights[i]; w--) {
            dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }

    return dp[capacity];
}

// Test example
// const weights = [1, 3, 4, 5];
// const values = [10, 40, 50, 70];
// const capacity = 8;
console.log(knapsack(weights, values, capacity)); // Output: 110

// if you have given max Capcity /Target and you have given choices to weather take it or not , so that problem can be solved using knapsack way

// Subset Sum

function isSubsetSum(set, n, sum) {
    // Base Cases
    if (sum === 0) {
        return true; // A sum of 0 can always be achieved with an empty subset
    }
    if (n === 0) {
        return false; // No items left, and the sum is not 0
    }

    // If the last element is greater than the sum, ignore it
    if (set[n - 1] > sum) {
        return isSubsetSum(set, n - 1, sum);
    }

    // Check if the sum can be obtained by including or excluding the last element
    return (
        isSubsetSum(set, n - 1, sum) ||
        isSubsetSum(set, n - 1, sum - set[n - 1])
    );
}

// Example usage
let set = [3, 34, 4, 12, 5, 2];
let targetSum = 9;
let n = set.length;

console.log(isSubsetSum(set, n, targetSum)); // Output: true

function isSubsetSumDP(set, n, sum) {
    for (let i = 0; i < n + 1; i++) {
        for (let j = 0; j < sum + 1; j++) {
            if (i == 0) {
                dp[i][j] = false;
            }

            if (j == 0) {
                dp[i][j] = true;
            }
        }
    }

    for (let i = 1; i < n + 1; i++) {
        for (let j = 1; j < sum + 1; j++) {
            if (set[i - 1] <= j) {
                dp[i][j] = dp[i - 1][j - set[i - 1]] || dp[i - 1][j];
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }
}

function isSubsetSumDP(set, n, sum) {
    // Create a 1D array to store intermediate results
    const dp = new Array(sum + 1).fill(false);

    // Base case: A sum of 0 can always be achieved with an empty subset
    dp[0] = true;

    // Fill the dp array
    for (let i = 0; i < n; i++) {
        // Iterate over each element in the set
        for (let j = sum; j >= set[i]; j--) {
            // Iterate from sum down to the current element's value
            dp[j] = dp[j] || dp[j - set[i]];
        }
    }

    // The final result is stored in dp[sum]
    return dp[sum];
}

// Example usage
// const set = [3, 34, 4, 12, 5, 2]; // Input set
// const sum = 9; // Target sum
// const n = set.length; // Number of elements in the set

// const result = isSubsetSumDP(set, n, sum);
// console.log("Subset with sum", sum, "exists:", result);

//Equal Sum Partition Problem Sum(arr)%2!=0 return false we can't divide array in 2 parts such that there sum is equal  if sum is even then we can isSubSetSumDP(set,n,sum/2);

// CountSubSetSum

function CountSubSetSum(set, n, sum) {
    // Base Cases
    if (sum === 0) {
        return 1; // A sum of 0 can be achieved with one subset: the empty subset
    }
    if (n === 0) {
        return 0; // No items left, and the sum is not 0
    }

    // If the last element is greater than the sum, ignore it
    if (set[n - 1] > sum) {
        return CountSubSetSum(set, n - 1, sum);
    }

    // Check if the sum can be obtained by including or excluding the last element
    return (
        CountSubSetSum(set, n - 1, sum) +
        CountSubSetSum(set, n - 1, sum - set[n - 1])
    );
}

// Example usage
// let set = [3, 34, 4, 12, 5, 2];
// let targetSum = 9;
// let n = set.length;

console.log(CountSubSetSum(set, n, targetSum)); // Output: Number of subsets that sum to targetSum
let dp = Array.from({ length: n + 1 }, () => Array(sum + 1).fill(-1));
function iCountSubSetSumDP(set, n, sum) {
    for (let i = 0; i < n + 1; i++) {
        for (let j = 0; j < sum + 1; j++) {
            if (i == 0) {
                dp[i][j] = 0;
            }

            if (j == 0) {
                dp[i][j] = 1;
            }
        }
    }

    for (let i = 1; i < n + 1; i++) {
        for (let j = 1; j < sum + 1; j++) {
            if (set[i - 1] <= j) {
                dp[i][j] = dp[i - 1][j - set[i - 1]] + dp[i - 1][j];
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }
}

// Minimum Subset Sum Difference Problem
//

function iCountSubSetSumDP(set, n, sum) {
    let dp = Array.from({ length: n + 1 }, () => new Array(sum + 1).fill());
    for (let i = 0; i < n + 1; i++) {
        for (let j = 0; j < sum + 1; j++) {
            if (i == 0) {
                dp[i][j] = false;
            }

            if (j == 0) {
                dp[i][j] = true;
            }
        }
    }

    for (let i = 1; i < n + 1; i++) {
        for (let j = 1; j < sum + 1; j++) {
            if (set[i - 1] <= j) {
                dp[i][j] = dp[i - 1][j - set[i - 1]] || dp[i - 1][j];
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }

    return dp[dp.length - 1];
}

let arr = [1, 2, 7, 1];

let ans = iCountSubSetSumDP(arr, 4, 11);
// s1+s2 =sum;
// s1-s2 = diff;
// sum-2*s2 = diff;

let total = arr.reduce((acc, cur) => acc + cur, 0);

console.log(ans);
console.log(total);
let min = Infinity;
for (let i = 0; i <= Math.floor(total / 2); i++) {
    if (ans[i] == true) {
        min = Math.min(min, total - 2 * i);
    }
}

console.log(min);

// [
//     true,  true, true,
//     true,  true, false,
//     false, true, true,
//     true,  true, true
//   ]
//   11 - > Total
//   3 -> min Diffrence

//UnBounded Knapsack
function unboundedKnapsack(weights, values, capacity, n) {
    // Base case: If capacity is 0 or no items left
    if (capacity == 0 || n == 0) {
        return 0;
    }

    // If weight of the nth item is more than the capacity, it cannot be included
    if (weights[n - 1] > capacity) {
        return unboundedKnapsack(weights, values, capacity, n - 1);
    } else {
        // Return the maximum of two cases:
        // 1. nth item included (can be included again)
        // 2. nth item not included
        return Math.max(
            values[n - 1] +
                unboundedKnapsack(
                    weights,
                    values,
                    capacity - weights[n - 1],
                    n
                ),
            unboundedKnapsack(weights, values, capacity, n - 1)
        );
    }
}

// Test example
const weights = [1, 3, 4, 5];
const values = [10, 40, 50, 70];
const capacity = 8;
n = weights.length;
console.log(unboundedKnapsack(weights, values, capacity, n)); 

// Output: 110
// Rode Cutting Problem

// Price [] - > Value
// Length  [] - > weight
// N :  8  -> Capacity

function knapsack(wt, val, capacity, n) {
    // intialisation

    let dp = Array.from({ length: n + 1 }, () =>
        new Array(capacity + 1).fill(-1)
    );

    for (let w = 0; w < n + 1; w++) {
        for (let v = 0; v < capacity + 1; v++) {
            if (w == 0 || v == 0) {
                dp[w][v] = 0;
            }
        }
    }

    for (let i = 1; i < n + 1; i++) {
        for (let j = 1; j < capacity + 1; j++) {
            if (wt[i - 1] <= j) {
                dp[i][j] = Math.max(
                    val[i - 1] + dp[i][j - wt[i - 1]],
                    dp[i - 1][j]
                ); // val[i-1]+dp[i -1][j-wt[i]] -> val[i-1]+dp[i][j-wt[i]]
                // we can choose the Unlimited times
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }

    return dp[capacity][n];
}

// min number of cins

function coinChange(coins, amount) {
    const n = coins.length;

    // Create a 2D array with (n + 1) rows and (amount + 1) columns
    const dp = Array.from({ length: n + 1 }, () =>
        Array(amount + 1).fill(Infinity)
    );

    // Base case: 0 coins are needed to make the amount 0
    for (let i = 0; i <= n; i++) {
        dp[i][0] = 0;
    }

    // Fill the dp array
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= amount; j++) {
            // If the coin value is less than or equal to the amount
            if (coins[i - 1] <= j) {
                // Minimum of Include the coin , exclude the coin
                dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - coins[i - 1]] + 1);
            } else {
                // Exclude the coin
                dp[i][j] = dp[i - 1][j];
            }
        }
    }

    // If dp[n][amount] is still Infinity, it means we cannot form that amount
    return dp[n][amount] === Infinity ? -1 : dp[n][amount];
}

// Example usage
const coins = [1, 2, 5]; // Coin denominations
const amount = 11; // Target amount

console.log(coinChange(coins, amount)); // Output: Minimum number of coins needed

// ---------------------------------LCS----------------------------------------------------

function longestCommonSubsequence(str1, str2) {
    const m = str1.length;
    const n = str2.length;

    // Create a 2D array to store lengths of longest common subsequences
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    // Fill the dp array
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1; // Characters match
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]); // Take the max
            }
        }
    }

    // The length of the longest common subsequence is found at dp[m][n]
    const lcsLength = dp[m][n];

    // Reconstruct the LCS string
    let lcs = "";
    let i = m,
        j = n;
    while (i > 0 && j > 0) {
        if (str1[i - 1] === str2[j - 1]) {
            lcs = str1[i - 1] + lcs; // Prepend character to LCS
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--; // Move up in the table
        } else {
            j--; // Move left in the table
        }
    }

    return { lcsLength, lcs }; // Return both length and LCS string
}

// Example usage
// const str1 = "ABCBDAB";
// const str2 = "BDCAB";
const result = longestCommonSubsequence(str1, str2);
console.log(`Length of LCS: ${result.lcsLength}`); // Output: Length of LCS
console.log(`LCS: "${result.lcs}"`); // Output: LCS string

//

function longestCommonSubstring(str1, str2) {
    const m = str1.length;
    const n = str2.length;

    // Create a 2D array to store lengths of longest common suffixes
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    let maxLength = 0; // To keep track of the length of the longest common substring
    let endIndex = 0; // To keep track of the end index of the longest common substring in str1

    // Fill the dp array
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1; // Increment length
                if (dp[i][j] > maxLength) {
                    maxLength = dp[i][j];
                    endIndex = i; // Update the end index
                }
            } else {
                dp[i][j] = 0;
            }
        }
    }

    // Extract the longest common substring using the end index and maxLength
    const longestCommonSubstr = str1.substring(endIndex - maxLength, endIndex);
    return longestCommonSubstr;
}

// Example usage
const str1 = "ABABC";
const str2 = "BABCDA";
console.log(longestCommonSubstring(str1, str2)); // Output: "BAB"

// ----------------------------------------------------------------------------------------------------------------------//

function shortestCommonSupersequence(str1, str2) {
    const m = str1.length;
    const n = str2.length;

    // Create a 2D array to store lengths of longest common subsequences
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    // Fill the dp array for LCS
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;  // Characters match
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]); // Take the max
            }
        }
    }

    // Construct the SCS\ 
    let scs = "";
    let i = m,
        j = n;

    while (i > 0 && j > 0) {
        // Using && condition here
        if (str1[i - 1] === str2[j - 1]) {
            scs = str1[i - 1] + scs; // Add common character
            i--;
            j--;
        } else if (dp[i - 1][j] >= dp[i][j - 1]) {
            scs = str1[i - 1] + scs; // Add character from str1
            i--;
        } else {
            scs = str2[j - 1] + scs; // Add character from str2
            j--;
        }
    }

    // Add remaining characters from str1 or str2
    while (i > 0) {
        scs = str1[i - 1] + scs;
        i--;
    }
    while (j > 0) {
        scs = str2[j - 1] + scs;
        j--;
    }

    return scs; // Return the shortest common supersequence
}

// Example usage
// const str1 = "AGGTAB";
// const str2 = "GXTXAYB";
// const result = shortestCommonSupersequence(str1, str2);
console.log(`Shortest Common Supersequence: "${result}"`); // Output: "AGXGTXAYB"

// Matrix Chain Multiplication
//Identification and General Format

function Solve(arr, i, j) {
    if (i > j) {
        return 0; // base condtion think of a first invalid input
    }

    for (let k = i; k < j; k++) {
        let tempAns = Solve(arr, i, k) + Solve(arr, k + 1, j); // divide to resolve

        let ans = Math.max(ans, tempAns); // some Function

        return ans;
    }
}

function matrixChainOrder(p, i, j, memo) {
    // Check if the result is already computed
    if (memo[i][j] !== -1) {
        return memo[i][j];
    }

    // Base case: when there's only one matrix
    if (i === j) {
        //i>=j
        return 0;
    }

    let minCost = Infinity;

    // Try different positions to split the chain
    for (let k = i; k < j; k++) {
        const cost =
            matrixChainOrder(p, i, k, memo) +
            matrixChainOrder(p, k + 1, j, memo) +
            p[i - 1] * p[k] * p[j];

        minCost = Math.min(minCost, cost);
    }

    // Store the result in memoization table
    memo[i][j] = minCost;
    return minCost;
}

function matrixChainMultiplication(dimensions) {
    const n = dimensions.length;
    // Create a memoization table initialized with -1
    const memo = Array.from({ length: n }, () => Array(n).fill(-1));

    return matrixChainOrder(dimensions, 1, n - 1, memo);
}

// Example usage
const dimensions = [10, 20, 30, 40, 30]; // Represents matrices A1(10x20), A2(20x30), A3(30x40), A4(40x30)
// const result = matrixChainMultiplication(dimensions);
console.log(`Minimum number of multiplications is: ${result}`); // Output: Minimum number of multiplications is: 30000

//LIS Problems

//1) Express Everything in terms of indexes
//2) Explore All (take it or not take it)
//3) Take the max length, Math.max(not take, take)
//4) Base Case

arr = [5, 4, 11, 1, 16, 8];
function LIS(index, prev_index) {
    if (index === arr.length) {
        return 0;
    }

    if (memo[index][prev_index + 1] !== -1) {
        return memo[index][prev_index + 1];
    }

    let len = 0 + LIS(index + 1, prev_index); // don't include the currr index in LIS

    if (prev_index === -1 || arr[index] > arr[prev_index]) {
        len = Math.max(len, 1 + LIS(index + 1, index));
    }
    memo[index][prev_index + 1] = len;
    return len;
}

n = arr.length;
memo = Array.from({ length: n }, () => new Array(n + 1).fill(-1));

console.log(LIS(0, -1));

// Rule for converting Recusrsion/Memoization solution to dp

// 1) create a DP array of same size
// 2) Base Case
// 3) write the chaging paramters in opposite fashion

// index => n-1 to 0
// prev_index => n-1 to -1 => index-1 to -1

//4) copy the recurrence & make sure you following coordinate shift.

function ninjaTraining(n, points) {
    function solve(n, points, prevActivity) {
        if (n === 0) {
            return 0;
        }

        let max = 0;
        let first, second;

        if (prevActivity == 0) {
            let first =
                point[n - 1][1] +
                Math.max(solve(n - 1, points, 0), solve(n - 1, points, 2));
            let second =
                point[n - 1][2] +
                Math.max(solve(n - 1, points, 0), solve(n - 1, points, 1));
        } else if (prevActivity == 1) {
            let first =
                point[n - 1][0] +
                Math.max(solve(n - 1, points, 1), solve(n - 1, points, 2));
            let second =
                point[n - 1][2] +
                Math.max(solve(n - 1, points, 0), solve(n - 1, points, 1));
        } else {
            let first =
                point[n - 1][0] +
                Math.max(solve(n - 1, points, 1), solve(n - 1, points, 2));
            let second =
                point[n - 1][1] +
                Math.max(solve(n - 1, points, 0), solve(n - 1, points, 2));
        }

        return Math.max(first, second);
    }
}
