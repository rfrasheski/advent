const fs = require('fs');
const readline = require('readline-sync')

let inputFile = "input.txt";
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
    Print = 4
}

var instrPtr = 0;

function main(): void {
    setupMemory();
    while(true) {
        let signal: number = execute()
        if (signal == 1) { // Stop command
            break;
        }
    }
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
    let input: number = +readline.question("Input number: "); 
    let destAddr = mem[instrPtr + 1];
    mem[destAddr] = input;
    instrPtr += 2;
}

function printV(modes: number[]): void {
    let a = modes[0] ? mem[instrPtr + 1] : mem[mem[instrPtr + 1]]; 
    console.log(a);
    instrPtr += 2;
}

main();
