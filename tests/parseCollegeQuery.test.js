import assert from 'node:assert/strict';
import { parseCollegeQuery } from '../src/lib/parseCollegeQuery.js';

let result;

result = parseCollegeQuery('My rank is 42 and I want CSE');
assert.equal(result.rank, 42);

result = parseCollegeQuery('rank 5, category gen');
assert.equal(result.rank, 5);

result = parseCollegeQuery('I have a 4231 rank in jee main');
assert.equal(result.rank, 4231);

result = parseCollegeQuery('I want 3 colleges');
assert.equal(result.rank, null);

console.log('All tests passed');

