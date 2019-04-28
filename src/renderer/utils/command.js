const exec = require('child_process').exec

function runExec({ cmdStr = '', cmdPath = '' }) {
  return new Promise((resolve, reject) => {
    let workerProcess
    let res = ''
    workerProcess = exec(cmdStr, { cwd: cmdPath })
    workerProcess.stdout.on('data', function (data) {
      res += data
    });
    workerProcess.stderr.on('data', function (data) {
      reject(data)
      res += data
    });
    workerProcess.on('close', function (code) {
      resolve(res)
    })
  })
}

export default runExec