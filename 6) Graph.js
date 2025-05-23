// DSU
// Disjoint Set Union | A data structure that keeps track of a set of elements partitioned into disjoint (non-overlapping) subsets

// Term                | Meaning

// Find                | Find the "ultimate parent" (or leader) of a node.
// Union               | Merge two sets (two nodes).
// Path Compression    | During find(), directly link a node to its ultimate parent (makes find faster next time).
// Union by Rank/Size  | Always attach the smaller tree under the bigger tree — keeps trees flat.

// find(x) → O(α(n)) — almost constant time if using path compression.

// union(x, y) → O(α(n)).

// Always initialize the parent array where parent[i] = i.

// Use size instead of rank if the problem asks you to manage group sizes.

// Problems involving "groups" / "connected components".
// Merging accounts, merging nodes, checking if cycles exist, counting islands.
// Minimum Spanning Tree (like Kruskal's Algorithm).

let rank = Array(n).fill(0); // everyone's rank intially 0
let parent = Array(n)
    .fill(0)
    .map((_, idx) => idx); // veryone is parent of itself parent[i]=i

function find(x) {
    if (x != parent[x]) {
        parent[x] = find(parent[x]);
    }
    return parent[x];
}

/**
 *
 * @param {number[][]} grid
 * @return {number}
 */

function find(x) {
    if (x === parent[x]) {
        return x;
    }
    parent[x] = find(parent[x]);
    return parent[x];
}

function unionByRank(x, y) {
    let xParent = find(x);
    let yParent = find(y);

    if (xParent !== yParent) {
        if (rank[xParent] > rank[yParent]) {
            parent[yParent] = xParent;
        } else if (rank[xParent] < rank[yParent]) {
            parent[xParent] = yParent;
        } else {
            parent[xParent] = yParent;
            rank[yParent] += 1;
        }
    }
}

function unionBySize(x, y) {
    let xParent = find(x);
    let yParent = find(y);

    if (xParent != yParent) {
        if (size[xParent] > size[yParent]) {
            parent[yParent] = xParent;
            size[xParent] += size[yParent];
        } else {
            parent[xParent] = yParent;
            size[yParent] += size[xParent];
        }
    }
}

/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findNumberofProvinces = function (graph) {
    let n = graph.length;
    let parent = Array(n)
        .fill(0)
        .map((_, index) => index);
    let rank = Array(n).fill(0);

    function find(x) {
        if (x === parent[x]) {
            return x;
        }

        parent[x] = find(parent[x]);
        return parent[x];
    }
    let count = n;

    function unionByRank(x, y) {
        let xParent = find(x);
        let yParent = find(y);

        if (xParent !== yParent) {
            if (rank[xParent] > rank[yParent]) {
                parent[yParent] = xParent;
            } else if (rank[xParent] < rank[yParent]) {
                parent[xParent] = yParent;
            } else {
                parent[xParent] = yParent;
                rank[yParent] += 1;
            }
            count -= 1; 
        }
    }

    for (let u = 0; u < n; u++) {
        for (let v = u+1; v < n; v++) {
            if (graph[u][v] == 1) {
                unionByRank(u, v);
            }
        }
    }

    return count;
};

var findRedundantConnection = function (edges) {
    let n = edges.length;
    let parent = Array(n + 1)
        .fill(0)
        .map((_, index) => index);
    let rank = Array(n + 1).fill(0);

    function find(x) {
        if (x === parent[x]) return x;
        parent[x] = find(parent[x]);
        return parent[x];
    }

    function unionByRank(x, y) {
        let xParent = find(x);
        let yParent = find(y);

        if (xParent !== yParent) {
            if (rank[xParent] > rank[yParent]) {
                parent[yParent] = xParent;
            } else if (rank[yParent] > rank[xParent]) {
                parent[xParent] = yParent;
            } else {
                parent[xParent] = yParent;
                rank[yParent] += 1;
            }
            return false; // Union successful
        }

        return true; // Already connected
    }

    let ans;

    for (let [u, v] of edges) {
        if (unionByRank(u, v)) {
            ans = [u, v];
        }
    }

    return ans;
};

/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
var accountsMerge = function(accounts) {
    let  n = accounts.length;
    let parent  = new Map();
    let rank = new Map();

    function find(x) {
        if(!parent.has(x)){
            parent.set(x,x);
            rank.set(x,0);
        }
        if (x === parent.get(x)) {
            return x;
        }
        parent.set(x, find(parent.get(x)));
        return parent.get(x);
    }

    function unionByRank(x, y) {
        let xParent = find(x);
        let yParent = find(y);

       if (xParent !== yParent) {
            if (rank.get(xParent) > rank.get(yParent)) {
                parent.set(yParent, xParent);
            } else if (rank.get(xParent) < rank.get(yParent)) {
                parent.set(xParent, yParent);
            } else {
                parent.set(xParent, yParent);
                rank.set(yParent, rank.get(yParent) + 1);
            }
        }
    }
    let emailToName = new Map();
    for(let account of accounts){
        let name = account[0];
        for(let i=1; i< account.length;i++){
            emailToName.set(account[i],name);
            unionByRank(account[1],account[i]);
        }
    }

    let groups = new Map();

    for(let email of emailToName.keys()){
        let parentMail = find(email);
        if(!groups.has(parentMail)){
            groups.set(parentMail,[])
        }

        groups.get(parentMail).push(email)
    }


    let res = [];

    for(let [mail,Others] of groups){
        let name = emailToName.get(mail);
        let sortedEmails = Others.sort();
        res.push([name,...sortedEmails]);
    }

    return res;


    
};

