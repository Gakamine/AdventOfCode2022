const getRange = (vec1, vec2) => {
    const minmax = (a, b) => a < b ? [a, b] : [b, a]
    let a, reversed=false
    if (vec1[0] == vec2[0]) {
        a = vec1[0]
    }
    else {
        a = vec1[1]
        reversed = true
    }
    [bmin, bmax] = reversed ? minmax(vec1[0], vec2[0]) : minmax(vec1[1], vec2[1])
    let res = [...Array(bmax+1).keys()].slice(bmin).map(n => [a, n])
    return reversed ? res.map(v => v.reverse()) : res
}

let obstacles = []
require('fs').readFileSync('input', 'utf-8').split(/\r?\n/)
.map(l =>{
    l.split('->').reduce((acc, vec) => {
        vec = vec.split(',').map(n => +n)
        if(acc.length== 0) return vec
        obstacles.push(getRange(acc, vec))
        return vec
    }, [])
})
obstacles = obstacles.flat()


let keepLooping = true,
count = 0
const maxY = obstacles.reduce((a, v) => v[1] > a ? v[1] : a, 0) + 1

const findObstacle = (_x, _y) => {
    return _y > maxY || obstacles.some(([x, y]) => x == _x && y == _y)
}

while(keepLooping) {
    let x = 500,
     y = 0
    inner : while(true) {
        if(!findObstacle(x, y+1)) y++
        else if(!findObstacle(x-1, y+1)) {
            x--
            y++
        } else if(!findObstacle(x+1, y+1)) {
            x++
            y++
        } else {
            if(y == 0) keepLooping = false
            obstacles.push([x, y])
            count++
            break inner
        }   
    }
}

console.log(count) //this will take a while