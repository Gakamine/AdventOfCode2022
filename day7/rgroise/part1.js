const fs = require('fs'),
 path = require('path');
(async() => { //this is unbelievabely dumb and bad. but it was fun. NB: rn using big inputs you have to rerun the script multiple times because the "point counting" part doesnt wait proporly for the filesystem to catch up.
    const isWin = process.platform.startsWith('win'), //platform agnosticism XD
     tmpdir = 'tmp7',
     basepath = process.cwd(),
     shell = require('child_process').spawn(isWin ? 'cmd' : 'bash', {cwd: basepath}),
     shellExec = async(command) => { //this mess is supposed to push commands to the shell but doent seem to properly wait until they finish
         await new Promise((resolve, _) => {
             if (!shell.stdin.write(command+'\r\n')) {
                 shell.once('drain', async () => { //yeah uh at least i tried
                     resolve(await shellExec(command))      
                 })
             }
             process.nextTick(resolve)
         })
     }
    await shellExec(`mkdir ${tmpdir}`)
    await shellExec(`cd ${tmpdir}`)
    let txt = fs.readFileSync('input', 'utf-8').replaceAll('dir', '$ mkdir').split(/\r?\n/).filter(l => !!l && l !='$ ls') 
    for(i = 1 ; i < txt.length; i++) {  //actually recreating the filesystem on your machine
        let l = txt[i]
        if(l[0] == '$') {
            await shellExec(l.slice(2))
        }
        else {
            [size, file] = l.split(' ')
            await shellExec(isWin ? `fsutil file createnew ${file} ${size}` : `truncate -s ${file} ${size}`)
        }
    }

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

    console.log(getDirectoriesRecursive(tmpdir).map( dir => dirSize(dir)).reduce((a, b) => a + (b < 100000 ? b : 0), 0))

    await shellExec(`cd ${basepath}`)
    await shellExec(isWin ? `rd /s/q ${tmpdir}` : `rm -rf ${tmpdir}`)
    await shellExec('exit')
})()