var smallestStringWithSwaps = function(s, pairs) {
    let n = s.length;
    let parent = Array(n)
        .fill(0)
        .map((_, index) => index);
    let rank = Array(n).fill(0);

    function find(x) {
        if (x === parent[x]) return x;
        parent[x] = find(parent[x]);
        return parent[x];
    }

    function unionByRank(x, y) {
        let xParent = find(x);
        let yParent = find(y);

        if (xParent !== yParent) {
            if (rank[xParent] > rank[yParent]) {
                parent[yParent] = xParent;
            } else if (rank[yParent] > rank[xParent]) {
                parent[xParent] = yParent;
            } else {
                parent[xParent] = yParent;
                rank[yParent] += 1;
            }
        }
    }

    for(let [u,v] of pairs){
        unionByRank(u,v);
    }

    let map = new Map();

    for(let i=0;i<s.length;i++){
        let root = find(i);
        if(!map.has(root)){
            map.set(root,[]);
        }

        map.get(root).push(s[i]);
    }

    for(let key of map.keys()){
        let strs = map.get(key);
        strs.sort((a,b)=>b.localeCompare(a));
        map.set(key,strs);
    }

    let res = [];
    for(let i=0; i <s.length;i++){
        let root = find(i);
        res.push(map.get(root).pop());
    }

    return res.join("")


};



//https://leetcode.com/problems/making-a-large-island/
var largestIsland = function (grid) {
    let rows = grid.length;
    let cols = grid[0].length;
    let mxsize = rows * cols;

    let rank = new Array(mxsize).fill(0);
    let parent = [];
    let size = [];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            parent[i * rows + j] = i * rows + j;
            size[i * rows + j] = 1;
        }
    }

    function isValid(x, y) {
        return x >= 0 && y >= 0 && x < rows && y < cols;
    }

    for (let i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            if (grid[i][j] === 0) continue;

            for (let [dx, dy] of [
                [0, 1],
                [0, -1],
                [1, 0],
                [-1, 0],
            ]) {
                let nr = i + dx;
                let nc = j + dy;

                if (isValid(nr, nc) && grid[nr][nc] == 1) {
                    unionBySize(i * rows + j, nr * rows + nc);
                }
            }
        }
    }

    let mx = 0;
    for (let i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            let set = new Set();
            if (grid[i][j] === 1) continue;

            for (let [dx, dy] of [
                [0, 1],
                [0, -1],
                [1, 0],
                [-1, 0],
            ]) {
                let nr = i + dx;
                let nc = j + dy;

                if (isValid(nr, nc) && grid[nr][nc] == 1) {
                    set.add(find(nr * rows + nc));
                }
            }
            let total = 0;
            for (let up of set) {
                total += size[up];
            }

            mx = Math.max(mx, total + 1);
        }
    }

    for (let k = 0; k < rows * cols; k++) {
        mx = Math.max(mx, size[find(k)]);
    }

    return mx;
};

//-------------------------------------//
// https://leetcode.com/problems/satisfiability-of-equality-equations/
/**
 * @param {string[]} equations
 * @return {boolean}
 */
var equationsPossible = function (equations) {
    let parent = [];
    for (let i = 0; i < 26; i++) {
        parent[i] = i;
    }
    let rank = new Array(26).fill(0);
    let map = new Map();
    let count = 0;
    for (let char of "abcdefghijklmnopqrstuvwxyz") {
        map.set(char, count);
        count++;
    }

    function find(x) {
        if (x === parent[x]) {
            return x;
        }
        parent[x] = find(parent[x]);
        return parent[x];
    }

    function unionByRank(x, y) {
        xParent = find(x);
        yParent = find(y);

        if (xParent !== yParent) {
            if (rank[xParent] > rank[yParent]) {
                parent[yParent] = xParent;
            } else if (rank[xParent] < rank[yParent]) {
                parent[xParent] = yParent;
            } else {
                parent[xParent] = yParent;
                rank[yParent] += 1;
            }
        }
    }

    let notEq = [];
    for (let eq of equations) {
        if (eq[1] === "=") {
            union(map.get(eq[0]), map.get(eq[3]));
        } else {
            notEq.push([eq[0], eq[3]]);
        }
    }

    for (let ele of notEq) {
        let x = find(map.get(ele[0]));
        let y = find(map.get(ele[1]));

        if (x === y) {
            return false;
        }
    }

    return true;
};

