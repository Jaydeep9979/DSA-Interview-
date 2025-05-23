//lletcode 79 Given an m x n grid of characters board and a string word, return true if word exists in the grid.

//The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring.
// The same letter cell may not be used more than once.

var exist = function(board, word) {
    
    function find(board,word,i,j,index){

        if(i<0 || j<0 || i>=board.length || j>=board[0].length){
            return false;
        }

        if(board[i][j]!=word[index] || board[i][j]=='$'){
            return false;
        }

         if(index + 1 == word.length){
            return true;
        }

        const temp  = board[i][j];

        board[i][j]= '$';

        if(find(board,word,i+1,j,index+1) || find(board,word,i-1,j,index+1) || find(board,word,i,j+1,index+1) || find(board,word,i,j-1,index+1)){
            return true;
        }

        board[i][j]= temp;

        return false;

    }

    for(let i=0;i<board.length;i++){
        for(let j=0;j<board[0].length;j++){
            if(board[i][j]==word[0]){
                if(find(board,word,i,j,0)){
                    return true;
                }
            }
        }
    }
    return false;
};


//You are given an m x n integer array grid where grid[i][j] could be:

// 1 representing the starting square. There is exactly one starting square.
// 2 representing the ending square. There is exactly one ending square.
// 0 representing empty squares we can walk over.
// -1 representing obstacles that we cannot walk over.
// Return the number of 4-directional walks from the starting square to the ending square, that walk over every non-obstacle square exactly once.



/**
 * @param {number[][]} grid
 * @return {number}
 */
 var uniquePathsIII = function(grid) {
    let nonObstacleCount = 0; 
    let start_i =0, start_j=0;
    let end_i=0,end_j=0; 
    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[0].length;j++){
            if(grid[i][j]==0){
                nonObstacleCount+=1;
            }
            if(grid[i][j]==1){
                start_i=i;
                start_j=j;
            }
            if(grid[i][j]==2){
                end_i=i;
                end_j=j;
            }
        }
    }

    function find(grid,i,j,count){
        if(i<0 || j<0 || i>=grid.length || j>=grid[0].length || grid[i][j]=='$' || grid[i][j]==-1){
            return ;
        }

        if(i==end_i && j==end_j){
            if(count==0){
                total+=1;
            }
            return ;
        }
        
        const temp = grid[i][j];
        grid[i][j] = '$';

        find(grid,i+1,j,count-1);
        find(grid,i-1,j,count-1);
        find(grid,i,j+1,count-1);
        find(grid,i,j-1,count-1);

        grid[i][j] = temp ;

        return ;

    }
    

    let total = 0;

    find(grid,start_i,start_j,nonObstacleCount+1);

    return total;

};

// Palindrome Partioning Question 

// Given a string s, partition s such that every 
// substring
//  of the partition is a 
// palindrome
// . Return all possible palindrome partitioning of s.

// Example 1:

// Input: s = "aab"
// Output: [["a","a","b"],["aa","b"]]
// Example 2:

// Input: s = "a"
// Output: [["a"]]


// in this type of question you should be carefult while adding the result here curr works as reference 
// so while adding into the answer make sure you add spread operator [...curr];

/**
 * @param {string} s
 * @return {string[][]}
 */

 function isPalindrome(s,i,j){
    while(i<j){
        if(s[i]!=s[j]){
            return false;
        }
        i++;
        j--;
    }
    return true;
}

function backtrack(s, idx, curr, result){

    if(idx==s.length){
        result.push([...curr]);
        return;
    }

    for(let i=idx;i<s.length;i++){
        if(isPalindrome(s,idx,i)){

           curr.push(s.substring(idx,i+1));
        //    console.log(curr);
           backtrack(s,i+1,curr,result);
           curr.pop();

        }
    }

}


var partition = function(s) {
    let curr = [];
    let result = [];


    backtrack(s,0,curr,result);

    return result;
};





// 491. Non-decreasing Subsequences
// Solved
// Medium
// Topics
// Companies
// Given an integer array nums, return all the different possible non-decreasing
// subsequences of the given array with at least two elements. You may return the answer in any order.

 

// Example 1:

// Input: nums = [4,6,7,7]
// Output: [[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]
// Example 2:

// Input: nums = [4,4,3,2,1]
// Output: [[4,4]]

/**
 * @param {number[]} nums
 * @return {number[][]}
 */


 var findSubsequences = function(nums) {
    let n = nums.length ; 

    let ans =[];
    let curr = []; 
    function find(nums,idx){
        if(curr.length>=2){
            ans.push([...curr]);
        }

        let st =new Set(); 
        for(let i=idx;i<n;i++){

            if((curr.length==0 || nums[i]>= curr[curr.length-1]) && !st.has(nums[i])){
                curr.push(nums[i]);
                find(nums,i+1);
                curr.pop();
                st.add(nums[i]);
            }
        }
    }

   
    find(nums,0);
    return ans;
};



function max(arr){
    let max1 = -Infinity;
    arr.forEach((val)=>{
        max1=Math.max(max1,val);
    });

    return max1;
}
let ans = Infinity;
function backtrack(cookies,idx, arr){
    if(idx==cookies.length){
        ans=Math.min(ans,max(arr));
        return;
    }
        for(let j=0;j<arr.length;j++){
            arr[j]+=cookies[idx];
            backtrack(cookies,idx+1,arr);
            arr[j]-=cookies[idx];
        }
}
var distributeCookies = function(cookies, k) {
    ans = Infinity; 
    let arr = new Array(k).fill(0);
    backtrack(cookies,0,arr);
    return ans;
};

