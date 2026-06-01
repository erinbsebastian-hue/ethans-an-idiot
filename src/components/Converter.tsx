import { useState, useRef, useEffect } from 'react';
import { rawToScaled, calcComposite, getConversion, getCollegeCategory, RAW_MAX } from '../data/conversionData';
import type { HistoryEntry } from '../hooks/useHistory';

interface ConverterProps {
  onResult: (entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => void;
}

const SECTIONS = [
  { key: 'english', label: 'English', max: RAW_MAX.english, time: '35 min' },
  { key: 'math',    label: 'Math',    max: RAW_MAX.math,    time: '50 min' },
  { key: 'reading', label: 'Reading', max: RAW_MAX.reading, time: '40 min' },
  { key: 'science', label: 'Science', max: RAW_MAX.science, time: '40 min', optional: true },
] as const;

type RawInputs = { english: string; math: string; reading: string; science: string };

export default function Converter({ onResult }: ConverterProps) {
  const [raw, setRaw] = useState<RawInputs>({ english: '', math: '', reading: '', science: '' });
  const [converted, setConverted] = useState(false);
  const [composite, setComposite] = useState(0);
  const [displaySat, setDisplaySat] = useState(0);
  const resultsRef = useRef<HTMLDivElement>(null);

  const getError = (key: keyof RawInputs) => {
    const val = raw[key];
    if (!val) return key === 'science' ? '' : 'Required';
    const n = parseInt(val, 10);
    const max = RAW_MAX[key];
    if (isNaN(n) || n < 0 || n > max) return `0–${max}`;
    return '';
  };

  const errors = { english: getError('english'), math: getError('math'), reading: getError('reading'), science: getError('science') };
  const canConvert = !errors.english && !errors.math && !errors.reading && !errors.science && raw.english && raw.math && raw.reading;

  const scaled = {
    english: raw.english ? rawToScaled('english', parseInt(raw.english)) : 0,
    math:    raw.math    ? rawToScaled('math',    parseInt(raw.math))    : 0,
    reading: raw.reading ? rawToScaled('reading', parseInt(raw.reading)) : 0,
    science: raw.science ? rawToScaled('science', parseInt(raw.science)) : undefined,
  };

  const conversion = getConversion(composite);
  const category = getCollegeCategory(composite);

  useEffect(() => {
    if (!converted || !conversion) return;
    const target = conversion.satMid;
    const start = displaySat;
    const diff = target - start;
    const steps = 20;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplaySat(Math.round(start + (diff * i) / steps));
      if (i >= steps) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [composite]);

  const handleConvert = () => {
    if (!canConvert) return;
    const result = calcComposite(scaled as { english: number; math: number; reading: number; science?: number });
    setComposite(result);
    setConverted(true);
    const conv = getConversion(result);
    if (conv) onResult({ act: result, sat: conv.satMid, percentile: conv.percentile });
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
  };

  return (
    <section id="converter" className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">ACT Practice Test Score Converter</h2>
          <p className="text-gray-500 dark:text-gray-400">Enter your raw scores (# correct) to get your scaled ACT score.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 border border-gray-100 dark:border-gray-700">
            <div className="space-y-5">
              {SECTIONS.map(({ key, label, max, time, optional }) => (
                <div key={key}>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {label}
                      {optional && <span className="ml-1 text-xs font-normal text-gray-400">(optional)</span>}
                    </label>
                    <span className="text-xs text-gray-400 dark:text-gray-500">{max} questions · {time}</span>
                  </div>
                  <input
                    type="number" min={0} max={max}
                    placeholder={`0–${max}`}
                    value={raw[key]}
                    onChange={e => { setRaw(prev => ({ ...prev, [key]: e.target.value })); setConverted(false); }}
                    className={`w-full rounded-xl border-2 px-4 py-3 text-lg font-bold bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors[key] ? 'border-red-400' : 'border-gray-200 dark:border-gray-600'
                    }`}
                  />
                  {errors[key] && raw[key] && (
                    <p className="text-red-500 text-xs mt-1">Must be {errors[key]}</p>
                  )}
                  {raw[key] && !errors[key] && (
                    <p className="text-blue-500 dark:text-blue-400 text-xs mt-1">
                      Scaled: <span className="font-bold">{rawToScaled(key, parseInt(raw[key]))}</span>
                    </p>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={handleConvert}
              disabled={!canConvert}
              className="mt-8 w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white font-bold rounded-xl transition-all active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg shadow-md">
              Convert Score
            </button>
          </div>

          {/* Results Card */}
          <div ref={resultsRef} className={`bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 border border-gray-100 dark:border-gray-700 transition-all ${converted ? 'ring-2 ring-blue-400' : ''}`}>
            {!converted ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 dark:text-gray-500 gap-4">
                <svg className="w-16 h-16 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                  <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round"/>
                </svg>
                <p className="text-lg font-medium">Enter your raw scores and click <br/><span className="text-blue-500">Convert Score</span></p>
              </div>
            ) : conversion ? (
              <div className="animate-count space-y-5">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Your Results</h3>

                {/* Section scaled scores */}
                <div className="grid grid-cols-2 gap-3 pb-4 border-b border-gray-100 dark:border-gray-700">
                  {SECTIONS.map(({ key, label }) => (
                    scaled[key] !== undefined && (
                      <div key={key} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 text-center">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</div>
                        <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">{scaled[key]}</div>
                      </div>
                    )
                  ))}
                </div>

                <ResultRow label="ACT Composite" value={String(composite)} sub="out of 36" color="text-blue-600 dark:text-blue-400" />
                <ResultRow label="SAT Equivalent" value={String(displaySat)} sub={`Range: ${conversion.satMin}–${conversion.satMax}`} color="text-indigo-600 dark:text-indigo-400" />

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">National Percentile</span>
                    <span className="font-bold text-green-600 dark:text-green-400">{conversion.percentile}th</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-700"
                      style={{ width: `${conversion.percentile}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    You scored higher than {conversion.percentile}% of test takers
                  </p>
                </div>

                <div className={`rounded-xl p-4 ${category.bgColor}`}>
                  <div className={`font-bold text-lg ${category.color}`}>{category.label}</div>
                  <p className={`text-sm mt-1 ${category.color} opacity-80`}>{category.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {category.examples.map(ex => (
                      <span key={ex} className={`text-xs px-2 py-0.5 rounded-full bg-white/50 dark:bg-black/20 ${category.color}`}>{ex}</span>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultRow({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
      <div>
        <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{label}</div>
        <div className="text-xs text-gray-400 dark:text-gray-500">{sub}</div>
      </div>
      <div className={`text-3xl font-extrabold ${color}`}>{value}</div>
    </div>
  );
}