// number of islands 2
// https://leetcode.ca/2016-09-30-305-Number-of-Islands-II/
function FindNumberofIslands2() {
    let m = 5;
    let n = 5;
    let positions = [
        [0, 0],
        [1, 0],
        [1, 1],
        [2, 1],
        [2, 0],
        [0, 1],
    ];

    arr = Array.from({ length: m }, () => Array(n).fill(0));

    let rows = arr.length;
    let cols = arr[0].length;
    let parent = new Array(m * n).fill(-1);
    let rank = new Array(m * n).fill(0);
    let visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    let count = 0;
    let ans = [];

    function index(i, j) {
        return rows * i + j;
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            parent[index(i, j)] = index(i, j);
        }
    }
    console.log(parent);
    console.log(rank);

    function find(x) {
        if (x == parent[x]) {
            return x;
        }

        parent[x] = find(parent[x]);
        return parent[x];
    }
    function union(x, y) {
        let xParent = find(x);
        let yParent = find(y);

        if (xParent != yParent) {
            if (rank[xParent] > rank[yParent]) {
                parent[yParent] = xParent;
            } else if (rank[yParent] > rank[xParent]) {
                parent[xParent] = yParent;
            } else {
                parent[xParent] = yParent;
                rank[yParent] += 1;
            }
            return true;
        }
        return false;
    }

    for (let [r, c] of positions) {
        if (visited[r][c] === true) {
            ans.add(count);
            continue;
        }

        visited[r][c] = true;

        count++;

        for (let [dx, dy] of [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
        ]) {
            let nr = r + dx;
            let nc = c + dy;
            if (
                nr >= 0 &&
                nc >= 0 &&
                nr < arr.length &&
                nc < arr[0].length &&
                visited[nr][nc] == true
            ) {
                let isValid = union(index(r, c), index(nr, nc));
                if (isValid) {
                    count--;
                }
            }
        }
        ans.push(count);
    }

    console.log(ans);
}

//Detect Cycle in Graph using DSU  undirected graph with no self loops-------------------------------------------------------------------------------------------

class Solution {
    detectCycle(n, adj) {
        let rank = new Array(n).fill(0);
        let parent = [];
        for (let i = 0; i < n; i++) {
            parent[i] = i;
        }

        function find(x) {
            if (x == parent[x]) {
                return x;
            }

            parent[x] = find(parent[x]);
            return parent[x];
        }

        function union(x, y) {
            let xParent = find(x);
            let yParent = find(y);

            if (xParent != yParent) {
                if (rank[xParent] > rank[yParent]) {
                    parent[yParent] = xParent;
                } else if (rank[yParent] > rank[xParent]) {
                    parent[xParent] = yParent;
                } else {
                    parent[xParent] = yParent;
                    rank[yParent] += 1;
                }
            }
        }

        for (let u = 0; u < n; u++) {
            for (let v of adj[u]) {
                if (u < v) {
                    let uParent = find(u);
                    let vParent = find(v);

                    if (uParent == vParent) {
                        return 1;
                    }

                    union(u, v);
                }
            }
        }

        return 0;
    }
}

class Solution {
    // Function to detect cycle in an undirected graph using BFS.
    isCycle(adj) {
        function BFSCycle1(graph, node, visited) {
            let q = [];
            q.push([node, -1]);
            visited[node] = true;

            while (q.length != 0) {
                let [node, parent] = q.shift();

                for (let nbr of graph[node]) {
                    if (nbr == parent) continue;

                    if (visited[nbr] == true) {
                        return true;
                    }

                    q.push([nbr, node]);
                    visited[nbr] = true;
                }
            }

            return false;
        }

        let v = adj.length;
        let visited = new Array(v).fill(false);

        for (let i = 0; i < v; i++) {
            if (visited[i] == false && BFSCycle1(adj, i, visited)) {
                return 1; // if cycle detected return 1
            }
        }
        return 0;
    }
}

// Time Complexity : O(V+E)
//In the worst case, the time complexity of detecting a cycle in an undirected graph using BFS is still O(V + E).

// Why?
// BFS visits each vertex at most once → O(V)

// BFS processes each edge at most twice (once from each endpoint) → O(E)

// The worst case occurs in a dense graph (like a complete graph), where E ≈ V². However, the complexity remains O(V + E).

// Thus, even in the worst case, the complexity does not exceed O(V + E). 

class Solution {
    // Function to detect cycle in an undirected graph DFS

    isCycle(adj) {
        function dfsCycle2(graph, node, visited, parent) {
            visited[node] = true;

            for (let nbr of graph[node]) {
                if (nbr === parent) continue;
                if (visited[nbr] == true) {
                    return true;
                }
                if (dfsCycle2(graph, nbr, visited, node)) {
                    return true;
                }
            }

            return false;
        }

        //     function dfsCycle1(graph,node,visited,parent){
        //         if(visited[node]==true){
        //             return true;
        //         }
        //         visited[node] = true;

        //         for(let nbr of graph[node]){
        //             if(nbr!=parent){
        //                  if(dfsCycle1(graph,nbr,visited,node)==true){
        //                      return true;
        //                  }
        //             }
        //         }
        //     return false;
        // }

        let v = adj.length;
        let visited = new Array(v).fill(false);

        for (let i = 0; i < v; i++) {
            if (visited[i] == false && dfsCycle2(adj, i, visited, i)) {
                return 1;
            }
        }

        return 0;
    }
}

// cycle in Directed graph using DFS

