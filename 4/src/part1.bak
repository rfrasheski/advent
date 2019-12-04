const input: [number, number] = [147981, 691423];
// between inputs
// at least two adjacent digits are the same
// left to right digits never decrease
//      only increase or stay the same

// how many permutations exist within range that meet criteria?
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
    while (t > 0) {
        let digit: number = Math.floor(t % 10);
        t = Math.floor(t / 10);
        if (lastDigit == digit) {
            return true;
        } else {
            lastDigit = digit;
        }
    }
    return false;
}

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

