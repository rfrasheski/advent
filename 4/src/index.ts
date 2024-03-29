const input: [number, number] = [147981, 691423];
// between inputs
// at least two adjacent digits are the same
// left to right digits never decrease
//      only increase or stay the same

// how many permutations exist within range that meet criteria?
//
// Part 2 - Must have at least one group of exactly two adjacent digits
let count: number = 0;
for (let a = input[0]; a <= input[1]; a++) {
    if (adjacent(a) && notDec(a)) {
        count++;
    }
}

console.log(count);

function adjacent(a: number): boolean {
    let t: number = a;
    let lastDigit: number = -1;
    // look for group of 2
    let found: boolean = false;
    let sameDigitCount: number = 0;
    while (t > 0) {
        let digit: number = Math.floor(t % 10);
        t = Math.floor(t / 10);
        // console.log(`lastdigit: ${lastDigit} digit: ${digit} t: ${t}`)
        if (lastDigit == digit) {
            sameDigitCount++;
        } else {
            if (sameDigitCount == 1) {
                found = true;
            }
            sameDigitCount = 0;
        } 
        lastDigit = digit 
    }
    return found || sameDigitCount == 1;
}

// console.log(adjacent(112233)); //true
// console.log(adjacent(123444)); //false
// console.log(adjacent(111122)); //true

function notDec(a: number): boolean {
    let t: number = a;
    let highest: number = 10;
    while (t > 0) {
        let digit: number = Math.floor(t % 10);
        t = Math.floor(t / 10);
        if (digit <= highest) {
            highest = digit;
        } else {
            return false;
        }
    }
    return true;
}

