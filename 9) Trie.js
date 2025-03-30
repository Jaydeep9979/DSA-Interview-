class Trie{
    constructor(){
        this.root ={};
    }

    insert(word){
        let node = this.root; 
        for(let char of word){
            if(node[char]==null){
                node[char]={};
            }
            node=node[char];
        }

        node.isWord=true;
    }

    traverse(word){
        let node = this.root;
        for(let char of word){
            if(node==null){
                return null;
            }
            node=node[char];
            
        }
        return node;
    }

    search(word){
        let node = this.traverse(word);
        if(node==null){
            return false;
        }
        return node.isWord;
    }

    startsWith(word){
        let node = this.traverse(word);
        return node!=null;
    }
}


let t = new Trie();

t.insert("apple");
console.log(t.startsWith("bpp"))
console.log(t.search("apple"))
console.log(t.startsWith("app"))



class Trie{
    constructor(){
        this.root={};
    }

    insert(word,index){
        let node = this.root;
        let len = word.length;
        for(let char of word){
            if(!node[char]){
                node[char]={};
                node[char].length=len;
                node[char].index=index;
            }
            else{
                if(node[char].length>len){
                    node[char].length=len;
                    node[char].index=index;
                }  
            }
            node=node[char];
        }
        node.isWord = true;
    }

    traverse(word){
        let node = this.root;
        for(let char of word){
            if(!node[char]){
                return node;
            }
            node=node[char];
        }
        return node;
    }
   
}

// Trie { root: { d: { length: 3, index: 1, c: [Object] } } }


//https://leetcode.com/problems/longest-common-suffix-queries/
function reverse(str){
    return str.split('').reverse().join('');
}

var stringIndices = function(wordsContainer, wordsQuery) {
    let t = new Trie();

    let min = Infinity ;
    let ansIndex=0;
    wordsContainer.forEach((word,index)=>{
        if(word.length<min){
            min=word.length;
            ansIndex = index;
        }
    })

    console.log(t);

    wordsContainer.forEach((word,index)=>{
        t.insert(reverse(word),index);
})


    let ans = [];

    for(let suffix of wordsQuery){
        let prefix = reverse(suffix);
        let node = t.traverse(prefix);

        if(!node){
            ans.push(ansIndex);
        }
        else if("index" in node){
            ans.push(node.index);
        }
        else{
            ans.push(ansIndex);
        }

    }

    return ans;
};




//https://leetcode.com/problems/sum-of-prefix-scores-of-strings/
/**
 * @param {string[]} words
 * @return {number[]}
 */

 class Trie{
    constructor(){
        this.root={};
    }

    insert(word){
        let node = this.root;

        for(let char of word){
            if(!node[char]){
                node[char]={};
                node[char].count = 1;
            }
            else{
                node[char].count+=1;
            }
            node=node[char];  
        }


    }

    traverse(word){
        let node = this.root;
        let total =0 ;
        for(let char of word){
            total+=node[char].count;
            node=node[char];
        }
        return total;
    }
}
var sumPrefixScores = function(words) {
    let t= new Trie();

    for(let word of words){
        t.insert(word);
    }

    let ans =[]; 
    for(let word of words){
        ans.push(t.traverse(word));
    }

    return ans;
};