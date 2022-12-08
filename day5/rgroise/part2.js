crates = require('fs').readFileSync('input', 'utf-8').split(/\r?\n/),
 i = crates.findIndex(e => e ==''),
 steps = crates.splice(i).splice(1).map(l => {
    l = l.split(' ')
    return([+l[1], l[3] - 1, l[5] - 1])
 });
crates = crates.map(l => l.replaceAll('    ', ' ').split(' '))
const nbPiles = crates.pop().join('').at(-1) //eww, ikr ?
for(let i = 0; i < nbPiles - crates.length; i++) crates.unshift([])  //make crates matrix square-er so we can rotate it
crates = crates.map((_, index) => crates.map(row => row[index]).reverse().filter(e => !!e)) //rotate and filter crates matrix, stolen from https://stackoverflow.com/a/58668351
for(let step of steps){
    cratePile1 = crates[step[1]]
    crates[step[2]].push(...cratePile1.splice(cratePile1.length-step[0]))
}
console.log(crates.reduce((a, b) => a += b.pop().charAt(1), ''))