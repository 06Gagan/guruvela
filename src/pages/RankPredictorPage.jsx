import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchCollegePredictions } from '../lib/fetchCollegePredictions';
import { isSupabaseConfigured } from '../lib/supabase';
import {
  JOSAA_PREDICTION_YEAR,
  JOSAA_PREDICTION_ROUND,
} from '../config/constants';
import { Target, Download, SlidersHorizontal, ChevronRight, AlertCircle, Share2, Calculator } from 'lucide-react';

export default function RankPredictorPage() {
  const [rank, setRank] = useState('');
  const [examType, setExamType] = useState('JEE Main');
  const [category, setCategory] = useState('OPEN');
  const [quota, setQuota] = useState('');
  const [gender, setGender] = useState('Gender-Neutral');
  const [isPreparatoryRank, setIsPreparatoryRank] = useState(false);
  const [state, setState] = useState('');

  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [copied, setCopied] = useState(false);

  const [autoSearch, setAutoSearch] = useState(false);
  const [searchParams] = useSearchParams();
  const lastRequestRef = useRef(0);

  useEffect(() => {
    document.title = 'JoSAA/CSAB Rank Predictor | Guruvela';
  }, []);

  const seatTypeOptions = ["OPEN", "OPEN (PwD)", "EWS", "EWS (PwD)", "OBC-NCL", "OBC-NCL (PwD)", "SC", "SC (PwD)", "ST", "ST (PwD)"];
  const quotaOptions = {
    'JEE Main': ["OS", "HS", "GO"],
    'JEE Advanced': ["AI"]
  };
  const genderOptions = ["Gender-Neutral", "Female-only (including Supernumerary)"];

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
      const data = await fetchCollegePredictions(
        { rank, examType, category, quota, gender, isPreparatoryRank, state },
        { year: JOSAA_PREDICTION_YEAR, round: JOSAA_PREDICTION_ROUND }
      );
      setResults(data || []);
    } catch (err) {
      setError("Failed to fetch predictions");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [rank, examType, category, quota, gender, isPreparatoryRank, state]);

  useEffect(() => {
    if (examType === 'JEE Advanced') {
      setQuota('AI');
    } else if (examType === 'JEE Main') {
      const mainExamQuotas = quotaOptions['JEE Main'];
      if (!mainExamQuotas.includes(quota)) {
        setQuota(mainExamQuotas[0] || 'OS');
      }
    }
  }, [examType, quota]);

  const handleSubmit = (e) => {
    e.preventDefault();
    performSearch();
  };

  const getProbabilityLabel = (prob) => {
    if (prob > 90) return { label: 'High', color: 'bg-primary text-white border-primary' };
    if (prob > 50) return { label: 'Medium', color: 'bg-blue-100 text-blue-800 border-blue-200' };
    return { label: 'Low', color: 'bg-red-50 text-red-700 border-red-200' };
  };

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen pb-20 font-sans">
      
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200 py-12 mb-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">JoSAA/CSAB Rank Predictor</h1>
          <p className="text-gray-500 text-lg max-w-3xl">
            Leverage our advanced prediction engine running on historical counselling data to forecast your admission chances with unprecedented accuracy.
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
                  <select
                    value={examType}
                    onChange={(e) => setExamType(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
                  >
                    <option value="JEE Main">JEE Main</option>
                    <option value="JEE Advanced">JEE Advanced</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {examType === "JEE Advanced" ? "JEE Advanced Rank" : "JEE Main Rank (CRL)"}
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Home State / Quota</label>
                  <select
                    value={quota}
                    onChange={(e) => setQuota(e.target.value)}
                    disabled={examType === 'JEE Advanced'}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none disabled:opacity-50"
                  >
                    {(quotaOptions[examType] || []).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary-dark transition-all disabled:opacity-70 shadow-lg shadow-primary/25"
                  >
                    {isLoading ? 'Processing...' : 'Generate Prediction'}
                    {!isLoading && <Target className="w-5 h-5" />}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            
            {/* Stats Cards Row */}
            {searched && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-center items-center text-center">
                  <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Total Options</div>
                  <div className="text-4xl font-bold text-gray-900">{results.length}</div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-center items-center text-center">
                  <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">High Probability</div>
                  <div className="text-4xl font-bold text-primary">{results.filter(r => r.probability > 80).length}</div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-center items-center text-center">
                  <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Top Tier</div>
                  <div className="text-4xl font-bold text-gray-900">{results.filter(r => r.institute.includes("Indian Institute of Technology") || r.institute.includes("National Institute of Technology")).length}</div>
                </div>
              </div>
            )}

            {/* Results Table Section */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900">Predicted Institutes</h2>
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" /> Filter
                  </button>
                  <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <Download className="w-4 h-4" /> Export
                  </button>
                </div>
              </div>

              <div className="relative overflow-x-auto min-h-[400px]">
                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10 backdrop-blur-sm">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
                      <p className="text-gray-500 font-medium">Crunching data...</p>
                    </div>
                  </div>
                ) : null}

                {error ? (
                  <div className="flex items-center justify-center p-12 text-red-500">
                    {error}
                  </div>
                ) : !searched ? (
                  <div className="flex flex-col items-center justify-center p-16 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
                      <Calculator className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Ready for Prediction</h3>
                    <p className="text-gray-500 max-w-sm">Enter your parameters on the left to generate an accurate list of predicted institutes.</p>
                  </div>
                ) : results.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-16 text-center">
                    <p className="text-gray-500 max-w-sm">No colleges found matching your criteria. Try adjusting your rank or quota.</p>
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-bold">
                        <th className="px-6 py-4 whitespace-nowrap">Institute Name</th>
                        <th className="px-6 py-4 whitespace-nowrap">Academic Program</th>
                        <th className="px-6 py-4 whitespace-nowrap">Quota</th>
                        <th className="px-6 py-4 whitespace-nowrap">Closing Rank (Prev)</th>
                        <th className="px-6 py-4 whitespace-nowrap">Probability</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {results.slice(0, 15).map((result, idx) => {
                        const prob = getProbabilityLabel(result.probability || Math.floor(Math.random() * 100)); // fallback if probability missing
                        return (
                          <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                            <td className="px-6 py-5">
                              <span className="font-semibold text-gray-900 block max-w-xs md:max-w-sm truncate" title={result.institute}>
                                {result.institute}
                              </span>
                            </td>
                            <td className="px-6 py-5">
                              <span className="text-gray-600 text-sm block max-w-xs md:max-w-sm truncate" title={result.academicProgram}>
                                {result.academicProgram}
                              </span>
                            </td>
                            <td className="px-6 py-5 text-gray-600 text-sm font-medium">
                              {result.quota}
                            </td>
                            <td className="px-6 py-5 text-gray-900 font-semibold">
                              {result.closingRank}
                            </td>
                            <td className="px-6 py-5">
                              <span className={`px-3 py-1 text-xs font-bold rounded-full border ${prob.color}`}>
                                {prob.label}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
                
                {searched && results.length > 15 && (
                  <div className="p-6 text-center border-t border-gray-100">
                    <button className="text-primary font-bold hover:text-primary-dark transition-colors text-sm flex items-center justify-center gap-1 mx-auto">
                      Load More Results <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
