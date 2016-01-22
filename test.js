/*!
 * handlebars-helper-npm-downloads <https://github.com/helpers/handlebars-helper-npm-downloads>
 *
 * Copyright (c) 2016 .
 * Licensed under the MIT license.
 */

'use strict';

require('mocha');
var assert = require('assert');
var npm = require('npm-info')();
var templates = require('templates');
var engine = require('engine-handlebars');
var helper = require('./');
var app, expectedTotal, expectedLast30;

describe('handlebars-helper-npm-downloads', function() {
  before(function(cb) {
    var repo = npm.repo('micromatch');
    repo.total(function(err, total) {
      if (err) return cb(err);
      expectedTotal = total;
      repo.last(30, function(err, total) {
        if (err) return cb(err);
        expectedLast30 = total;
        cb();
      });
    });
  });

  it('should throw an error when nothing is specified', function(cb) {
    try {
      helper();
      cb(new Error('expected an error'));
    } catch(err) {
      assert(err);
      assert.equal(err.message, 'expected `repo` to be a string');
      cb();
    }
  });

  it('should return an error when `repo` is not specified', function(cb) {
    helper(function(err) {
      assert(err);
      assert.equal(err.message, 'expected `repo` to be a string');
      cb();
    });
  });

  it('should throw an error when `cb` is not specified', function(cb) {
    try {
      helper('micromatch');
      cb(new Error('expected an error'));
    } catch(err) {
      assert(err);
      assert.equal(err.message, 'expected `cb` to be a function');
      cb();
    }
  });

  it('should get total downloads for micromatch', function(cb) {
    helper('micromatch', {}, function(err, total) {
      if (err) return cb(err);
      assert.equal(total, expectedTotal);
      cb();
    });
  });

  it('should get last 30 days of downloads for micromatch when passed a number', function(cb) {
    helper('micromatch', 30, {}, function(err, total) {
      if (err) return cb(err);
      assert.equal(total, expectedLast30);
      cb();
    });
  });

  it('should get last 30 days of downloads for micromatch when passed a string', function(cb) {
    helper('micromatch', "30", {}, function(err, total) {
      if (err) return cb(err);
      assert.equal(total, expectedLast30);
      cb();
    });
  });

  it('should get last 30 days of downloads for micromatch when passed on locals as a number', function(cb) {
    helper('micromatch', {last: 30}, {}, function(err, total) {
      if (err) return cb(err);
      assert.equal(total, expectedLast30);
      cb();
    });
  });

  it('should get last 30 days of downloads for micromatch when passed on locals as a string', function(cb) {
    helper('micromatch', {last: "30"}, {}, function(err, total) {
      if (err) return cb(err);
      assert.equal(total, expectedLast30);
      cb();
    });
  });

  it('should get last 30 days of downloads for micromatch when passed on options.hash as a number', function(cb) {
    helper('micromatch', {hash: {last: 30}}, function(err, total) {
      if (err) return cb(err);
      assert.equal(total, expectedLast30);
      cb();
    });
  });

  it('should get last 30 days of downloads for micromatch when passed on options.hash as a string', function(cb) {
    helper('micromatch', {hash: {last: "30"}}, function(err, total) {
      if (err) return cb(err);
      assert.equal(total, expectedLast30);
      cb();
    });
  });

  describe('engine-handlebars', function() {
    beforeEach(function() {
      helper.async = false;
      app = templates();
      app.engine('hbs', engine);
      app.create('pages');
    });

    it('should throw an error when nothing is specified', function(cb) {
      // incorrectly registered helper
      app.helper('downloads', helper);
      var view = app.page('test.hbs', {content: '{{downloads}}'});
      app.render(view, function(err) {
        assert(err);
        assert.equal(err.message, 'expected `repo` to be a string');
        cb();
      });
    });

    it('should return an error when `repo` is not specified', function(cb) {
      app.asyncHelper('downloads', helper);
      var view = app.page('test.hbs', {content: '{{downloads}}'});
      app.render(view, function(err) {
        assert(err);
        assert.equal(err.message, 'expected `repo` to be a string');
        cb();
      });
    });

    it('should throw an error when `cb` is not specified', function(cb) {
      // incorrectly registered helper
      app.helper('downloads', helper);
      var view = app.page('test.hbs', {content: '{{downloads "micromatch"}}'});
      app.render(view, function(err, results) {
        try {
          assert(err);
          assert.equal(err.message, 'expected `cb` to be a function');
          cb();
        } catch(err) {
          cb(err);
        }
      });
    });

    it('should get total downloads for micromatch', function(cb) {
      app.asyncHelper('downloads', helper);
      var view = app.page('test.hbs', {content: '{{downloads "micromatch"}}'})
      app.render(view, function(err, results) {
        if (err) return cb(err);
        try {
          assert.equal(results.content, expectedTotal);
          cb();
        } catch(err) {
          cb(err);
        }
      });
    });

    it('should get last 30 days of downloads for micromatch when passed a number', function(cb) {
      app.asyncHelper('downloads', helper);
      var view = app.page('test.hbs', {content: '{{downloads "micromatch" 30}}'})
      app.render(view, function(err, results) {
        if (err) return cb(err);
        try {
          assert.equal(results.content, expectedLast30);
          cb();
        } catch(err) {
          cb(err);
        }
      });
    });

    it('should get last 30 days of downloads for micromatch when passed a string', function(cb) {
      app.asyncHelper('downloads', helper);
      var view = app.page('test.hbs', {content: '{{downloads "micromatch" "30"}}'})
      app.render(view, function(err, results) {
        if (err) return cb(err);
        try {
          assert.equal(results.content, expectedLast30);
          cb();
        } catch(err) {
          cb(err);
        }
      });
    });

    it('should get last 30 days of downloads for micromatch when passed on locals as a number', function(cb) {
      app.asyncHelper('downloads', helper);
      var view = app.page('test.hbs', {content: '{{downloads "micromatch" ctx}}'})
      app.render(view, {ctx: {last: 30}}, function(err, results) {
        if (err) return cb(err);
        try {
          assert.equal(results.content, expectedLast30);
          cb();
        } catch(err) {
          cb(err);
        }
      });
    });

    it('should get last 30 days of downloads for micromatch when passed on locals as a string', function(cb) {
      app.asyncHelper('downloads', helper);
      var view = app.page('test.hbs', {content: '{{downloads "micromatch" ctx}}'})
      app.render(view, {ctx: {last: "30"}}, function(err, results) {
        if (err) return cb(err);
        try {
          assert.equal(results.content, expectedLast30);
          cb();
        } catch(err) {
          cb(err);
        }
      });
    });

    it('should get last 30 days of downloads for micromatch when passed on options.hash as a number', function(cb) {
      app.asyncHelper('downloads', helper);
      var view = app.page('test.hbs', {content: '{{downloads "micromatch" last=30}}'})
      app.render(view, function(err, results) {
        if (err) return cb(err);
        try {
          assert.equal(results.content, expectedLast30);
          cb();
        } catch(err) {
          cb(err);
        }
      });
    });

    it('should get last 30 days of downloads for micromatch when passed on options.hash as a string', function(cb) {
      app.asyncHelper('downloads', helper);
      var view = app.page('test.hbs', {content: '{{downloads "micromatch" last="30"}}'})
      app.render(view, function(err, results) {
        if (err) return cb(err);
        try {
          assert.equal(results.content, expectedLast30);
          cb();
        } catch(err) {
          cb(err);
        }
      });
    });
  });
});
