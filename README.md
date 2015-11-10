# nconf-transforms
Similar to .NET web.config transforms, nconf-transforms allows you to load nconf configuration files based on convention.
Reads the `NODE_ENV` environment variable to select what config file to transform.

## Usage

```js
var transform = require('nconf-transforms');

transform({
  dir: __dirname + '/config',
  reload: true // reload nconf when the config file changes
});

//...

var nconf = require('nconf');
nconf.get('someConfig');

```

where your file tree is something like

```
/app
  /config
    settings.json
    settings.production.json
```