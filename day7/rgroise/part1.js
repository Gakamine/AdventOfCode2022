(async() => { //this is probably about the dumbest way to do this, but it was fun
    const isWin = process.platform.startsWith('win'), //platform agnosticism XD
     tmpdir = 'tmp7'
    let basepath = process.cwd()
    const shell = require('child_process').spawn(isWin ? 'cmd' : 'bash', {cwd: basepath}),
     shellExec = async(command) => {
        await new Promise((resolve, _) => {
            if (!shell.stdin.write(command+'\r\n')) {
                 shell.once('drain', async () => {
                     resolve(await shellExec(command))      
                 })
             }
             process.nextTick(resolve)
         })
     }
    await shellExec(`mkdir ${tmpdir}`)
    await shellExec(`cd ${tmpdir}`)
    let txt = require('fs').readFileSync('../example', 'utf-8').replaceAll('dir', '$ mkdir').split(/\r?\n/).filter(l => !!l && l !='$ ls')
    for(i = 1 ; i < txt.length; i++) {
        let l = txt[i]
        if(l[0] == '$') {
            await shellExec(l.slice(2))
        }
        else {
            [size, file] = l.split(' ')
            await shellExec(isWin ? `fsutil file createnew ${file} ${size}` : `truncate -s ${file} ${size}`)
        }
    }

    //todo file scan/result

    await shellExec(isWin ? `rd /s/q ${tmpdir}` : `rm -rf ${tmpdir}`)
    await shellExec('exit')
})()