function inOrder(node){

    if(!node) return ;

    inOrder(node.left);
    console.log(node.val);
    inOrder(node.right);

}

class Pair{
    constructor(node,state){
        this.node=node;
        this.state=state;
    }
}

function Iterative(node){
    let q = [];

    let inOrder = [];
    let preOrder = [];
    let postOrder= [];

    q.push(new Pair(node,0));

    while(q.length!=0){

        let top =  q.pop();
        if(visit==0){
            preOrder.push(top.node.val);
            top.visit++;
            q.push(top);

            if(node.left!=null){
                q.push(new Pair(node.left,0));
            }
            
        }
        else if(visit==1){
            inOrder.push(top.node.val);
            top.visit++;

            q.push(top);

            if(node.right!=null){
                q.push(new Pair(ndoe.right,0));
            }
        }
        else{
            postOrder.push(node);
        }

        
        
    }
}


function buildTree(root){

    let inMap = new Map();



}


//https://leetcode.com/problems/delete-nodes-and-return-forest/

var delNodes = function(root, to_delete) {
    
    function Delete(node){

        if(!node) return null;

        node.left = Delete(node.left);
        node.right = Delete(node.right);

        if(remain.has(node.val)){
            if(node.left){
                ans.push(node.left);
            }

            if(node.right){
                ans.push(node.right);
            }
            
            return null;
        }
        else{
            return node;
        }

    }

    let remain = new Set();
    for(let node of to_delete){
        remain.add(node);
    }

    let ans = [];

    Delete(root);
    if(!remain.has(root.val)){
        ans.push(root);
    }

    return ans;


};


function getLeadNodes(root){
    
    let ans = new Map();

    function Height(node){
        if(!node) return 0;


        let left = Height(node.left);
        let right = Height(node.right);

        let h = 1+ Math.madx(left,right);

        if(ans.has(h)){
            let group = ans.get(h);
            group.push(node);
            ans.set(h,group);
        }
        else{
            ans.set(h,[node]);
        }
    }

    Height(root);

    return ans.values();
}

// Simplified version 

function getLeafNodes(root) {
    const ans = [];

    function Height(node) {
        if (!node) return -1; // Return -1 for null nodes

        const h = 1 + Math.max(Height(node.left), Height(node.right));

        // Ensure the array is large enough to hold the current height
        if (!ans[h]) ans[h] = [];
        ans[h].push(node);

        return h; // Return the height of the current node
    }

    Height(root);
    return ans; // Directly return the array of leaves
}

//deserial and serialise tree

var serialize = function(root) {
    let s = [] ;
    if(!root){
        return "";
    }

    let q = [] ; 
    q.push(root);

    while(q.length!=0){
        let node = q.shift();

        if(!node){
            s.push("#,")
        }
        else{
            s.push(node.val+',');

            q.push(node.left);
            q.push(node.right);
        }

    }

    return s.join("");


    
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {

    if(!data){
        return null;
    }

    let arr = data.split(','); 
    let val = arr.shift();
    let root = new TreeNode(parseInt(val));
    let q = [root];
    while(q.length!=0){

        let node = q.shift();
    
        let leftVal  = arr.shift();

        if(leftVal!="#"){
            node.left = new TreeNode(parseInt(leftVal));
            q.push(node.left);
        }

        let rightVal  =  arr.shift();

        if(rightVal!="#"){
            node.right= new TreeNode(parseInt(rightVal));
            q.push(node.right);
        }

    }

    return root;

};


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
 var serialize = function(root) {
    let s = [];

    function dfs(node){
        if(!node){
            s.push('N');
            return;
        }

        s.push(node.val);
        dfs(node.left);
        dfs(node.right);
    }

    dfs(root);
    return s.join(',');
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    let idx = 0 ;
    let s = data.split(',');
    function makeTree(){
        if(s[idx]=='N'){
            idx++;
            return null;
        }

        let node  = new TreeNode(parseInt(s[idx]));
        idx++;
        node.left= makeTree();
        node.right=makeTree();

        return node;

    }

    return makeTree(data);

};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
