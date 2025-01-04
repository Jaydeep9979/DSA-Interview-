
class MyHashSet {
    constructor() {
        this.arr = Array.from({ length: 100000 }, () => []);
    }
    add(key) {
        this.arr[getHashKey(key)].push(key);
    }
    /**
     * @param {number} key
     * @return {void}
     */
    remove(key) {
        let current = this.arr[getHashKey(key)];
        current = current.filter((item) => item != key);
        this.arr[getHashKey(key)] = current;


    }
    /**
     * @param {number} key
     * @return {boolean}
     */
    contains(key) {
        let current = this.arr[getHashKey(key)];
        return current.some((item) => item == key);

        // current.forEach((value)=>{
        //     if(value==key){
        //         return true;
        //     }
        // })
        // return false;
    }
}

/** 
 * @param {number} key
 * @return {void}
 */
function getHashKey(m){
    return m%100000;
}
 



// Bruteforce create aarray of size max(keys) +1; 

//Collision : when 2 keys have same HashKey

// to solve collision we have 2 techniques 
// 1) Separate Chaining  -> which we have implmented in this Above implementation 
// 2) Open Addressing after getting hashey we check wheather our list at that key is empty or not if it's not empty we will try to add that
// element in adjacent index if not it's adjacent and so on 
        // 1) Linear Proving 
        //2) Quadetric Probing 

//    hash-> key%10 ,     add(11) ,add(21) , add(31), remove(21) , find(31) -> in this way linear probing will fail , we can solve this using double hashning

// problem Separate chaining  is suppose for lots of key HashKey is coming same so all elements, so all elements  are coming in same array of array of givenHaskey
// so it will O(n) search (Linear Search) ; 

// so here comes Load Factor ->(N) Number elements you have inputted / Size of the Buckets(M)
//LF = N/M 

// in java LF is 0.75 if it goes above this we do rehashing for all the HashSet/HashMap in we will double size of Buckets or list to    
// M =2 *M;


/** 
 * Your MyHashSet object will be instantiated and called as such:
 * var obj = new MyHashSet()
 * obj.add(key)
 * obj.remove(key)
 * var param_3 = obj.contains(key)
 */