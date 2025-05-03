/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function(bills) {
    let t5 =0;
    let t10=0;

    for(let ele of bills){
        if(ele==5){
            t5+=1;
        }
        else if(ele==10){
            if(t5==0){
                return false;
            }
            t10+=1;
            t5-=1;
        }
        else{
            if((t10==0 && t5<3) || (t10>=1 && t5==0)){
                return false;
            }

            if(t10>=1){
                t10-=1;
                t5-=1;
            }
            else{
                t5-=3;
            }
        }
    } 

    return true;
};

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    let maxjump = 0;
    for(let i=0;i<nums.length;i++){
        if(i>maxjump){
            return false;
        }
        maxjump=Math.max(maxjump,i+nums[i]);
        if(maxjump>=nums.length-1) return true;
    }

    return true;
};

// Greedy Intuition: Think in Layers (like BFS)
// Visualize the problem as jumping across levels in a game:

// Each "jump" is one level.

// Your goal is to get from level 0 to the last level in minimum jumps.

// At each level, you pick the farthest point you can reach — without caring how you got there.

// 🔑 Key Observations:
// Every index you can jump to forms a range of possible next steps.

// You only need to know:

// The farthest you can reach in the current jump.

// When to jump again (i.e., when your current range ends).

// It’s similar to BFS — when you exhaust a layer (range), you increase the jump count and move to the next layer.




/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
    let jumps = 0;
    let currentEnd = 0;
    let farthest = 0;

    for (let i = 0; i < nums.length - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);

        if (i === currentEnd) {
            jumps++;
            currentEnd = farthest;
        }
    }

    return jumps;
};



