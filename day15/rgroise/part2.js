const mannathan = (vec1, vec2) => Math.abs(vec1[0] - vec2[0]) + Math.abs(vec1[1] - vec2[1]),
  parsed = require('fs').readFileSync('input', 'utf-8').split(/\r?\n/)
    .map((l) =>
        l.split(':').map(s => s.split(',').map(s => +s.split('=').at(-1)))
    ),
 sensors = parsed.map(([vec1, vec2]) => [...vec1, mannathan(vec1, vec2)]),
  boundary = 4000000

const checkSurroundings = (x, y) =>{
  const check = (x, y) => sensors.some(([x1, y1, d]) => mannathan([x1, y1], [x, y]) <= d) ? undefined : [x, y]
  return check(x-1, y) || check(x+1, y) || check(x, y-1) || check(x, y+1)
}

const getPermimeter = ([x, y, d]) => {
  let [i, j] = [x+d, y]
  let permimeter = []
  while(i > x) permimeter.push([--i, ++j])
  while(j > y) permimeter.push([--i, --j])
  while(i < x) permimeter.push([++i, --j])
  while(j < y) permimeter.push([++i, ++j])
  return permimeter
}

sensors.forEach((sensor, n) => {
  getPermimeter(sensor).forEach(([i, j]) => {
    let check = checkSurroundings(i, j)
    if(!!check && check[0] >= 0 && check[1] >= 0 && check[0] <= boundary && check[1] <= boundary) {
      console.log(check[0]*4000000+check[1])
      process.exit()
    }
  })
})