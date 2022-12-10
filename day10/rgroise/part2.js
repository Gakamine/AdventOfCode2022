let i = X = 1
require('fs').readFileSync('input', 'utf-8').replaceAll('addx', 'noop \naddx').split(/\r?\n/).map(l => l.split(' '))
.map(([opcode, val]) => {
    process.stdout.write(i<X||i-X>2 ? ' ' : '#')
    if(opcode == 'addx') X += +val
    if(i % 40 == 0) {
        process.stdout.write('\n')
        i = 0
    }
    i ++
})