// src/pages/CsabRankPredictorPage.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  CSAB_PREDICTION_YEAR,
  CSAB_PREDICTION_ROUND,
} from '../config/constants';
import { Target, Download, SlidersHorizontal, ChevronRight, AlertCircle, Share2, Calculator } from 'lucide-react';

export default function CsabRankPredictorPage() {
  const [rank, setRank] = useState('');
  const [category, setCategory] = useState('OPEN');
  const [quota, setQuota] = useState('OS');
  const [gender, setGender] = useState('Gender-Neutral');
  
  const [results, setResults] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [visibleCount, setVisibleCount] = useState(15);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const lastRequestRef = useRef(0);

  useEffect(() => {
    document.title = 'CSAB Rank Predictor | Guruvela';
  }, []);

  const seatTypeOptions = [
    "OPEN", "OPEN (PwD)", 
    "EWS", "EWS (PwD)",
    "OBC-NCL", "OBC-NCL (PwD)",
    "SC", "SC (PwD)",
    "ST", "ST (PwD)"
  ];

  const quotaOptions = [ "OS", "HS", "GO" ]; 
  
  const genderOptions = [
    "Gender-Neutral",
    "Female-only (including Supernumerary)"
  ];

  const performSearch = useCallback(async () => {
    const now = Date.now();
    if (now - lastRequestRef.current < 1000) return;
    lastRequestRef.current = now;

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
      setVisibleCount(15);
      setResults(fetchedData || []);

    } catch (err) {
      console.error("Error fetching CSAB predictions:", err);
      setError(`Failed to fetch CSAB predictions: ${err.message || 'Unknown error'}`);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [rank, category, quota, gender]);

  const handleSubmit = (e) => {
    e.preventDefault();
    performSearch();
  };

  const getProbabilityLabel = (closingRank, userRank) => {
    const diff = closingRank - userRank;
    if (diff > 5000) return { label: 'High', color: 'bg-primary text-white border-primary' };
    if (diff > 0) return { label: 'Medium', color: 'bg-blue-100 text-blue-800 border-blue-200' };
    return { label: 'Low', color: 'bg-red-50 text-red-700 border-red-200' };
  };

  const handleExport = () => {
    let csvContent = "data:text/csv;charset=utf-8,\n";
    csvContent += "Institute Name,Branch Name,Quota,Expected Closing Rank\n";
    results.forEach(row => {
      let institute = '"' + (row.institute_name || '').replace(/"/g, '""') + '"';
      let branch = '"' + (row.branch_name || '').replace(/"/g, '""') + '"';
      csvContent += `${institute},${branch},${row.quota},${row.closing_rank}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "guruvela_csab_predictions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredResults = results.filter(r => 
    (r.institute_name || '').toLowerCase().includes(filterText.toLowerCase()) || 
    (r.branch_name || '').toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen pb-20 font-sans">
      
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200 py-12 mb-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">CSAB Rank Predictor</h1>
          <p className="text-gray-500 text-lg max-w-3xl">
            Leverage our advanced prediction engine running on historical counselling data to forecast your admission chances in CSAB Special Round {CSAB_PREDICTION_ROUND} ({CSAB_PREDICTION_YEAR}).
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl">
        {!isSupabaseConfigured && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>Backend services unavailable mapping. Please try again later or check your configuration.</p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Column: Form */}
          <div className="w-full lg:w-1/3 flex-shrink-0">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 sticky top-24">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-primary flex items-center justify-center">
                  <Calculator className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Prediction Parameters</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Exam Type</label>
                  <input
                    type="text"
                    value="JEE Main"
                    disabled
                    className="w-full bg-gray-100 border border-gray-200 text-gray-500 rounded-xl px-4 py-3 cursor-not-allowed outline-none"
                  />
                  <p className="text-xs text-gray-400 mt-1">CSAB operates only on JEE Main ranking.</p>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    JEE Main Rank (CRL)
                  </label>
                  <input
                    type="number"
                    value={rank}
                    onChange={(e) => setRank(e.target.value)}
                    placeholder="e.g., 15000"
                    required
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category (Seat Type)</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
                  >
                    {seatTypeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
                  >
                    {genderOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Quota</label>
                  <select
                    value={quota}
                    onChange={(e) => setQuota(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
                  >
                    {quotaOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary-dark transition-all disabled:opacity-70 shadow-lg shadow-primary/25"
                  >
                    {isLoading ? 'Processing...' : 'Find Colleges (CSAB)'}
                    {!isLoading && <Target className="w-5 h-5" />}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-3xl flex items-center gap-4">
                <AlertCircle className="w-6 h-6 flex-shrink-0" />
                <p className="font-medium">{error}</p>
              </div>
            )}

            {!searched && !isLoading && (
              <div className="bg-white border text-center border-gray-200 p-12 rounded-3xl flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-primary">
                  <SlidersHorizontal className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to predict your future?</h3>
                <p className="text-gray-500 max-w-md">
                  Enter your rank and filters on the left to see which institutes and branches you are likely to get in the CSAB Special Round.
                </p>
              </div>
            )}

            {isLoading && (
              <div className="bg-white border text-center border-gray-200 p-12 rounded-3xl flex flex-col items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                <h3 className="text-lg font-medium text-gray-700">Crunching historical CSAB data...</h3>
              </div>
            )}

            {searched && !isLoading && results.length === 0 && !error && (
              <div className="bg-white border text-center border-gray-200 p-12 rounded-3xl flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mb-6 text-yellow-600">
                  <AlertCircle className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Match Found</h3>
                <p className="text-gray-500 max-w-md">
                  We couldn't find any institutes that strictly matched your criteria with current closing ranks data. Your rank might be higher than the cutoffs for these filters.
                </p>
              </div>
            )}

            {searched && !isLoading && results.length > 0 && (
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Predicted Institutes (CSAB)</h3>
                    <p className="text-gray-500 mt-1">Found {results.length} prospective branches based on CSAB {CSAB_PREDICTION_YEAR}</p>
                  </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <input 
                        type="text" 
                        placeholder="Filter institutes or branches..." 
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-full sm:w-64"
                      />
                      <button onClick={handleExport} className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2 whitespace-nowrap">
                        <Download className="w-4 h-4" /> Export
                      </button>
                    </div>
                      <tr className="bg-white border-b border-gray-100 uppercase text-xs tracking-wider text-gray-500 font-semibold">
                        <th className="p-6 font-medium">Institute & Branch</th>
                        <th className="p-6 font-medium">Quota / Type</th>
                        <th className="p-6 font-medium">Closing Rank</th>
                        <th className="p-6 font-medium text-right">Probability</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredResults.slice(0, visibleCount).map((item, index) => {
                        const prob = getProbabilityLabel(item.closing_rank, parseInt(rank));
                        return (
                          <tr key={item.id || index} className="hover:bg-gray-50 transition-colors group">
                            <td className="p-6">
                              <div className="font-bold text-gray-900 mb-1">{item.institute_name}</div>
                              <div className="text-sm text-gray-500 flex items-center gap-2">
                                <span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">{item.branch_name}</span>
                              </div>
                            </td>
                            <td className="p-6">
                              <div className="flex flex-col gap-1">
                                <span className="text-sm text-gray-900 font-medium">{item.quota} / {item.seat_type}</span>
                                <span className="text-xs text-gray-500">{item.gender}</span>
                              </div>
                            </td>
                            <td className="p-6">
                              <div className="text-lg font-bold text-gray-900">{item.closing_rank}</div>
                              <div className="text-xs text-gray-400">Opening: {item.opening_rank}</div>
                            </td>
                            <td className="p-6 text-right">
                               <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold border ${prob.color}`}>
                                {prob.label}
                               </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  </div>
                  {searched && filteredResults.length > visibleCount && (
                    <div className="p-6 text-center border-t border-gray-100">
                      <button onClick={() => setVisibleCount(c => c + 15)} className="text-primary font-bold hover:text-primary-dark transition-colors text-sm flex items-center justify-center gap-1 mx-auto">
                        Load More Results ({filteredResults.length - visibleCount} left) <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
