// src/pages/RankPredictorPage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { supabase } from '../lib/supabase';

export default function RankPredictorPage() {
  const [rank, setRank] = useState('');
  const [examType, setExamType] = useState('JEE Main');
  const [category, setCategory] = useState('OPEN');
  const [quota, setQuota] = useState('AI');
  const [gender, setGender] = useState('Gender-Neutral');
  const [isPreparatoryRank, setIsPreparatoryRank] = useState(false);
  
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const preparatoryGuideLink = "/pages/iit-preparatory-courses-guide"; // Links to English version by slug

  const seatTypeOptions = ["OPEN", "OPEN (PwD)", "EWS", "EWS (PwD)", "OBC-NCL", "OBC-NCL (PwD)", "SC", "SC (PwD)", "ST", "ST (PwD)"];
  const quotaOptions = { 'JEE Main': ["AI", "HS", "OS", "GO"], 'JEE Advanced': ["AI"] };
  const genderOptions = ["Gender-Neutral", "Female-only (including Supernumerary)"];

  useEffect(() => {
    if (examType === 'JEE Advanced') setQuota('AI');
    else if (!quotaOptions['JEE Main'].includes(quota)) setQuota('AI'); 
  }, [examType, quota]); // Added quota to dependency array

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rank.trim()) { setError('Please enter your rank.'); setResults([]); setSearched(true); return; }
    setIsLoading(true); setResults([]); setError(null); setSearched(true);
    try {
      const userRankInt = parseInt(rank);
      if (isNaN(userRankInt) || userRankInt <= 0) throw new Error("Invalid rank entered.");
      
      let query = supabase.from('college_cutoffs')
        .select('institute_name, branch_name, quota, seat_type, gender, opening_rank, closing_rank, year, round_no, is_preparatory, id, exam_type')
        .eq('year', 2024) // Assuming fixed year and round for this example
        .eq('round_no', 6)
        .eq('exam_type', examType)
        .eq('seat_type', category);

      if (examType === 'JEE Main' && quota) query = query.eq('quota', quota);
      else if (examType === 'JEE Advanced') query = query.eq('quota', 'AI');
      if (gender) query = query.eq('gender', gender);
      query = query.eq('is_preparatory', isPreparatoryRank);
      query = query.gte('closing_rank', userRankInt);
      query = query.order('closing_rank', { ascending: true }).limit(100);
      
      const { data: fetchedData, error: supabaseError } = await query;
      if (supabaseError) throw supabaseError;
      setResults(fetchedData || []);
    } catch (err) {
      console.error("Error fetching JoSAA predictions:", err);
      setError(`Failed to fetch predictions: ${err.message || 'Unknown error'}`);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-start mb-4">
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">Guruvela - JoSAA College Predictor</h1>
      <p className="text-center text-gray-600 mb-6">Find potential colleges based on JoSAA cutoffs.</p>
      <form onSubmit={handleSubmit} className="card mb-8 p-6 space-y-4 bg-white rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div>
            <label htmlFor="rank" className="block text-sm font-medium text-gray-700 mb-1">Your Rank:</label>
            <input type="number" id="rank" value={rank} onChange={(e) => setRank(e.target.value)} placeholder={examType === 'JEE Advanced' ? "Enter Category Rank" : "Enter CRL"} required className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2"/>
          </div>
          <div>
            <label htmlFor="examType" className="block text-sm font-medium text-gray-700 mb-1">Exam Type:</label>
            <select id="examType" value={examType} onChange={(e) => setExamType(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2">
              <option value="JEE Main">JEE Main</option>
              <option value="JEE Advanced">JEE Advanced</option>
            </select>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category (Seat Type):</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2">
              {seatTypeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="quota" className="block text-sm font-medium text-gray-700 mb-1">Quota:</label>
            <select id="quota" value={quota} onChange={(e) => setQuota(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2" disabled={examType === 'JEE Advanced'}>
              {(quotaOptions[examType] || quotaOptions['JEE Main']).map(opt => (<option key={opt} value={opt}>{opt}</option>))}
            </select>
            {examType === 'JEE Advanced' && <p className="text-xs text-gray-500 mt-1">Quota is AI for IITs.</p>}
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender:</label>
            <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2">
              {genderOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div className="flex items-center pt-5 md:pt-7">
            <input type="checkbox" id="isPreparatoryRank" checked={isPreparatoryRank} onChange={(e) => setIsPreparatoryRank(e.target.checked)} className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary mr-2"/>
            <label htmlFor="isPreparatoryRank" className="text-sm font-medium text-gray-700">Is this a Preparatory Rank?</label>
            <Link to={preparatoryGuideLink} target="_blank" rel="noopener noreferrer" className="ml-2 text-xs text-accent hover:underline" title="Learn more about IIT Preparatory Ranks">
              (What's this?)
            </Link>
          </div>
        </div>
        <div className="text-center pt-4">
          <button type="submit" className="btn-primary px-8 py-3 text-lg disabled:opacity-60" disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Find Colleges (JoSAA)'}
          </button>
        </div>
      </form>
      {/* Result display logic from your original file */}
      {isLoading && <div className="text-center py-4">Loading...</div>}
      {error && <p className="text-center text-red-500 py-4">Error: {error}</p>}
      {searched && !isLoading && results.length === 0 && !error && (
        <p className="text-center text-gray-600 py-4">No colleges found matching your criteria.</p>
      )}
      {!isLoading && results.length > 0 && (
        <div className="overflow-x-auto shadow-xl rounded-lg mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 p-4 bg-gray-100 rounded-t-lg">
            Potential Colleges (JoSAA Data): {/* Simplified title */}
          </h2>
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Institute Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Branch Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Quota</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Gender</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Closing Rank</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.institute_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.branch_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.quota}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.seat_type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.closing_rank}
                    {item.is_preparatory && (
                      <Link to={preparatoryGuideLink} className="ml-2 text-xs text-accent hover:underline font-semibold" target="_blank" rel="noopener noreferrer" title="This is a preparatory course rank.">
                        (Prep.)
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}