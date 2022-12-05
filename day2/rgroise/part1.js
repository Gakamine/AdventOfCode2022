console.log(require('fs').readFileSync('input', 'utf-8').split(/\r?\n/).filter(l => !!l)
    .map(line => line.split(' '))
    .map(([left, right]) => ([left.charCodeAt(0) - 65, right.charCodeAt(0) - 88]))
    .map(([left, right]) => 
        right + 1 + (
            right == left ? 3 :
                right - left == 1 ? 6 :
                    right - left == -2 ? 6 : 0
        )
    ).reduce((a, b) => a + b)
)