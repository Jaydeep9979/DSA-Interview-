// How to identify DP Problems, 1) Optimal 2) they might have given you choices 

// BASE CASE : Find the smallest possible input 

//find the choices at given point and make the condition for choices 

// then find how we are assginging value based on conditon 

//Recursive -> memoize -> DP

// 1) Fractional knapsack
// 2) 0/1 knapsack
// 3) Unbounded knapsack


function knapsack(wt,val,capacity,n){

    if(capacity==0 || n==0){
        return 0;
    }

    if(wt[n-1]<=capacity){
        return Math.max(val[n-1]+knapsack(wt,val,capacity-wt[n-1],n-1),knapsack(wt,val,capacity,n-1));
    }
    else{
        return knapsack(wt,val,capacity,n-1);
    }

}

// memoization 

let memo  = Array.from({length:capacity+1},()=>new Array(n+1).fill(-1));
function knapsack(wt,val,capacity,n,memo){

    if(capacity==0 || n==0){
        return 0;
    }

    if(memo[n][w]!=-1){
        return memo[n][w];
    }

    if(wt[n-1]<=capacity){
         memo[n][w] = Math.max(val[n-1]+knapsack(wt,val,capacity-wt[n-1],n-1),knapsack(wt,val,capacity,n-1));
         return memo[n][w];
    }
    else{
        memo[n][w] =  knapsack(wt,val,capacity,n-1);
        return memo[n][w];
    }

}

// in DP Recursion's base conditions gets converted into Intialisation 


function knapsack(wt,val,capacity,n){
    // intialisation 

    let dp  = Array.from({length:n+1},()=>new Array(capacity+1).fill(-1));
    for(let w = 0; w< n+1;w++){
        for(let v=0;v<capacity+1;v++){
            if(w==0 || v==0){
                dp[w][v]=0;
            }   
        }
    }

    for(let i=1;i<n+1;i++){
        for(let j=1;j<capacity+1;j++){
            if(wt[i-1]<=j){
                dp[i][j]=Math.max(val[i-1]+dp[i-1][j-wt[i]], dp[i-1][j]);
            }
            else{
                dp[i][j] = dp[i-1][j];
            }
        }
    } 

    return dp[capacity][n];

}

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
    return isSubsetSum(set, n - 1, sum) || isSubsetSum(set, n - 1, sum - set[n - 1]);
}

// Example usage
let set = [3, 34, 4, 12, 5, 2];
let targetSum = 9;
let n = set.length;

console.log(isSubsetSum(set, n, targetSum)); // Output: true

function isSubsetSumDP(set, n, sum){
    for(let i=0;i<n+1;i++){
        for(let j=0;j<sum+1;j++){
            if(i==0){
                dp[i][j] = false;
            }

            if(j==0){
                dp[i][j] = true;
            }
        }
    }


    for(let i=1;i<n+1;i++){
        for(let j=1;j<sum+1;j++){
            if(set[i-1]<=j){
                dp[i][j] = dp[i-1][j-set[i-1]] || dp[i-1][j];
            }
            else{
                dp[i][j] = dp[i-1][j];
            }
        }
    }

}


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
    return CountSubSetSum(set, n - 1, sum) + CountSubSetSum(set, n - 1, sum - set[n - 1]);
}

// Example usage
// let set = [3, 34, 4, 12, 5, 2];
// let targetSum = 9;
// let n = set.length;

console.log(CountSubSetSum(set, n, targetSum)); // Output: Number of subsets that sum to targetSum


function iCountSubSetSumDP(set, n, sum){
    for(let i=0;i<n+1;i++){
        for(let j=0;j<sum+1;j++){
            if(i==0){
                dp[i][j] = 0;
            }

            if(j==0){
                dp[i][j] = 1;
            }
        }
    }


    for(let i=1;i<n+1;i++){
        for(let j=1;j<sum+1;j++){
            if(set[i-1]<=j){
                dp[i][j] = dp[i-1][j-set[i-1]] + dp[i-1][j];
            }
            else{
                dp[i][j] = dp[i-1][j];
            }
        }
    }

}


