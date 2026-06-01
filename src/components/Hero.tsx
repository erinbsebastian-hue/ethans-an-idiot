interface HeroProps {
  onStart: () => void;
}

export default function Hero({ onStart }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-blue-800 dark:via-blue-900 dark:to-indigo-950 text-white py-24 px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <span className="inline-block mb-4 px-4 py-1.5 bg-white/15 rounded-full text-sm font-medium tracking-wide">
          Free • Instant • Accurate
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
          Convert Your ACT Score{' '}
          <span className="text-blue-200">Instantly</span>
        </h1>
        <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-10">
          Get SAT equivalents, national percentile rankings, and college competitiveness insights — all in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onStart}
            className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl shadow-lg hover:bg-blue-50 active:scale-95 transition-all text-lg focus:outline-none focus:ring-4 focus:ring-white/50">
            Start Converting
          </button>
          <a href="#table"
            className="px-8 py-4 bg-white/15 hover:bg-white/25 font-semibold rounded-xl transition-all text-lg border border-white/30 focus:outline-none focus:ring-4 focus:ring-white/30">
            View Full Table
          </a>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {[
            { value: '36', label: 'Score Range' },
            { value: '99th', label: 'Max Percentile' },
            { value: '1600', label: 'SAT Max' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-extrabold text-white">{s.value}</div>
              <div className="text-sm text-blue-200 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
