/*!
 * handlebars-helper-npm-downloads <https://github.com/helpers/handlebars-helper-npm-downloads>
 *
 * Copyright (c) 2016, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

var utils = require('./utils');

/**
 * Get the npm download counts for the specified repository.
 *
 * ```handlebars
 * {{! when registered with `engine-handlebars` as `downloads` }}
 * {{downloads "micromatch"}}
 * {{! 17985264 }}
 * ```
 *
 * @param  {String} `repo` Name of the repository to calculate download counts for.
 * @param  {Number|Object} `locals` Additional options to control how many days back to get. May be a number specifying last N days.
 * @param  {Number} `locals.last` Specify last N days to get downloads for. (Defaults to all downloads).
 * @param {Object} `options` Handlebars options.
 * @param {Number} `options.hash.last` Specify last N days on to the handlebars hash. `{{downloads "micromatch" last=30}}`
 * @param  {Function} `cb` Callback function with signature `(err, total)`.
 * @api public
 */

module.exports = function downloads(repo, locals, options, cb) {
  if (typeof repo !== 'string') {
    var err = new TypeError('expected `repo` to be a string');
    if (typeof repo === 'function') {
      return repo(err);
    }
    throw err;
  }

  if (typeof options === 'function') {
    cb = options;
    options = locals;
    locals = {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('expected `cb` to be a function');
  }
  locals = locals || {};
  if (utils.isNumber(locals)) {
    locals = { last: locals };
  }

  var opts = utils.extend({}, locals, options.hash);
  utils.helper(repo, opts, cb);
};