class Solution {
    // Function to detect cycle in an directed graph DFS
    isCycle(adj) {
        function dfsCycle(graph, node, visited, inRecursion) {
            visited[node] = true;
            inRecursion[node] = true;

            for (let nbr of graph[node]) {
                if(!visited[nbr]){
                    if(dfsCycle(graph,nbr,visited,inRecursion)){
                        return true;
                    }
                }
                else if(inRecursion[nbr]){
                    true;
                }
            }

            inRecursion[node] = false;
            return false;
        }

        //     function dfsCycle1(graph,node,visited,parent){
        //         if(visited[node]==true){
        //             return true;
        //         }
        //         visited[node] = true;

        //         for(let nbr of graph[node]){
        //             if(nbr!=parent){
        //                  if(dfsCycle1(graph,nbr,visited,node)==true){
        //                      return true;
        //                  }
        //             }
        //         }
        //     return false;
        // }

        let v = adj.length;
        let visited = new Array(v).fill(false);
        let inRecursion = new Array(v).fill(false);
        for (let i = 0; i < v; i++) {
            if (
                visited[i] == false &&
                dfsCycle2(adj, i, visited, inRecursion)
            ) {
                return 1;
            }
        }

        return 0;
    }
}

// Function to detect cycle in a directed graph.

class Solution {
    isCyclic(V, adj) {
        function dfsCycle(graph, node, visited, inRecursion) {
            visited[node] = true;
            inRecursion[node] = true;

            for (let nbr of graph[node]) {
                if (visited[nbr] == true) {
                    if (inRecursion[nbr] == true) {
                        return true;
                    }
                } else {
                    if (dfsCycle(graph, nbr, visited, inRecursion)) {
                        return true;
                    }
                }

                // if(visited[nbr]==false && dfsCycle(graph,nbr,visited,inRecursion)){
                //     return true;
                // }
                // else if(inRecursion[nbr]==true){
                //     return true;
                // }
            }

            inRecursion[node] = false;
            return false;
        }

        let visited = new Array(V).fill(false);
        let inRecursion = new Array(V).fill(false);
        for (let i = 0; i < V; i++) {
            if (visited[i] == false && dfsCycle(adj, i, visited, inRecursion)) {
                return 1;
            }
        }

        return 0;
    }
}


// conunt number of islands in binary tree

function countIslands(root) {
    let count = 0;

    function dfs(node) {
        if (!node || node.val === 0) return;

        // Mark this node as visited
        node.val = 0;

        dfs(node.left);
        dfs(node.right);
    }

    function traverse(node) {
        if (!node) return;

        if (node.val === 1) {
            count++;
            dfs(node);
        }

        traverse(node.left);
        traverse(node.right);
    }

    traverse(root);
    return count;
}

function numDistinctIslands(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const uniqueIslands = new Set();

    function dfs(r, c, baseR, baseC, shape) {
        if (
            r < 0 || c < 0 || r >= rows || c >= cols ||
            grid[r][c] === 0 || visited[r][c]
        ) {
            return;
        }

        visited[r][c] = true;
        shape.push([r - baseR, c - baseC]); // store relative coordinate

        dfs(r + 1, c, baseR, baseC, shape);
        dfs(r - 1, c, baseR, baseC, shape);
        dfs(r, c + 1, baseR, baseC, shape);
        dfs(r, c - 1, baseR, baseC, shape);
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 1 && !visited[r][c]) {
                const shape = [];
                dfs(r, c, r, c, shape);
                uniqueIslands.add(JSON.stringify(shape));
            }
        }
    }

    return uniqueIslands.size;
}




// TopoLogical sort // only be Applied on Directed Acyclic Graph
// Topological sorting for Directed Acyclic Graph (DAG) is a linear ordering of vertices such that
// for every directed edge u -> v, vertex u comes before v in the ordering.
//DFS

function sol(adj, V) {
    function dfs(graph, node, visited, stk) {
        visited[node] = true;

        for (let nbr of graph[node]) {
            if (!visited[nbr]) {
                dfs(graph, nbr, visited, stk);
            }
        }

        stack.push(node);
    }

    let visited = new Array(V).fill(false);
    let stack = [];
    for (let v = 0; v < V; v++) {
        if (!visited[v]) {
            dfs(adj, v, visited, stack);
        }
    }

    while (stack.length != 0) {
        console.log(stack.shift());
    }
}

// topo using bfs, Kahn's Algo

class Solution {
    // Function to return list containing vertices in Topological order.
    topologicalSort(adj) {
        let n = adj.length;
        let inDegree = new Array(n).fill(0);

        for (let v = 0; v < n; v++) {
            for (let u of adj[v]) {
                inDegree[u] += 1;
            }
        }

        let q = [];

        for (let i = 0; i < n; i++) {
            if (inDegree[i] == 0) {
                q.push(i);
            }
        }

        let res = [];

        while (q.length != 0) {
            let node = q.shift();
            res.push(node);
            for (let nbr of adj[node]) {
                inDegree[nbr] -= 1;
                if (inDegree[nbr] == 0) {
                    q.push(nbr);
                }
            }
        }

        return res;
    }
}

