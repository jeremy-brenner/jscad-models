var glob = require("glob")
 
// options is optional
glob("models/**/*.js", {}, function (er, files) {
    files.forEach( name => console.log(name) );

    
})