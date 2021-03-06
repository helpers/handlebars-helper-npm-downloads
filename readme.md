# handlebars-helper-npm-downloads [![NPM version](https://img.shields.io/npm/v/handlebars-helper-npm-downloads.svg)](https://www.npmjs.com/package/handlebars-helper-npm-downloads) [![Build Status](https://img.shields.io/travis/helpers/handlebars-helper-npm-downloads.svg)](https://travis-ci.org/helpers/handlebars-helper-npm-downloads)

> Get the npm download counts for the specified repository.

## Install
Install with [npm](https://www.npmjs.com/):

```sh
$ npm i handlebars-helper-npm-downloads --save
```

## Usage

```js
var downloads = require('handlebars-helper-npm-downloads');
```

Use with [engine-handlebars][] in [templates][]

```js
app.asyncHelper('downloads', downloads);
```
### Total downloads

```handlebars
{{downloads "micromatch"}}
```
### Last 30 days of downloads

```handlebars
{{downloads "micromatch" 30}}
```
### Last 30 days of downloads specified on the hash

```handlebars
{{downloads "micromatch" last=30}}
```
### Last 30 days of downloads when `last` is a property on an object called `ctx`

```handlebars
{{downloads "micromatch" ctx}}
```

## API

### [downloads](index.js#L30)
Get the npm download counts for the specified repository.


**Params**

* `repo` **{String}**: Name of the repository to calculate download counts for.    
* `locals` **{Number|Object}**: Additional options to control how many days back to get. May be a number specifying last N days.    
* `locals.last` **{Number}**: Specify last N days to get downloads for. (Defaults to all downloads).    
* `options` **{Object}**: Handlebars options.    
* `options.hash.last` **{Number}**: Specify last N days on to the handlebars hash. `{{downloads "micromatch" last=30}}`    
* `cb` **{Function}**: Callback function with signature `(err, total)`.    

**Example**



```handlebars
{{! when registered with `engine-handlebars` as `downloads` }}
{{downloads "micromatch"}}
{{! 17985264 }}
```



## Related projects
* [assemble](https://www.npmjs.com/package/assemble): Assemble is a powerful, extendable and easy to use static site generator for node.js. Used… [more](https://www.npmjs.com/package/assemble) | [homepage](https://github.com/assemble/assemble)
* [download-stats](https://www.npmjs.com/package/download-stats): Get and calculate npm download stats for npm modules. | [homepage](https://github.com/doowb/download-stats)
* [engine](https://www.npmjs.com/package/engine): Template engine based on Lo-Dash template, but adds features like the ability to register helpers… [more](https://www.npmjs.com/package/engine) | [homepage](https://github.com/jonschlinkert/engine)
* [engine-base](https://www.npmjs.com/package/engine-base): Default engine for Template. | [homepage](https://github.com/jonschlinkert/engine-base)
* [generate](https://www.npmjs.com/package/generate): Fast, composable, highly extendable project generator with a user-friendly and expressive API. | [homepage](https://github.com/generate/generate)
* [helper-npm-downloads](https://www.npmjs.com/package/helper-npm-downloads): Get the npm download counts for the specified repository. | [homepage](https://github.com/helpers/helper-npm-downloads)
* [npm-info](https://www.npmjs.com/package/npm-info): Base class for downloading data from the npm registry | [homepage](https://github.com/doowb/npm-info)
* [templates](https://www.npmjs.com/package/templates): System for creating and managing template collections, and rendering templates with any node.js template engine.… [more](https://www.npmjs.com/package/templates) | [homepage](https://github.com/jonschlinkert/templates)
* [verb](https://www.npmjs.com/package/verb): Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used… [more](https://www.npmjs.com/package/verb) | [homepage](https://github.com/verbose/verb)

## Running tests
Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/doowb/handlebars-helper-npm-downloads/issues/new).

## Author
**Brian Woodward**

+ [github/doowb](https://github.com/doowb)
+ [twitter/doowb](http://twitter.com/doowb)

## License
Copyright © 2016 [Brian Woodward](https://github.com/doowb)
Released under the MIT license.

***

_This file was generated by [verb](https://github.com/verbose/verb) on January 22, 2016._

[assemble]: https://github.com/assemble/assemble
[download-stats]: https://github.com/doowb/download-stats
[engine]: https://github.com/jonschlinkert/engine
[engine-base]: https://github.com/jonschlinkert/engine-base
[generate]: https://github.com/generate/generate
[helper-npm-downloads]: https://github.com/helpers/helper-npm-downloads
[npm-info]: https://github.com/doowb/npm-info
[templates]: https://github.com/jonschlinkert/templates
[verb]: https://github.com/verbose/verb

