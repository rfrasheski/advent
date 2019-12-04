const fs = require('fs')

let inputFile = "input.txt";
let inputs = fs.readFileSync("./src/" + inputFile, "ASCII").trim();
const wireSplit = inputs.split("\n")
const n = 500;

var wirePoints: Array<string> = [];
// store every x,y in first wire path in a dict
// step through second wire, find intersection points
// calculate closest intersection

const start = [250, 250];
var cross: number[] = [];
var x: number = 0;
var y: number = 0;
main();

function main(): void {
    let i = 0;
    wirePoints[0] = ptToStr([start[0], start[1]])
    var wireMoveSets: Array<Array<string | number>> = [];
    for (let wire of wireSplit) {
        let wireMoveSplit = wire.split(',')
        let moveSet = parseInput(wireMoveSplit);
        wireMoveSets[i] = moveSet;
        i++
    }
    console.log(wireMoveSets);
    x = start[0];
    y = start[1];
    for (let j = 0; j < wireMoveSets[0].length; j += 2) {
        let dir: string = "" + wireMoveSets[0][j];
        let move: number = +wireMoveSets[0][j+1];
        executeMove(dir, move, true);
    }
    x = start[0];
    y = start[1];
    for (let j = 0; j < wireMoveSets[1].length; j += 2) {
        let dir: string = "" + wireMoveSets[1][j];
        let move: number = +wireMoveSets[1][j+1];
        executeMove(dir, move, false);
    }
    // console.log(wirePoints);
    // console.log(cross);
    console.log(closest())
}

function closest(): number {
    var min = distance(start[0], start[1], cross[0], cross[1])
    for (let i = 2; i < cross.length; i += 2) {
        min = Math.min(min, distance(start[0], start[1], cross[i], cross[i+1]))
    }
    return min;
}

function strToPt(input: string): [number, number] {
    let result: [number, number] = [+input.split("_")[0], +input.split("_")[1]]
    return result;
}

function ptToStr(input: [number, number]): string {
    let result: string = input[0] + "_" + input[1];
    return result;
}

function help(store: boolean): void {
    let nextPt: [number, number] = [x, y];
    if (store) {
        wirePoints.push(ptToStr(nextPt));
    } else if (wirePoints.includes(ptToStr(nextPt))) {
        cross.push(x, y);
    }
}

function executeMove(dir: string, move: number, store: boolean): void {
    let tx = x;
    let ty = y;
    switch (dir) {
        case "R": {
            for (let mv = 0; mv < move; mv++) {
                x += 1;
                help(store);
            }
            break;
        }
        case "L": {
            for (let mv = 0; mv < move; mv++) {
                x -= 1;
                help(store);
            }
            break;
        }
        case "U": {
            for (let mv = 0; mv < move; mv++) {
                y += 1;
                help(store);
            }
            break;
        }
        case "D": {
            for (let mv = 0; mv < move; mv++) {
                y -= 1;
                help(store);
            }
            break;
        }
    }
}

function parseInput(inputArray: Array<string>): Array<string | number>{
    let outArray: Array<string | number> = [];
    for (let input of inputArray) {
        let dir: string = input.substring(0, 1);
        let move: number = +input.substring(1, input.length)
        outArray.push(dir, move);
    }
    return outArray;
}
function distance(p1: number, p2: number, q1: number, q2: number): number {
    return Math.abs(p1 - q1) + Math.abs(p2 - q2);
}
