const fs = require('fs')
const { performance } = require('perf_hooks')

const cwd = process.cwd()

const start = performance.now()

const round = (num) => Math.round(num * 100) / 100

// Adding this just to demonstrate codehawk-bot in a PR. It's not actually used!
function getPrimes(max) {
    var sieve = [], i, j, primes = [];
    for (i = 2; i <= max; ++i) {
        if (!sieve[i]) {
            // i has not been marked -- it is prime
            primes.push(i);
            for (j = i << 1; j <= max; j += i) {
                sieve[j] = true;
            }
        }
    }
    return primes;
}

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
