import assert from 'node:assert/strict';
import { parseCollegeQuery } from '../src/lib/parseCollegeQuery.js';

let result;

result = parseCollegeQuery('My rank is 42 and I want CSE');
assert.equal(result.rank, 42);

result = parseCollegeQuery('rank 5, category gen');
assert.equal(result.rank, 5);

result = parseCollegeQuery('I have a 4231 rank in jee main');
assert.equal(result.rank, 4231);
assert.equal(result.examType, 'JEE Main');

result = parseCollegeQuery('I want 3 colleges');
assert.equal(result.rank, null);

result = parseCollegeQuery('rank 123 obc-ncl pwd');
assert.equal(result.category, 'OBC-NCL (PwD)');

result = parseCollegeQuery('rank 99 gen pwd');
assert.equal(result.category, 'OPEN (PwD)');

result = parseCollegeQuery('rank 100 ews-pwd');
assert.equal(result.category, 'EWS (PwD)');

result = parseCollegeQuery('rank 50 in jee advanced');
assert.equal(result.examType, 'JEE Advanced');

console.log('All tests passed');

