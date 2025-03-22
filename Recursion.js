// print your name n times

// learn first decide base case;
function print(n) {
    if (n == 0) return;

    console.log("JAydeep");

    print(n - 1);
}

// print(3);

// print 1 to n ;
let n = 5;

function print1toN(count) {
    if (count > n) {
        return;
    }

    console.log(count);
    print1toN(count + 1);
}

// print1toN(1);

// IN RECURSION BASE CONDITION :    your limit +1 ; or your limit -1 ; // aapko jaha tak jana usse ek level
// ek level niche

function printNto1(count) {
    if (count > n) {
        return;
    }
    printNto1(count + 1);
    console.log("C", count);
}

// printNto1(1);

function backtrack(count) {
    if (count == 0) {
        return;
    }

    backtrack(count - 1);
    console.log(count);
}

// backtrack(5);

// sum of first  k numbers

// 2 TYPES OF RECURSION :  PARAMETERISED AND FUNCTIONAL RECURSION

// FUNTIONAL RECUSRSION // HERE WE WANT FUNCTION TO RETURN OUR ANSWER
function sumOfK(k) {
    if (k > arr.length) {
        console.log("Not possible");
    }

    if (k === 0) {
        return 0;
    }

    return arr[k - 1] + sumOfK(k - 1);
}
let arr = [3, 1, -1, 5, 6, 6, 1, 3];
let k = 2;
// console.log(sumOfK(k));

// here currSum represents sum till NOw

// parameterised way
// HERE WE PRINT THE ANSWER IN THE END , WE DON'T EXPECT ANSWER TO BE RETURNED FRON FUNCTION
//
function sumK(count, currSum) {
    if (count === 0) {
        console.log("CurrSum ", currSum);
        return;
    }

    sumK(count - 1, currSum + arr[count - 1]);
}

// sumK(k, 0);
// LEARN : PLEASE CAREFULLY THINNK OF BASE CONDITION // FIRST INVALID INPUT OR SMALLEST INPUT
// THINK OF WHAT INTIAL PARAMETER YOU WILL PASS TO FUNCTION //KISKA ANSWER LANA HAIN
// THINK OF WHAT PARAMETERS MY FUNCTION WILL HAVE
function reverse(left, right) {
    if (left >= right) {
        return arr;
    }

    [arr[left], arr[right]] = [arr[right], arr[left]];
    return reverse(left + 1, right - 1);
}

arr = [1, 2, 3, 4, 5, 6];

// console.log(reverse(0, arr.length - 1));
// console.log(arr);

// LEARN : FOCUS ON BASE CONDITION BE CAREFUL WHILE WRINTING BASE CONDITION
// Metion Time & Space complexity of your approach carefully
let len = arr.length;
function rev(index) {
    if (index >= Math.floor(len / 2)) {
        return arr;
    }
    [arr[index], arr[len - index - 1]] = [arr[len - index - 1], arr[index]];

    return rev(index + 1);
}

// console.log(rev(0));

let str = "abcba";

function isPalindrome(left, right) {
    if (left >= right) {
        return true;
    }
    if (str.at(left) !== str.at(right)) return false;

    return isPalindrome(left + 1, right - 1);
}

console.log(isPalindrome(0, str.length - 1));

/// RECURSION TYPE : MULTIPLE RECURSION CALL
// lEARNING : HOW'S THE RECUSRSION TREE LOOKS
// get nth fibonacacci
function Fibo(n) {
    if (n <= 1) {
        return n;
    }

    return Fibo(n - 1) + Fibo(n - 2);
}

// Time Complexity : 2^N  EXPONENTIAL

function print1(index, str) {
    if (index === s.length) {
        console.log(str);
        return;
    }

    print1(index + 1, str);
    print1(index + 1, str + s.at(index));
}

let s = "aabc";
// print1(0, "");
// "" , a, b, c, ab,ac, bc, abc
let a = [2, 1, 2, 3];
let ans = [];
function print(index, arr) {
    if (index === a.length) {
        ans.push([...arr]); // O(n)
        return;
    }
    arr.push(a[index]);
    print(index + 1, arr);
    arr.pop();
    print(index + 1, arr);
}

// print(0, []);//
// console.log(ans);//

//Time complexity : O(2^N * N)
// Space complexity : O(N)

// print all subsequences with sum K
a = [-1, 2, 3, 0];
ans = new Set();
function printSumK1(index, sum, arr) {
    if (sum < 0) {
        return;
    }
    if (sum === 0) {
        ans.add(arr.join(""));
    }

    if (index === a.length) {
        return;
    }

    sum -= a[index];
    arr.push(a[index]);
    printSumK(index + 1, sum, arr);
    arr.pop();
    sum += a[index];
    printSumK(index + 1, sum, arr);
}

