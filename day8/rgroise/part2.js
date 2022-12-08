const nums = require('fs').readFileSync('input', 'utf-8').split(/\r?\n/)
    .map(l => l.split('').map(e => +e))
    console.log(nums.map((l, i) => 
        l.map((_, j) => {
            if(i * j * (1+i-nums.length) * (1+j-nums.length) == 0) return 0 
            const scoreTop = nums.map(l=>l[j]).slice(0, i).reverse().findIndex(n => n >= nums[i][j]) + 1 || i,
             scoreLeft = nums[i].slice(0, j).reverse().findIndex(n => n >= nums[i][j]) + 1 ||  j,
             scoreBottom = nums.map(l=>l[j]).slice(i + 1).findIndex(n => n >= nums[i][j]) + 1 || nums.length - i -1,
             scoreRight = nums[i].slice(j + 1).findIndex(n => n >= nums[i][j]) + 1 || nums.length - j -1
            return scoreLeft * scoreRight * scoreTop * scoreBottom
        })
    ).flat().reduce((a, n) => n > a ? n : a))