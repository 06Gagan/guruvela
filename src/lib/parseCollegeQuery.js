export const categoryMap = {
  // PwD variations first so they match before the non-PwD keywords
  'gen pwd': 'OPEN (PwD)',
  'gen-pwd': 'OPEN (PwD)',
  'general pwd': 'OPEN (PwD)',
  'general-pwd': 'OPEN (PwD)',
  'open pwd': 'OPEN (PwD)',
  'open-pwd': 'OPEN (PwD)',

  'ews pwd': 'EWS (PwD)',
  'ews-pwd': 'EWS (PwD)',

  'obc ncl pwd': 'OBC-NCL (PwD)',
  'obc-ncl pwd': 'OBC-NCL (PwD)',
  'obc-ncl-pwd': 'OBC-NCL (PwD)',

  'sc pwd': 'SC (PwD)',
  'sc-pwd': 'SC (PwD)',

  'st pwd': 'ST (PwD)',
  'st-pwd': 'ST (PwD)',

  // Standard non-PwD keywords
  'obc ncl': 'OBC-NCL',
  'obc-ncl': 'OBC-NCL',
  obc: 'OBC-NCL',
  sc: 'SC',
  st: 'ST',
  ews: 'EWS',
  gen: 'OPEN',
  general: 'OPEN',
  open: 'OPEN'
};

export function parseCollegeQuery(text) {
  const lower = text.toLowerCase();
  let match =
    lower.match(/\brank(?:\s*is)?\s*#?(\d{1,4})\b/) ||
    lower.match(/#?(\d{1,4})\s*rank\b/);
  if (!match) {
    match = lower.match(/\b(\d{3,})\b/);
  }
  const rankStr = match && (match[1] || match[2]);
  const rank = rankStr ? parseInt(rankStr, 10) : null;

  let category = null;
  for (const [key, value] of Object.entries(categoryMap)) {
    if (lower.includes(key.toLowerCase())) { category = value; break; }
  }
  const branchMatch = text.match(/\b(CSE|Computer Science|ECE|Electrical|Electronics|Mechanical|Civil|IT|Information Technology)\b/i);
  const branch = branchMatch ? branchMatch[0] : null;
  const instituteMatch = text.match(/(?:at|in|for)\s+([A-Za-z ]*(?:IIT|NIT|IIIT)[A-Za-z ]*)/i);
  const institute = instituteMatch ? instituteMatch[1].trim() : null;
  const isCollegeQuery = rank !== null || branch || institute || lower.includes('college');
  return { rank, category, branch, institute, isCollegeQuery };
}
