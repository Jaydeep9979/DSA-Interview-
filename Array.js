// Tips for Speed and Explanation
// Framework for Explaining:
//      State the problem clearly.
//      Outline the brute force approach and its drawbacks.
//      Present the optimized solution with its time/space complexity.
//      Use examples to explain edge cases.
// Pattern Recognition: Focus on identifying recurring patterns in DSA problems.
// Timer-Based Practice: Set time limits (e.g., 20-30 mins) to simulate real-time constraints.
// Learn from Mistakes: Regularly review failed attempts to avoid repeating errors.
// Stay Consistent: Even on busy days, solve at least one problem or review notes.

// Fixed Size Sliding window vs Variable Size sliding window

// Max Sum Subarray of size K
// Input: arr[] = [100, 200, 300, 400] , k = 2
// Output: 700
// Explanation: arr3  + arr4 = 700, which is maximum.

function mergeSort(arr) {
    if (arr.length == 1) {
        return arr;
    }

    let mid = Math.floor(arr.length / 2);
    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid));

    function merge(left, right) {
        let res = [];
        let i = 0,
            j = 0;
        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                res.push(left[i]);
                i++;
            } else {
                res.push(right[j]);
                j++;
            }
        }

        while (i < left.length) {
            res.push(left[i]);
            i++;
        }

        while (j < right.length) {
            res.push(right[j]);
            j++;
        }

        return res;
    }

    return merge(left, right);
}

console.log(mergeSort([5, 2, 8, 5, 1, 4]));

// Maximum Sum Subarray of size K
// Input: arr[] = [100, 200, 300, 400] , k = 2
// Output: 700
// Explanation: arr3  + arr4 = 700, which is maximum.

class Solution {
    maximumSumSubarray(arr, k) {
        let i = 0,
            j = 0;
        let sum = 0;
        let ans = 0;

        while (j < arr.length) {
            sum += arr[j];

            if (j - i + 1 == k) {
                ans = Math.max(ans, sum);
                sum -= arr[i];
                i++;
            }

            j++;
        }

        return ans;
    }
}

//First negative in every window of size k

// Input: arr[] = [-8, 2, 3, -6, 10] , k = 2
// Output: [-8, 0, -6, -6]
// Explanation:
// Window {-8, 2}: First negative integer is -8.
// Window {2, 3}: No negative integers, output is 0.
// Window {3, -6}: First negative integer is -6.
// Window {-6, 10}: First negative integer is -6.

class Solution {
    FirstNegativeInteger(arr, k) {
        let i = 0,
            j = 0;
        let q = [];
        let ans = [];

        while (j < arr.length) {
            if (arr[j] < 0) {
                q.push(arr[j]);
            }

            if (j - i + 1 == k) {
                if (q.length != 0) {
                    ans.push(q[0]);
                } else {
                    ans.push(0);
                }

                if (arr[i] < 0) {
                    q.shift();
                }

                i++;
            }
            j++;
        }
        return ans;
    }
}

//  Count Occurences of Anagrams

// Input:
// txt = forxxorfxdofr
// pat = for
// Output: 3
// Explanation: for, orf and ofr appears
// in the txt, hence answer is 3.

class Solution {
    search(pat, txt) {
        function isAllZeros(arr) {
            for (let count of arr) {
                if (count != 0) {
                    return false;
                }
            }
            return true;
        }

        let str = "abcdefghijklmnopqrstuvwxyz";
        let charMap = new Map();
        let match = new Array(26).fill(0);
        str.split("").forEach((char, index) => {
            charMap.set(char, index);
        });
        for (let char of pat) {
            match[charMap.get(char)] += 1;
        }

        let i = 0,
            j = 0;
        let n = txt.length;
        let k = pat.length;
        let ans = 0;

        while (j < n) {
            match[charMap.get(txt[j])]--;

            if (j - i + 1 === k) {
                if (isAllZeros(match)) {
                    ans++;
                }
                match[charMap.get(txt[i])]++;
                i++;
            }
            j++;
        }

        return ans;
    }
}

