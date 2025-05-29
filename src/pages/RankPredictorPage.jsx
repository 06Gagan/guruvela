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

  const preparatoryGuideLink = "/pages/iit-preparatory-courses-guide";

  const seatTypeOptions = ["OPEN", "OPEN (PwD)", "EWS", "EWS (PwD)", "OBC-NCL", "OBC-NCL (PwD)", "SC", "SC (PwD)", "ST", "ST (PwD)"];
  const quotaOptions = { 'JEE Main': ["AI", "HS", "OS", "GO"], 'JEE Advanced': ["AI"] };
  const genderOptions = ["Gender-Neutral", "Female-only (including Supernumerary)"];

  useEffect(() => {
    if (examType === 'JEE Advanced') setQuota('AI');
    else if (!quotaOptions['JEE Main'].includes(quota)) setQuota('AI'); 
  }, [examType, quota]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rank.trim()) { setError('Please enter your rank.'); setResults([]); setSearched(true); return; }
    setIsLoading(true); setResults([]); setError(null); setSearched(true);
    try {
      const userRankInt = parseInt(rank);
      if (isNaN(userRankInt) || userRankInt <= 0) throw new Error("Invalid rank entered.");
      
      let query = supabase.from('college_cutoffs')
        .select('institute_name, branch_name, quota, seat_type, gender, opening_rank, closing_rank, year, round_no, is_preparatory, id, exam_type')
        .eq('year', 2024)
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
        <Link 
          to="/" 
          className="btn-outline flex items-center gap-2 hover:bg-gray-50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">JoSAA College Predictor</h1>
        <p className="text-gray-600">Find potential colleges based on JoSAA cutoffs</p>
      </div>

      <form onSubmit={handleSubmit} className="card mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Rank Input */}
          <div>
            <label htmlFor="rank" className="form-label">
              Your Rank
              <span className="text-gray-500 text-xs ml-1">
                ({examType === 'JEE Advanced' ? 'Category Rank' : 'CRL'})
              </span>
            </label>
            <input 
              type="number" 
              id="rank" 
              value={rank} 
              onChange={(e) => setRank(e.target.value)} 
              placeholder={examType === 'JEE Advanced' ? "Enter Category Rank" : "Enter CRL"} 
              required 
              className="form-input"
              aria-describedby="rank-description"
            />
            <p id="rank-description" className="text-xs text-gray-500 mt-1">
              Enter your {examType === 'JEE Advanced' ? 'Category Rank' : 'Common Rank List (CRL)'}
            </p>
          </div>

          {/* Exam Type */}
          <div>
            <label htmlFor="examType" className="form-label">Exam Type</label>
            <select 
              id="examType" 
              value={examType} 
              onChange={(e) => setExamType(e.target.value)} 
              className="form-input"
            >
              <option value="JEE Main">JEE Main</option>
              <option value="JEE Advanced">JEE Advanced</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="form-label">Category (Seat Type)</label>
            <select 
              id="category" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
              className="form-input"
            >
              {seatTypeOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Quota */}
          <div>
            <label htmlFor="quota" className="form-label">Quota</label>
            <select 
              id="quota" 
              value={quota} 
              onChange={(e) => setQuota(e.target.value)} 
              className="form-input"
              disabled={examType === 'JEE Advanced'}
              aria-describedby="quota-description"
            >
              {(quotaOptions[examType] || quotaOptions['JEE Main']).map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {examType === 'JEE Advanced' && (
              <p id="quota-description" className="text-xs text-gray-500 mt-1">
                Quota is AI for IITs
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="form-label">Gender</label>
            <select 
              id="gender" 
              value={gender} 
              onChange={(e) => setGender(e.target.value)} 
              className="form-input"
            >
              {genderOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Preparatory Rank */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="isPreparatoryRank" 
                checked={isPreparatoryRank} 
                onChange={(e) => setIsPreparatoryRank(e.target.checked)} 
                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label htmlFor="isPreparatoryRank" className="ml-2 text-sm font-medium text-gray-700">
                Preparatory Rank
              </label>
            </div>
            <Link 
              to={preparatoryGuideLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs text-accent hover:text-accent-dark hover:underline"
              title="Learn more about IIT Preparatory Ranks"
            >
              What's this?
            </Link>
          </div>
        </div>

        <div className="text-center pt-6">
          <button 
            type="submit" 
            className="btn-primary px-8 py-3 text-lg min-w-[200px] flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Searching...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Find Colleges</span>
              </>
            )}
          </button>
        </div>
      </form>
      
      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
          <p className="mt-2 text-gray-600">Searching for colleges...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-500 mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {/* No Results State */}
      {searched && !isLoading && results.length === 0 && !error && (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-500 mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-600">No colleges found matching your criteria</p>
          <p className="text-sm text-gray-500 mt-2">Try adjusting your filters or rank</p>
        </div>
      )}

      {/* Results Table */}
      {!isLoading && results.length > 0 && (
        <div className="card overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Potential Colleges
              <span className="text-sm font-normal text-gray-500 ml-2">
                (JoSAA Round 6, 2024)
              </span>
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Institute Name</th>
                  <th>Branch Name</th>
                  <th>Quota</th>
                  <th>Category</th>
                  <th>Gender</th>
                  <th>Closing Rank</th>
                </tr>
              </thead>
              <tbody>
                {results.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="font-medium text-gray-900">{item.institute_name}</td>
                    <td>{item.branch_name}</td>
                    <td>{item.quota}</td>
                    <td>{item.seat_type}</td>
                    <td>{item.gender}</td>
                    <td>
                      <div className="flex items-center">
                        <span>{item.closing_rank}</span>
                        {item.is_preparatory && (
                          <Link 
                            to={preparatoryGuideLink} 
                            className="ml-2 inline-flex items-center text-xs text-accent hover:text-accent-dark hover:underline"
                            target="_blank" 
                            rel="noopener noreferrer"
                            title="This is a preparatory course rank"
                          >
                            <span className="px-1.5 py-0.5 bg-accent/10 rounded-full">Prep</span>
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}