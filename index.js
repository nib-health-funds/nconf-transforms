var config = require('nconf');
var watch  = require('chokidar').watch;
var glob   = require('glob');

module.exports = function(options){

  options = options || {};
  options.dir = options.dir || __dirname;
  options.fileName = options.fileName || 'settings';
  options.environment = options.environment || process.env['NODE_ENV'];
  
  var envConfig = options.dir + '/' + options.fileName + '.' + options.environment + '.json';

  // if there is a settings.[NODE_ENV].json file (e.g settings.production.json file), load that too.
  if(glob.sync(envConfig).length > 0){
    config.add('envConfig', { type: 'file', file: envConfig });
  }

  var baseFile = options.dir + '/' + options.fileName + '.json';

  config.add('base', { type: 'file', file: baseFile });

  if(options.reload){
    // watch the base config for changes to file and reload nconf
    watch(baseFile)
      .on('change', function(){
        config.load();
      });
  }

  return config;
};