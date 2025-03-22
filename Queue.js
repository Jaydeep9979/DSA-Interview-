class Queue {
    constructor() {
        this.items = [];
        this.front = 0; // Pointer to the front of the queue
    }

    enqueue(element) {
        this.items.push(element);
    }

    // dequeue() {
    //     if (this.isEmpty()) {
    //         return null; // Queue is empty
    //     }
    //     const element = this.items[this.front];
    //     this.front++;
    //     return element;
    // }

    dequeue() {
        if (this.isEmpty()) {
            return null; // Queue is empty
        }
       
        
        if(this.arr.length < this.first *2){
            this.arr.slice(this.first);
            this.first = 0;
        }
        
        const element = this.items[this.front];
        this.front++;

        return element;
        
    }

    isEmpty() {
        return this.front >= this.items.length;
    }

    size() {
        return this.items.length - this.front;
    }
}

// Usage
const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log(queue.dequeue()); // 1
console.log(queue.dequeue()); // 2
console.log(queue.size()); // 1



 