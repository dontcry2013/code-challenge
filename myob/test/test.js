var assert = require('assert');
const { 
  handleIncomeTax, 
  validatePayPeriod, 
  validateSuperRate,
  validateSalary,
  validateName,
  validateLine,
  handleLine,
} = require("../myob");

describe('handleIncomeTax()', function() {
  var tests = [
    {args: undefined, expected: -1},
    {args: null, expected: -1},
    {args: 'fsdfsd', expected: -2},
  ];

  tests.forEach(function(test) {
    it('correctly get result of ' + test.args, function() {
      var res = handleIncomeTax.call(null, test.args);
      assert.equal(res.code, test.expected);
    });
  });
  let test1 = {args: 60050, expected: 922};
  let test2 = {args: 120000, expected: 2669};
  it('correctly get result of ' + test1.args, function() {
    var res = handleIncomeTax.call(null, test1.args);
    assert.equal(res.data, test1.expected);
  });
  it('correctly get result of ' + test2.args, function() {
    var res = handleIncomeTax.call(null, test2.args);
    assert.equal(res.data, test2.expected);
  });

});

describe('validatePayPeriod()', function() {
  var tests = [
    {args: '01 March – 31 March', expected: 1},
    {args: '01 March – – 31 April', expected: -2},
    {args: '01 Mr – 31 April', expected: -2},
    {args: '01 March – 31 April', expected: -3},
    {args: undefined, expected: -1},
    {args: null, expected: -1},
  ];

  tests.forEach(function(test) {
    it('correctly get result of ' + test.args, function() {
      var res = validatePayPeriod.call(null, test.args);
      assert.equal(res.code, test.expected);
    });
  });
});

describe('validateSuperRate()', function() {
  var tests = [
    {args: '10%', expected: 1},
    {args: undefined, expected: -1},
    {args: null, expected: -1},
    {args: '89', expected: -2},
    {args: '3232%', expected: -2},
    {args: '001%', expected: -2},
    {args: '62djkj%', expected: -2},
    {args: 'jkj', expected: -2},
  ];

  tests.forEach(function(test) {
    it('correctly get result of ' + test.args, function() {
      var res = validateSuperRate.call(null, test.args);
      assert.equal(res.code, test.expected);
    });
  });
});

describe('validateSalary()', function() {
  var tests = [
    {args: 10992, expected: 1},
    {args: '1099', expected: 1},
    {args: undefined, expected: -1},
    {args: null, expected: -1},
    {args: '001%', expected: -2},
    {args: 'jkj', expected: -2},
  ];

  tests.forEach(function(test) {
    it('correctly get result of ' + test.args, function() {
      var res = validateSalary.call(null, test.args);
      assert.equal(res.code, test.expected);
    });
  });
});

describe('validateName()', function() {
  var tests = [
    {args: ['David','Rudd'], expected: 'David Rudd'},
    {args: undefined, expected: -1},
    {args: null, expected: -1},

  ];

  tests.forEach(function(test, idx) {
    it('correctly get result of ' + test.args, function() {
      var res = validateName.call(null, test.args);
      if(idx == 0){
        assert.equal(res.data, test.expected);
      } else{
        assert.equal(res.code, test.expected);
      }
      
    });
  });
});

describe('validateLine()', function() {
  var tests = [
    {args: 'David,Rudd,60050,9%,01 March – 31 March', expected: 1},
    {args: [], expected: -2},
    {args: undefined, expected: -1},
    {args: null, expected: -1},

  ];

  tests.forEach(function(test, idx) {
    it('correctly get result of ' + test.args, function() {
      var res = validateLine.call(null, test.args);
      assert.equal(res.code, test.expected);
    });
  });
});

describe('handleLine()', function() {
  // {"payPeriod":"01 March – 31 March","superRate":0.09,"annualSalary":60050,"name":"David Rudd"}
  var line1 = validateLine.call(null, "David,Rudd,60050,9%,01 March – 31 March").data;
  var line2 = validateLine.call(null, "Ryan,Chen,120000,10%,01 March – 31 March").data;
  var tests = [
    {args: line1, expected: 'David Rudd,01 March – 31 March,5004,922,4082,450'},
    {args: line2, expected: 'Ryan Chen,01 March – 31 March,10000,2669,7331,1000'},
    {args: [], expected: -2},
    {args: undefined, expected: -1},
    {args: null, expected: -1},

  ];

  tests.forEach(function(test, idx) {
    it('correctly get result of ' + test.args, function() {
      var res = handleLine.call(null, test.args);
      if(idx == 0 || idx == 1){
        assert.equal(res.data, test.expected);
      } else{
        assert.equal(res.code, test.expected);
      }
    });
  });
});





