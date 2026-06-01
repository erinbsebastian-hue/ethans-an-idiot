import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, Legend,
} from 'recharts';
import { ACT_DISTRIBUTION, SAT_DISTRIBUTION, CONVERSION_TABLE } from '../data/conversionData';

interface ChartsProps { dark: boolean; }

const comparisonData = CONVERSION_TABLE.slice().reverse().filter(e => e.act >= 10).map(e => ({
  act: e.act,
  sat: e.satMid,
}));

export default function Charts({ dark }: ChartsProps) {
  const gridColor = dark ? '#374151' : '#e5e7eb';
  const textColor = dark ? '#9ca3af' : '#6b7280';
  const tooltipBg = dark ? '#1f2937' : '#ffffff';
  const tooltipBorder = dark ? '#374151' : '#e5e7eb';

  const tooltipStyle = {
    backgroundColor: tooltipBg,
    border: `1px solid ${tooltipBorder}`,
    borderRadius: '8px',
    color: dark ? '#f3f4f6' : '#111827',
  };

  return (
    <section id="charts" className="py-16 px-4 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Analytics Dashboard</h2>
          <p className="text-gray-500 dark:text-gray-400">Score distributions and ACT–SAT comparison visualizations.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* ACT Distribution */}
          <ChartCard title="ACT Score Distribution" subtitle="% of students at each score">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={ACT_DISTRIBUTION} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="score" tick={{ fill: textColor, fontSize: 11 }} interval={4} />
                <YAxis tick={{ fill: textColor, fontSize: 11 }} unit="%" />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, 'Students']} />
                <Bar dataKey="pct" fill="#3b82f6" radius={[3, 3, 0, 0]} name="Students" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* SAT Distribution */}
          <ChartCard title="SAT Score Distribution" subtitle="% of students per score band">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={SAT_DISTRIBUTION} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="score" tick={{ fill: textColor, fontSize: 10 }} interval={0} angle={-30} textAnchor="end" height={50} />
                <YAxis tick={{ fill: textColor, fontSize: 11 }} unit="%" />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, 'Students']} />
                <Bar dataKey="pct" fill="#6366f1" radius={[3, 3, 0, 0]} name="Students" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* ACT vs SAT Comparison Line Chart */}
        <ChartCard title="ACT vs SAT Score Comparison" subtitle="How ACT scores map to SAT equivalents">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={comparisonData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="act" label={{ value: 'ACT Score', position: 'insideBottom', offset: -2, fill: textColor, fontSize: 12 }} tick={{ fill: textColor, fontSize: 11 }} />
              <YAxis yAxisId="sat" domain={[400, 1600]} tick={{ fill: textColor, fontSize: 11 }}
                label={{ value: 'SAT Score', angle: -90, position: 'insideLeft', fill: textColor, fontSize: 12 }} />
              <Tooltip contentStyle={tooltipStyle}
                formatter={(v, name) => [v, name === 'sat' ? 'SAT Equivalent' : 'ACT Score']} />
              <Legend wrapperStyle={{ color: textColor }} />
              <Line yAxisId="sat" type="monotone" dataKey="sat" stroke="#3b82f6" strokeWidth={2.5} dot={false} name="SAT Equivalent" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </section>
  );
}

function ChartCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-6">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{subtitle}</p>
      {children}
    </div>
  );
}
