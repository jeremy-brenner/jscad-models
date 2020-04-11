var watch = require('node-watch');

watch('models', { recursive: true }, function(evt, name) {
    console.log(name);
  });
  