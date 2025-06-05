// src/pages/CsabRankPredictorPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { supabase } from '../lib/supabase';
import {
  CSAB_PREDICTION_YEAR,
  CSAB_PREDICTION_ROUND,
} from '../config/constants';

export default function CsabRankPredictorPage() {
  const [rank, setRank] = useState('');
  const [category, setCategory] = useState('OPEN');
  const [quota, setQuota] = useState('AI');
  const [gender, setGender] = useState('Gender-Neutral');
  
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const seatTypeOptions = [
    "OPEN", "OPEN (PwD)", 
    "EWS", "EWS (PwD)",
    "OBC-NCL", "OBC-NCL (PwD)",
    "SC", "SC (PwD)",
    "ST", "ST (PwD)"
  ];

  const quotaOptions = [ "OS", "HS", "GO"]; 
  
  const genderOptions = [
    "Gender-Neutral",
    "Female-only (including Supernumerary)"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rank.trim()) {
      setError('Please enter your rank.');
      setResults([]);
      setSearched(true);
      return;
    }

    setIsLoading(true);
    setResults([]);
    setError(null);
    setSearched(true);

    try {
      const userRankInt = parseInt(rank);
      if (isNaN(userRankInt) || userRankInt <= 0) {
        throw new Error("Invalid rank entered. Please enter a positive number.");
      }

      let query = supabase
        .from('csab_college_cutoffs')
        .select('institute_name, branch_name, quota, seat_type, gender, opening_rank, closing_rank, year, round_no, id')
        .eq('year', CSAB_PREDICTION_YEAR)
        .eq('round_no', CSAB_PREDICTION_ROUND)
        .eq('seat_type', category);

      if (quota) {
        query = query.eq('quota', quota);
      }
      
      if (gender) {
        query = query.eq('gender', gender);
      }
      
      query = query.gte('closing_rank', userRankInt);
            
      query = query.order('closing_rank', { ascending: true }).limit(100); 

      const { data: fetchedData, error: supabaseError } = await query;

      if (supabaseError) {
        throw supabaseError;
      }
      setResults(fetchedData || []);

    } catch (err) {
      console.error("Error fetching CSAB predictions:", err);
      setError(`Failed to fetch CSAB predictions: ${err.message || 'Unknown error'}`);
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
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">
        Guruvela - CSAB College Predictor
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Find potential colleges based on CSAB Special Round {CSAB_PREDICTION_ROUND} ({CSAB_PREDICTION_YEAR}) cutoffs (JEE Main Ranks).
      </p>

      {/* Updated to use the .card class from index.css */}
      <form onSubmit={handleSubmit} className="card mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          <div>
            <label htmlFor="rank" className="block text-sm font-medium text-gray-700 mb-1">
              Your JEE Main CRL Rank:
            </label>
            <input
              type="number"
              id="rank"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              placeholder="Enter your Common Rank List (CRL)"
              required
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2"
            />
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Exam Type:
            </label>
            <input
              type="text"
              value="JEE Main"
              disabled
              className="w-full rounded-md border-gray-300 shadow-sm bg-gray-100 p-2"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category (Seat Type):
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2"
            >
              {seatTypeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="quota" className="block text-sm font-medium text-gray-700 mb-1">
              Quota:
            </label>
            <select
              id="quota"
              value={quota}
              onChange={(e) => setQuota(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2"
            >
              {quotaOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
              Gender:
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2"
            >
              {genderOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>
        <div className="text-center pt-4">
          <button 
            type="submit" 
            className="btn-primary px-8 py-3 text-lg disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Find Colleges (CSAB)'}
          </button>
        </div>
      </form>

      {isLoading && (
        <div className="flex justify-center items-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}
      {error && <p className="text-center text-red-600 mb-4 p-4 bg-red-100 rounded-md">Error: {error}</p>}
      
      {searched && !isLoading && results.length === 0 && !error && (
        <p className="text-center text-gray-700 my-8 p-4 bg-yellow-100 rounded-md">No colleges found matching your criteria for CSAB Special Round {CSAB_PREDICTION_ROUND} ({CSAB_PREDICTION_YEAR}) based on available data. Your rank might be higher than the cutoffs for these filters, or no data exists for this specific combination.</p>
      )}

      {!isLoading && results.length > 0 && (
        <div className="overflow-x-auto shadow-xl rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 p-4 bg-gray-100 rounded-t-lg">
            Potential Colleges (CSAB Special Round {results[0]?.round_no}, {results[0]?.year} Data):
          </h2>
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Institute Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Branch Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Quota</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Category (Seat Type)</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Gender</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Closing Rank</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((item, index) => (
                <tr key={item.id || index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.institute_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.branch_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.quota}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.seat_type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.closing_rank}
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