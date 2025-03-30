function convertToBinary(num){
    let isNegative = num < 0 ? true : false; 
    let binary = '';
    let bit =0;
    num  = Math.abs(num);
    while(num>0){
        bit = num%2;
        binary = bit + binary;
        num=Math.floor(num/2);
    }

    return isNegative ? "-" + binary : binary;
   
}

// console.log(convertToBinary(-11));

function BinarytoNumber(bin){
    let ans = 0 ;
    let isNegative = false;
    let start =0;
    if(bin[0]=='-'){
        isNegative=true;
        start=1;
    }

    for(let i=start;i<bin.length;i++){
        ans = ans*2 + (bin[i]==='0' ? 0:1);
    }

    return isNegative ? -1*ans  : ans;

}

//  console.log(BinarytoNumber("11"))

function ithBit(num,i){
    return (num >> i) & 1 ;
} 
console.log(convertToBinary(17));
console.log(ithBit(17,2));