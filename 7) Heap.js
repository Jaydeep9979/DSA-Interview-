// Heap implementation in js

class MinHeap {
    constructor() {
        this.arr = [];
    }

    upheapify(ci) {
        if (ci == 0) {
            return;
        }

        let pi = Math.floor((ci - 1) / 2);

        if (this.arr[ci] < this.arr[pi]) {
            [this.arr[ci], this.arr[pi]] = [this.arr[pi], this.arr[ci]];
            this.upheapify(pi);
        }
        return;
    }

    add(ele) {
        this.arr.push(ele);
        this.upheapify(this.arr.length - 1);
    }

    remove() {
        if (this.arr.length == 0) {
            console.log("empty Heap");
        }

        const ans = this.arr[0];

        [this.arr[0], this.arr[this.arr.length - 1]] = [
            this.arr[this.arr.length - 1],
            this.arr[0],
        ];

        this.arr.pop();

        this.downHeapify(0);

        return ans;
    }

    size() {
        return this.arr.length;
    }

    downHeapify(pi) {
        let mini = pi;
        let lci = 2 * pi + 1;
        let rci = 2 * pi + 2;

        if (lci < this.arr.length && this.arr[lci] < this.arr[mini]) {
            mini = lci;
        }
        if (rci < this.arr.length && this.arr[rci] < this.arr[mini]) {
            mini = rci;
        }
        if (mini != pi) {
            [this.arr[pi], this.arr[mini]] = [this.arr[mini], this.arr[pi]];
            this.downHeapify(mini);
        }

        return;
    }

    print() {
        console.log(this.arr);
    }
}

let pq = new Heap();
pq.add(2);

pq.add(-1);

pq.add(10);
pq.add(10);

while (pq.size() != 0) {
    console.log(pq.remove());
}

class MaxHeap {
    constructor() {
        this.arr = [];
    }

    upheapify(ci) {
        if (ci == 0) {
            return;
        }

        let pi = Math.floor((ci - 1) / 2);

        if (this.arr[ci] > this.arr[pi]) {
            [this.arr[ci], this.arr[pi]] = [this.arr[pi], this.arr[ci]];
            this.upheapify(pi);
        }
        return;
    }

    add(ele) {
        this.arr.push(ele);
        this.upheapify(this.arr.length - 1);
    }

    remove() {
        if (this.arr.length == 0) {
            console.log("empty Heap");
        }

        const ans = this.arr[0];

        [this.arr[0], this.arr[this.arr.length - 1]] = [
            this.arr[this.arr.length - 1],
            this.arr[0],
        ];

        this.arr.pop();

        this.downHeapify(0);

        return ans;
    }

    size() {
        return this.arr.length;
    }

    downHeapify(pi) {
        let mini = pi;
        let lci = 2 * pi + 1;
        let rci = 2 * pi + 2;

        if (lci < this.arr.length && this.arr[lci] > this.arr[mini]) {
            mini = lci;
        }
        if (rci < this.arr.length && this.arr[rci] > this.arr[mini]) {
            mini = rci;
        }
        if (mini != pi) {
            [this.arr[pi], this.arr[mini]] = [this.arr[mini], this.arr[pi]];
            this.downHeapify(mini);
        }

        return;
    }

    print() {
        console.log(this.arr);
    }
}

class MinHeap {
    constructor() {
        this.arr = [];
    }

    upHeapify(ci) {
        if (ci == 0) {
            return;
        }

        let pi = Math.floor((ci - 1) / 2);

        if (this.arr[pi] > this.arr[ci]) {
            [this.arr[pi], this.arr[ci]] = [this.arr[ci], this.arr[pi]];
            this.upHeapify(pi);
        }
    }

    add(ele) {
        this.arr.push(ele);
        this.upHeapify(this.arr.length - 1);
    }

    downHeapify(pi) {
        let mini = pi;

        let lci = 2 * pi + 1;
        let rci = 2 * pi + 2;

        if (lci < this.arr.length && this.arr[lci] < this.arr[mini]) {
            mini = lci;
        }

        if (rci < this.arr.length && this.arr[rci] < this.arr[mini]) {
            mini = rci;
        }

        if (mini != pi) {
            [this.arr[pi], this.arr[mini]] = [this.arr[mini], this.arr[pi]];
            this.downHeapify(mini);
        }
    }

