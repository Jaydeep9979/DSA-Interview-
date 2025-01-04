// DSU


/**
 *
 * @param {number[][]} grid
 * @return {number}
 */

 function find(x){
    if(x===parent[x])
    {
        return x;
    }
    parent[x] = find(parent[x]);
    return parent[x];
}

function unionByRank(x,y){    
    
    let xParent= find(x);
    let yParent= find(y);

    if(xParent!==yParent){
        if(rank[xParent] > rank[yParent]){
            parent[yParent]=xParent;
        }
        else if(rank[xParent] < rank[yParent]){
            parent[xParent] = yParent;
        }
        else{
             parent[xParent] = yParent;
             rank[yParent]+=1;
        }
    }
}



function unionBySize(x,y){
    let xParent = find(x);
    let yParent = find(y);
    
    if(xParent!=yParent){
        if(size[xParent]>size[yParent]){
            parent[yParent]=xParent;
            size[xParent]+=size[yParent];
        }
        else{
            parent[xParent]=yParent;
            size[yParent]+=size[xParent];
        }
    }
}


//https://leetcode.com/problems/making-a-large-island/
 var largestIsland = function(grid) {
    let rows = grid.length;
    let cols = grid[0].length;
    let mxsize = rows*cols;

    let rank = new Array(mxsize).fill(0);
    let parent = [];
    let size =[];
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            parent[i*rows + j]= i*rows + j;
            size[i*rows + j] = 1;
        }
    }

    function isValid(x,y){
        return x>=0 && y>=0 && x<rows && y<cols;
    }

    for(let i=0; i<rows;i++){
        for(j=0;j<cols;j++){
            if(grid[i][j]===0) continue;

            for(let [dx,dy]  of [[0,1],[0,-1],[1,0],[-1,0]]){
                let nr = i+ dx;
                let nc = j +dy;

                if(isValid(nr,nc) && grid[nr][nc]==1){
                    unionBySize(i*rows+j,nr*rows+nc);
                }
            }
        }
    }

    
    let mx =0;
    for(let i=0; i<rows;i++){
        for(j=0;j<cols;j++){
            let set = new Set();
            if(grid[i][j]===1) continue;

            for(let [dx,dy]  of [[0,1],[0,-1],[1,0],[-1,0]]){
                let nr = i + dx;
                let nc = j + dy;

                if(isValid(nr,nc) && grid[nr][nc]==1){
                    set.add(find(nr*rows+nc));
                }
            }
            let total = 0
            for(let up of set){
                total += size[up];
            }

            mx=Math.max(mx,total+1);
        }
    }

    for(let k=0;k<rows*cols;k++){
        mx=Math.max(mx,size[find(k)]);
    }

    return mx;
};

//-------------------------------------//
// https://leetcode.com/problems/satisfiability-of-equality-equations/
/**
 * @param {string[]} equations
 * @return {boolean}
 */
 var equationsPossible = function(equations) {
    let parent = [];
    for(let i=0;i<26;i++){
        parent[i]=i;
    }
    let rank = new Array(26).fill(0);
    let map = new Map()
    let count =0;
    for(let char of "abcdefghijklmnopqrstuvwxyz"){
        map.set(char,count);
        count++;
    }


    function find(x){
        if(x===parent[x])
        {
            return x;
        }
        parent[x] = find(parent[x]);
        return parent[x];
    }

    function unionByRank(x,y){    
        
        xParent= find(x);
        yParent= find(y);

        if(xParent!==yParent){
            if(rank[xParent] > rank[yParent]){
                parent[yParent]=xParent;
            }
            else if(rank[xParent] < rank[yParent]){
                parent[xParent] = yParent;
            }
            else{
                 parent[xParent] = yParent;
                 rank[yParent]+=1;
            }
        }
    }

    let notEq =[];
    for(let eq of equations){
        if(eq[1]==="="){
            union(map.get(eq[0]),map.get(eq[3]));
        }
        else{
            notEq.push([eq[0],eq[3]]);
        }
    }

    for(let ele of notEq){
        let x = find(map.get(ele[0]));
        let y = find(map.get(ele[1]));

        if(x===y){
            return false;
        }
    }

    return true;
};


