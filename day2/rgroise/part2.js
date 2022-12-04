console.log(require('fs').readFileSync('input', 'utf-8').split(/\r?\n/).filter(l => !!l)
    .map(line => line.split(" "))
    .map(([left, right]) => ([left.charCodeAt(0) - 65, right.charCodeAt(0) - 88]))
    .map(([left, right]) => 
        right * 3  + 1 + (
            right + left == 2 ? 1 :
                right == 1 ? left :
                    right == 2 ? 2 * (right - left) : 2 - (2 * left) //why did i even do this ??
        )
    ).reduce((a, b) => a + b)
)