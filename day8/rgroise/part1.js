const nums = require('fs').readFileSync('input', 'utf-8').split(/\r?\n/)
    .map(l => l.split('').map(e => +e))
let count = 0
for(let i = 1; i < nums.length - 1; i++){
    for(let j = 1; j < nums.length - 1; j++){
        const visibleLeft = nums[i].slice(0, j).every(n => n < nums[i][j]),
         visibleRight = nums[i].slice(j + 1).every(n => n < nums[i][j]),
         visibleTop = (nums.map(l=>l[j])).slice(0, i).every(n => n < nums[i][j]),
         visibleBottom = (nums.map(l=>l[j])).slice(i + 1).every(n => n < nums[i][j]) 
        if(visibleLeft || visibleRight || visibleTop || visibleBottom) count++
    }
}
console.log(count + 4* (nums.length - 1))