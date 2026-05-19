'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

export default function SentimentChart({ summary }) {
  if (!summary) return null;

  const data = [
    {
      name: 'Positive',
      count: summary.positive,
      percent: summary.positivePercent,
      color: '#10b981',
    },
    {
      name: 'Neutral',
      count: summary.neutral,
      percent: summary.neutralPercent,
      color: '#6b7280',
    },
    {
      name: 'Negative',
      count: summary.negative,
      percent: summary.negativePercent,
      color: '#ef4444',
    },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
          <p className="font-semibold">{data.name}</p>
          <p className="text-sm text-gray-600">Count: {data.count}</p>
          <p className="text-sm text-gray-600">Percent: {data.percent}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">Sentiment Breakdown</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {data.map(item => (
          <div key={item.name} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="font-semibold text-gray-700">{item.name}</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{item.percent}%</p>
            <p className="text-sm text-gray-600 mt-1">({item.count} articles)</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" radius={[8, 8, 0, 0]}>
            {data.map((item, index) => (
              <Cell key={`cell-${index}`} fill={item.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
