import { CONVERSION_TABLE } from '../data/conversionData';

export default function Percentiles() {
  const highlights = CONVERSION_TABLE.filter(e => e.act % 3 === 0 || e.act === 36 || e.act === 1);

  return (
    <section id="percentiles" className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">National Percentile Rankings</h2>
          <p className="text-gray-500 dark:text-gray-400">See how each ACT score compares to all test takers nationwide.</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-6 space-y-3">
          {highlights.map(entry => {
            const pct = entry.percentile;
            const barColor =
              entry.act >= 33 ? 'bg-purple-500' :
              entry.act >= 29 ? 'bg-blue-500' :
              entry.act >= 24 ? 'bg-green-500' :
              entry.act >= 18 ? 'bg-yellow-500' : 'bg-red-400';

            return (
              <div key={entry.act} className="flex items-center gap-4">
                <div className="w-10 text-right font-bold text-gray-700 dark:text-gray-300 text-sm shrink-0">
                  {entry.act}
                </div>
                <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-5 overflow-hidden">
                  <div
                    className={`h-5 rounded-full ${barColor} transition-all duration-500 flex items-center justify-end pr-2`}
                    style={{ width: `${Math.max(pct, 3)}%` }}
                  >
                    {pct >= 10 && (
                      <span className="text-white text-xs font-bold">{pct}%</span>
                    )}
                  </div>
                </div>
                {pct < 10 && (
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400 w-8">{pct}%</span>
                )}
                <div className="w-24 text-xs text-gray-500 dark:text-gray-400 shrink-0">
                  SAT ~{entry.satMid}
                </div>
              </div>
            );
          })}

          {/* Legend */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
            {[
              { color: 'bg-purple-500', label: 'Elite (33–36)' },
              { color: 'bg-blue-500', label: 'Highly Competitive (29–32)' },
              { color: 'bg-green-500', label: 'Competitive (24–28)' },
              { color: 'bg-yellow-500', label: 'Average (18–23)' },
              { color: 'bg-red-400', label: 'Below Average (1–17)' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                <div className={`w-3 h-3 rounded-full ${l.color}`} />
                {l.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
