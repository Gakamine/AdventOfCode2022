console.log(
    require('fs').readFileSync('input', 'utf-8').split(/\r?\n/).filter(l => l.length>0).map(l => {
        let i = l.length/2
        l = [l.substring(0, i), l.substring(i)]
        for(char of l[0]){
            if(l[1].indexOf(char) >= 0) {
                let i = char.charCodeAt(0) - 96
                return i >= 0 ? i : i + 58 //ascii index shenanigans
            }
        }
    }).reduce((a, b) => (a +b))
)