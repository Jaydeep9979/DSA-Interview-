function detectCycle() {
    let q = [];
    q.push([Node, -1]);
    visited[node] = true;
    while (q.length != 0) {
        let [node, parent] = q.shift();

        for (let nbr of graph[node]) {
            if (nbr == parent) {
                continue;
            }

            if (visited[nbr] === true) {
                return true;
            }

            visited[nbr] = true;
            q.push([nbr, node]);
        }
    }
    return false;
}

//Time complexity : O

function topologicalSort(adj){
    let q = [];
    let n =adj.length;
    let inDegree = new Array(n).fill(0);

    for(let v=0;v<n;v++){
        for(let u of adj[v]){
            inDegree[u]+=1;
        }
    }

    for(let node=0 ; node<n ; node++){
        if(inDegree[node]===0){
            q.push(node);
        }
    }


    let res =[] ;

    while(q.length!=0){
        let node = q.shift();
        res.push(node);
        for(let nbr of adj[node]){
            inDegree[nbr]-=1;
            if(inDegree[nbr]===0){
                q.push(nbr);
            }
        }
    }

    return res;
    
}


class DoublyListNode{
    constructor(val,next=null,prev=null){
        this.val=val;
        this.next=next;
        this.prev=prev;
    }
}

class DoublyLinkedList{
    constructor(){
        this.head=null;
        this.tail=null;
        this.length=0;
    }


    append(val){
        let newNode = new DoublyListNode(val);

        if(this.tail){
            this.tail.next=newNode;
            newNode.prev=this.tail;
            this.tail=newNode;
        }
        else{
            this.head=newNode;
            this.tail=newNode;
        }

        this.length+=1;

    }

    prepend(val){
        let newNode = new DoublyListNode(val);

        if(this.head){
            this.head.prev=newNode;
            newNode.next=this.head;
            this.head=newNode;
        }
        else{
            this.tail=newNode;
            this.head=newNode;
        }

        this.length+=1;
    }

    delete(val){
        if(!this.head){
            return false;
        }

        let curr=this.head;

        while(curr){
            if(curr.val==val){

                if(curr.next){
                    curr.next.prev=curr.prev;
                }
                else{
                    this.tail=curr.prev;
                }

                if(curr.prev){
                    curr.prev.next=curr.next;
                }
                else{
                    this.head=curr.next;
                }

                this.length-=1;
                return true;

            }
            curr=curr.next;
        }
        return  false;
    }
}