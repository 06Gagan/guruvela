// tests/chatbotGemini.test.js
import assert from 'node:assert/strict';
import { parseCollegeQuery } from '../src/lib/parseCollegeQuery.js';

// Mock Gemini service
const mockGetGenerativeResponse = async (prompt, language = 'en') => {
  return `This is a Gemini response to: ${prompt} in ${language}`;
};

// Mock Predictions service
const mockFetchCollegePredictions = async (args) => {
  if (args.rank && args.category) {
    return [{ institute_name: 'Test IIT', branch_name: 'Test Branch', closing_rank: 1234 }];
  }
  return [];
};

class DummyChatbotWithGemini {
  constructor(isGeminiConfigured = true) {
    this.isGeminiConfigured = isGeminiConfigured;
    this.pendingRank = null;
    this.pendingCategory = null;
    this.pendingState = '';
    this.pendingExamType = 'JEE Main';
  }

  resetPending() {
    this.pendingRank = null;
    this.pendingCategory = null;
    this.pendingState = '';
    this.pendingExamType = 'JEE Main';
  }

  async handle(text) {
    const parsed = parseCollegeQuery(text);

    if (parsed.rank !== null) this.pendingRank = parsed.rank;
    if (parsed.category) this.pendingCategory = parsed.category;
    if (parsed.state) this.pendingState = parsed.state;
    if (parsed.examType) this.pendingExamType = parsed.examType;

    const rank = parsed.rank !== null ? parsed.rank : this.pendingRank;
    const category = parsed.category || this.pendingCategory;

    const hasAllParams = rank && category;
    const isRankQuery = parsed.isCollegeQuery || hasAllParams;

    let responseType;

    if (isRankQuery) {
      if (!rank || !category) {
        responseType = 'clarification';
      } else {
        const colleges = await mockFetchCollegePredictions({ rank, category });
        if (colleges.length > 0) {
          responseType = 'prediction';
        } else {
          responseType = 'fallback';
        }
        this.resetPending();
      }
    } else {
      if (this.isGeminiConfigured) {
        responseType = 'gemini';
        await mockGetGenerativeResponse(text, 'en'); // Pass language
      } else {
        // This would call findBestResponse in the real app
        responseType = 'fallback_no_gemini';
      }
      this.resetPending();
    }
    return responseType;
  }
}

// Self-executing async function to run tests
(async () => {
  console.log('Running Gemini integration tests...');

  let bot = new DummyChatbotWithGemini(true);
  let flow = await bot.handle('hello world');
  assert.equal(flow, 'gemini', 'Test Case 1 Failed: General query should be routed to Gemini.');

  bot = new DummyChatbotWithGemini(true);
  flow = await bot.handle('my rank is 1234 category general');
  assert.equal(flow, 'prediction', 'Test Case 2 Failed: Full rank query should be routed to prediction.');

  bot = new DummyChatbotWithGemini(true);
  flow = await bot.handle('my rank is 1234');
  assert.equal(flow, 'clarification', 'Test Case 3 Failed: Incomplete rank query should ask for clarification.');

  flow = await bot.handle('my category is obc');
  assert.equal(flow, 'prediction', 'Test Case 4 Failed: Follow-up to incomplete query should lead to prediction.');

  bot = new DummyChatbotWithGemini(false);
  flow = await bot.handle('hello world');
  assert.equal(flow, 'fallback_no_gemini', 'Test Case 5 Failed: General query should use fallback when Gemini is not configured.');

  bot = new DummyChatbotWithGemini(true);
  flow = await bot.handle('what are some good colleges?');
  assert.equal(flow, 'gemini', 'Test Case 6 Failed: General query with "college" should be routed to Gemini.');

  console.log('All Gemini integration tests passed!');
})().catch(err => {
  console.error('Test failed:', err.message);
  process.exit(1);
});
