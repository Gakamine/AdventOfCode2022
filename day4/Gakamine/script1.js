fs = require('fs')

const data = fs.readFileSync('input', 'UTF-8')
const lines = data.split(/\r?\n/)
var counter=0

lines.forEach(line => {
  if(line!=""){
    var min_elf1=parseInt((line.split(",")[0]).split("-")[0])
    var max_elf1=parseInt((line.split(",")[0]).split("-")[1])
    var min_elf2=parseInt((line.split(",")[1]).split("-")[0])
    var max_elf2=parseInt((line.split(",")[1]).split("-")[1])
    if(min_elf1<=min_elf2 && max_elf1>=max_elf2) {
      counter++
    } else if(min_elf2<=min_elf1 && max_elf2>=max_elf1) {
      counter++
    }
  }
})

console.log(counter)