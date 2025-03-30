//asked for search element in array
// ask whether array is sorted
// ask is array has duplicate elements or not
// arrray is sorted in ascending or descending

function BinarySearch(arr, target, low = 0, high = arr.length - 1) {
    let n = arr.length;

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);

        if (target === arr[mid]) {
            return mid;
        } else if (target > arr[mid]) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return -1;
}

// console.log(BinarySearch([1, 2, 3, 4, 5, 6], 6)); // 5

// find the pivot in rotated sorted array

function findPivot(arr) {
    let n = arr.length;

    let low = 0;
    let high = n - 1;

    while (low < high) {
        let mid = Math.floor((low + high) / 2);

        if (arr[mid] < arr[high]) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }

    return low;
}

// console.log(findPivot([4, 5, 6, 7, 0, 1, 2])); // 4

//find pivot in rotated sorted array with duplicates

function findPivotWithDuplicates(arr) {
    let n = arr.length;

    let low = 0;
    let high = n - 1;

    while (low < high) {
        let mid = Math.floor((low + high) / 2);

        while (low < high && arr[low] == arr[low + 1]) {
            low++;
        }

        while (high > low && arr[high] == arr[high - 1]) {
            high--;
        }

        if (arr[mid] < arr[high]) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }

    return low;
}

// console.log(findPivotWithDuplicates([1, 3, 1, 1, 1])); // 1

// Search in Rotated Sorted Array ;

// Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.
// (i.e., [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2]).
// You are given a target value to search. If found in the array return its index, otherwise return -1.
// You may assume no duplicate exists in the array.
//

function searchinRotatedArray(arr, target) {
    let pivot = findPivot(arr);

    let n = arr.length;

    let find = BinarySearch(arr, target, 0, pivot - 1);

    if (find !== -1) {
        return find;
    }

    return BinarySearch(arr, target, pivot, n - 1);
}

//search in rotated sorted  array , duplicates allowed

function searchinRotatedArrayWithDuplicates(arr, target) {
    let pivot = findPivotWithDuplicates(arr);

    let n = arr.length;

    let find = BinarySearch(arr, target, 0, pivot - 1);

    if (find !== -1) {
        return find;
    }

    return BinarySearch(arr, target, pivot, n - 1);
}

// console.log(searchinRotatedArrayWithDuplicates([1, 3, 1, 1, 1], 1)); // 1

// find first and last position of element in sorted array

function findFirstAndLastPosition(arr, target) {
    let n = arr.length;

    let low = 0;
    let high = n - 1;
    let first = -1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);

        if (target <= arr[mid]) {
            first = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    return first;

    // low = 0;
    // high = n - 1;
    // let last = -1;
    // while (low <= high) {
    //     let mid = Math.floor((low + high) / 2);

    //     if (target >= arr[mid]) {
    //         last = mid;
    //         low = mid + 1;
    //     } else {
    //         high = mid - 1;
    //     }
    // }

    // return [first, last];
}

// console.log(findFirstAndLastPosition([5, 7, 7, 8, 8, 10], 8));
// console.log(findFirstAndLastPosition([5, 7, 7, 8, 8, 10], 9) - 1); // [3,4]

//console.log(findFirstAndLastPosition([5, 7, 7, 8, 8, 10], 8)); // [3,4]

// find the peak element in an array

function findPeakElement(arr) {
    let n = arr.length;

    let low = 0;
    let high = n - 1;

    while (low < high) {
        let mid = Math.floor((low + high) / 2);

        if (arr[mid] < arr[mid + 1]) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }

    return low;
}

// console.log(findPeakElement([1, 2, 3, 1])); // 2

// find the peak element in an array with duplicates

function findPeakElementWithDuplicates(arr) {
    let n = arr.length;

    let low = 0;
    let high = n - 1;

    while (low < high) {
        let mid = Math.floor((low + high) / 2);

        while (low < high && arr[low] == arr[low + 1]) {
            low++;
        }

        while (high > low && arr[high] == arr[high - 1]) {
            high--;
        }

        if (arr[mid] > arr[mid + 1]) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }

    return low;
}

// search peak in a Mountain array

function findPeakInMountain(arr) {
    let low = 0;
    let high = arr.length - 1;

    while (low < high) {
        let mid = Math.floor((low + high) / 2);

        if (arr[mid] < arr[mid + 1]) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }

    return low;
}

console.log(findPeakInMountain([0, 1, 2, 3, 4, 5, 4, 3, 2, 1]));

// find the sqrt of given numbe in log n

function sqrt(number) {
    if (number < 0) {
        return NaN; // Square root of a negative number is not a real number
    }
    if (number === 0 || number === 1) {
        return number; // Square root of 0 or 1 is the number itself
    }

    let start = 0;
    let end = number;
    let result;

    while (start <= end) {
        let mid = Math.floor((start + end) / 2);

        // If mid*mid is equal to the number, mid is the square root
        if (mid * mid === number) {
            return mid;
        }

        // If mid*mid is less than the number, discard the left half
        if (mid * mid < number) {
            start = mid + 1;
            result = mid;
        } else {
            // If mid*mid is greater than the number, discard the right half
            end = mid - 1;
        }
    }

    return result;
}

// Test example
const number = 25;
console.log(sqrt(number)); // Output: 5

//agrressive cows problem
//https://www.spoj.com/problems/AGGRCOW/
// problem statement : cows are placed in stalls and we have to find the maximum distance between the cows
//  such that each cow has atleast one stall to itself  and the cows are placed in such a way that they are placed in increasing order of their position
//  so we have to find the maximum distance between the cows such that each cow has atleast one stall to itself

function aggressiveCows(arr, cows) {
    arr.sort((a, b) => a - b);

    let n = arr.length;

    let low = 0;
    let high = arr[n - 1] - arr[0];
    let result = -1;

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);

        let count = 1;
        let start = arr[0];

        for (let i = 1; i < n; i++) {
            if (arr[i] - start >= mid) {
                count++;
                start = arr[i];
            }
        }

        if (count >= cows) {
            result = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return result;
}


// cotainer 