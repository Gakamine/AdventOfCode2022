let i = X = 1
console.log(require('fs').readFileSync('../example', 'utf-8').split(/\r?\n/).map(l => l.split(' '))
    .reduce((a, [opcode, val] ) => {
        if(opcode == 'addx') {
            i++
            if((i-20) % 40 == 0) {
                console.log(i, X, X * i)
                return a + X * i
            }
            X += +val
        }
        i ++
        if((i-20) % 40 == 0) {
            console.log(i, X, X * i)
            return a + X * i
        }
        return a
    }, 0)
)