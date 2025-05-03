function inOrder(node) {
    if (!node) return;

    inOrder(node.left);
    console.log(node.val);
    inOrder(node.right);
}

class Pair {
    constructor(node, state) {
        this.node = node;
        this.state = state;
    }
}

function Iterative(node) {
    let q = [];

    let inOrder = [];
    let preOrder = [];
    let postOrder = [];

    q.push(new Pair(node, 0));

    while (q.length != 0) {
        let top = q.pop();
        if (visit == 0) {
            preOrder.push(top.node.val);
            top.visit++;
            q.push(top);

            if (node.left != null) {
                q.push(new Pair(node.left, 0));
            }
        } else if (visit == 1) {
            inOrder.push(top.node.val);
            top.visit++;

            q.push(top);

            if (node.right != null) {
                q.push(new Pair(ndoe.right, 0));
            }
        } else {
            postOrder.push(node);
        }
    }
}

function buildTree(root) {
    let inMap = new Map();
}

function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
}

var buildTree = function (preorder, inorder) {
    let idx = 0;
    let inMap = new Map();
    for (let i = 0; i < inorder.length; i++) {
        inMap.set(inorder[i], i);
    }

    function makeTree(left, right) {
        if (left > right) {
            return null;
        }

        let rootVal = preorder[idx];
        idx += 1;
        let root = new TreeNode(rootVal);
        let inIdx = inMap.get(rootVal);
        root.left = makeTree(left, inIdx - 1);
        root.right = makeTree(inIdx + 1, right);

        return root;
    }

    return makeTree(0, inorder.length - 1);
};

var buildTree = function (inorder, postorder) {
    let inMap = new Map();
    for (let i = 0; i < inorder.length; i++) {
        inMap.set(inorder[i], i);
    }

    let idx = postorder.length - 1;

    function makeTree(left, right) {
        if (left > right) return null;

        let rootVal = postorder[idx--];
        let root = new TreeNode(rootVal);

        let inIdx = inMap.get(rootVal);

        // Build right subtree before left since we're going backward in postorder
        root.right = makeTree(inIdx + 1, right);
        root.left = makeTree(left, inIdx - 1);

        return root;
    }

    return makeTree(0, inorder.length - 1);
};

