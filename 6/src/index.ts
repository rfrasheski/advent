const fs = require('fs');

let inputFile = "input.txt";
let inputsSplitNewLine: string[] = fs.readFileSync("./src/" + inputFile, "ASCII").trim().split("\n")
let inputs: Array<Array<string>> = [];


function main(): void {
    initInputs();
    let orbits = assembleOrbits(inputs.slice(0));
    console.log(orbits);
    // let direct = getDirectOrbits(orbits);
    // let indirect = getIndirectOrbits(orbits);
    // console.log(direct + indirect);
}

class Planet implements Iterable<Planet> {
    public planet: string;
    public direct: Array<Planet>;
    public constructor(planet: string) {
        this.planet = planet;
        this.direct = [];
    }
    public *[Symbol.iterator](): IterableIterator<Planet> {
        for (const orbiter of this.direct) {
            yield* orbiter;
            yield orbiter;
        }
    }
}

function initInputs(): void {
    for (let line of inputsSplitNewLine) {
        inputs.push(line.split(")"))
    }
}

// assemble list from inputs
// return top level ListNode for COM
function assembleOrbits(inputs: Array<Array<string>>): number {
    let galaxy: Map<string, Planet> = new Map();
    for(let i = 0; i < inputs.length; i++) {
        let planet: string = inputs[i][0];
        let orbiter: string = inputs[i][1];
        // if orbiter exists as node, get node
        //      else create new node
        let planetNode = galaxy.get(planet);
        if (!planetNode) {
            planetNode = new Planet(planet);
            galaxy.set(planet, planetNode);
        }
        let orbiterNode = galaxy.get(orbiter);
        if (!orbiterNode) {
            orbiterNode = new Planet(orbiter);
            galaxy.set(orbiter, orbiterNode);
        }
        planetNode.direct.push(orbiterNode);
    } 
    // for (let entry in galaxy.entries()) {
        // entry.reduce((acc, [_, p]) => {
            // acc + [...p].length
        // }, 0) 
    // }
    return [...galaxy.entries()].reduce((acc, [_, p]) => acc + [...p].length, 0);
}
main();