//course schedule 2
//https://leetcode.com/problems/course-schedule-ii/description/

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var findOrder = function (n, course) {
    let adj = Array.from({ length: n }, () => []);
    for (let [u, v] of course) {
        adj[v].push(u);
    }

    let inDegree = new Array(n).fill(0);

    for (let [complete, req] of course) {
        inDegree[complete] += 1;
    }

    let q = [];

    for (let v = 0; v < n; v++) {
        if (inDegree[v] === 0) {
            q.push(v);
        }
    }
    let count = n;
    let ans = [];
    while (q.length != 0) {
        let node = q.shift();
        ans.push(node);

        count -= 1;
        //nbr = neighbour
        for (let nbr of adj[node]) {
            inDegree[nbr] -= 1;
            if (inDegree[nbr] == 0) {
                q.push(nbr);
            }
        }
    }
    // edge case always check whether completing the course is possible or not
    return count === 0 ? ans : [];
};

//Given a sorted dictionary of an alien language having N words and K starting alphabets of a standard dictionary. Find the order of characters in the alien language.
// There may be multiple valid orders for a particular test case, thus you may return any valid order.
// The output will be True if the order returned by the function is correct,
// else False denoting an incorrect order.

var AllPathsSourceTarget = function (dict, n, k) {
    // k is number of characters

    function getIndex(char) {
        return char.charCodeAt(0) - "a".charCodeAt(0);
    }

    let abc = "abcdefghijklmnopqrstuvwxyz";
    let map = new Map();
    let reverseMap = new Map();
    for (let i = 0; i < k; i++) {
        map.set(abc[i], i);
        reverseMap.set(i, abc[i]);
    }

    let adj = Array.from({ length: k }, () => []);
    for (let i = 0; i < dict.length - 1; i++) {
        let s1 = dict[i];
        let s2 = dict[i + 1];

        let len = Math.min(s1.length, s2.length);

        for (let j = 0; j < len; j++) {
            if (s1[j] != s2[j]) {
                adj[map.get(s1[j])].push(map.get(s2[j]));
                // adj[getIndex(s1[j])].push(getIndex(s2[j]));
                break;
            }
        }
    }
    
    let topo = findOrder(k,adj);
    let ans = [];
    for (let i = 0; i < topo.length; i++) {
        ans.push(String.fromCharCode(topo[i] + "a".charCodeAt(0)));
    }
    return ans.join("");
};

/**
 * @param {number[][]} matrix
 * @return {number}
 */
var longestIncreasingPath = function (matrix) {
    const m = matrix.length;
    const n = matrix[0].length;

    const indegree = Array.from({ length: m }, () => Array(n).fill(0));
    const dirs = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];

    // Calculate indegree for each cell
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            for (let [di, dj] of dirs) {
                const ni = i + di;
                const nj = j + dj;
                if (
                    ni >= 0 &&
                    ni < m &&
                    nj >= 0 &&
                    nj < n &&
                    matrix[ni][nj] > matrix[i][j]
                ) {
                    indegree[ni][nj]++;
                }
            }
        }
    }

    // Initialize queue with cells having 0 indegree
    let queue = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (indegree[i][j] === 0) {
                queue.push([i, j]);
            }
        }
    }

    let length = 0;

    while (queue.length > 0) {
        let size = queue.length;
        length++; // One layer = one step in the longest path

        for (let i = 0; i < size; i++) {
            const [x, y] = queue.shift();

            for (let [di, dj] of dirs) {
                const ni = x + di;
                const nj = y + dj;
                if (
                    ni >= 0 &&
                    ni < m &&
                    nj >= 0 &&
                    nj < n &&
                    matrix[ni][nj] > matrix[x][y]
                ) {
                    indegree[ni][nj]--;
                    if (indegree[ni][nj] === 0) {
                        queue.push([ni, nj]);
                    }
                }
            }
        }
    }

    return length;
};

/**
 * @param {number[][]} matrix
 * @return {number}
 */
var longestIncreasingPath = function (matrix) {
    const m = matrix.length;
    const n = matrix[0].length;

    // Initialize memo table with 0s
    const memo = Array.from({ length: m }, () => Array(n).fill(0));
    const dirs = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];

    const dfs = (i, j) => {
        if (memo[i][j] !== 0) return memo[i][j];

        let maxPath = 1;

        for (let [di, dj] of dirs) {
            const ni = i + di;
            const nj = j + dj;

            if (
                ni >= 0 &&
                ni < m &&
                nj >= 0 &&
                nj < n &&
                matrix[ni][nj] > matrix[i][j]
            ) {
                const length = 1 + dfs(ni, nj);
                maxPath = Math.max(maxPath, length);
            }
        }

        memo[i][j] = maxPath;
        return maxPath;
    };

    let result = 1;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            result = Math.max(result, dfs(i, j));
        }
    }

    return result;
};

/**
 * @param {number} n
 * @param {number[][]} relations
 * @param {number[]} time
 * @return {number}
 */
var minimumTime = function (n, relations, time) {
    const graph = Array.from({ length: n + 1 }, () => []);
    const inDegree = Array(n + 1).fill(0);
    const dp = Array(n + 1).fill(0);

    // Build the graph and in-degree array
    for (const [u, v] of relations) {
        graph[u].push(v);
        inDegree[v]++;
    }

    // Initialize queue with courses having no prerequisites
    const queue = [];
    for (let i = 1; i <= n; i++) {
        if (inDegree[i] === 0) {
            dp[i] = time[i - 1]; // use time[i - 1] since time is 0-based
            queue.push(i);
        }
    }

    // Process courses in topological order
    while (queue.length > 0) {
        const u = queue.shift();
        for (const v of graph[u]) {
            dp[v] = Math.max(dp[v], dp[u] + time[v - 1]);
            inDegree[v]--;
            if (inDegree[v] === 0) {
                queue.push(v);
            }
        }
    }

    // Return the maximum time to complete all courses
    return Math.max(...dp);
};