// Minimum Subset Sum Difference
function iCountSubSetSumDP(set, n, sum){
    let dp = Array.from({length:n+1},()=>new Array(sum+1).fill());
    for(let i=0;i<n+1;i++){
        for(let j=0;j<sum+1;j++){
            if(i==0){
                dp[i][j] = false;
            }

            if(j==0){
                dp[i][j] = true;
            }
        }
    }


    for(let i=1;i<n+1;i++){
        for(let j=1;j<sum+1;j++){
            if(set[i-1]<=j){
                dp[i][j] = dp[i-1][j-set[i-1]] || dp[i-1][j];
            }
            else{
                dp[i][j] = dp[i-1][j];
            }
        }
    }
    
    return dp[dp.length-1] ; 
}


let arr = [1,2,7,1]; 


let ans = iCountSubSetSumDP(arr,4,11);
// s1+s2 =sum;
// s1-s2 = diff; 
// sum-2*s2 = diff;

let total  = arr.reduce((acc,cur)=>acc+cur,0);

console.log(ans);
console.log(total);
let min = Infinity;
for(let i=0;i<=Math.floor(total/2) ;i++){
    
    if(ans[i]==true){
        min=Math.min(min,total - 2*i);
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
// Rode Cutting Problem 

// Price [] - > Value
// Length  [] - > weight
// N :  8  -> Capacity 


function knapsack(wt,val,capacity,n){
    // intialisation 

    let dp  = Array.from({length:n+1},()=>new Array(capacity+1).fill(-1));
    for(let w = 0; w< n+1;w++){
        for(let v=0;v<capacity+1;v++){
            if(w==0 || v==0){
                dp[w][v]=0;
            }   
        }
    }

    for(let i=1;i<n+1;i++){
        for(let j=1;j<capacity+1;j++){
            if(wt[i-1]<=j){
                dp[i][j]=Math.max(val[i-1]+dp[i][j-wt[i]], dp[i-1][j]);  // val[i-1]+dp[i -1][j-wt[i]] -> val[i-1]+dp[i][j-wt[i]] 
                                                                        // we can choose the Unlimited times
            }
            else{
                dp[i][j] = dp[i-1][j];
            }
        }
    } 

    return dp[capacity][n];

}


// min number of cins 


function coinChange(coins, amount) {
    const n = coins.length;

    // Create a 2D array with (n + 1) rows and (amount + 1) columns
    const dp = Array.from({ length: n + 1 }, () => Array(amount + 1).fill(Infinity));
    
    // Base case: 0 coins are needed to make the amount 0
    for (let i = 0; i <= n; i++) {
        dp[i][0] = 0;
    }

    // Fill the dp array
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= amount; j++) {
            // If the coin value is less than or equal to the amount
            if (coins[i - 1] <= j) {
                // Include the coin + exclude the coin
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
const amount = 11;       // Target amount

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
    let lcs = '';
    let i = m, j = n;
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
    let endIndex = 0;  // To keep track of the end index of the longest common substring in str1

    // Fill the dp array
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1; // Increment length
                if (dp[i][j] > maxLength) {
                    maxLength = dp[i][j];
                    endIndex = i; // Update the end index
                }
            }
            else{
                dp[i][j]=0;
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
                dp[i][j] = dp[i - 1][j - 1] + 1; // Characters match
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]); // Take the max
            }
        }
    }

    // Construct the SCS
    let scs = '';
    let i = m, j = n;

    while (i > 0 && j > 0) { // Using && condition here
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


function Solve(arr,i,j){

    if(i>j){
        return 0; // base condtion think of a first invalid input 
    }

    for(let k=i ;k<j ; k++){
        let tempAns = Solve(arr,i,k) + Solve(arr,k+1,j); // divide to resolve 

        let ans = Math.max(ans,tempAns); // some Function 

        return ans;
    }

}

function matrixChainOrder(p, i, j, memo) {
    // Check if the result is already computed
    if (memo[i][j] !== -1) {
        return memo[i][j];
    }

    // Base case: when there's only one matrix
    if (i === j) { //i>=j
        return 0;
    }

    let minCost = Infinity;

    // Try different positions to split the chain
    for (let k = i; k < j; k++) {
        const cost = matrixChainOrder(p, i, k, memo) + 
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



