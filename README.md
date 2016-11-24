# nconf-transforms
Similar to .NET web.config transforms, nconf-transforms allows you to load nconf configuration files based on convention.
By default reads the `NODE_ENV` environment variable to select what config file to transform. Currently only supports JSON format.

## Usage

```js
require('nconf').argv().env() // don't forget to load your environment/argv variables if you want them!

var transform = require('nconf-transforms');

transform({
  dir: './config',
  reload: true // reload nconf when the config file changes
  format: require('nconf-yaml')
});
```

where your file tree is something like

```
/app
  app.js
  /config
    settings.json
    settings.production.json
```

settings.json

```json
{
  "someConfig": "someValue"
}
```

app.js

```js
var nconf = require('nconf');
console.log(nconf.get('someConfig')); // "someValue"
```

## API

`transform(options)`

Loads your base configuration and transforms it using the `NODE_ENV` environment variable to find the transform file.

Options:

- dir: String. The directory to find the configuration files. Defaults to `__dirname`, so set it anyway.
- fileName: String. The name of your configuration files (i.e `settings.json`, `settings.production.json`). Defaults to `settings`
- reload: Boolean. Toggles reloading of configuration when the base config changes.
- environment: String. The environment to transform to. Defaults to `process.env['NODE_ENV']`
- format: String. The nconf file format to use. Defaults to JSON.

Returns the `nconf` object so you can chain loading other configuration types/files.