// number of islands 2 
// https://leetcode.ca/2016-09-30-305-Number-of-Islands-II/
function FindNumberofIslands2()
{
    let m = 5;
    let n = 5;
    let positions = [[0,0], [1,0], [1,1], [2,1], [2,0], [0,1]];
    
    arr=  Array.from({length : m},()=>Array(n).fill(0));
    
    let rows = arr.length;
    let cols = arr[0].length;
    let parent = new Array(m*n).fill(-1);
    let rank = new Array(m*n).fill(0);
    let visited = Array.from({length : rows},()=>Array(cols).fill(false));
    let count =0 ;
    let ans = [];
    
    
    function index(i,j){
        return rows*i + j ;
    }
    
    for(let i=0; i<rows;i++){
        for(let j=0;j<cols;j++){
            parent[index(i,j)] = index(i,j);
        }
    }
    console.log(parent);
    console.log(rank);
    
    function find(x){
        if(x==parent[x]){
            return x;
        }
        
        parent[x]=find(parent[x]);
        return parent[x];
    }
    function union(x,y){
        
        let xParent= find(x);
        let yParent= find(y);
        
        if(xParent!=yParent){
            if(rank[xParent]>rank[yParent]){
                parent[yParent]=xParent;
            }
            else if(rank[yParent]>rank[xParent]){
                parent[xParent]=yParent;
            }
            else{
                parent[xParent]=yParent;
                rank[yParent]+=1;
            }
            return true;
        }
        return false;
    }
    
    
    for(let [r,c] of positions){
        
        if(visited[r][c]===true){
            ans.add(count);
            continue;
        }
        
        visited[r][c]=true;
        
        count++;
        
        for(let [dx,dy] of [[0,1],[0,-1],[1,0],[-1,0]]){
            let nr = r+ dx;
            let nc = c+ dy;
            if(nr>=0 && nc>=0 && nr<arr.length && nc<arr[0].length && visited[nr][nc]==true){
                let isValid = union(index(r,c), index(nr,nc));
                if(isValid){
                    count--;
                }
            }
        }
        ans.push(count);
    }

    console.log(ans);

}

//Detect Cycle in Graph using DSU  undirected graph with no self loops

class Solution {
    
    detectCycle(n,adj){
        
    let rank = new Array(n).fill(0);
    let parent = [];
    for(let i=0;i<n;i++){
        parent[i]=i;
    }
    
    function find(x){
        if(x==parent[x]){
            return x;
        }
        
        parent[x]=find(parent[x]);
        return parent[x];
    }
    
    function union(x,y){
        
        let xParent= find(x);
        let yParent= find(y);
        
        if(xParent!=yParent){
            if(rank[xParent]>rank[yParent]){
                parent[yParent]=xParent;
            }
            else if(rank[yParent]>rank[xParent]){
                parent[xParent]=yParent;
            }
            else{
                parent[xParent]=yParent;
                rank[yParent]+=1;
            }
        }
        
    }
        
   for(let u=0;u<n;u++){
       for(let v of adj[u]){
           if(u<v){
               let uParent = find(u);
               let vParent = find(v);
               
               if(uParent==vParent){
                   return 1;
               }
               
               union(u,v);
           }
       }
   }
   
   return 0;
 }
    
}