// printSumK(0, 3, []);
// console.log(Array.from(ans).map((item) => item.split("").map(Number)));

// LEARN : HOW TO PRINT ONLY ONE ANSWER
a = [-1, 2, 3, 0];

function printSumK(index, sum, arr) {
    if (sum === 0) {
        console.log(arr);
        return true;
    }

    if (index === a.length || sum < 0) {
        // 2nd condition only valid if arraycontains only positive elements
        return false;
    }

    sum -= a[index];
    arr.push(a[index]);
    let first = printSumK(index + 1, sum, arr);
    if (first) {
        return first;
    }
    arr.pop();
    sum += a[index];
    let last = printSumK(index + 1, sum, arr);
    if (last) {
        return last;
    }
}

console.log(printSumK(0, 3, []));

// IF THEY ASK TOTAL SUBSEQUENCES
// whose sum is k then return instead of true and false return 1 and 0 and
//  in theend return first+ last

// PRINT : print from parameter
// PRINT 1 : return true/false avoid further recursion calls
// COUNT : return 1 or 0 and add all function calls (really important whenevr you have asked for the count)

a = [2, 3, 6, 7];
let target = 7;

// 4 not add, index ->> infinite recusion calls not the choice we have

// TCSC   : O(2^t * k) , K*X (average length of combi = k , x  = total number of combi )
// t  average number of choices

// we have 3 choices here
// 1) add ,index +1
// 2) add, index
// 3) not add , index +1

function combiSum(index, target, arr) {
    if (index === a.length) {
        if (target === 0) {
            console.log(arr);
        }

        return;
    }

    if (target < 0) {
        return;
    }
    if (a[index] <= target) {
        // 2)  choosen and stayed on the same index;
        target -= a[index];
        arr.push(a[index]);
        combiSum(index, target, arr);
        target += a[index];
        arr.pop();
    }

    // combiSum(index + 1, target, arr);
    // on 2nd recursive call 1st case is automatically covered using 2nd condition from above

    combiSum(index + 1, target, arr); //3)  Not choosen move ahead
}

// combiSum(0, target, []);

// in combiSum 2 we can't same element twice that's
// why we just increased our index +1 that's the only change from
// above code which we need to make

// we will set to store the answer to avoid duplicates
//TCSC O(2^N * K LOG(size of set)) because of log factor interviwer wil say to improve it
function combiSum2(index, target, arr) {
    if (index === a.length) {
        if (target === 0) {
            console.log(arr);
        }

        return;
    }

    if (target < 0) {
        return;
    }
    if (a[index] <= target) {
        // 2)  choosen and stayed on the same index;
        target -= a[index];
        arr.push(a[index]);
        combiSum2(index + 1, target, arr);
        target += a[index];
        arr.pop();
    }

    // combiSum(index + 1, target, arr);
    // on 2nd recursive call 1st case is automatically covered using 2nd condition from above

    combiSum2(index + 1, target, arr); //3)  Not choosen move ahead
}

function combiSumOptimised() {
    function backtrack(index, target, temp, ans) {
        if (target === 0) {
            ans.push([...temp]);
            return;
        }

        for (let i = index; i < a.length; i++) {
            // technique to skip the duplicates
            if (i !== index && a[i] === a[i - 1]) continue; // skip the duplicate cobination because
            // we can't put same element on same index we can also write  i > index

            if (a[i] > target) break;

            temp.push(a[i]);
            backtrack(i + 1, target - a[i], temp, ans);
            temp.pop();
        }
    }
    let ans = [];
    let a = [1, 1, 1, 2, 2];
    let target = 4;
    a.sort();
    backtrack(0, target, [], ans);
    console.log("ANS", ans);
}
// combiSumOptimised();

// K -> Average length of a combination
// x-> number of combinations
// TCSC  : O(2^N * K)  : O(K * x)

// ------------------------------
nums = [3, 1, 2];
ans = [];
tempans = [];
function subsetSum(index, currSum, temp) {
    if (index === nums.length) {
        ans.push([...temp]);
        tempans.push(currSum);
        return;
    }
    temp.push(nums[index]);
    subsetSum(index + 1, currSum + nums[index], temp);
    temp.pop();
    subsetSum(index + 1, currSum, temp);
}

nums.sort((a, b) => a - b);
subsetSum(0, 0, []);
console.log(ans);
console.log(tempans);

//TCSC : O(2^N NLogN) : O(2^N)
