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
  query = query.gte('closing_rank', userRankInt);
  query = query.order('closing_rank', { ascending: true }).limit(100);

  const { data, error } = await query;
  if (error) {
    throw error;
  }

  const filtered = (data || []).filter(item => !/architecture/i.test(item.branch_name));
  return filtered;
}
