class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    // Add a node at the end
    append(val) {
        const newNode = new ListNode(val);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let curr = this.head;
        while (curr.next) {
            curr = curr.next;
        }
        curr.next = newNode;
    }

    // Add a node at the beginning
    prepend(val) {
        const newNode = new ListNode(val, this.head);
        this.head = newNode;
    }

    // in even number of nodes return 2nd middle
    middleNode = function(head) {
        let slow = head;
        let fast = head;
    
        while(fast && fast.next){
            slow=slow.next;
            fast=fast.next.next;
        }
    
        return slow;
    };

    
    

    // Print the list
    print() {
        let curr = this.head;
        const result = [];
        while (curr) {
            result.push(curr.val);
            curr = curr.next;
        }
        console.log(result.join(" -> "));
    }
}

var reverseList = function(head) {
    prev= null;
    curr = head;
    while(curr){
        let next = curr.next;
        curr.next=prev;
        prev=curr;
        curr=next;
    }

    return prev;
};

function hasCycle(head) {
    let slow = head;
    let fast = head;

    while (fast !== null && fast.next !== null) {
        slow = slow.next;         // move one step
        fast = fast.next.next;    // move two steps

        if (slow === fast) {
            return true; // cycle detected
        }
    }

    return false; // no cycle
}   

var reverseList = function(head) {
    
    function reverse(head){
        if(!head || !head.next){
            return head;
        }

        let LLHead = reverse(head.next);

        head.next.next=head;
        head.next=null; 

        return LLHead;
    }
    return reverse(head);
};




//https://leetcode.com/problems/delete-node-in-a-linked-list/
// Given a node in a singly linked list, delete that node without access to the head of the list.
var deleteNode = function (node) {
    node.val = node.next.val;
    node.next = node.next.next;
};

class DoublyListNode {
    constructor(val, next = null, prev = null) {
        this.val = val;
        this.next = next;
        this.prev = prev;
    }
}

class DoublyLinkedList {
    constructor() {
        this.tail = null;
        this.head = null;
        this.length = 0;
    }

    append(val) {
        let newNode = new DoublyListNode(val);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length += 1;
    }

    prepend(val) {
        let newNode = new DoublyListNode(val);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return;
        } else {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length += 1;
    }

    delete(val) {
        if (!this.head) {
            console.log("DLL is already empty !");
            return false;
        } else {
            let curr = this.head;
            while (curr && curr.val !== val) {
                curr = curr.next;
            }
            if (!curr) return false;

            if (curr.prev) {
                curr.prev.next = curr.next;
            } else {
                this.head = curr.next;
            }

            if (curr.next) {
                curr.next.prev = curr.prev;
            } else {
                this.tail = curr.prev;
            }

            return true;
        }
    }
//This method swaps the next and prev pointers of each node and finally swaps the head and tail pointers of the list.
    reverse() {
        let curr = this.head;
        let temp = null;

        while(curr){
            temp  = curr.next;
            curr.next= curr.prev;
            curr.prev= temp;
            curr=curr.prev;
        }

        if(temp){
            this.tail=this.head;
            this.head=temp.prev;
        }
    }
}

var detectCycle = function(head) {
    let slow = head;
    let fast = head;

    // Detect cycle
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            // Cycle detected, find entry point
            slow = head;
            while (slow !== fast) {
                slow = slow.next;
                fast = fast.next;
            }
            return slow; // Start of the cycle
        }
    }

    return null; // No cycle
};



function removeCycle(head) {
    let slow = head;
    let fast = head;

    // Step 1: Detect the cycle
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) break;
    }

    // If no cycle detected
    if (fast === null || fast.next === null) return;

    // Step 2: Find the start of the loop
    slow = head;
    if (slow !== fast) {
        while (slow.next !== fast.next) {
            slow = slow.next;
            fast = fast.next;
        }
        // Step 3: Break the loop
        fast.next = null;
    } else {
        // Special case: cycle starts at head
        while (fast.next !== slow) {
            fast = fast.next;
        }
        fast.next = null;
    }
}

function lengthOfLoop(head) {
    let slow = head, fast = head;

    // Detect loop using Floyd’s algorithm
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            // Loop detected; now find its length
            let count = 1;
            let current = slow.next;

            while (current !== slow) {
                current = current.next;
                count++;
            }

            return count;
        }
    }

    return 0; // No loop
}


function isPalindrome(head) {
    if (!head || !head.next) return true;

    // Step 1: Find the middle
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // Step 2: Reverse second half
    let prev = null;
    while (slow) {
        let nextNode = slow.next;
        slow.next = prev;
        prev = slow;
        slow = nextNode;
    }

    // Step 3: Compare both halves
    let left = head, right = prev;
    while (right) {
        if (left.val !== right.val) return false;
        left = left.next;
        right = right.next;
    }

    return true;
}

