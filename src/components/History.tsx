import type { HistoryEntry } from '../hooks/useHistory';

interface HistoryProps {
  history: HistoryEntry[];
  onClear: () => void;
}

export default function History({ history, onClear }: HistoryProps) {
  if (history.length === 0) return null;

  return (
    <section className="py-10 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Conversion History</h2>
          <button onClick={onClear}
            className="text-sm text-red-500 hover:text-red-700 dark:hover:text-red-400 font-medium transition-colors">
            Clear All
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {history.map(entry => (
            <div key={entry.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 shadow-sm flex items-center gap-4 text-sm">
              <div className="text-center">
                <div className="text-xs text-gray-400 dark:text-gray-500">ACT</div>
                <div className="font-extrabold text-blue-600 dark:text-blue-400 text-lg">{entry.act}</div>
              </div>
              <svg className="w-4 h-4 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7" strokeLinecap="round"/>
              </svg>
              <div className="text-center">
                <div className="text-xs text-gray-400 dark:text-gray-500">SAT</div>
                <div className="font-extrabold text-indigo-600 dark:text-indigo-400 text-lg">{entry.sat}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400 dark:text-gray-500">Percentile</div>
                <div className="font-bold text-green-600 dark:text-green-400">{entry.percentile}th</div>
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-500 ml-2">
                {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
