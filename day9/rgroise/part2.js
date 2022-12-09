let headPos = [0,0],
 knotPositions = Array(...Array(9)).map(() => [0,0]),
 visited = [[0,0]]
require('fs').readFileSync('../example2', 'utf-8').split(/\r?\n/)
    .map(([direction, _, ...displacement]) => {
        displacement = displacement.join('')
        switch(direction){
            case 'R': headPos[0] += +displacement ; break
            case 'L': headPos[0] -= +displacement ; break
            case 'U': headPos[1] += +displacement ; break
            case 'D': headPos[1] -= +displacement ; break
        }
        knotPositions.map((knotPos, i) => {
            let prevKnotPos = (i == 0 ? headPos : knotPositions[i-1]),
             xDiff = prevKnotPos[0] - knotPos[0],
             yDiff = prevKnotPos[1] - knotPos[1]
            while(Math.abs(xDiff) > 1 || Math.abs(yDiff) > 1){
                knotPos[0] += xDiff != 0 ? xDiff/Math.abs(xDiff) : 0
                knotPos[1] += yDiff != 0 ? yDiff/Math.abs(yDiff) : 0
                if(i == knotPositions.length - 1 &&
                    visited.findIndex(([x, y]) => x == knotPos[0] && y == knotPos[1]) < 0
                ) visited.push([...knotPos])
                xDiff = prevKnotPos[0] - knotPos[0]
                yDiff = prevKnotPos[1] - knotPos[1]
            }  
        })
    })
console.log(visited.length)