/**
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function(points) {
    if (points.length === 0) return 0;

    // Sort by end coordinate
    points.sort((a, b) => a[1] - b[1]);

    let arrows = 1;
    let arrowEnd = points[0][1];

    for (let i = 1; i < points.length; i++) {
        if (points[i][0] > arrowEnd) {
            arrows++;
            arrowEnd = points[i][1];
        }
        // else: this balloon is already burst by the current arrow
    }

    return arrows;
};


// Given an array of intervals intervals where intervals[i] = [starti, endi], 
// return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.
// Note that intervals which only touch at a point are non-overlapping. For example, [1, 2] and [2, 3] are non-overlapping.

/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function(arr) {
    let n = arr.length;
    arr.sort((a,b)=>a[1]-b[1]);
    let last  = arr[0][1];
    let count=0;
    for(let i=1; i<n;i++){
        if(last > arr[i][0]){
            
            count++;
            // Overlapping intervals
        }
        else{
            last = arr[i][1];
            // Non-overlapping intervals
            // Update the last end time to the current interval's end time
        }
    }

    return count ;
};



// 56. Merge Intervals

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    if (intervals.length === 0) return [];

    intervals.sort((a, b) => a[0] - b[0]);

    const res = [];
    let [start, end] = intervals[0];

    for (let i = 1; i < intervals.length; i++) {
        const [currStart, currEnd] = intervals[i];

        if (currStart > end) {
            res.push([start, end]);
            start = currStart;
            end = currEnd;
        } else {
            end = Math.max(end, currEnd);
        }
    }

    res.push([start, end]);
    return res;
};

var insert = function(intervals, newInterval) {
    const res = [];
    let i = 0;
    const n = intervals.length;
    const [newStart, newEnd] = newInterval;
    let [start, end] = newInterval;

    // 1. Add all intervals that come before newInterval
    while (i < n && intervals[i][1] < newStart) {
        res.push(intervals[i]);
        i++;
    }

    // 2. Merge all overlapping intervals with newInterval
    while (i < n && intervals[i][0] <= end) {
        start = Math.min(start, intervals[i][0]);
        end = Math.max(end, intervals[i][1]);
        i++;
    }
    res.push([start, end]);

    // 3. Add the rest
    while (i < n) {
        res.push(intervals[i]);
        i++;
    }

    return res;
};


var canAttendMeetings = function(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);

    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < intervals[i - 1][1]) {
            return false; // overlapping meeting
        }
    }

    return true;
};

// | **Problem Type**                            | **Sort By**        | **Why**                                                                 |
// |--------------------------------------------|--------------------|-------------------------------------------------------------------------|
// | **Detect Overlap (e.g., Meeting Rooms I)** | `start time (a[0])`| We want to process meetings in order and compare with previous end time |
// | **Merge Intervals**                        | `start time (a[0])`| Need to process in sequence and merge overlapping intervals             |
// | **Insert Interval**                        | `start time (a[0])`| Ensures we place and merge in correct chronological order               |
// | **Minimum Rooms Needed (Meeting Rooms II)**| `start time` & `end time` (separately) | Process entry/exit separately to count active meetings                 |
// | **Interval Scheduling (Non-overlapping max set)** | `end time (a[1])`| Greedy choice: pick earliest-ending task to maximize room for others   |
// | **Burst Balloons / Remove Intervals**      | `end time (a[1])`  | Greedy: pick action that "ends" earliest to minimize future conflicts  |

// | **Goal**                                      | **Sort By**        | **Typical Use**                                  |
// |----------------------------------------------|--------------------|--------------------------------------------------|
// | Process in order                             | `start time`       | Merging, inserting, scanning                    |
// | Make greedy selection                        | `end time`         | Maximize/minimize result                        |
// | Detect earliest conflict                     | `start time`       | Compare with previous interval                  |
// | Avoid overlapping tasks                      | `end time`         | Choose early finisher                           |
// | Handle ties predictably                      | `start + end`      | Optional — for consistency                      |




// Gas Station Problem
/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function(gas, cost) {
    let remain = 0;
    let count = 0 ; 
    let  n = gas.length;
    
    for(let i=0;i<2*n;i++){
        remain += gas[i%n] - cost[i%n];
        count++;
        
        if(remain<0){
            remain = 0;
            count = 0;
        }

        if(count==n){
            return (i+1)%n;
        }

    }

    return -1;
};


/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function(gas, cost) {
    let totalTank = 0;
    let currentTank = 0;
    let startIndex = 0;

    for (let i = 0; i < gas.length; i++) {
        let gain = gas[i] - cost[i];
        totalTank += gain;
        currentTank += gain;

        // If you run out of gas before reaching next station
        if (currentTank < 0) {
            // Start fresh from next station
            startIndex = i + 1;
            currentTank = 0;
        }
    }

    return totalTank >= 0 ? startIndex : -1;
};

//678. Valid Parenthesis String

var checkValidString = function(s) {
    let minOpenBrackets = 0; // Minimum number of unmatched '(' considering '*' as ')'
    let maxOpenBrackets = 0; // Maximum number of unmatched '(' considering '*' as '('

    for (let char of s) {
        if (char === '(') {
            minOpenBrackets++;
            maxOpenBrackets++;
        } else if (char === ')') {
            minOpenBrackets--;
            maxOpenBrackets--;
        } else if (char === '*') {
            // '*' can be '(', ')' or ''
            minOpenBrackets--;     // treat as ')'
            maxOpenBrackets++;     // treat as '('
        }

        // If at any point, max open brackets < 0, we have too many ')'
        if (maxOpenBrackets < 0) return false;

        // We can't have fewer than 0 open brackets
        minOpenBrackets = Math.max(minOpenBrackets, 0);
    }

    // If minOpenBrackets is 0, we have a valid string
    return minOpenBrackets === 0;
};


function fractionalKnapsack(items, capacity) {
    // items = [{value: x, weight: y}, ...]

    // Sort by value-to-weight ratio in descending order
    items.sort((a, b) => (b.value / b.weight) - (a.value / a.weight));

    let totalValue = 0;
    let remainingCapacity = capacity;

    for (let item of items) {
        if (item.weight <= remainingCapacity) {
            // Take whole item
            totalValue += item.value;
            remainingCapacity -= item.weight;
        } else {
            // Take fractional part
            totalValue += (item.value / item.weight) * remainingCapacity;
            break; // Knapsack is full
        }
    }

    return totalValue;
}


function minCoins(coins, amount) {
    coins.sort((a, b) => b - a); // Sort coins descending

    const result = [];
    let remaining = amount;

    for (let coin of coins) {
        while (remaining >= coin) {
            remaining -= coin;
            result.push(coin);
        }
        if (remaining === 0) break;
    }

    return result; // or result.length for count
}

//This greedy approach works only if the coin system is canonical.
Coins = [4, 3, 1], Amount = 6
// ✅ Optimal: 3 + 3 = 2 coins
// ❌ Greedy:
// Pick 4 → remaining = 2
// Pick 1 → remaining = 1
// Pick 1 → remaining = 0
// → Total = 3 coins

// So greedy chose 4 first and ended up needing 3 coins
// But the optimal is 2 coins: [3, 3]

// | Problem | Pattern | Link |
// |--------|--------|------|
// | Reorganize String | Greedy + Max Heap | [Leetcode #767](https://leetcode.com/problems/reorganize-string/) |
// | Task Scheduler | Frequency count + idle slots | [Leetcode #621](https://leetcode.com/problems/task-scheduler/) |
// | IPO | Greedy + Two Heaps | [Leetcode #502](https://leetcode.com/problems/ipo/) |
// | Candy | Two-pass Greedy | [Leetcode #135](https://leetcode.com/problems/candy/) |
// | Create Maximum Number | Stack + greedy | [Leetcode #321](https://leetcode.com/problems/create-maximum-number/) |