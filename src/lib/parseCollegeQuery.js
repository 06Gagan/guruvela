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

export const stateKeywords = {
  'andhra pradesh': 'Andhra Pradesh',
  'arunachal pradesh': 'Arunachal Pradesh',
  assam: 'Assam',
  bihar: 'Bihar',
  chhattisgarh: 'Chhattisgarh',
  goa: 'Goa',
  gujarat: 'Gujarat',
  haryana: 'Haryana',
  'himachal pradesh': 'Himachal Pradesh',
  jammu: 'Jammu and Kashmir',
  kashmir: 'Jammu and Kashmir',
  jharkhand: 'Jharkhand',
  karnataka: 'Karnataka',
  kerala: 'Kerala',
  'madhya pradesh': 'Madhya Pradesh',
  maharashtra: 'Maharashtra',
  manipur: 'Manipur',
  meghalaya: 'Meghalaya',
  mizoram: 'Mizoram',
  nagaland: 'Nagaland',
  odisha: 'Odisha',
  orissa: 'Odisha',
  punjab: 'Punjab',
  rajasthan: 'Rajasthan',
  sikkim: 'Sikkim',
  'tamil nadu': 'Tamil Nadu',
  telangana: 'Telangana',
  tripura: 'Tripura',
  'uttar pradesh': 'Uttar Pradesh',
  uttarakhand: 'Uttarakhand',
  'west bengal': 'West Bengal',
  delhi: 'Delhi',
  ladakh: 'Ladakh',
  chandigarh: 'Chandigarh',
  'andaman and nicobar': 'Andaman and Nicobar Islands',
  'dadra and nagar haveli': 'Dadra and Nagar Haveli and Daman and Diu',
  'daman and diu': 'Dadra and Nagar Haveli and Daman and Diu',
  puducherry: 'Puducherry',
  lakshadweep: 'Lakshadweep'
};

export const cityKeywords = {
  warangal: 'Telangana',
  trichy: 'Tamil Nadu',
  kurukshetra: 'Haryana',
  jaipur: 'Rajasthan',
  surat: 'Gujarat',
  gandhinagar: 'Gujarat'
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

  let state = null;
  for (const [key, value] of Object.entries(stateKeywords)) {
    const regex = new RegExp(`\\b${key}\\b`, 'i');
    if (regex.test(lower)) { state = value; break; }
  }
  if (!state) {
    for (const [key, value] of Object.entries(cityKeywords)) {
      const regex = new RegExp(`\\b${key}\\b`, 'i');
      if (regex.test(lower)) { state = value; break; }
    }
  }

  let examType = null;
  if (/\bjee\s*advanced\b/.test(lower) || /\bjee\s*advance\b/.test(lower) || /\bjee[-\s]?adv\b/.test(lower) || /\bjeeadv(?:ance|anced)?\b/.test(lower)) {
    examType = 'JEE Advanced';
  } else if (/\bjee\s*mains?\b/.test(lower) || /\bjee[-\s]?main\b/.test(lower)) {
    examType = 'JEE Main';
  }
  const isCollegeQuery = rank !== null || branch || institute || lower.includes('college');
  return { rank, category, branch, institute, state, examType, isCollegeQuery };
}
