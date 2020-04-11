const { exec } = require("child_process");
const mkdirp = require('mkdirp')

const re = /models(.*)\.jscad/;
const destDir = 'stl';

function stlFileName(fn) {
  const basename = re.exec(fn)[1];
  return `${destDir}${basename}.stl`;
}

function folderName(fn) {
  return fn.split('/').slice(0,-1).join('/');
}

function convert(fn,outputFn) {
    return new Promise( (res,rej) => {
        exec(`npx openjscad ${fn} -o ${outputFn}`, (error, stdout, stderr) => {
            if (error) {
                return rej(err.message);
            }
            if (stderr) {
                console.log(`stderr(${fn}): ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            res();
        });
    });
}

module.exports = function(fn) {
    const outputFn = stlFileName(fn);
    return mkdirp(folderName(outputFn))
      .then(() => convert(fn, outputFn));
}