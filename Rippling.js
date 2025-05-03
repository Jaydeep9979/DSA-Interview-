function solve(arr) {
    let max = Math.max(...arr);
    let totalGensTillNow = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === max) continue;

        // here multiplyed by 2 for 2 operations (add 1 ,add 2 )
        let gens = Math.floor((max - arr[i]) / 3) * 2;

        let remain = (max - arr[i]) % 3;

        totalGensTillNow += gens;
        if (remain == 2) {
            if (totalGensTillNow % 2 == 0) {
                // gens til now is even so currGen(which i'm gonna perform is odd);
                // e.g.suppose  curr we are at 1 need to reach 3 , so remain is 2 (skip then add 2)
                totalGensTillNow += 2;
            } else {
                // (add 2)
                totalGensTillNow += 1;
            }
        } else if (remain == 1) {
            if (totalGensTillNow % 2 == 0) {
                // add 1
                // gens til now is even so currGen(which i'm gonna perform is odd);
                totalGensTillNow += 1;
            } else {
                // i'm gonna perform off evengen (skip and then add 1)
                totalGensTillNow += 2;
            }
        }
    }
    console.log(totalGensTillNow);
}

solve([1, 1, 2, 4]); // 6
solve([3, 3, 6]); // 4

// look at right side for outputs

class PriorityQueue {
    constructor() {
        this.arr = [];
    }

    add(val) {
        this.arr.push(val);
        upheapify(this.arr.length - 1);
    }

    swap(i, j) {
        let temp = this.arr[i];
        this.arr[i] = this.arr[j];
        this.arr[j] = temp;
    }

    upheapify(idx) {
        if (idx == 0) return;

        let pi = Math.floor((idx - 1) / 2);
        if (this.arr[pi] > this.arr[idx]) {
            this.swap(pi, idx);
            this.upheapify(pi);
        }
    }

    remove() {
        if (this.arr.length == 0) {
            return "Underflow";
        }

        this.swap(0, this.arr.length - 1);
        let ans = this.arr.pop();

        this.downheapify(0);
        return ans;
    }

    downheapify(idx) {
        let mini = idx;
        let lci = 2 * idx + 1;
        let rci = 2 * idx + 2;

        if (lci < this.arr.length && this.arr[lci] < this.arr[mini]) {
            mini = lci;
        }

        if (rci < this.arr.length && this.arr[rci] < this.arr[mini]) {
            mini = rci;
        }

        if (mini != idx) {
            swap(mini, idx);
            this.downheapify(mini);
        }
    }
}
