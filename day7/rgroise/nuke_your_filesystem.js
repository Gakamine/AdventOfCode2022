(async() => { //this is unbelievabely dumb and bad. but it was fun. NB: rn using big inputs you have to rerun the script multiple times because the filesystem cant catch up with the commands
    const isWin = process.platform.startsWith('win'), //platform agnosticism XD
     shell = require('child_process').spawn(isWin ? 'cmd' : 'bash'), 
     shellExec = async(command) => { //yes. we're doing this.
         await new Promise((resolve, _) => {
            shell.stdin.write(command+'\r\n')
             if (shell.stdin.writable < shell.stdin.writableHighWaterMark) { //this is supposed to wait until the shell is ready to accept more commands
                 shell.once('drain', async () => { //spoilers : it probably doesnt work
                    await shellExec(command)
                })
            }
            shell.removeAllListeners('drain')
            process.nextTick(resolve)
         })
     }
    // shell.stderr.on('data', (data) => console.log(data.toString())) //this is just for debugging
    await shellExec(`mkdir ${'tmp'}`)
    await shellExec(`cd ${'tmp'}`)
    let txt = require('fs').readFileSync('input', 'utf-8').replaceAll('dir', '$ mkdir').split(/\r?\n/).filter(l => !!l && l !='$ ls') 
    for(i = 1 ; i < txt.length; i++) {  //actually recreating the filesystem on your machine
        let l = txt[i]
        if(l[0] == '$') {
            await shellExec(l.slice(2))
        }
        else {
            [size, file] = l.split(' ')
            await shellExec(isWin ? `IF NOT EXIST ${file} fsutil file createnew ${file} ${size}` : `[ -f ${file} ] || truncate -s ${file} ${size}`)
        }
    }
    await shellExec('exit')
    console.log('\r\nif this script exists on its own then you can run part1.js or part2.js :D\r\nelse you probably have to kill it and rerun it 🥴\r\n')
})()