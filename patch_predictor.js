const fs = require('fs');

function patch(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('const [filterText, setFilterText] = useState')) {
    content = content.replace('const [results, setResults] = useState([]);', "const [results, setResults] = useState([]);\n  const [filterText, setFilterText] = useState('');\n  const [visibleCount, setVisibleCount] = useState(15);");
  }

  // Handle resetting visible count
  if (content.includes('setSearched(true);\\n      setResults(')) {
      content = content.replace(/setSearched\\(true\\);\\s*setResults\\(([^)]+)\\);/, 'setSearched(true);\n      setVisibleCount(15);\n      setResults();');
  }

  if (!content.includes('const handleExport = () => {')) {
    content = content.replace('return (', 
  const handleExport = () => {
    let csvContent = "data:text/csv;charset=utf-8,\\n";
    csvContent += "Institute Name,Branch Name,Quota,Expected Closing Rank\\n";
    results.forEach(row => {
      let institute = '"' + (row.institute_name || '').replace(/"/g, '""') + '"';
      let branch = '"' + (row.branch_name || '').replace(/"/g, '""') + '"';
      csvContent += \\\\,\,\,\\\n\\\;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "guruvela_predictions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredResults = results.filter(r => 
    (r.institute_name || '').toLowerCase().includes(filterText.toLowerCase()) || 
    (r.branch_name || '').toLowerCase().includes(filterText.toLowerCase())
  );

  return ();
  }

  const functionalButtonsHtml = \
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
  </div>\;
  
  content = content.replace(/<div className="flex items-center gap-3">\\s*<button[^>]+>\\s*<SlidersHorizontal[^>]+>\\s*Filter\\s*<\\/button>\\s*<button[^>]+>\\s*<Download[^>]+>\\s*Export\\s*<\\/button>\\s*<\\/div>/g, functionalButtonsHtml);

  content = content.replace(/\\{results\\.slice\\(0, 15\\)\\.map/g, '{filteredResults.slice(0, visibleCount).map');
  content = content.replace(/results\\.length > 15/g, 'filteredResults.length > visibleCount');
  
  const newLoadMoreBtn = \<button onClick={() => setVisibleCount(c => c + 15)} className="text-primary font-bold hover:text-primary-dark transition-colors text-sm flex items-center justify-center gap-1 mx-auto">
      Load More Results ({filteredResults.length - visibleCount} left) <ChevronRight className="w-4 h-4" />
    </button>\;
                    
  content = content.replace(/<button className="text-primary font-bold hover:text-primary-dark transition-colors text-sm flex items-center justify-center gap-1 mx-auto">\\s*Load More Results.*?<\\/button>/g, newLoadMoreBtn);

  fs.writeFileSync(filePath, content);
  console.log('Updated ' + filePath);
}

patch('src/pages/RankPredictorPage.jsx');
patch('src/pages/CsabRankPredictorPage.jsx');
