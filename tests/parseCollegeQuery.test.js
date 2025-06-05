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

result = parseCollegeQuery('rank 99 in JeeAdvance');
assert.equal(result.examType, 'JEE Advanced');

result = parseCollegeQuery('rank 500 in jee advance');
assert.equal(result.examType, 'JEE Advanced');

result = parseCollegeQuery("I'm from Maharashtra with rank 1500");
assert.equal(result.state, 'Maharashtra');

result = parseCollegeQuery('my state is karnataka');
assert.equal(result.state, 'Karnataka');

result = parseCollegeQuery('colleges near warangal');
assert.equal(result.state, 'Telangana');

result = parseCollegeQuery('colleges in trichy');
assert.equal(result.state, 'Tamil Nadu');

result = parseCollegeQuery('engineering in kurukshetra');
assert.equal(result.state, 'Haryana');

result = parseCollegeQuery('admission at jaipur');
assert.equal(result.state, 'Rajasthan');

result = parseCollegeQuery('iit surat campus');
assert.equal(result.state, 'Gujarat');

result = parseCollegeQuery('rank 1000 gandhinagar institutes');
assert.equal(result.state, 'Gujarat');

console.log('All tests passed');

