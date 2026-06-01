import { useState, useMemo } from 'react';
import { CONVERSION_TABLE, getCollegeCategory } from '../data/conversionData';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

type SortKey = 'act' | 'satMid' | 'percentile';

export default function ConversionTable() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('act');
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim();
    let rows = [...CONVERSION_TABLE];
    if (q) {
      rows = rows.filter(r =>
        String(r.act).includes(q) ||
        String(r.satMid).includes(q) ||
        String(r.percentile).includes(q)
      );
    }
    rows.sort((a, b) => {
      const diff = a[sortKey] - b[sortKey];
      return sortAsc ? diff : -diff;
    });
    return rows;
  }, [search, sortKey, sortAsc]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(a => !a);
    else { setSortKey(key); setSortAsc(false); }
  };

  const exportCSV = () => {
    const header = 'ACT Score,SAT Min,SAT Max,SAT Midpoint,Percentile\n';
    const rows = CONVERSION_TABLE.map(r =>
      `${r.act},${r.satMin},${r.satMax},${r.satMid},${r.percentile}`
    ).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'act-sat-conversion.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('ACT to SAT Conversion Table', 14, 16);
    doc.setFontSize(10);
    doc.text('Source: College Board Official Concordance', 14, 24);
    autoTable(doc, {
      startY: 30,
      head: [['ACT', 'SAT Min', 'SAT Max', 'SAT Mid', 'Percentile']],
      body: CONVERSION_TABLE.map(r => [r.act, r.satMin, r.satMax, r.satMid, `${r.percentile}th`]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [37, 99, 235] },
    });
    doc.save('act-sat-conversion.pdf');
  };

  const SortIcon = ({ k }: { k: SortKey }) => (
    <span className="ml-1 text-gray-400">
      {sortKey === k ? (sortAsc ? '↑' : '↓') : '↕'}
    </span>
  );

  return (
    <section id="table" className="py-16 px-4 bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Full Conversion Table</h2>
          <p className="text-gray-500 dark:text-gray-400">Complete ACT to SAT concordance. Search, sort, and export.</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="search" placeholder="Search by score or percentile…"
            value={search} onChange={e => setSearch(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeLinecap="round"/>
            </svg>
            Export CSV
          </button>
          <button onClick={exportPDF}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" strokeLinecap="round"/>
            </svg>
            Export PDF
          </button>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-md">
          <div className="overflow-x-auto custom-scroll max-h-[520px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-blue-600 text-white z-10">
                <tr>
                  {([
                    { key: 'act', label: 'ACT Score' },
                    { key: null, label: 'SAT Range' },
                    { key: 'satMid', label: 'SAT Midpoint' },
                    { key: 'percentile', label: 'Percentile' },
                    { key: null, label: 'Category' },
                  ] as { key: SortKey | null; label: string }[]).map(col => (
                    <th key={col.label}
                      onClick={() => col.key && handleSort(col.key)}
                      className={`px-4 py-3 text-left font-semibold ${col.key ? 'cursor-pointer hover:bg-blue-700 select-none' : ''}`}>
                      {col.label}{col.key && <SortIcon k={col.key} />}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => {
                  const cat = getCollegeCategory(row.act);
                  return (
                    <tr key={row.act}
                      className={`border-t border-gray-100 dark:border-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors ${
                        i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800/50'
                      }`}>
                      <td className="px-4 py-3 font-bold text-blue-600 dark:text-blue-400">{row.act}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{row.satMin}–{row.satMax}</td>
                      <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">{row.satMid}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{row.percentile}th</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cat.bgColor} ${cat.color}`}>
                          {cat.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr><td colSpan={5} className="text-center py-8 text-gray-400 dark:text-gray-500">No results found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 text-center">
          Showing {filtered.length} of {CONVERSION_TABLE.length} entries
        </p>
      </div>
    </section>
  );
}
