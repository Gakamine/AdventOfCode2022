(async() => {
    let basepath = process.cwd()
    const shell = require('child_process').spawn(process.platform.startsWith('win') ? 'powershell' : 'bash', {cwd: basepath})
    shell.on('error', (err) => console.log(err))  
    const shellExec = async(command) => {
        await new Promise((resolve, _) => {
            if (!shell.stdin.write(command+'\r\n')) {
                shell.once('drain', async () => {
                    await shellExec(command)
                    resolve()
                })
            }
            process.nextTick(resolve)
        })
    }
    await shellExec('mkdir day7tmp')
    await shellExec('cd day7tmp')
    let txt = require('fs').readFileSync('../example', 'utf-8').replaceAll('dir', '$ mkdir')
    if(process.platform.startsWith('win')){
        txt = txt.replaceAll('cd ', 'cd ./') //WHY WONT YOU WORK GODDAMNIT REEEEEEEE
    }
    txt.split(/\r?\n/).filter(l => !!l && l !='$ ls').slice(1).map(async l => {
        if(l[0] == '$') {
            console.log(l.slice(2))
            await shellExec(l.slice(2))
        }
        else {
            [size, file] = l.split(' ')
            console.log(size, file)
            require('fs').writeFileSync('./'+file, ' '.repeat(size))
        }
    })

    shell.kill('SIGINT')
    process.exit(0)

    // require('child_process').run('rm -rf', {cwd: basepath}) //cleanup
})()