// Edge Case:  If the list has 0 or 1 node, return it as-is.

// Initialize pointers:

// odd → points to head (1st node).

// even → points to head.next (2nd node).

// evenHead → stores starting node of even list (used to attach later).

// Loop while even and even.next exist:

// Connect current odd node to next odd node → odd.next = even.next.

// Move odd pointer forward → odd = odd.next.

// Connect current even node to next even node → even.next = odd.next.

// Move even pointer forward → even = even.next.

// After loop ends:

// Link last odd node to the head of the even list → odd.next = evenHead.

// Return the modified list starting from head.

function oddEvenList(head) {
    if (!head || !head.next) return head;

    let odd = head;
    let even = head.next;
    let evenHead = even;

    while (even && even.next) {
        odd.next = even.next;
        odd = odd.next;

        even.next = odd.next;
        even = even.next;
    }

    odd.next = evenHead; // Attach even list after odd
    return head;
}


// edge case head is getting removed;

var removeNthFromEnd = function(head, n) {
    let fast = head;

    while(n>0 && fast){
        fast=fast.next;
        n--;
    }

    if(!fast) return head.next;

    let slow = head;

    let prev = null;
    while(fast){
        prev=slow;
        slow=slow.next;
        fast=fast.next;
    }

    prev.next= slow.next;

    return head;

};


var deleteMiddle = function(head) {
    if(!head.next) return null;

    let slow = head;
    let fast = head;
    let prev = null;
    while(fast && fast.next){
        prev=slow;
        slow=slow.next;
        fast= fast.next.next;
    }

    prev.next= slow.next;
    return head;

};

function sortList(head) {
    if (!head || !head.next) return head;

    // Step 1: Find middle
    let slow = head, fast = head, prev = null;
    while (fast && fast.next) {
        prev = slow;
        slow = slow.next;
        fast = fast.next.next;
    }
    prev.next = null; // Split the list into two halves

    // Step 2: Sort each half
    const l1 = sortList(head);
    const l2 = sortList(slow);

    // Step 3: Merge sorted halves
    return merge(l1, l2);
}

function merge(l1, l2) {
    const dummy = new ListNode(0);
    let tail = dummy;

    while (l1 && l2) {
        if (l1.val < l2.val) {
            tail.next = l1;
            l1 = l1.next;
        } else {
            tail.next = l2;
            l2 = l2.next;
        }
        tail = tail.next;
    }

    tail.next = l1 || l2;
    return dummy.next;
}


var getIntersectionNode = function(headA, headB) {
    let left = headA;
    let right = headB;

    while (left !== right) {
        left = left ? left.next : headB;
        right = right ? right.next : headA;
    }

    return left; // either null (no intersection) or the intersection node
};


// Initialize a dummy head node and a current pointer.

// Set carry = 0.

// While there are nodes in l1 or l2, or a non-zero carry:

// Get the current digit from l1 and l2 (use 0 if null).

// Calculate sum = val1 + val2 + carry.

// Update carry = Math.floor(sum / 10).

// Create a new node with sum % 10 and attach it to result.

// Move l1, l2, and current forward.

// Return dummy.next.

function addTwoNumbers(l1, l2) {
    let dummy = new ListNode(0);
    let current = dummy;
    let carry = 0;

    while (l1 || l2 || carry > 0) {
        let val1 = l1 ? l1.val : 0;
        let val2 = l2 ? l2.val : 0;

        let sum = val1 + val2 + carry;
        carry = Math.floor(sum / 10);

        current.next = new ListNode(sum % 10);
        current = current.next;

        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }

    return dummy.next;
}

function reverse(head) {
    let prev = null;
    while (head) {
        let next = head.next;
        head.next = prev;
        prev = head;
        head = next;
    }
    return prev;
}

function addOne(head) {
    head = reverse(head);
    let curr = head;
    let carry = 1;

    while (curr && carry) {
        let sum = curr.val + carry;
        curr.val = sum % 10;
        carry = Math.floor(sum / 10);

        if (!curr.next && carry) {
            curr.next = new ListNode(0); // add dummy node if needed
        }
        curr = curr.next;
    }

    return reverse(head);
}


function sortList(head) {
    if (!head || !head.next) return head;

    let zeroD = new ListNode(0), oneD = new ListNode(0), twoD = new ListNode(0);
    let zero = zeroD, one = oneD, two = twoD;

    let current = head;

    while (current) {
        if (current.val === 0) {
            zero.next = current;
            zero = zero.next;
        } else if (current.val === 1) {
            one.next = current;
            one = one.next;
        } else {
            two.next = current;
            two = two.next;
        }
        current = current.next;
    }

    // Connect the three lists
    zero.next = oneD.next ? oneD.next : twoD.next;
    one.next = twoD.next;
    two.next = null;

    return zeroD.next;
}