class Solution {
    // Function to detect cycle in an undirected graph using BFS.
    isCycle(adj) {
        function BFSCycle1(graph,node,visited){
    
        let q = [];
        q.push([node,-1]);
        visited[node]=true;
    
        while(q.length!=0){
            let [node,parent] = q.shift();
    
            for(let nbr of graph[node]){
    
                if(nbr==parent) continue;
                
                if(visited[nbr]==true){
                    return true;
                }
                visited[nbr]=true;
                q.push([nbr,node]);
            }
        }

        return false;
    }    
        
        let v = adj.length;
        let visited = new Array(v).fill(false);
        
        for(let i=0;i<v;i++){
            if(visited[i]==false && BFSCycle1(adj,i,visited)){
                return 1;
            }
        }
        return 0;
    }
    
}


class Solution {
    // Function to detect cycle in an undirected graph DFS
    isCycle(adj) {

        function dfsCycle2(graph,node,visited,parent){

            visited[node] = true;
        
            for(let nbr of graph[node]){
                if(nbr===parent) continue ; 
                if(visited[nbr]==true){
                    return true;
                   
                }
                if(dfsCycle2(graph,nbr,visited,node)){
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
        
        for(let i=0;i<v;i++){
            if(visited[i]==false && dfsCycle2(adj,i,visited,i)){
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

        function dfsCycle(graph,node,visited,inRecursion){

            visited[node] = true;
            inRecursion[node]=true;
        
            for(let nbr of graph[node]){
                if(inRecursion[nbr]==false){
                    continue;
                }

                if(visited[nbr]==true){
                    return true;
                }
                
                if(dfsCycle(graph,nbr,visited,inRecursion)){
                    return true;
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
        for(let i=0;i<v;i++){
            if(visited[i]==false && dfsCycle2(adj,i,visited,inRecursion)){
                return 1;
            }
        }
        
        return 0;
        
    }
    
}


// Function to detect cycle in a directed graph.

class Solution {
        
    isCyclic(V, adj) {
        
        function dfsCycle(graph,node,visited,inRecursion){

            visited[node] = true;
            inRecursion[node]=true;
        
            for(let nbr of graph[node]){

                if(visited[nbr]==true){
                    if(inRecursion[nbr]==true){
                        return true;
                    }
                }
                else{
                    if(dfsCycle(graph,nbr,visited,inRecursion)){
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
        for(let i=0;i<V;i++){
            if(visited[i]==false && dfsCycle(adj,i,visited,inRecursion)){
                return 1;
            }
        }
        
        return 0;
    }
}


// TopoLogical sort // only be Applied on Directed Acyclic Graph
// Topological sorting for Directed Acyclic Graph (DAG) is a linear ordering of vertices such that 
// for every directed edge u -> v, vertex u comes before v in the ordering.
//DFS



    function sol(adj,V){
        function dfs(graph,node,visited,stk){

            visited[node]=true;
        
            for(let nbr of graph[node]){
                if(!visited[nbr]){
                    dfs(graph,nbr,visited,stk);
                }
            }
        
            stack.push(node);
        }

        let visited  =  new Array(V).fill(false);
        let stack  =[];
        for(let v=0;v<V;v++){
            if(!visited[v]){
                dfs(adj,v,visited,stack)
            }
        }

        while(stack.length!=0){
            console.log(stack.shift());
        }

    }



// topo using bfs, Kahn's Algo

class Solution {
    // Function to return list containing vertices in Topological order.
    topologicalSort(adj) {
        let n = adj.length;
        let inDegree = new Array(n).fill(0);
        
        for(let v=0;v<n;v++){
            for(let u of adj[v]){
                inDegree[u]+=1;
            }
        }
        
        let q = [];
        
        for(let i=0;i<n;i++){
            if(inDegree[i]==0){
                q.push(i);
            }
        }
        
        let res =[];
        
        while(q.length!=0){
            let node = q.shift();
            res.push(node);
            for(let nbr of adj[node]){
                inDegree[nbr]-=1;
                if(inDegree[nbr]==0){
                    q.push(nbr);
                }
            }
            
        }
        
       return res;
    }
}

// for detecting cycle in DAG i just need to check res.length==N (number of nodes) or we can also use count ;




//dividing graph into 2 parts  , grouping in 2 parts  question is moving towards bipartite 

// can we color the whole graph in 2 colors such that not 2 adjacent nodes has same color 

// if odd cycle no bipartite;

// DFS

var isBipartite = function(graph) {
    function check(graph,curr,colors,currColor){
        colors[curr] = currColor;
        for(let nbr of graph[curr]){
            if(colors[curr]===colors[nbr]){
                return false;
            }
            if(colors[nbr]==-1){
                let newColor = 1-currColor;
                if(check(graph,nbr,colors,newColor)==false){
                    return false;
                }
            }
        }

        return true;
    }

    let n = graph.length ;
    let colors = new Array(n).fill(-1);
    for(let u=0;u<graph.length;u++){
        if(colors[u]==-1){
            if(check(graph,u,colors,1)==false){
                return false;
            }
        }
    }

    return true;
};



//dijkshtra's algo 

class Heap{
    
    constructor(){
        this.arr= [];
    }
    
    upheapify(ci){
        if(ci==0){
            return ;
        }
        
        let pi = Math.floor((ci-1)/2);
        
        if(this.arr[ci][1]<this.arr[pi][1]){
            [this.arr[ci],this.arr[pi]] = [this.arr[pi],this.arr[ci]];
            this.upheapify(pi);
        }
        return ;
    }
    
    add(ele,weight){
        this.arr.push([ele,weight]);
        this.upheapify(this.arr.length-1);
    }
    
    
    
    remove(){
        if(this.arr.length==0){
            console.log("empty Heap");
        }
        
        const ans = this.arr[0];
        
        [this.arr[0],this.arr[this.arr.length-1] ]= [this.arr[this.arr.length-1],this.arr[0]];
        
        this.arr.pop();
        
        this.downHeapify(0);
        
        return ans;
    }
    
    size(){
        
        return this.arr.length;
    }
    
    downHeapify(pi){
        let mini =pi ;
        let lci = 2*pi +1;
        let rci = 2*pi +2;
        
        if(lci < this.arr.length && this.arr[lci][1] < this.arr[pi][1]){
            mini = lci;
        }
        if(rci < this.arr.length && this.arr[rci][1] < this.arr[pi][1]){
            mini = rci;
        }
        if(mini!=pi){
            [this.arr[pi],this.arr[mini]] = [this.arr[mini],this.arr[pi]];
            this.downHeapify(mini);
        }
        
        return ;
        
    }
    
    print(){
        console.log(this.arr);
    }
}
class Solution {
    // Function to find the shortest distance of all the vertices
    // from the source vertex src.
    dijkstra(adj, src) {
        let ans = new Array(adj.length).fill(Infinity);
        let q = new Heap();
        q.add(src,0);
        ans[src]=0;
        while(q.size()!=0){
            let [node,d] = q.remove();
            
            for(let nbr of adj[node]){
                let [nbrNode,weight] = nbr;
                
                if(weight+d<ans[nbrNode]){
                    ans[nbrNode] = weight+d;
                    q.add(nbrNode,weight+d);
                }
            }
            
        }
        
        return ans;
    }
}


// dijkrasta's algo with finding path ; 
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
        let adj = Array.from({length:n+1},()=>[]);
        
        for(let [src,dest,weight] of edges){
            adj[src].push([dest,weight]);
            adj[dest].push([src,weight]);
        }
        
        let pq = new Heap();
        
        let parent = new Array(n+1).fill(-1);
        
        let dist  = new Array(n+1).fill(Infinity);
        
        pq.add(1,0);
        
        dist[1]=0;
        parent[1]=1;
        
        while(pq.size()!=0){
            
            let [node,weight] = pq.remove();
            for(let [nbr,d] of adj[node]){
                
                if(d+weight<dist[nbr]){
                    dist[nbr]=d+weight;
                    pq.add(nbr,d+weight);
                    parent[nbr]=node;
                }
            }
        }
        
        let ans = 0 ;
        //check if distance to reach is node is Infinite or not 
        if(dist[n]==Infinity){
            return [-1];
        }
        
        ans = []
        let node = n ;
        while(parent[node]!=node){
            ans.push(node);
            node=parent[node];
        }

        //1 will not be added path 
        
        // console.log(ans);
        
        let path =[] ; 
        
        // console.log(parent);
        
        
        path.push(dist[n]); // weight of the path 
        path.push(1);
        while(ans.length!=0){
            path.push(ans.pop());
        }
        //  console.log(path);
        return path;
    }
}

//https://leetcode.com/problems/path-with-minimum-effort/
class Heap{
    
    constructor(){
        this.arr= [];
    }
    
    upheapify(ci){
        if(ci==0){
            return ;
        }
        
        let pi = Math.floor((ci-1)/2);
        
        if(this.arr[ci][2]<this.arr[pi][2]){
            [this.arr[ci],this.arr[pi]] = [this.arr[pi],this.arr[ci]];
            this.upheapify(pi);
        }
        return ;
    }
    
    add(r,c,effort){
        this.arr.push([r,c,effort]);
        this.upheapify(this.arr.length-1);
    }
    
    
    
    remove(){
        if(this.arr.length==0){
            console.log("empty Heap");
        }
        
        const ans = this.arr[0];
        
        [this.arr[0],this.arr[this.arr.length-1] ]= [this.arr[this.arr.length-1],this.arr[0]];
        
        this.arr.pop();
        
        this.downHeapify(0);
        
        return ans;
    }
    
    size(){
        
        return this.arr.length;
    }
    
    downHeapify(pi){
        let mini =pi ;
        let lci = 2*pi +1;
        let rci = 2*pi +2;
        
        if(lci < this.arr.length && this.arr[lci][2] < this.arr[pi][2]){
            mini = lci;
        }
        if(rci < this.arr.length && this.arr[rci][2] < this.arr[pi][2]){
            mini = rci;
        }
        if(mini!=pi){
            [this.arr[pi],this.arr[mini]] = [this.arr[mini],this.arr[pi]];
            this.downHeapify(mini);
        }
        
        return ;
        
    }
    
    print(){
        console.log(this.arr);
    }
} 
var minimumEffortPath = function(heights) {

    let rows = heights.length;
    let cols = heights[0].length;

    function isValid(i,j){
        return i>=0 && j>=0 && i<heights.length && j<heights[0].length;
    }

    let dist = Array.from({length : rows},()=>new Array(cols).fill(Infinity));
    let pq = new Heap();
    pq.add(0,0,0);

    dist[0][0] = 0;

    while(pq.size()!=0){
        let [x,y,effort] = pq.remove();
        for(let [dx,dy] of [[0,1],[0,-1],[1,0],[-1,0]]){
            let nr = x+dx;
            let nc = y+dy;
            if(isValid(nr,nc)){
                let newEffort = Math.abs(heights[nr][nc] - heights[x][y]);
                if(Math.max(newEffort,effort) < dist[nr][nc])
                {
                    pq.add(nr,nc, Math.max(newEffort,effort));
                    dist[nr][nc] = Math.max(newEffort,effort);
                }
            }
        }
    }

    return dist[rows-1][cols-1]==Infinity ? -1 : dist[rows-1][cols-1];
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
        let dist = new Array(V).fill(Math.pow(10,8));
        dist[src] = 0 ; 
        
        for(let u=0;u<V-1;u++){
            for(let [src,dest,weight] of edges){
                if(dist[src]!=Math.pow(10,8) &&  dist[src] + weight < dist[dest]){
                    dist[dest] = dist[src] + weight;
                }
            }
        }
        
        for(let u=0;u<V-1;u++){
            for(let [src,dest,weight] of edges){
                if(dist[src]!=Math.pow(10,8) &&  dist[src] + weight < dist[dest]){
                    return [-1];
                }
            }
        }
        
        return dist;
        
    }
}


// Floyd Warshall O(v^3) Time Complexity 

class Solution {
    // Function to find the shortest distance of all the cells from 0 present in the
    // matrix.
    shortestDistance(mat) {
        let m = mat.length;
        let n = mat[0].length;
        
        for(let i=0;i<m;i++){
            for(let j=0;j<n;j++){
                if(mat[i][j]==-1){
                    mat[i][j]=Infinity;
                }
            }
        }
        
        for(let via=0;via<mat.length;via++){
            for(let i=0;i<m;i++){
                for(let j=0;j<n;j++){
                    mat[i][j]=Math.min(mat[i][j],mat[i][via]+mat[via][j]);
                }
            }
        }
        
        for(let i=0;i<m;i++){
            for(let j=0;j<n;j++){
                if(mat[i][j]==Infinity){
                    mat[i][j]=-1;
                }
            }
        }
        
        return mat;
        
    }
}


//MST using Prim's Algo 
// you also add parent in PQ  intilise parent arr with -1

function spanningTree(v, adj) {
    let inMST = new Array(v).fill(false);
    let sum =0;
    
    let pq = new Heap();
    
    pq.add(0,0)  // node, weight
    
    while(pq.size()!=0){
        
        let [node,weight] = pq.remove();
        
        if(inMST[node]) continue;
        
        inMST[node]=true;
        // paren [node] = nbr
        sum+=weight;
        
        for(let [nbr,edgeWeight] of adj[node] ){
            
            if(inMST[nbr]==false){
                 pq.add(nbr,edgeWeight);// .add(nbr,nbrWeight,node)
            }
            
           
        }
    }
    
    return sum;
}




// find the length of the Shortest Cycle in Undirected graph , Every vertex pair is connected by at most one edge, and no vertex has an edge to itself.

function bfs(start){
    
    let dist = new Array(n).fill(Infinity);
    dist[start]=0;

    let q = [];
    q.push([start,-1]);

    let tempans = Infinity; 

    while(q.length!=0){
        let [node,parent] = q.shift();
        for(let nbr of graph[node]){

            if(dist[node]+1 < dist[nbr]){
                 dist[nbr] = dist[node] + 1;
                 q.push([nbr,node]);

            }
            else if(parent!=nbr){
                tempans=Math.min(tempans,dist[nbr] + dist[node] +1);
            }
        }

    }
    return tempans;

}



var findShortestCycle = function(n, edges) {
    
    let graph = Array.from({length:n},()=>[]);

    for(let [u,v] of edges){
        graph[u].push(v);
        graph[v].push(u);
    }
    
    let ans = Infinity
    for(let node =0 ;node<n;node++){
        ans=Math.min(ans,bfs(node));
    }

    return ans==Infinity ? -1 : ans;
};


//. Longest Cycle in a Graph
// find the largest cycle in Directed graph , each vertex has at most one Outoging edge 


var longestCycle = function(edges) {
    let mx = -1;
    function dfs(node,graph,FullyProcessed,Session,cycle){
        FullyProcessed[node]=true;
        Session.set(node,cycle);

        let nbr = graph[node];
        if(nbr==-1){
            return;
        }

        if(FullyProcessed[nbr]==true){
            // 2 options  1) i might detected this node in current session  
            if(Session.has(nbr)){
                mx=Math.max(mx,cycle-Session.get(nbr)+1);
                return;
            }
            //2) i have FullyProcessed this node in previos dfs but still not found cycle 
            return ;
        }
        
        dfs(nbr,graph,FullyProcessed,Session,cycle+1);
        return ;

    }
    
    let FullyProcessed =  new Array(edges.length).fill(false);

    for(let node=0;node<edges.length;node++){
        let Session = new Map();
        if(FullyProcessed[node]==false && edges[node]!=-1){
            dfs(node,edges,FullyProcessed,Session,1);
        }
    }

    if(mx==-1){
        return -1;
    }
    return mx;
        
}