// BFS within the Graph wiht k Stops only

var findCheapestPrice = function (n, flights, src, dst, k) {
    const cost = new Array(n).fill(Infinity);
    const graph = Array.from({ length: n }, () => []);

    for (const [from, to, price] of flights) {
        graph[from].push([to, price]);
    }

    let queue = [[src, 0]];
    let stops = 0;
    while (queue.length !== 0 && stops <= k) {
        let size = queue.length;
        while (size > 0) {
            let [node, curr_cost] = queue.shift();
            for (let [nbr, price] of graph[node]) {
                let newCost = price + curr_cost;

                if (newCost < cost[nbr]) {
                    cost[nbr] = newCost;
                    queue.push([nbr, newCost]);
                }
            }
            size--;
        }

        stops++;
    }

    return cost[dst] === Infinity ? -1 : cost[dst];
};

// 🧩 Problem Statement
// You are given:

// A list of tasks, labeled 0 to n - 1.

// A list of prerequisite pairs where (a, b) means task a depends on task b.

// An integer k — the maximum number of tasks you can run in parallel per time unit.

// Your goal:

// Return the minimum time units required to complete all tasks.

function minTimeToFinishTasks(n, prerequisites, k) {
    const graph = Array.from({ length: n }, () => []);
    const inDegree = Array(n).fill(0);

    for (const [to, from] of prerequisites) {
        graph[from].push(to);
        inDegree[to]++;
    }

    const queue = [];
    for (let i = 0; i < n; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }

    let time = 0;
    while (queue.length > 0) {
        // pick up to k tasks in this batch
        let tasksThisBatch = Math.min(k, queue.length);
        const nextQueue = [];

        for (let i = 0; i < tasksThisBatch; i++) {
            const current = queue.shift();
            for (const neighbor of graph[current]) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] === 0) nextQueue.push(neighbor);
            }
        }

        // push next batch to the queue
        queue.push(...nextQueue);
        time++;
    }

    return time;
}

// for detecting cycle in DAG i just need to check res.length==N (number of nodes) or we can also use count ;

//dividing graph into 2 parts  , grouping in 2 parts  question is moving towards bipartite

// can we color the whole graph in 2 colors such that not 2 adjacent nodes has same color

// if odd cycle no bipartite;

// DFS

/**
 * Given a tree with n nodes (0 to n-1), find all the roots that form Minimum Height Trees.
 *
 * @param {number} n - Total number of nodes.
 * @param {number[][]} edges - List of undirected edges.
 * @return {number[]} - Root nodes of the Minimum Height Trees.
 */
var findMinHeightTrees = function (n, edges) {
    // Base case: If there's only one node, return it as the only MHT root
    if (n === 1) return [0];

    // Step 1: Build the graph (adjacency list) and track the degree of each node
    const graph = Array.from({ length: n }, () => []);
    const degree = new Array(n).fill(0);

    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
        degree[u]++;
        degree[v]++;
    }

    // Step 2: Collect all initial leaves (nodes with degree 1)
    let leaves = [];
    for (let node = 0; node < n; node++) {
        if (degree[node] === 1) {
            leaves.push(node);
        }
    }

    // Step 3: Trim leaves layer by layer until 1 or 2 nodes remain (the centers)
    let remainingNodes = n;
    while (remainingNodes > 2) {
        const numLeaves = leaves.length;
        remainingNodes -= numLeaves;

        const newLeaves = [];

        for (const leaf of leaves) {
            for (const neighbor of graph[leaf]) {
                degree[neighbor]--;

                // If neighbor becomes a leaf after removing current leaf
                if (degree[neighbor] === 1) {
                    newLeaves.push(neighbor);
                }
            }
        }

        leaves = newLeaves; // Move to next layer of leaves
    }

    // The last remaining 1 or 2 nodes are the roots of Minimum Height Trees
    return leaves;
};

var isBipartite = function (graph) {
    function check(graph, curr, colors, currColor) {
        colors[curr] = currColor;
        for (let nbr of graph[curr]) {
            if (colors[curr] === colors[nbr]) {
                return false;
            }
            if (colors[nbr] == -1) {
                let newColor = 1 - currColor;
                if (check(graph, nbr, colors, newColor) == false) {
                    return false;
                }
            }
        }

        return true;
    }

    let n = graph.length;
    let colors = new Array(n).fill(-1);
    for (let u = 0; u < graph.length; u++) {
        if (colors[u] == -1) {
            if (check(graph, u, colors, 1) == false) {
                return false;
            }
        }
    }

    return true;
};

function isBipartite(graph) {
    const n = graph.length;
    const color = Array(n).fill(-1); // -1 means uncolored

    for (let start = 0; start < n; start++) {
        if (color[start] !== -1) continue;

        const queue = [start];
        color[start] = 0;

        while (queue.length > 0) {
            const node = queue.shift();

            for (const neighbor of graph[node]) {
                if (color[neighbor] === -1) {
                    color[neighbor] = 1 - color[node]; // Assign opposite color
                    queue.push(neighbor);
                } else if (color[neighbor] === color[node]) {
                    return false; // Same color neighbor found → not bipartite
                }
            }
        }
    }

    return true;
}