    remove() {
        if (this.arr.length == 0) {
            console.log("PQ is Already empty !");
            return;
        }

        let ans = this.arr[0];
        [this.arr[0], this.arr[this.arr.length - 1]] = [
            this.arr[this.arr.length - 1],
            this.arr[0],
        ];
        this.arr.pop();
        this.downHeapify(0);
        return ans;
    }

    front() {
        if (this.arr.length == 0) {
            console.log("PQ is Already empty !");
            return;
        }

        return this.arr[0];
    }
}

var findKthLargest = function (nums, k) {
    const pq = new MinHeap();

    for (let ele of nums) {
        if (pq.size() < k) {
            pq.add(ele);
        } else {
            if (pq.front() < ele) {
                pq.remove();
                pq.add(ele);
            }
        }
    }

    return pq.front();
};

// Example Input

// Example Output
// Output 1:

//  [7, 6]
// Output 1:

//  [10, 9, 9, 8]

// Example Explanation

// Input 1:

//  A = [3, 2]
//  B = [1, 4]
//  C = 2

// Explanation 1:

//  7     (A : 3) + (B : 4)
//  6     (A : 2) + (B : 4)

// Explanation 2:
// Input 2:

//  A = [1, 4, 2, 3]
//  B = [2, 5, 1, 6]
//  C = 4

//  10   (A : 4) + (B : 6)
//  9   (A : 4) + (B : 5)
//  9   (A : 3) + (B : 6)
//  8   (A : 3) + (B : 5)

function solve(A, B, C) {
    const n = A.length;
    const ans = new Array(C);

    // Sorted in Descending order
    A.sort((a, b) => b - a);
    B.sort((a, b) => b - a);

    // Max Heap
    const q = new MaxPriorityQueue();

    // Pushed all elements of A with respect to the largest element of B
    for (let i = 0; i < n; i++) {
        q.push({ sum: A[i] + B[0], indices: [i, 0] });
    }

    for (let ind = 0; ind < C; ind++) {
        const t = q.pop();
        ans[ind] = t.sum;
        const i = t.indices[0];
        const j = t.indices[1];

        // Only push the sum of the current largest element of A with the next largest element of B
        if (j + 1 < B.length) {
            q.push({ sum: A[i] + B[j + 1], indices: [i, j + 1] });
        }
    }

    return ans;
}

class PriorityQueue {
    //Min Heap

    constructor() {
        this.arr = [];
    }

    enqueue(ele) {
        this.arr.push(ele);
        upheapify(this.arr.length - 1);
    }

    upheapify(idx) {
        if (idx == 0) {
            return;
        }

        let pi = Math.floor((idx - 1) / 2);

        if (this.arr[pi] < this.arr[idx]) {
            [this.arr[pi], this.arr[idx]] = [this.arr[idx], this.arr[pi]];
            this.upheapify(pi);
        }
    }

    dequeue() {
        if (this.arr.length == 0) {
            return null;
        }

        let ans = this.arr[0];

        [this.arr[0], this.arr[this.arr.length - 1]] = [
            this.arr[this.arr.length - 1],
            this.arr[0],
        ];

        this.arr.pop();

        downHeapify(0);

        return ans;
    }

    downHeapify(pi) {
        mini = pi;

        let lci = 2 * pi + 1;
        let rci = 2 * pi + 2;

        if (lci < this.arr.length && this.arr[lci] < this.arr[mini]) {
            mini = lci;
        }

        if (rci < this.arr.length && this.arr[rci] < this.arr[mini]) {
            mini = rci;
        }

        if (mini != pi) {
            [this.arr[pi], this.arr[mini]] = [this.arr[mini], this.arr[pi]];
            this.downHeapify(mini);
        }

        return;
    }
}

//Priority Queue Implementation with comparator function
class PriorityQueue {
    constructor(comparator = (a, b) => a - b) {
        this.arr = [];
        this.comparator = comparator;
    }

