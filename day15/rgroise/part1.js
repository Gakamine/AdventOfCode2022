const mannathan = (vec1, vec2) => Math.abs(vec1[0] - vec2[0]) + Math.abs(vec1[1] - vec2[1]),
  parsed = require('fs').readFileSync('input', 'utf-8').split(/\r?\n/)
    .map((l) =>
        l.split(':').map(s => s.split(',').map(s => +s.split('=').at(-1)))
    ),
 beacons = parsed.map(([vec1, vec2]) => vec2),
 sensors = parsed.map(([vec1, vec2]) => [...vec1, mannathan(vec1, vec2)]),
 y = 2000000,
 minX = Math.min(...sensors.map(([x, _, d]) => x-d)),
 maxX = Math.max(...sensors.map(([x, _, d]) => x+d))

let count = 0

for (x = minX; x <= maxX; x++) {
  if(beacons.some(([x2, y2]) => x2 === x && y2 === y)) continue
  else if(sensors.some(([x1, y1, d]) => mannathan([x1, y1], [x, y]) <= d)) count++
}

console.log(count)