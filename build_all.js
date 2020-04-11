var glob = require("glob")
var jscadToStl = require("./lib/jscadToStl.js");

glob("models/**/*.jscad", function (er, files) {
   files.reduce( (chain,name) => chain.then( () => jscadToStl(name)), Promise.resolve() );
})