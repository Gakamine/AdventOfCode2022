console.log(require('fs').readFileSync('input', 'utf-8').split(/\r?\n/).reduce((a, b) => {
    if(!!b) {
        a[a.length - 1] += +b
        return a
    }
    return [...a, 0]
    }, [0]).sort((a, b) => b - a).slice(0,3).reduce((a, b) => a+b)
)