//239. Sliding Window Maximum

// Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
// Output: [3,3,5,5,6,7]
// Explanation:

// Window position                Max
// ---------------               -----
// [1  3  -1] -3  5  3  6  7       3
//  1 [3  -1  -3] 5  3  6  7       3
//  1  3 [-1  -3  5] 3  6  7       5
//  1  3  -1 [-3  5  3] 6  7       5
//  1  3  -1  -3 [5  3  6] 7       6
//  1  3  -1  -3  5 [3  6  7]      7

var maxSlidingWindow = function (nums, k) {
    let ans = [];
    let dq = []; // store indices

    for (let i = 0; i < nums.length; i++) {
        // Remove indices that are out of the current window
        while (dq.length !== 0 && dq[0] <= i - k) {
            dq.shift();
        }

        // Remove indices of all elements smaller than the current element
        while (dq.length !== 0 && nums[i] >= nums[dq[dq.length - 1]]) {
            dq.pop();
        }

        // Add current index to the deque
        dq.push(i);

        // If we have filled at least k elements in the window, add the max to the result
        if (i >= k - 1) {
            ans.push(nums[dq[0]]); // Use the index stored in the deque to get the max
        }
    }

    return ans;
};

// need to find Sliding window size , condition is given
//Given an array of positive integers nums and a positive integer target, return the minimal length of a
// subarray
// whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.

// Input: target = 7, nums = [2,3,1,2,4,3]
// Output: 2
// Explanation: The subarray [4,3] has the minimal length under the problem constraint.

var minSubArrayLen = function (target, nums) {
    let i = 0,
        j = 0;
    let n = nums.length;
    let currSum = 0;
    let ans = Infinity;
    while (j < n) {
        currSum += nums[j];

        while (currSum >= target) {
            ans = Math.min(ans, j - i + 1);
            currSum -= nums[i];
            i++;
        }
        j++;
    }

    return ans == Infinity ? 0 : ans;
};

// varibale size Sliding window
//

// Given an array arr[] containing integers and an integer k, your task is to find the length of
// the longest subarray where the sum of its elements is equal to the given value k.
// It is guaranteed that a valid subarray exists.

class Solution {
    lenOfLongestSubarr(arr, k) {
        let map = new Map();
        map.set(0, -1);
        let ans = 0;
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i];

            if (map.has(sum - k)) {
                ans = Math.max(ans, i - map.get(sum - k));
            }

            if (!map.has(sum)) {
                map.set(sum, i);
            }
        }

        return ans;
    }
}

//Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.

// A subarray is a contiguous non-empty sequence of elements within an array.

var subarraySum = function (nums, k) {
    let map = new Map();
    map.set(0, 1);
    let sum = 0;
    let ans = 0;
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];

        if (map.has(sum - k)) {
            ans += map.get(sum - k);
        }

        if (map.has(sum)) {
            map.set(sum, map.get(sum) + 1);
        } else {
            map.set(sum, 1);
        }
    }

    return ans;
};

// Given a string s, you need to print the size of the longest possible substring with exactly k unique characters.
// If no possible substring exists, print -1

