var config = require('nconf');
var watch  = require('chokidar').watch;

module.exports = function(options){

  options = options || {};
  options.dir = options.dir || __dirname;
  options.fileName = options.fileName || 'settings';

  var baseFile = options.dir + '/' + options.fileName + '.json';

  config.file(baseFile);

  var envConfig = options.dir + '/' + options.fileName + '.' + config.get('NODE_ENV') + '.json';

  // if there is a settings.[NODE_ENV].json file (e.g settings.production.json file), load that too.
  if(glob.sync(envConfig).length > 0){
    config.file(envConfig);
  }

  if(options.reload){
    // watch the base config for changes to file and reload nconf
    watch(baseFile)
      .on('change', function(){
        config.load();
      });
  }

};

