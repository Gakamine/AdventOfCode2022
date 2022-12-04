console.log(require('fs').readFileSync('input', 'utf-8').split(/\r?\n/).reduce((a, b) => {
    if(!!b) {
        a[a.length - 1] += parseInt(b)
        return a
    }
    return [...a, 0]
    }, [0]).reduce((a, b) => a > b ? a : b)
)