// You are given an integer array cookies, where cookies[i] denotes the number of cookies in the ith bag. You are also given an integer k that denotes the number of children to distribute all the bags of cookies to. All the cookies in the same bag must go to the same child and cannot be split up.

// The unfairness of a distribution is defined as the maximum total cookies obtained by a single child in the distribution.

// Return the minimum unfairness of all distributions.

// https://leetcode.com/problems/maximum-number-of-achievable-transfer-requests/description/

// let ans= -1 ;
function backtrack(arr,idx,req,n,count){
    if(idx>=req.length){
        let allZeros = true;
        for(let ele of arr){
            if(ele!=0){
                allZeros= false;
                break;
            }
        }
        if(allZeros){
            ans=Math.max(ans,count);
        }
        return ;
    }
        let [from,to] = req[idx];
        arr[from]-=1;
        arr[to]+=1;
        backtrack(arr,idx+1,req,n,count+1);
        arr[from]+=1;
        arr[to]-=1;
        backtrack(arr,idx+1,req,n,count);

}
var maximumRequests = function(n, requests) {
    ans= -1;
    let arr = new Array(n).fill(0);
    backtrack(arr,0,requests,n,0);
    return ans;

};



// Template 

function Solve(start, k , temp){
    if(k==0){
        ans.push(temp);
    }

    temp.push(start); // element ko le rha hun 
    Solve(start +1 , k-1,temp); // explore kar rha hun 
    temp.pop(); // i'm not taking the element
    Solve(start+1,k,temp); // i'm still exploring without that element

}



/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */

//combinations
 var combine = function(n, k) {
    
    let ans = [];
    function dfs(k,ele,arr){
        if(k==0){
            ans.push(arr);
            return ;
        }

        if(ele>n){
            return ;
        }
        
        arr.push(ele);
        dfs(k-1,ele+1,arr);
        arr.pop();
        dfs(k,ele+1,arr);
    }

    dfs(k,1,[]);

    return ans;


};

// main template
var combine = function(n, k) {
    
    let ans = [];
    function dfs(k,start,arr){
        if(k==0){
            ans.push([...arr]);
            return ;
        }

        if(start>n){
            return ;
        }
        
        for(let i = start ;i<=n;i++){
            arr.push(i);
            dfs(k-1,i+1,arr);
            arr.pop()
        }
    }

    dfs(k,1,[]);

    return ans;


};

// Combination Sum 

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var permute = function(nums) {
    let ans = [];
    let s = new Set();
    function dfs(arr){
        if(arr.length==nums.length){
            ans.push([...arr]);
            return;
        }

        for(let i=0;i<nums.length;i++){

            if(!s.has(nums[i])){
                arr.push(nums[i]);
                s.add(nums[i]);
                dfs(arr);
                arr.pop();
                s.delete(nums[i]);
            }
        }
    }
    dfs([])
    return ans;
};


/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var permute = function(nums) {
    let ans = [];
    let s = new Set();


    function dfs(arr,index){
        if(index==nums.length){
            ans.push([...arr]);
            return;
        }

        for(let i=index;i<nums.length;i++){
                [arr[i],arr[index]] = [arr[index],arr[i]];
                dfs(arr,index+1);
                [arr[i],arr[index]] = [arr[index],arr[i]];
        }
    }
    dfs(nums,0)
    return ans;
};

// letter combination phone number

/**
 * @param {string} digits
 * @return {string[]}
 */
 var letterCombinations = function(digits) {
    if(digits.length==0){
        return [];
    }
    let map = {
        '2': 'abc', 
        '3':'def',
        '4':'ghi', 
        '5':'jkl', 
        '6':'mno',
        '7':'pqrs',
        '8':'tuv',
        '9':'wxyz'
        };

    let res =[];
    function solve(s,index,map){

        if(index===digits.length){
            let ans = s.join("");
            res.push(ans);
            return;
        }
        let curr = map[digits[index]];
        console.log(curr);
        for(let i=0; i<curr.length ; i++){
            s.push(curr[i]);
            solve(s,index+1,map);
            s.pop();
        }
    }

    solve([],0,map);

    return res;
};


var letterCombinations = function(digits) {
    if (digits.length === 0) return [];

    const keyboard = {
        "2": "abc",
        "3": "def",
        "4": "ghi",
        "5": "jkl",
        "6": "mno",
        "7": "pqrs",
        "8": "tuv",
        "9": "wxyz"
    };

    const output = [];
    const backtrack = (current, index) => {
        if (index === digits.length) {
            output.push(current);
            return;
        }
        const letters = keyboard[digits[index]];
        for (let letter of letters) {
            backtrack(current + letter, index + 1);
        }
    };
    
    backtrack ('', 0);
    return output;
};


// Combination sum 4


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
 var combinationSum4 = function(nums, target) {
    
    // let map = new Map();
    let map = Array.from({length:1001},()=> new Array(201).fill(-1));
    function Solve(nums,idx,curr){
        if(curr==0){
            return 1;
        }

        if(curr<0 || idx>=nums.length){
            return 0;
        }

        if(map[curr][idx]!=-1){
            return map[curr][idx];
        }
        // if(map.has(JSON.stringify({curr,idx}))){
        //     return map.get(JSON.stringify({curr,idx}));
        // }
        
        let first = Solve(nums,0,curr-nums[idx]);
        let second = Solve(nums,idx+1,curr);

        map[curr][idx] = first+ second;

        // map.set(JSON.stringify({curr,idx}),first + second);
        return first+ second;
    }

    return Solve(nums,0,target);


};


