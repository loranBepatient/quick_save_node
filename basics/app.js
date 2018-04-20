const path = require('path'),
    os = require('os'),
    fs = require('fs')

const pathObject = path.parse(__filename);
const totalMem = os.totalmem();
const freeMem = os.freemem();
console.warn(`Mémoire libre ${freeMem/totalMem*100}%`)

fs.readdir('../', (err, files) => {
    if (!err) {
        console.log(files)
        return files
    } else {
        console.error('Error', err)
    }
})
