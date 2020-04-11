var glob = require("glob")
 
// options is optional
glob("models/**/*.jscad", {}, function (er, files) {
    files.forEach( name => console.log(name) );

    
})