//dijkshtra's algo

class Heap {
    constructor() {
        this.arr = [];
    }

    upheapify(ci) {
        if (ci == 0) {
            return;
        }

        let pi = Math.floor((ci - 1) / 2);

        if (this.arr[ci][1] < this.arr[pi][1]) {
            [this.arr[ci], this.arr[pi]] = [this.arr[pi], this.arr[ci]];
            this.upheapify(pi);
        }
        return;
    }

    add(ele, weight) {
        this.arr.push([ele, weight]);
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

        if (lci < this.arr.length && this.arr[lci][1] < this.arr[mini][1]) {
            mini = lci;
        }
        if (rci < this.arr.length && this.arr[rci][1] < this.arr[mini][1]) {
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

//📌 Edge Cases: Disconnected components, negative weights (Dijkstra fails here!), large graphs.
class Solution {
    // Function to find the shortest distance of all the vertices
    // from the source vertex src.
    dijkstra(adj, src) {
        let dist = new Array(adj.length).fill(Infinity);
        let q = new Heap();
        q.add(src, 0);
        dist[src] = 0;
        while (q.size() != 0) {
            let [node, d] = q.remove();

            for (let [nbrNode, weight] of adj[node]) {
                if (weight + d < dist[nbrNode]) {
                    dist[nbrNode] = weight + d;
                    q.add(nbrNode, weight + d);
                }
            }
        }

        return dist;
    }
}

// Caveat: No Negative Weights
// Dijkstra's algorithm does NOT work correctly with negative weight edges.

// It assumes that once a node's shortest distance is finalized, it cannot be improved, which is not true for graphs with negative edges.
// If negative weights exist, use Bellman-Ford Algorithm instead.

// dijkrasta's algo with finding path;
// how to print the path ;

//https://www.geeksforgeeks.org/problems/shortest-path-in-weighted-undirected-graph/1

class Solution {
    /**
    * @param number n
    * @param number m
    * @param number[][] edges

    * @returns number
    */

    shortestPath(n, m, edges) {
        let adj = Array.from({ length: n + 1 }, () => []);

        for (let [src, dest, weight] of edges) {
            adj[src].push([dest, weight]);
            adj[dest].push([src, weight]);
        }

        let pq = new Heap();

        let parent = new Array(n + 1).fill(-1);

        let dist = new Array(n + 1).fill(Infinity);

        pq.add(1, 0);

        dist[1] = 0;
        parent[1] = 1;

        while (pq.size() != 0) {
            let [node, weight] = pq.remove();
            for (let [nbr, d] of adj[node]) {
                if (d + weight < dist[nbr]) {
                    dist[nbr] = d + weight;
                    pq.add(nbr, d + weight);
                    parent[nbr] = node;
                }
            }
        }

        let ans = 0;
        //check if distance to reach is node is Infinite or not
        if (dist[n] == Infinity) {
            return [-1];
        }

        ans = [];
        let node = n;
        while (parent[node] != node) {
            ans.push(node);
            node = parent[node];
        }

        //1 will not be added path

        // console.log(ans);

        let path = [];

        // console.log(parent);

        path.push(dist[n]); // weight of the path
        path.push(1);
        while (ans.length != 0) {
            path.push(ans.pop());
        }
        //  console.log(path);
        return path;
    }
}

//https://leetcode.com/problems/path-with-minimum-effort/
class Heap {
    constructor() {
        this.arr = [];
    }

    upheapify(ci) {
        if (ci == 0) {
            return;
        }

        let pi = Math.floor((ci - 1) / 2);

        if (this.arr[ci][2] < this.arr[pi][2]) {
            [this.arr[ci], this.arr[pi]] = [this.arr[pi], this.arr[ci]];
            this.upheapify(pi);
        }
        return;
    }

    add(r, c, effort) {
        this.arr.push([r, c, effort]);
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

        if (lci < this.arr.length && this.arr[lci][2] < this.arr[pi][2]) {
            mini = lci;
        }
        if (rci < this.arr.length && this.arr[rci][2] < this.arr[pi][2]) {
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
var minimumEffortPath = function (heights) {
    let rows = heights.length;
    let cols = heights[0].length;

    function isValid(i, j) {
        return i >= 0 && j >= 0 && i < heights.length && j < heights[0].length;
    }

    let dist = Array.from({ length: rows }, () =>
        new Array(cols).fill(Infinity)
    );
    let pq = new Heap();
    pq.add(0, 0, 0);

    dist[0][0] = 0;

    while (pq.size() != 0) {
        let [x, y, effort] = pq.remove();
        for (let [dx, dy] of [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
        ]) {
            let nr = x + dx;
            let nc = y + dy;
            if (isValid(nr, nc)) {
                let newEffort = Math.abs(heights[nr][nc] - heights[x][y]);
                if (Math.max(newEffort, effort) < dist[nr][nc]) {
                    pq.add(nr, nc, Math.max(newEffort, effort));
                    dist[nr][nc] = Math.max(newEffort, effort);
                }
            }
        }
    }

    return dist[rows - 1][cols - 1] == Infinity ? -1 : dist[rows - 1][cols - 1];
};

// Bell Man ford algo
// Here is the text converted from the image:

// Dijkstra's | Bellman
// --- | ---
// Directed, undirected | Directed, undirected (with no -ve edge)
// Can't work with -ve edge | Works for -ve edges too
// Can't be applied for -ve cycle | Helps detect -ve cycle

class Solution {
    bellmanFord(V, edges, src) {
        let dist = new Array(V).fill(Math.pow(10, 8));
        dist[src] = 0;

        for (let u = 0; u < V - 1; u++) {
            for (let [src, dest, weight] of edges) {
                if (
                    dist[src] != Math.pow(10, 8) &&
                    dist[src] + weight < dist[dest]
                ) {
                    dist[dest] = dist[src] + weight;
                }
            }
        }

        for (let u = 0; u < V - 1; u++) {
            for (let [src, dest, weight] of edges) {
                if (
                    dist[src] != Math.pow(10, 8) &&
                    dist[src] + weight < dist[dest]
                ) {
                    return [-1];
                }
            } // negative cycle detected
        }

        return dist;
    }
}

// Floyd Warshall O(v^3) Time Complexity

class Solution {
    // Function to find the shortest distance of all the cells from other cels present in the
    // matrix.
    shortestDistance(mat) {
        let m = mat.length;
        let n = mat[0].length;

        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (mat[i][j] == -1) {
                    mat[i][j] = Infinity;
                }
            }
        }

        for (let via = 0; via < mat.length; via++) {
            for (let i = 0; i < m; i++) {
                for (let j = 0; j < n; j++) {
                    mat[i][j] = Math.min(mat[i][j], mat[i][via] + mat[via][j]);
                }
            }
        }

        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (mat[i][j] == Infinity) {
                    mat[i][j] = -1;
                }
            }
        }

        return mat;
    }
}

//MST using Prim's Algo
// you also add parent in PQ  intilise parent arr with -1

function spanningTree(v, adj) {
    let visited = new Array(v).fill(false);
    let sum = 0;

    let pq = new Heap();

    pq.add(0, 0); // node, weight

    while (pq.size() != 0) {
        let [node, weight] = pq.remove();

        if (visited[node]) continue;

        visited[node] = true;
        // paren [node] = nbr
        sum += weight;

        for (let [nbr, edgeWeight] of adj[node]) {
            if (visited[nbr] == false) {
                pq.add(nbr, edgeWeight); // .add(nbr,nbrWeight,node)
            }
        }
    }

    return sum;
}


var minCostConnectPoints = function(points) {
    const n = points.length;
    const visited = new Array(n).fill(false);
    const heap = new MinHeap();
    heap.push([0, 0]); // [cost, node]
    let totalCost = 0;

    while (heap.size() > 0) {
        let [cost, u] = heap.pop();
        if (visited[u]) continue;
        visited[u] = true;
        totalCost += cost;

        for (let v = 0; v < n; v++) {
            if (!visited[v]) {
                let dist = Math.abs(points[u][0] - points[v][0]) + Math.abs(points[u][1] - points[v][1]);
                heap.push([dist, v]);
            }
        }
    }

    return totalCost;
};


// find the length of the Shortest Cycle in Undirected graph , Every vertex pair is connected by at most one edge, and no vertex has an edge to itself.
function findShortestCycle (n, edges) {
    const graph = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u); // Undirected
    }

