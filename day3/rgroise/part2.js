let lines = require('fs').readFileSync('input', 'utf-8').split(/\r?\n/).filter(l => l.length>0),
 count = 0
for(let i = 0; i < lines.length; i+= 3){
    innerLoop : for(char of lines[i]){
        if(lines[i+1].indexOf(char) >= 0) {
            if(lines[i+2].indexOf(char) >= 0) {
                let k = char.charCodeAt(0) - 96
                count += (k >= 0 ? k : k + 58)
                break innerLoop
            }
        }
    }    
}
console.log(count)