var serialize = function (root) {
    let s = [];

    function dfs(node) {
        if (!node) {
            s.push("N");
            return;
        }

        s.push(node.val);
        dfs(node.left);
        dfs(node.right);
    }

    dfs(root);
    return s.join(",");
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */

var deserialize = function (data) {
    let idx = 0;
    let s = data.split(",");
    function makeTree() {
        if (s[idx] == "N") {
            idx++;
            return null;
        }

        let node = new TreeNode(parseInt(s[idx]));
        idx++;
        node.left = makeTree();
        node.right = makeTree();

        return node;
    }

    return makeTree(data);
};

// We reverse the preorder (visit: right → left → root) using postorder traversal style, so when we backtrack:

// We already have the right subtree flattened.

// We attach it after the current node and update the prev pointer.

// The final structure uses only .right pointers and follows preorder order.

var flatten = function(root) {
    let prev = null;

    function dfs(node) {
        if (!node) return;

        dfs(node.right);   // Visit right first
        dfs(node.left);    // Then left

        node.right = prev; // Link current node to previously visited node
        node.left = null;  // Nullify left pointer
        prev = node;       // Update prev
    }

    dfs(root);
};




// for left pointers

var flattenLeft = function(root) {
    let prev = null;

    function dfs(node) {
        if (!node) return;

        dfs(node.right);   // Still process right first
        dfs(node.left);    // Then left

        node.left = prev;  // Connect to previous via `.left`
        node.right = null; // Nullify `.right` pointer
        prev = node;       // Move prev forward
    }

    dfs(root);
};

//https://leetcode.com/problems/delete-nodes-and-return-forest/

var delNodes = function (root, to_delete) {
    function Delete(node) {
        if (!node) return null;

        node.left = Delete(node.left);
        node.right = Delete(node.right);

        if (remain.has(node.val)) {
            if (node.left) {
                ans.push(node.left);
            }

            if (node.right) {
                ans.push(node.right);
            }

            return null;
        } else {
            return node;
        }
    }

    let remain = new Set();
    for (let node of to_delete) {
        remain.add(node);
    }

    let ans = [];

    Delete(root);
    if (!remain.has(root.val)) {
        ans.push(root);
    }

    return ans;
};

//https://algo.monster/liteproblems/366
function getLeadNodes(root) {
    let ans = new Map();

    function Height(node) {
        if (!node) return 0;

        let left = Height(node.left);
        let right = Height(node.right);

        let h = 1 + Math.max(left, right);

        if (ans.has(h)) {
            let group = ans.get(h);
            group.push(node);
            ans.set(h, group);
        } else {
            ans.set(h, [node]);
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

var serialize = function (root) {
    let s = [];
    if (!root) {
        return "";
    }

    let q = [];
    q.push(root);

    while (q.length != 0) {
        let node = q.shift();

        if (!node) {
            s.push("#,");
        } else {
            s.push(node.val + ",");

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
var deserialize = function (data) {
    if (!data) {
        return null;
    }

    let arr = data.split(",");
    let val = arr.shift();
    let root = new TreeNode(parseInt(val));
    let q = [root];
    while (q.length != 0) {
        let node = q.shift();

        let leftVal = arr.shift();

        if (leftVal != "#") {
            node.left = new TreeNode(parseInt(leftVal));
            q.push(node.left);
        }

        let rightVal = arr.shift();

        if (rightVal != "#") {
            node.right = new TreeNode(parseInt(rightVal));
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


/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

var allTraversals = function (root) {
    const preOrder = [];
    const inOrder = [];
    const postOrder = [];

    if (!root) return { preOrder, inOrder, postOrder };

    const stack = [[root, 0]]; // [node, state]

    while (stack.length > 0) {
        const [node, state] = stack.pop();

        if (state === 0) {
            // Preorder: Node -> Left -> Right
            preOrder.push(node.val);
            stack.push([node, 1]); // Push back with incremented state
            if (node.left) stack.push([node.left, 0]);
        } else if (state === 1) {
            // Inorder: Left -> Node -> Right
            inOrder.push(node.val);
            stack.push([node, 2]);
            if (node.right) stack.push([node.right, 0]);
        } else {
            // Postorder: Left -> Right -> Node
            postOrder.push(node.val);
        }
    }

    return { preOrder, inOrder, postOrder };
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
    if (!root) return [];

    let result = [];
    let queue = [root];

    while (queue.length > 0) {
        let levelSize = queue.length;
        let currentLevel = [];

        for (let i = 0; i < levelSize; i++) {
            let node = queue.shift(); // O(1) in real queue implementations
            currentLevel.push(node.val);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(currentLevel);
    }

    return result;
};

// Time: O(n) – every node is visited once.
// Space: O(n) – worst case when the tree is full and the last level has n/2 nodes in the queue.

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function (root) {
    let result = [];

    function dfs(node, level) {
        if (!node) return;

        if (result.length === level) {
            result.push([]);
        }

        if (level % 2 === 0) {
            // left to right
            result[level].push(node.val);
        } else {
            // right to left
            result[level].unshift(node.val); // insert at beginning
        }

        dfs(node.left, level + 1);
        dfs(node.right, level + 1);
    }

    dfs(root, 0);
    return result;
};

var maxPathSum = function (root) {
    let ans = -Infinity;

    var dfs = function (node) {
        if (!node) return 0;

        let leftSum = Math.max(dfs(node.left), 0); // don't take negative paths
        let rightSum = Math.max(dfs(node.right), 0);

        // Update the max path sum including both sides
        ans = Math.max(ans, node.val + leftSum + rightSum);

        // Return one side to the parent
        return node.val + Math.max(leftSum, rightSum);
    };

    dfs(root);
    return ans;
};

var isIdenticalTree = function (tree1, tree2) {
    // Helper function to check if two trees are identical
    const areTreesIdentical = (node1, node2) => {
        // If both nodes are null, trees are identical at this point
        if (!node1 && !node2) {
            return true;
        }

        // If one node is null or values don't match, trees are not identical
        if (!node1 || !node2) {
            return false;
        }

        // Check if the values match and recursively check left and right subtrees
        return (
            node1.val === node2.val &&
            areTreesIdentical(node1.left, node2.left) &&
            areTreesIdentical(node1.right, node2.right)
        );
    };

    return areTreesIdentical(tree1, tree2);
};

// Node structure for the binary tree
class Node {
    constructor(val) {
        this.data = val;
        this.left = null;
        this.right = null;
    }
}

class Solution {
    // Function to check if a node is a leaf
    isLeaf(root) {
        return !root.left && !root.right;
    }

    // Function to add the left boundary of the tree
    addLeftBoundary(root, res) {
        let curr = root.left;
        while (curr) {
            // If the current node is not a leaf, add its value to the result
            if (!this.isLeaf(curr)) {
                res.push(curr.data);
            }
            // Move to the left child if it exists, otherwise move to the right child
            if (curr.left) {
                curr = curr.left;
            } else {
                curr = curr.right;
            }
        }
    }

    // Function to add the right boundary of the tree
    addRightBoundary(root, res) {
        let curr = root.right;
        let temp = [];
        while (curr) {
            // If the current node is not a leaf, add its value to a temporary vector
            if (!this.isLeaf(curr)) {
                temp.push(curr.data);
            }
            // Move to the right child if it exists, otherwise move to the left child
            if (curr.right) {
                curr = curr.right;
            } else {
                curr = curr.left;
            }
        }
        // Reverse and add the values from the temporary vector to the result
        for (let i = temp.length - 1; i >= 0; --i) {
            res.push(temp[i]);
        }
    }

    // Function to add the leaves of the tree
    addLeaves(root, res) {
        // If the current node is a leaf, add its value to the result
        if (this.isLeaf(root)) {
            res.push(root.data);
            return;
        }
        // Recursively add leaves of the left and right subtrees
        if (root.left) {
            this.addLeaves(root.left, res);
        }
        if (root.right) {
            this.addLeaves(root.right, res);
        }
    }

    // Main function to perform the boundary traversal of the binary tree
    printBoundary(root) {
        let res = [];
        if (!root) {
            return res;
        }
        // If the root is not a leaf, add its value to the result
        if (!this.isLeaf(root)) {
            res.push(root.data);
        }

        // Add the left boundary, leaves, and right boundary in order
        this.addLeftBoundary(root, res);
        this.addLeaves(root, res);
        this.addRightBoundary(root, res);

        return res;
    }
}

// Helper function to print the result
function printResult(result) {
    for (let val of result) {
        console.log(val + " ");
    }
    console.log();
}

// Creating a sample binary tree
let root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);
root.right.left = new Node(6);
root.right.right = new Node(7);

let solution = new Solution();

// Get the boundary traversal
let result = solution.printBoundary(root);

// Print the result
console.log("Boundary Traversal: ");
printResult(result);

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */

var verticalTraversal = function (root) {
    let col = 0;
    let minCol = 0;
    let maxCol = 0;

    let map = new Map();

    function dfs(node, col, row) {
        if (!node) {
            return;
        }

        if (!map.has(col)) {
            map.set(col, []);
        }
        map.get(col).push([node.val, col, row]);
        minCol = Math.min(minCol, col);
        maxCol = Math.max(maxCol, col);
        dfs(node.left, col - 1, row + 1);
        dfs(node.right, col + 1, row + 1);
    }

    dfs(root, 0, 0);

    function compare(a, b) {
        if (a[2] !== b[2]) {
            // compare row first
            return a[2] - b[2];
        } else {
            return a[0] - b[0]; //compare values
        }
    }
    let res = [];
    for (let col = minCol; col <= maxCol; col++) {
        const entries = map.get(col);

        entries.sort((a, b) => compare(a, b));
        res.push(entries.map((item) => item[0]));
    }

    return res;
};

// Node structure for the binary tree
class Node {
    constructor(val) {
        this.data = val;
        this.left = null;
        this.right = null;
    }
}

class Solution {
    // Function to return the
    // top view of the binary tree
    topView(root) {
        // Vector to store the result
        let ans = [];

        // Check if the tree is empty
        if (root === null) {
            return ans;
        }

        // Map to store the top view nodes
        // based on their vertical positions
        let mpp = new Map();

        // Queue for BFS traversal, each element
        // is a pair containing node
        // and its vertical position
        let q = [];

        // Push the root node with its vertical
        // position (0) into the queue
        q.push([root, 0]);

        // BFS traversal
        while (q.length !== 0) {
            // Retrieve the node and its vertical
            // position from the front of the queue
            let [node, line] = q.shift();

            // If the vertical position is not already
            // in the map, add the node's data to the map
            if (!mpp.has(line)) {
                mpp.set(line, node.data);
            }

            // Process left child
            if (node.left !== null) {
                // Push the left child with a decreased
                // vertical position into the queue
                q.push([node.left, line - 1]);
            }

            // Process right child
            if (node.right !== null) {
                // Push the right child with an increased
                // vertical position into the queue
                q.push([node.right, line + 1]);
            }
        }

        // Transfer values from the
        // map to the result vector
        for (let [key, value] of mpp) {
            ans.push(value);
        }

        return ans;
    }
}

// Node structure for the binary tree
class Node {
    constructor(val) {
        this.data = val;
        this.left = null;
        this.right = null;
    }
}

class Solution {
    // Function to return the bottom view of the binary tree
    bottomView(root) {
        // Vector to store the result
        let ans = [];

        // Check if the tree is empty
        if (root === null) {
            return ans;
        }

        // Map to store the bottom view nodes
        // based on their vertical positions
        let mpp = new Map();

        // Queue for BFS traversal, each
        // element is a pair containing node
        // and its vertical position
        let q = [];

        // Push the root node with its vertical
        // position (0) into the queue
        q.push([root, 0]);

        // BFS traversal
        while (q.length > 0) {
            // Retrieve the node and its vertical
            // position from the front of the queue
            let [node, line] = q.shift();

            // Update the map with the node's data
            // for the current vertical position
            mpp.set(line, node.data);

            // Process left child
            if (node.left !== null) {
                // Push the left child with a decreased
                // vertical position into the queue
                q.push([node.left, line - 1]);
            }

            // Process right child
            if (node.right !== null) {
                // Push the right child with an increased
                // vertical position into the queue
                q.push([node.right, line + 1]);
            }
        }

        // Transfer values from the
        // map to the result vector
        for (let [key, value] of mpp) {
            ans.push(value);
        }

        return ans;
    }
}

var rightSideView = function (root) {
    if (!root) return [];

    let ans = [];
    function rightView(node, level) {
        if (!node) return;
        if (ans.length === level) {
            ans.push(node.val);
        }

        rightView(node.right, level + 1);
        rightView(node.left, level + 1);
    }

    rightView(root, 0);
    return ans;
};

// whenever you are using isLead function in a tree, you need to check if the node is null or not.

var binaryTreePaths = function (root) {
    const result = [];

    function dfs(node, path) {
        if (!node) return;

        path.push(node.val);

        if (!node.left && !node.right) {
            result.push(path.join("->"));
        } else {
            dfs(node.left, path);
            dfs(node.right, path);
        }

        path.pop(); // Backtrack
    }

    dfs(root, []);
    return result;
};

//

var lowestCommonAncestor = function (root, p, q) {
    function findLCS(node, p, q) {
        if (node === null || node === p || node === q) {
            return node;
        }

        let isLeftNode = findLCS(node.left, p, q);
        let isRightNode = findLCS(node.right, p, q);

        if (isLeftNode && isRightNode) {
            return node;
        }

        if (!isLeftNode) {
            return isRightNode;
        }

        if (!isRightNode) {
            return isLeftNode;
        }
    }

    return findLCS(root, p, q);
};

function childrenSumProperty(node) {
    if (!node) return 0; // An empty tree satisfies the property

    childSum = 0;
    if (node.left) {
        childSum += node.left.data;
    }
    if (node.right) {
        childSum += node.right.data;
    }

    if (childSum < node.data) {
        if (node.left) {
            node.left.data = node.data;
        }
        if (node.right) {
            node.right.data = node.data;
        }
    } else {
        node.data = childSum;
    }

    let left = childrenSumProperty(node.left);
    let right = childrenSumProperty(node.right);

    let total = 0;

    if (node.left) {
        total += node.left.data;
    }
    if (node.right) {
        total += node.right.data;
    }

    if (node.left || node.right) {
        node.data = total;
    }
}

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} k
 * @return {number[]}
 */
var distanceK = function (root, target, k) {
    let parent = new Map();
    let q = [root];
    let ans = [];

    while (q.length != 0) {
        let node = q.shift();
        if (node.left) {
            parent.set(node.left, node);
            q.push(node.left);
        }

        if (node.right) {
            parent.set(node.right, node);
            q.push(node.right);
        }
    }

    let res = [];

    function dfs(node, blocked, k) {
        if (!node || k < 0) {
            return;
        }

        if (k == 0) {
            ans.push(node.val);
            return;
        }

        k -= 1;

        if (node.left && blocked !== node.left) dfs(node.left, node, k);
        if (node.right && blocked !== node.right) dfs(node.right, node, k);
        if (parent.has(node) && parent.get(node) !== blocked)
            dfs(parent.get(node), node, k);
    }

    dfs(target, null, k);
    return ans;
};

/// ask what we have provided is it node or value
// if it is value then we need to find the node first and then we can use the above code.

var amountOfTime = function (root, start) {
    let parent = new Map();
    let mainNode = null;
    function dfs(node) {
        if (!node) return;

        if (start === node.val) mainNode = node;

        if (node.left) parent.set(node.left, node);

        if (node.right) parent.set(node.right, node);

        dfs(node.left);

        dfs(node.right);
    }

    dfs(root);

    let time = 0;
    q = [[mainNode, null]];

    while (q.length !== 0) {
        let size = q.length;

        for (let i = 0; i < size; i++) {
            let [node, blocked] = q.shift();

            if (node.left && blocked !== node.left) {
                q.push([node.left, node]);
            }

            if (node.right && blocked !== node.right) {
                q.push([node.right, node]);
            }

            if (parent.has(node) && blocked !== parent.get(node)) {
                q.push([parent.get(node), node]);
            }
        }

        if (q.length > 0) time++;
    }

    return time;
};
// https://leetcode.com/problems/delete-nodes-and-return-forest/description/
var delNodes = function (root, to_delete) {
    let ans = [];
    let st = new Set(to_delete);

    console.log(st);

    function delete_Node(node) {
        if (!node) {
            return null;
        }

        node.left = delete_Node(node.left);
        node.right = delete_Node(node.right);

        if (st.has(node.val)) {
            st.delete(node);
            if (node.left) ans.push(node.left);
            if (node.right) ans.push(node.right);
            return null;
        }

        return node;
    }

    delete_Node(root);
    if (!st.has(root.val)) {
        ans.push(root);
    }

    return ans;
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */ //leetcode.com/problems/binary-tree-pruning/description/
https: var pruneTree = function (root) {
    function dfs(node) {
        if (!node) {
            return null;
        }

        node.left = dfs(node.left);
        node.right = dfs(node.right);

        if (node.left == null && node.right == null && node.val == 0) {
            return null;
        }

        return node;
    }

    return dfs(root);
};