    let minCycle = Infinity;

    for (let start = 0; start < n; start++) {
        const dist = Array(n).fill(Infinity);
        const parent = Array(n).fill(-1);
        const queue = [start];
        dist[start] = 0;

        while (queue.length) {
            const node = queue.shift();

            for (const neighbor of graph[node]) {
                if (dist[neighbor] === Infinity) {
                    dist[neighbor] = dist[node] + 1;
                    parent[neighbor] = node;
                    queue.push(neighbor);
                } else if (parent[node] !== neighbor) {
                    // Found a cycle
                    minCycle = Math.min(minCycle, dist[node] + dist[neighbor] + 1);
                }
            }
        }
    }

    return minCycle === Infinity ? -1 : minCycle;
}


//. Longest Cycle in a Graph
// find the largest cycle in Directed graph , each vertex has at most one Outoging edge

var longestCycle = function (edges) {
    let mx = -1;
    function dfs(node, graph, FullyProcessed, Session, cycle) {
        FullyProcessed[node] = true;
        Session.set(node, cycle);

        let nbr = graph[node];
        if (nbr == -1) {
            return;
        }

        if (FullyProcessed[nbr] == true) {
            // 2 options  1) i might detected this node in current session
            if (Session.has(nbr)) {
                mx = Math.max(mx, cycle - Session.get(nbr) + 1);
                return;
            }
            //2) i have FullyProcessed this node in previos dfs but still not found cycle
            return;
        }

        dfs(nbr, graph, FullyProcessed, Session, cycle + 1);
        return;
    }

    let FullyProcessed = new Array(edges.length).fill(false);

    for (let node = 0; node < edges.length; node++) {
        let Session = new Map();
        if (FullyProcessed[node] == false && edges[node] != -1) {
            dfs(node, edges, FullyProcessed, Session, 1);
        }
    }

    if (mx == -1) {
        return -1;
    }
    return mx;
};
