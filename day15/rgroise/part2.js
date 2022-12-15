const mannathan = (vec1, vec2) => Math.abs(vec1[0] - vec2[0]) + Math.abs(vec1[1] - vec2[1]),
  parsed = require('fs').readFileSync('input', 'utf-8').split(/\r?\n/)
    .map((l) =>
        l.split(':').map(s => s.split(',').map(s => +s.split('=').at(-1)))
    ),
 sensors = parsed.map(([vec1, vec2]) => [...vec1, mannathan(vec1, vec2)]),
 boundary = 4000000
//  boundary = 20

let excluded = []
for(i = 0; i < boundary+1; i++) excluded.push(new Set())

sensors.forEach(([x, y, d], n) => {
  console.log(n/sensors.length*100 + '%')
  for(let i = (x-d < 0 ? 0 : x-d) ; i <= (x+d > boundary ? boundary : x+d); i++) {
    for(let j = (y-d < 0 ? 0 : y-d) ; j <= (y+d > boundary ? boundary : y+d); j++) {
      if(mannathan([x, y], [i, j]) <= d) excluded[i].add(j)
    }
  }
})

for(let i = 0; i <= boundary; i++) {
  console.log(i/boundary*100 + '%')
  if(excluded[i].size < boundary + 1){
    for(let j = 0; j <= boundary; j++) {
      if(!excluded[i].has(j)) {
        console.log(i*4000000+j)
        process.exit()
      }
    }
  }
}