    upheapify(ci) {
        if (ci === 0) return;

        let pi = Math.floor((ci - 1) / 2);

        if (this.comparator(this.arr[ci], this.arr[pi]) < 0) {
            [this.arr[ci], this.arr[pi]] = [this.arr[pi], this.arr[ci]];
            this.upheapify(pi);
        }
    }

    downHeapify(pi) {
        let mini = pi;
        let lci = 2 * pi + 1;
        let rci = 2 * pi + 2;

        if (
            lci < this.arr.length &&
            this.comparator(this.arr[lci], this.arr[mini]) < 0
        ) {
            mini = lci;
        }

        if (
            rci < this.arr.length &&
            this.comparator(this.arr[rci], this.arr[mini]) < 0
        ) {
            mini = rci;
        }

        if (mini !== pi) {
            [this.arr[pi], this.arr[mini]] = [this.arr[mini], this.arr[pi]];
            this.downHeapify(mini);
        }
    }

    add(ele, weight) {
        this.arr.push([ele, weight]);
        this.upheapify(this.arr.length - 1);
    }

    remove() {
        if (this.arr.length === 0) {
            console.log("empty Heap");
            return null;
        }

        const ans = this.arr[0];

        [this.arr[0], this.arr[this.arr.length - 1]] = [
            this.arr[this.arr.length - 1],
            this.arr[0],
        ];

        this.arr.pop();
        this.downHeapify(0);

        return ans;
    }

    size() {
        return this.arr.length;
    }

    front() {
        if (this.arr.length === 0) {
            console.log("empty Heap");
            return null;
        }
        return this.arr[0];
    }

    print() {
        console.log(this.arr);
    }
}



var findKthLargest = function(nums, k) {
    const pq = new MinHeap();

    for(let ele of nums){
        if(pq.size()<k){
            pq.add(ele);
        }
        else{
            if(pq.front() < ele){
                pq.remove();
                pq.add(ele);
            }
        }
    }

    return pq.front();

};

var kClosest = function(points, k) {
    
    function originDist(x,y){
        let dist = x*x + y*y;
        return Math.sqrt(dist);
    }

    let pq = new MinHeap((a,b)=>b[1]-a[1]);
    for(let [x,y] of points){
        if(pq.size()<k){
            pq.add([[x,y],originDist(x,y)]);
        }
        else{
            const currDist = originDist(x,y);

            if(currDist < pq.front()[1]){
                pq.remove();
                pq.add([[x,y],currDist]);
            }
        }
    }

    let result = [];
    while (pq.size()) {
        result.push(pq.remove()[0]); // push only the point part, not distance
    }
    return result;

};

var topKFrequent = function(nums, k) {
    let map = new Map();
    for(let ele of nums){
        if(!map.has(ele)){
            map.set(ele,0);
        }
        map.set(ele, map.get(ele)+1);
    }

    console.log(map.entries());

    let arr = Array.from(map.entries());

    let pq = new MinHeap((a,b)=>a[1]-b[1]);

    for(let [ele,freq] of arr){

        if(pq.size()<k){
            pq.add(ele,freq);
        }
        else{
            if(freq > pq.front()[1]){
                pq.remove();
                pq.add(ele,freq);
            }
        }
    }

    let result = [];

    while(pq.size()>0){
        result.push(pq.remove()[0]);
    }

    return result;
    
};

var topKFrequent = function(words, k) {
    let map = new Map();
    for(let ele of words){
        if(!map.has(ele)){
            map.set(ele,0);
        }
        map.set(ele, map.get(ele)+1);
    }

    console.log(map.entries());

    let arr = Array.from(map.entries());

    let pq = new MinHeap((a,b)=>a[1]-b[1]);

    for(let [ele,freq] of arr){

        if(pq.size()<k){
            pq.add(ele,freq);
        }
        else{
            if(freq > pq.front()[1]){
                pq.remove();
                pq.add(ele,freq);
            }
        }
    }

    let result = [];

    while(pq.size()>0){
        result.push(pq.remove());
    }

    return result.sort((a,b)=> a[1]==b[1] ? a[0].localeCompare(b[0]) : b[1]-a[1]).map((item)=>item[0]);
};