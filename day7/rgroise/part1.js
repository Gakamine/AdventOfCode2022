const fs = require('fs'),
 path = require('path');
//this is way messier than it should be
const dirSize = (dir) => { //stolen from https://stackoverflow.com/a/69418940
    let stats = fs.readdirSync(dir).map(file => [fs.statSync(path.join(dir, file)), path.join(dir, file)])
    return (stats).reduce((a, item) => a + (item[0].isDirectory() ? dirSize(item[1]) :  item[0].size), 0)
}

function getDirectories(srcpath) { //stolen from https://stackoverflow.com/a/40896897
    return fs.readdirSync(srcpath)
        .map(file => path.join(srcpath, file))
        .filter(path => fs.statSync(path).isDirectory());
}  

function getDirectoriesRecursive(srcpath) {
    return [srcpath, ...getDirectories(srcpath).map(getDirectoriesRecursive).flat()];
}

console.log(getDirectoriesRecursive('tmp').map( dir => dirSize(dir)).reduce((a, b) => a + (b < 100000 ? b : 0), 0))
fs.rmSync('tmp', { recursive: true, force: true })