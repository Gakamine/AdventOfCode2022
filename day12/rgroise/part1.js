const heightMap = require('fs').readFileSync('input', 'utf-8').split(/\r?\n/)

class Step {
    previousSteps = [];
    constructor(coords) {
        this.coords = coords;
    }

    isValid = () => this.coords[0] >= 0 && this.coords[0] < heightMap[0].length &&
         this.coords[1] >= 0 && this.coords[1] < heightMap.length

    canAccess = (step) => {
    return  heightMap[this.coords[1]][this.coords[0]].charCodeAt(0) 
        - heightMap[step.coords[1]][step.coords[0]].charCodeAt(0) <= 1
    }

    getNextSteps = () => {
        return [
            new Step([this.coords[0] - 1, this.coords[1]]),
            new Step([this.coords[0] + 1, this.coords[1]]),
            new Step([this.coords[0], this.coords[1] - 1]),
            new Step([this.coords[0], this.coords[1] + 1])
        ].filter(step => step.isValid() && this.canAccess(step) && !this.previousSteps.includes(step))
         .map(step => {
            step.previousSteps.push(this) 
            return step
         })
    }
}

const equals = (step1, step2) =>{
    return !!step1 && !!step2 && step1.coords[0] == step2.coords[0] && step1.coords[1] == step2.coords[1]
}

const end = new Step(heightMap.map((line, y) => [line.indexOf('E'), y]).filter(x => x[0] >= 0)[0]),
 start = new Step(heightMap.map((line, y) => [line.indexOf('S'), y]).filter(x => x[0] >= 0)[0])
start.previousStep = start
heightMap[end.coords[1]] = heightMap[end.coords[1]].replace('E', 'z')
heightMap[start.coords[1]] = heightMap[start.coords[1]].replace('S', 'a')
let currentSteps = [end],
 stepCount = 0

while (!currentSteps.some(step => equals(step, start))) {
    stepCount++
    currentSteps = currentSteps.map(step => step.getNextSteps())
     .flat()
     .filter((step, index, self) => self.findIndex(s => equals(s, step)) === index)
}

console.dir(stepCount)