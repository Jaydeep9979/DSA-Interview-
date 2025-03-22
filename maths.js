// print all the digits in the number

while (n > 0) {
    lastDigit = n % 10;
    n = n / 10;
    console.log(lastDigit);
}

// reverse the digits

while (n > 0) {
    lastDigit = n % 10;
    n = n / 10;
    reverse = reverse * 10 + lastDigit;
}

// priny all the divisor digits

let n = 36;

let counter = 0;

for (i = 1; i * i <= n; i++) {
    if (n % i == 0) {
        counter++;
        if (n / i === i) {
            console.log(i);
        } else {
            console.log(i, n / i);
        }
    }
}

// if total divisor is 2 than it is prime number else not prime number O(sqrt(n)) Time Complexity

//gcd or hcf

for (let i = Math.min(n1, n2); i >= 1; i--) {
    if (n1 % i == 0 && n2 % i == 0) {
        console.log(i);
        break;
    }
}

// O(min(n1,n2)) Time Complexity

// Optimized Approach

while (n1 != n2) {
    if (n1 > n2) {
        n1 = n1 - n2;
    } else {
        n2 = n2 - n1;
    }
}

console.log(n1);

// O(log(min(n1,n2))) Time Complexity log Fie

//check if number is prime or not

function isPrime(n) {
    if (n == 1) {
        return false;
    }
    for (let i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            return false;
        }
    }
    return true;
}

// priny all prime factors of a number

function primeFactors(n) {
    for (let i = 2; i * i <= n; i++) {
        while (n % i == 0) {
            console.log(i);
            n = n / i;
        }
    }
    if (n > 1) {
        console.log(n);
    }
}

// O(sqrt(n) * log(n)) Time Complexity

function pow(x, n) {
    if (n < 0) {
        return 1 / pow(x, -n);
    }
    ans = 1;
    if (n % 2 == 1) {
        ans = ans * x;
        n = n - 1;
    } else {
        ans *= ans;
        n = n / 2;
    }
}

// O(log(n)) Time Complexity

function Power(x, n) {
    if (n < 0) {
        return 1 / Power(x, -n);
    }
    if (n === 0) {
        return 1;
    }

    if (n === 1) {
        return x;
    }

    if (n % 2 == 1) {
        return x * Power(x, n - 1);
    } else {
        return Power(x * x, n / 2);
    }
}

//sieve of eratosthenes

function sieve(n) {
    let arr = new Array(n + 1).fill(true);
    arr[0] = false;
    arr[1] = false;

    for (i = 2; i * i <= n; i++) {
        if (arr[i]) {
            for (j = i * i; j <= n; j += i) {
                arr[j] = false;
            }
        }
    }

    for (i = 0; i <= n; i++) {
        if (arr[i]) {
            console.log(i);
        }
    }
}

// Time complexity for sieve of eratosthenes is the number O(N) + O(Nlog(Log(n))) + O(N)


// count prime in range of l to r   

function countPrime(l, r) {
    let arr = new Array(r+1).fill(true);

    for (i = 2; i * i <= r; i++) {
        if(arr[i]){
            for(j = i * i; j <= r; j += i){
                arr[j] = false;
            }
        }
    }

    let count = 0;
    let query = new Array(r+1).fill(0);
    for(i = l; i <= r; i++){
        if(arr[i]){
           query[i] = query[i-1] + 1;
        }
    }

    return query[r] - query[l-1];
    
}       


// . Smallest Prime Factor (SPF) | Prime Factorisation | Query Based Problem 


function SPF(n){

    n = 100000;
    let spf = new Array(n+1).fill(0);
    for(let i=2; i<=n; i++){
        spf[i] = i;
    }

    for(let i=2; i*i<=n; i++){
        if(spf[i] == i){
            for(let j=i*i; j<=n; j+=i){
                if(spf[j] == j){
                    spf[j] = i;
                }
            }
        }
    }

    for(let i=0;i<query.length;i++){
        let x = query[i];
        while(x != 1){
            console.log(spf[x]);
            x = x/spf[x];
        }
    }

}