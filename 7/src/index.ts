const fs = require('fs');
const readline = require('readline-sync')

let inputFile = "test2.txt";
let inputs = fs.readFileSync("./src/" + inputFile, "ASCII").trim();
const startMem = inputs.split(',').map(Number);
var mem: Array<number> = [];  // restore input1 state?

function setupMemory(): void {
    instrPtr = 0;
    mem = startMem.slice(0); // copy array
}

enum Operation {
    Add = 1, // Add pos 1 and 2, store in pos 3
    Multiply = 2, //Multiply Pos 1 and 2, store in pos 3
    Stop = 99, // Halt
    Store = 3,
    Print = 4,
    JumpIfTrue = 5,
    JumpIfFalse = 6,
    LessThan = 7,
    Equals = 8
}

var instrPtr = 0;
var phase = 0;
var signal = "";

function *permute(a: string[], n: number = a.length): string {
    if (n <= 1) yield a.join("").slice();
    else for (let i = 0; i < n; i++) {
        yield *permute(a, n-1);
        const j = n % 2 ? 0 : i;
        [a[n-1], a[j]] = [a[j], a[n-1]]
    }
}

function main(): void {
    let input: string = readline.question("Phase setting sequence: ");
    for (let n of input) {
        phase = +n;
        setupMemory();
        while(true) {
            // console.log(mem);
            let signal: number = execute()
            if (signal == 1) { // Stop command
                break;
            }
        }    
    }
    console.log(signal)
    // console.log(mem);
    process.exit(0);
}

function execute(): number { 
    let op: number[] = parseOp(mem[instrPtr]);
    // console.log(op)
    switch (op[0]) {
        case Operation.Add: {
            // add
            // console.log("Adding: " + instrPtr)
            add(op.slice(1));
            return 0;
        }
        case Operation.Multiply: {
            // multiply
            // console.log("Multiplying: " + instrPtr)
            multiply(op.slice(1));
            return 0;
        }
        case Operation.Stop: {
            // end
            return 1;
        }
        case Operation.Store: {
            store(op.slice(1));
            return 0;
        }
        case Operation.Print: {
            printV(op.slice(1))
            return 0;
        }
        case Operation.JumpIfTrue: {
            jumpIfTrue(op.slice(1))
            return 0;
        }
        case Operation.JumpIfFalse: {
            jumpIfFalse(op.slice(1))
            return 0;
        }
        case Operation.LessThan: {
            lessThan(op.slice(1));
            return 0;
        }
        case Operation.Equals: {
            equalsOp(op.slice(1))
            return 0;
        }
        default: {
            console.log("unknown opcode: " + op)
            return 1;
        }
    }
}

// parse op code
//      get out:
//          operation
//          mode for each parameter
// ops have variable number parameters
// leading 0's on op are ignored
function parseOp(op: number): number[] {
    // get digits
    let digits: number[] = [];
    while (op > 0) {
        digits.push(Math.floor(op % 10));
        op = Math.floor(op / 10);
    }
    // iterate and extract
    let opcode: number = +(digits.shift() + "" + (digits.shift() || ""));
    let p1: number = digits.shift() || 0;
    let p2: number = digits.shift() || 0;
    let p3: number = digits.shift() || 0;
    return [opcode, p1, p2, p3];
}

function add(modes: number[]): void {
    let a = modes[0] ? mem[instrPtr + 1] : mem[mem[instrPtr + 1]]
    let b = modes[1] ? mem[instrPtr + 2] : mem[mem[instrPtr + 2]];
    let sum = a + b; 
    // console.log(`sum=${sum}`)
    let destAddr = mem[instrPtr + 3];
    // console.log(`destAddr=${destAddr}`)
    mem[destAddr] = sum;
    instrPtr += 4;
}

function multiply(modes: number[]): void {
    let a = modes[0] ? mem[instrPtr + 1] : mem[mem[instrPtr + 1]]; 
    let b = modes[1] ? mem[instrPtr + 2] : mem[mem[instrPtr + 2]];
    let product = a * b; 
    let destAddr = mem[instrPtr + 3];
    mem[destAddr] = product;
    // console.log(`a: ${a} b: ${b} product: ${product} destAddr: ${destAddr}`)
    instrPtr += 4;
}

function store(modes: number[]): void {
    let input: number = phase; //+readline.question("Input number: "); 
    phase = 0;
    let destAddr = mem[instrPtr + 1];
    mem[destAddr] = input;
    instrPtr += 2;
}

function printV(modes: number[]): void {
    let a = modes[0] ? mem[instrPtr + 1] : mem[mem[instrPtr + 1]]; 
    // console.log(a);
    signal += a;
    instrPtr += 2;
}

function jumpIfTrue(modes: number[]): void {
    let a: number = modes[0] ? mem[instrPtr + 1] : mem[mem[instrPtr + 1]];
    let b: number = modes[1] ? mem[instrPtr + 2] : mem[mem[instrPtr + 2]];
    if (a != 0) {
        instrPtr = b;
    } else {
        instrPtr += 3;
    }
}

function jumpIfFalse(modes: number[]): void {
    let a: number = modes[0] ? mem[instrPtr + 1] : mem[mem[instrPtr + 1]];
    let b: number = modes[1] ? mem[instrPtr + 2] : mem[mem[instrPtr + 2]];
    if (a == 0) {
        instrPtr = b;
    } else {
        instrPtr += 3;
    }
}

function lessThan(modes: number[]): void {
    let a: number = modes[0] ? mem[instrPtr + 1] : mem[mem[instrPtr + 1]];
    let b: number = modes[1] ? mem[instrPtr + 2] : mem[mem[instrPtr + 2]];
    let destAddr = mem[instrPtr + 3];
    let boolVal: number = (a < b) ? 1 : 0;
    mem[destAddr] = boolVal;
    instrPtr += 4;
}

function equalsOp(modes: number[]): void {
    let a: number = modes[0] ? mem[instrPtr + 1] : mem[mem[instrPtr + 1]];
    let b: number = modes[1] ? mem[instrPtr + 2] : mem[mem[instrPtr + 2]];
    let destAddr = mem[instrPtr + 3];
    let boolVal: number = (a == b) ? 1 : 0;
    mem[destAddr] = boolVal;
    instrPtr += 4;
}

main();
