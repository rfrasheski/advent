const fs = require('fs');

let inputFile = "input.txt";
let inputs = fs.readFileSync("./src/" + inputFile, "ASCII").trim();
const startMem = inputs.split(',').map(Number);
var mem: Array<number> = [];  // restore input1 state?

function setupMemory(pos1: number, pos2: number): void {
    instrPtr = 0;
    mem = startMem.slice(0); // copy array
    mem[1] = pos1;
    mem[2] = pos2;
}

enum Operation {
    Add = 1, // Add pos 1 and 2, store in pos 3
    Multiply = 2, //Multiply Pos 1 and 2, store in pos 3
    Stop = 99 // Halt
}

var instrPtr = 0;

function main(): void {
    for(let pos1 = 0; pos1 < 100; pos1++) {
        for(let pos2 = 0; pos2 < 100; pos2++) {
            // console.log("Setting up memory: " + pos1 + " " + pos2)
            setupMemory(pos1, pos2);
            // console.log(mem)  
            while(true) {
                let signal: number = execute()
                if (signal == 1) {
                    break;
                }
            }
            if (mem[0] == 19690720) {
                let result: number = 100 * mem[1] + mem[2];
                console.log("Found! Result: " + result)
                process.exit(0);
            } else {
                console.log("not found: " + mem[0])
            }
        }
    }
}

function main2(): void {
    setupMemory(12, 2);
    while(true) {
        let signal: number = execute()
        if (signal == 1) {
            break;
        }
    }
    console.log(mem[0])
}

function execute(): number { 
    let op: number = mem[instrPtr];
    switch (op) {
        case Operation.Add: {
            // add
            // console.log("Adding: " + instrPtr)
            add();
            return 0;
        }
        case Operation.Multiply: {
            // multiply
            // console.log("Multiplying: " + instrPtr)
            multiply();
            return 0;
        }
        case Operation.Stop: {
            // end
            return 1;
        }
        default: {
            console.log("unknown opcode: " + op)
            return 1;
        }
    }
}

function add(): void {
    // add pos 1 and 2, store in pos 3
    let sum = mem[mem[instrPtr + 1]] + mem[mem[instrPtr + 2]];
    // console.log(`sum=${sum}`)
    let destAddr = mem[instrPtr + 3];
    // console.log(`destAddr=${destAddr}`)
    mem[destAddr] = sum;
    instrPtr += 4;
}

function multiply(): void {
    let product = mem[mem[instrPtr + 1]] * mem[mem[instrPtr + 2]];
    let destAddr = mem[instrPtr + 3];
    mem[destAddr] = product;
    instrPtr += 4;
}

main();
