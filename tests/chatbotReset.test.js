import assert from 'node:assert/strict';
import { parseCollegeQuery } from '../src/lib/parseCollegeQuery.js';

class DummyChatbot {
  constructor() {
    this.reset();
  }
  reset() {
    this.pendingRank = null;
    this.pendingCategory = null;
    this.pendingState = '';
    this.pendingExamType = 'JEE Main';
  }
  handle(text) {
    const parsed = parseCollegeQuery(text);
    if (parsed.rank !== null) this.pendingRank = parsed.rank;
    if (parsed.category) this.pendingCategory = parsed.category;
    if (parsed.state) this.pendingState = parsed.state;
    if (parsed.examType) this.pendingExamType = parsed.examType;

    const rank = parsed.rank !== null ? parsed.rank : this.pendingRank;
    const category = parsed.category || this.pendingCategory;
    const state = parsed.state || this.pendingState;
    const examType = parsed.examType || this.pendingExamType || 'JEE Main';

    const hasAll = rank && category && (examType !== 'JEE Main' || state);
    const isPotential = parsed.isCollegeQuery || hasAll;
    let type;
    if (isPotential) {
      if (!hasAll) {
        type = 'need-info';
      } else {
        type = 'prediction';
        this.reset();
      }
    } else {
      type = 'general';
      this.reset();
    }
    return type;
  }
}

let bot = new DummyChatbot();
let flow = bot.handle('My rank is 1000');
assert.equal(flow, 'need-info');
assert.equal(bot.pendingRank, 1000);
flow = bot.handle('Tell me about documents');
assert.equal(flow, 'general');
assert.equal(bot.pendingRank, null);
assert.equal(bot.pendingCategory, null);
assert.equal(bot.pendingState, '');
assert.equal(bot.pendingExamType, 'JEE Main');

bot = new DummyChatbot();
bot.handle('My rank is 500');
flow = bot.handle('What college can I get in Karnataka category SC?');
assert.equal(flow, 'prediction');
assert.equal(bot.pendingRank, null);
assert.equal(bot.pendingCategory, null);
assert.equal(bot.pendingState, '');
assert.equal(bot.pendingExamType, 'JEE Main');

console.log('Chatbot reset tests passed');
