const fs = require('fs')
const { performance } = require('perf_hooks')

const cwd = process.cwd()

const start = performance.now()

const round = (num) => Math.round(num * 100) / 100

const readAllFiles = () => {
    const filePaths = []
    for (i = 0; i < 251; i++) {
        filePaths.push(process.cwd() + `/files/File${i.toString().padStart(3, '0')}.ts`)
    }

    return filePaths.reduce((dict, parsedFile) => {
        const relativeFullPath = parsedFile.replace(cwd, '')
        dict[relativeFullPath] = fs.readFileSync(parsedFile, 'utf8')
        return dict
    }, {})
}

const doWork = readAllFiles()

console.log(`${Object.keys(doWork).length} files read from disk in ${round(performance.now() - start)} ms`)