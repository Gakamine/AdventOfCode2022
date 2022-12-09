let headPos = [0,0],
 tailPos = [0,0],
 visited = [[0,0]]
require('fs').readFileSync('input', 'utf-8').split(/\r?\n/)
    .map(([direction, _,...displacement]) => {
        displacement = displacement.join('')
        switch(direction){
            case 'R': headPos[0] += +displacement ; break
            case 'L': headPos[0] -= +displacement ; break
            case 'U': headPos[1] += +displacement ; break
            case 'D': headPos[1] -= +displacement ; break
        }
        let xDiff = headPos[0] - tailPos[0],
        yDiff = headPos[1] - tailPos[1]
        while(Math.abs(xDiff) > 1 || Math.abs(yDiff) > 1){
            tailPos[0] += xDiff != 0 ? xDiff/Math.abs(xDiff) : 0
            tailPos[1] += yDiff != 0 ? yDiff/Math.abs(yDiff) : 0
            if(visited.findIndex(([x, y]) => x == tailPos[0] && y == tailPos[1]) < 0) visited.push([...tailPos])
            xDiff = headPos[0] - tailPos[0]
            yDiff = headPos[1] - tailPos[1]
        }  
    })
console.log(visited.length)