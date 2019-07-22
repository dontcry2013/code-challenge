let assert = require('assert');
const LinkedList = require("../LinkedList");
let ll = new LinkedList();
describe('LinkedList append()', function() {
    let tests = [
        {args: 'a', expected: 1},
        {args: 'b', expected: 2},
        {args: 'c', expected: 3},
    ];

    tests.forEach(function(test) {
        it('correctly get result of ' + test.args, function() {
            let res = ll.append(test.args);
            assert.equal(res, test.expected);
        });
    });
});

describe('LinkedList getLength()', function() {
    let test = {expected: 3}
    it(`correctly get result of getLength: ${test.expected}`, function() {
        let res = ll.getLength();
        assert.equal(res, test.expected);
    });
});

describe('LinkedList toString()', function() {
    let test = {expected: 'a,b,c'}
    it(`correctly get result of toString: ${test.expected}`, function() {
        let res = ll.toString();
        assert.equal(res, test.expected);
    });
});

describe('LinkedList findPrev()', function() {
    let tests = [
        {args: 'a', expected: null},
        {args: 'b', expected: 'a'},
        {args: -1, expected: null},
        {args: 100 , expected: null},
    ];

    tests.forEach(function(test, index) {
        it(`correctly get result of ${test.args}: ${test.expected}`, function() {
            let res = ll.findPrev.call(ll, test.args);
            if(index == 1){
                assert.equal(res.element, test.expected);
            } else{
                assert.equal(res, test.expected);
            }
        });
    });
});

describe('LinkedList insert()', function() {
    let tests = [
        {args: ['a', 'e'], expected: true},
        {args: ['b', 'e'], expected: true},
        {args: ['c', 'e'], expected: true},
        {args: ['f', 'e'], expected: false},
    ];

    tests.forEach(function(test) {
        it('correctly get result of ' + test.args, function() {
            let res = ll.insert.call(ll, ...test.args);
            assert.equal(res, test.expected);
        });
    });
});

describe('LinkedList insertAt()', function() {
    let tests = [
        {args: [0, 'f'], expected: true},
        {args: [1, 'f'], expected: true},
        {args: [2, 'f'], expected: true},
        {args: [-1, 'f'], expected: false},
        {args: [100, 'f'], expected: false},
    ];
    tests.forEach(function(test) {
        it('correctly get result of ' + test.args, function() {
            let res = ll.insertAt.call(ll, ...test.args);
            assert.equal(res, test.expected);
        });
    });
});

describe('LinkedList find()', function() {
    let tests = [
        {args: 'a', expected: 'a'},
        {args: 'b', expected: 'b'},
        {args: -1, expected: null},
        {args: 100 , expected: null},
    ];

    tests.forEach(function(test, index) {
        it('correctly get result of ' + test.args, function() {
            let res = ll.find.call(ll, test.args);
            if(index <= 1){
                assert.equal(res.element, test.expected);
            } else{
                assert.equal(res, test.expected);
            }
        });
    });
});

describe('LinkedList remove()', function() {
    let tests = [
        {args: 'a', expected: 'a'},
        {args: 'b', expected: 'b'},
        {args: -1, expected: null},
        {args: 100 , expected: null},
    ];

    tests.forEach(function(test) {
        it('correctly get result of ' + test.args, function() {
            let res = ll.remove.call(ll, test.args);
            assert.equal(res, test.expected);
        });
    });
});
