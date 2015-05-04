
var generate = require('../../../query/sort');
var admin_boost = 'admin_boost';
var population = 'population';
var popularity = 'popularity';
var category = 'category';
var category_weights = require('../../../helper/category_weights');
var weights = require('pelias-suggester-pipeline').weights;

module.exports.tests = {};

module.exports.tests.interface = function(test, common) {
  test('valid interface', function(t) {
    t.equal(typeof generate, 'object', 'valid object');
    t.end();
  });
};

var expected = [
  {
    '_script': {
      'file': admin_boost,
      'type': 'number',
      'order': 'desc'
    }
  },
  {
    '_script': {
      'file': population,
      'type': 'number',
      'order': 'desc'
    }
  },
  {
    '_script': {
      'file': popularity,
      'type': 'number',
      'order': 'desc'
    }
  },
   {
    '_script': {
      'params': {
        'category_weights': category_weights
      },
      'file': category,
      'type': 'number',
      'order': 'desc'
    }
  },
  {
    '_script': {
      'params': {
        'weights': weights
      },
      'file': 'weights',
      'type': 'number',
      'order': 'desc'
    }
  }
];

module.exports.tests.query = function(test, common) {
  test('valid part of query', function(t) {
    var sort = generate;
    t.deepEqual(sort, expected, 'valid sort part of the query');
    t.end();
  });
};

module.exports.all = function (tape, common) {

  function test(name, testFunction) {
    return tape('sort query ' + name, testFunction);
  }

  for( var testCase in module.exports.tests ){
    module.exports.tests[testCase](test, common);
  }
};