var vows          = require('vows'),
    assert        = require('assert'),
    lambdaWrapper = require('lambda-wrapper');

var booksGetHandler = require('../src/books.js');
var handler = lambdaWrapper.wrap(booksGetHandler, {
  handler: 'get'
});

module.exports = function(suite) {
  suite.addBatch({
    "get book": {
      topic: function() {
        handler.run({
          http_method: 'get',
        }, this.callback);
      },
      "runs": function (err, result) {
          assert.deepEqual(result, {
            stage: process.env.SERVERLESS_STAGE,
            app_version: 1,
            method: 'get',
            message: 'success'
          });
      }
    }
  });
}
