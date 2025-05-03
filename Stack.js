function asteroidCollision(asteroids) {
    const stack = [];

    for (const asteroid of asteroids) {
        let isDestroyed = false;

        while (
            stack.length > 0 &&
            asteroid < 0 &&
            stack[stack.length - 1] > 0
        ) {
            const top = stack[stack.length - 1];

            if (top < -asteroid) {
                stack.pop(); // Top asteroid explodes
            } else if (top === -asteroid) {
                stack.pop(); // Both explode
                isDestroyed = true;
                break;
            } else {
                // Current asteroid explodes
                isDestroyed = true;
                break;
            }
        }

        if (!isDestroyed) {
            stack.push(asteroid);
        }
    }

    return stack;
}

// Example usage:
console.log(asteroidCollision([5, 10, -5]));  // Output: [5, 10]
console.log(asteroidCollision([8, -8]));       // Output: []
console.log(asteroidCollision([10, 2, -5]));   // Output: [10]


/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
var removeKdigits = function(num, k) {
    let arr = num.split("");
     let ans = "";
     
     let st = [];

     for(let i=0;i<arr.length;i++){

        while(st.length>0 && st[st.length-1] > arr[i] && k>0){
            st.pop();
            k--;
        }

        if(st.length>0 || arr[i]!=='0'){
            st.push(arr[i]);
        }
        
     }

     while(k>0){
        st.pop();
        k--;
     }

    ans = st.join("");
     return ans=="" ? "0" : ans;
};


var StockSpanner = function() {
    this.stack = []; // stack of [index, price]
       this.index = 0;
};

/** 
* @param {number} price
* @return {number}
*/
StockSpanner.prototype.next = function(price) {
   while (this.stack.length > 0 && this.stack[this.stack.length - 1][1] <= price) {
           this.stack.pop();
       }

       let span;
       if (this.stack.length === 0) {
           span = this.index + 1;
       } else {
           span = this.index - this.stack[this.stack.length - 1][0];
       }

       this.stack.push([this.index, price]);
       this.index++;

       return span;
};

/** 
* Your StockSpanner object will be instantiated and called as such:
* var obj = new StockSpanner()
* var param_1 = obj.next(price)
*/

/**
 * // This is the knows API interface.
 * // You should not implement it, or speculate about its implementation
 * function knows(a: number, b: number): boolean {}
 */

/**
 * @param {number} n
 * @return {number}
 */
var findCelebrity = function(n) {
    let candidate = 0;

    // Step 1: Find the candidate
    for (let i = 1; i < n; i++) {
        if (knows(candidate, i)) {
            candidate = i;
        }
    }

    // Step 2: Verify the candidate
    for (let i = 0; i < n; i++) {
        if (i !== candidate) {
            if (knows(candidate, i) || !knows(i, candidate)) {
                return -1;
            }
        }
    }

    return candidate;
};


/**
 * @param {number} capacity
 */

class Node {
    constructor(key,val){
        this.key = key;
        this.val= val;
        this.next= null;
        this.prev= null; 
    }
}
var LRUCache = function(capacity) {
    this.capacity= capacity;
    this.map = new Map();
    this.head = new Node(0,0);
    this.tail = new Node(0,0);
    this.head.next = this.tail;
    this.tail.prev= this.head;
};

LRUCache.prototype._add = function(node){
    node.prev= this.head;
    node.next = this.head.next;
    this.head.next.prev= node;
    this.head.next= node;
     
}

LRUCache.prototype._remove = function(node){
    node.prev.next = node.next;
    node.next.prev= node.prev;
}

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if(this.map.has(key)){
        let node = this.map.get(key); 
        this._remove(node);
        this._add(node);
        return node.val;
    }

    return -1;

};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if(this.map.has(key)){
        let node = this.map.get(key);
        this._remove(node);
    }

    
    let newNode= new Node(key,value);
    this._add(newNode);
    this.map.set(key,newNode)

    if(this.map.size > this.capacity){
        let nodeToRemove = this.tail.prev;
        this._remove(nodeToRemove);
        this.map.delete(nodeToRemove.key)
    }
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */


