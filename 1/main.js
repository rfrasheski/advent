const fs = require('fs');

let inputs = fs.readFileSync('input.txt', "ASCII").trim()
// console.log(inputs);

let inputSplit = inputs.split("\n")
// console.log(inputSplit)
var sum = 0
for (input of inputSplit) {
    let fuelReq = calcFuelReq(input)
    var fuelFuelReq = calcFuelReq(fuelReq)
    var temp = fuelFuelReq
    while (calcFuelReq(temp) > 0) {
        temp = calcFuelReq(temp)
        // console.log(temp)
        fuelFuelReq += temp
    }
    sum += fuelReq + fuelFuelReq
    // console.log(input)
    // console.log(sum)
}
console.log(sum)

function calcFuelReq(mass) {
    return Math.floor(mass / 3) - 2
}
