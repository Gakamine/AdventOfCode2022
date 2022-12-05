console.log(
    (require('fs').readFileSync('input', 'utf-8').split(/\r?\n/).filter(l => l.length>0).map(l => l.split(','))
        .filter((pair) => {
            [left, right] = pair.map(p => p.split('-'))
            return ((left[0] - right[0]) * (left[1] - right[1]) <= 0)
        })
    ).length
)