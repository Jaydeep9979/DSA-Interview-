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

function quick(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    let pivot = arr.length - 1;

    let left = [];
    let right = [];

    for (let i = 0; i < arr.length; i++) {
        if (i === pivot) continue;
        if (arr[i] < arr[pivot]) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...quick(left), arr[pivot], ...quick(right)];
}

console.log(quick([4, 2, 7, 5, 1, 1]));

function partition(arr, low, high) {
    let pivot = high;
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < arr[pivot]) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    [arr[i + 1], arr[pivot]] = [arr[pivot], arr[i + 1]];

    return i + 1;
}

function quickSort(arr, low, high) {
    if (low < high) {
        const pi = partition(arr, low, high); // 🔥 use your function here
        quickSort(arr, low, pi - 1); // sort left side
        quickSort(arr, pi + 1, high); // sort right side
    }
}

// let arr = [5, 1, 4, 2, 9, 4, 6, 7, 4];
// quickSort(arr, 0, arr.length - 1);
// console.log(arr);

function minStrokes(heights, start = 0, end = heights.length - 1) {
    if (start > end) return 0;

    // Find min height in the current segment
    let minH = Infinity;
    for (let i = start; i <= end; i++) {
        minH = Math.min(minH, heights[i]);
    }

    // Paint horizontally by minH strokes
    let strokes = minH;

    // Subtract minH from each plank in segment
    for (let i = start; i <= end; i++) {
        heights[i] -= minH;
    }

    // Recursively solve for subarrays separated by zero-height planks
    let i = start;
    while (i <= end) {
        while (i <= end && heights[i] === 0) i++; // skip zeros
        if (i > end) break;
        let j = i;
        while (j <= end && heights[j] > 0) j++;
        strokes += minStrokes(heights, i, j - 1);
        i = j;
    }

    // Compare with painting all planks vertically
    return Math.min(strokes, end - start + 1);
}

// Example usage:
let fence1 = [1, 1, 1, 1, 1, 1];
console.log(minStrokes(fence1)); // Output: 1

let fence2 = [2, 5, 6, 1, 7, 2, 4];
console.log(minStrokes(fence2)); // Output: minimal strokes required

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

function merge(arr, low, mid, high) {
    let temp = []; // Temporary array
    let left = low;
    let right = mid + 1;

    // Store elements in sorted order
    while (left <= mid && right <= high) {
        if (arr[left] <= arr[right]) {
            temp.push(arr[left]);
            left++;
        } else {
            temp.push(arr[right]);
            right++;
        }
    }

    // If elements are left in the left half
    while (left <= mid) {
        temp.push(arr[left]);
        left++;
    }

    // If elements are left in the right half
    while (right <= high) {
        temp.push(arr[right]);
        right++;
    }

    // Copy back the sorted elements into original array
    for (let i = low; i <= high; i++) {
        arr[i] = temp[i - low];
    }
}

function mergeSort(arr, low, high) {
    if (low >= high) return arr;

    const mid = Math.floor((low + high) / 2);

    mergeSort(arr, low, mid); // Left half
    mergeSort(arr, mid + 1, high); // Right half
    merge(arr, low, mid, high); // Merge both halves
}

// 🧪 Driver code
const arr = [9, 4, 7, 6, 3, 1, 5];
const n = arr.length;

console.log("Before sorting array:");
console.log(arr.join(" "));

mergeSort(arr, 0, n - 1);

console.log("After sorting array:");
console.log(arr.join(" "));

// Maximum Sum Subarray of size K
// Input: arr[] = [100, 200, 300, 400] , k = 2
// Output: 700
// Explanation: arr3  + arr4 = 700, which is maximum.

class Solution {
    maximumSumSubarray(arr, k) {
        if (
            !Array.isArray(arr) ||
            arr.length === 0 ||
            k <= 0 ||
            k > arr.length
        ) {
            return 0;
        }

        let start = 0;
        let end = 0;
        let windowSum = 0;
        let maxSum = 0;

        while (end < arr.length) {
            windowSum += arr[end];

            if (end - start + 1 === k) {
                maxSum = Math.max(maxSum, windowSum);
                windowSum -= arr[start];
                start++;
            }

            end++;
        }

        return maxSum;
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

class Solution {
    firstNegativeInteger(arr, k) {
        const result = [];
        const queue = [];
        let start = 0;

        for (let end = 0; end < arr.length; end++) {
            // If current element is negative, store its index
            if (arr[end] < 0) {
                queue.push(end);
            }

            // Once window size reaches k
            if (end - start + 1 === k) {
                if (queue.length > 0) {
                    // First negative number in current window
                    result.push(arr[queue[0]]);
                } else {
                    result.push(0);
                }

                // Remove out-of-window indices
                if (queue.length > 0 && queue[0] === start) {
                    queue.shift();
                }

                start++;
            }
        }

        return result;
    }
}

function maxSlidingWindow(nums, k) {
    const heap = new MaxHeap(); // stores [value, index]
    const result = [];

    let start = 0;
    for (let end = 0; end < nums.length; end++) {
        heap.push([nums[end], end]);

        if (end - start + 1 === k) {
            // 🧹 Remove all heap tops that are out of window
            while (heap.top() && heap.top()[1] < start) {
                heap.pop();
            }

            result.push(heap.top()[0]);
            start++;
        }
    }

    return result;
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

// 🔍 Think of it like this:
// dq maintains a monotonic decreasing order of elements by their values.

// So the largest element's index stays at the front.

// Smaller elements at the back get removed when a larger (or equal) value comes in — hence we pop() them.

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

// Given a binary array nums and an integer k, return the maximum number of
//  consecutive 1's in the array if you can flip at most k 0's.
/**
 * Leetcode 1004. Max Consecutive Ones III
 * @param {number[]} nums - Binary array (0s and 1s)
 * @param {number} k - Max number of 0s you can flip to 1
 * @return {number} - Longest subarray with at most k 0s flipped
 */
var longestOnes = function (nums, k) {
    let start = 0;
    let maxLen = 0;
    let zeroCount = 0;

    for (let end = 0; end < nums.length; end++) {
        if (nums[end] === 0) {
            zeroCount++;
        }

        // Shrink the window from the left if we exceed the allowed flips
        while (zeroCount > k) {
            if (nums[start] === 0) {
                zeroCount--;
            }
            start++;
        }

        // Update max length of valid window
        maxLen = Math.max(maxLen, end - start + 1);
    }

    return maxLen;
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
// maintain requiredCount such it satisfy our condition of substring
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
v 
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