class Solution {
    longestKSubstr(s, k) {
        let ans = -1;
        let i = 0;
        let map = new Map();

        for (let j = 0; j < s.length; j++) {
            map.set(s[j], (map.get(s[j]) || 0) + 1);

            while (map.size > k) {
                map.set(s[i], map.get(s[i]) - 1);
                if (map.get(s[i]) == 0) {
                    map.delete(s[i]);
                }
                i++;
            }

            if (map.size === k) {
                ans = Math.max(ans, j - i + 1);
            }
        }

        return ans;
    }
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestOnes = function (arr, k) {
    let ans = 0;
    let count = 0;
    let i = 0;
    let j;
    for (j = 0; j < arr.length; j++) {
        if (arr[j] == 0) {
            count++;
        }
        if (count > k) {
            // we are not using while loop here because
            // we already found the biggest window we can make, try to find the bigger one
            if (arr[i] == 0) {
                count--;
            }
            i++;
        }
        // ans=Math.max(ans,j-i+1);
    }

    return j - i + 1;
};

// Longest Substring Without Repeating Characters

var lengthOfLongestSubstring = function (s) {
    let n = s.length;
    let map = new Map();
    let i = 0;
    let ans = 0;

    for (let j = 0; j < n; j++) {
        if (map.has(s[j])) {
            i = Math.max(i, map.get(s[j]) + 1);
        }

        map.set(s[j], j);
        ans = Math.max(ans, j - i + 1);
    }

    return ans;
};

// Given two strings s and t of lengths m and n respectively, return the minimum window  substring
// of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".
// The testcases will be generated such that the answer is unique.

// Example usage:
let s = "ADOBECODEBANC";
let t = "ABC";
console.log(minWindow(s, t)); // Output: "BANC"

// create map of t  of count of characters in it
// traverse through string
//maintain requiredCount such it satisfy our condition of substring
// of s such that every character in t (including duplicates) is included in the window.

// 1) if you find the character from map in main string  map[char] > 0 , we will recude our required Count

// we store reduce frequency of each element by -1 every time we travel using j

// 2)  the moment we find reqired count == 0 , it's time for answer , we will sotre the starting index as well for  substring

// 3)  Now we will try to shrink the substring for minimum answer .

// this question is simmilar to count anagrams kind of

var minWindow = function (s, t) {
    let n = s.length;
    if (t.length > n) {
        return "";
    }

    let start_i = 0;
    let map = {};

    let ans = Infinity;

    for (let c of t) {
        map[c] = (map[c] || 0) + 1;
    }

    let i = 0,
        j = 0;

    let requiredCount = t.length;

    while (j < n) {
        let char = s[j];
        if (map[char] > 0) {
            requiredCount--;
        }

        map[char] = (map[char] || 0) - 1;

        while (requiredCount == 0) {
            if (ans > j - i + 1) {
                ans = j - i + 1;
                start_i = i;
            }

            map[s[i]]++;
            if (map[s[i]] > 0) {
                requiredCount++;
            }
            i++;
        }

        j++;
    }

    return ans == Infinity ? "" : s.substring(start_i, start_i + ans);
};

//

class Solution {
    search(pat, txt) {
        function isAllZeros(arr) {
            for (let count of arr) {
                if (count != 0) {
                    return false;
                }
            }
            return true;
        }
        let str = "abcdefghijklmnopqrstuvwxyz";
        let charMap = new Map();
        let match = new Array(26).fill(0);
        str.split("").forEach((char, index) => {
            charMap.set(char, index);
        });
        for (let char of pat) {
            match[charMap.get(char)] += 1;
        }

        let i = 0,
            j = 0;
        let n = txt.length;
        let k = pat.length;
        let ans = 0;

        while (j < n) {
            match[charMap.get(txt[j])]--;

            if (j - i + 1 === k) {
                if (isAllZeros(match)) {
                    ans++;
                }
                match[charMap.get(txt[i])]++;
                i++;
            }
            j++;
        }

        return ans;
    }
}

// https://www.youtube.com/playlist?list=PLpIkg8OmuX-LtRw7om1-EV6aJMRKjbSSR

// 1 2 Pointers question
// 2 Hashmaps
// 3 Backtracking ->1st
// 4 stack & queue -> Time
// 5 linkiedList -:> Time
// 6 tress
// 7 BST
// 8 Trie
// 9 Heap
//// Sortin and Searching
// 10 Design  Problems -> Time
// 12 Rabin karp Algorithm
// 11 MCM question type practice
// Articulation point and bridges
// Prime Number Generation
// Greedy
// 9 days to complete

//2 ,3 4,5 revision
// Implementation of Queue, Dequeue , HAshmap (with Reshahing) , HAshSet, PriorityQueue, custom sort
// Jump Games
// Buy and Sell stocks
//
