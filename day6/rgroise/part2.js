let input = require('fs').readFileSync('input', 'utf-8')
for(i = 0; i + 14 < input.length; i++){
    let sequence = input.slice(i, i + 14),
     j = 0
    while(sequence.length > 0) {
        sequence = sequence.replaceAll(sequence[0], '')
        j++
    }
    if(j == 14){
        console.log(i+14)
        break
    }
}