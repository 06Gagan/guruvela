import { supabase } from './supabase';

const hasSupabaseCreds =
  Boolean(import.meta.env.VITE_SUPABASE_URL) &&
  Boolean(import.meta.env.VITE_SUPABASE_ANON_KEY);

export async function fetchCollegePredictions({
  rank,
  examType,
  category,
  quota,
  gender,
  isPreparatoryRank,
  state
}, { year = new Date().getFullYear(), round = 6 } = {}) {
  const userRankInt = parseInt(rank);
  if (isNaN(userRankInt) || userRankInt <= 0) {
    throw new Error('Invalid rank');
  }

  if (!hasSupabaseCreds) {
    throw new Error(
      'Supabase credentials are missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
    );
  }

  let query = supabase
    .from('college_cutoffs')
    .select('institute_name, branch_name, quota, seat_type, gender, opening_rank, closing_rank, year, round_no, is_preparatory, id, exam_type')
    .eq('year', year)
    .eq('round_no', round)
    .eq('exam_type', examType)
    .eq('seat_type', category);

  if (state && quota === 'HS') {
    query = query.eq('state', state).eq('quota', 'HS');
  } else if (state && quota === 'OS') {
    query = query.neq('state', state).eq('quota', 'OS');
  } else if (quota) {
    query = query.eq('quota', quota);
  }

  if (gender) {
    query = query.eq('gender', gender);
  }

  query = query.eq('is_preparatory', isPreparatoryRank);

  // To allow for "reach" colleges (Low/Medium probability), we include colleges
  // where the closing rank is up to 500 ranks better than the user's rank.
  const minClosingRank = Math.max(1, userRankInt - 500);
  query = query.gte('closing_rank', minClosingRank);

  // Order by closing rank to get colleges starting from the most ambitious
  query = query.order('closing_rank', { ascending: true }).limit(100);

  const { data, error } = await query;
  if (error) {
    throw error;
  }

  const filtered = (data || []).filter(item => !/architecture/i.test(item.branch_name)).map(item => {
    const diff = item.closing_rank - userRankInt;
    let probability;

    // High probability: User rank is better by 200 or more
    if (diff >= 200) {
      probability = 95;
    }
    // Medium probability: User rank is close (between -50 and 200)
    else if (diff >= -50 && diff < 200) {
      probability = 75;
    }
    // Low probability: User rank is worse by more than 50
    else {
      probability = 30;
    }

    return {
      ...item,
      probability
    };
  });

  return filtered;
}
