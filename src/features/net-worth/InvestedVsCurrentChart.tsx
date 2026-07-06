import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts';
import { formatCurrency } from '../../lib/derivePortfolio';

interface InvestedVsCurrentChartProps {
  totalInvested: number;
  totalCurrentValue: number;
}

export function InvestedVsCurrentChart({ totalInvested, totalCurrentValue }: InvestedVsCurrentChartProps) {
  const data = [
    { label: 'Invested', value: Math.round(totalInvested * 100) / 100 },
    { label: 'Current value', value: Math.round(totalCurrentValue * 100) / 100 },
  ];

  const barColors = ['#92A29F', '#059A83'];

  return (
    <div className="mt-(--space-5)">
      <ResponsiveContainer width="100%" height={140}>
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 24, bottom: 4, left: 4 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#DBDFDF" />
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="label"
            width={92}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#687D7A', fontSize: 12 }}
          />
          <Tooltip
            formatter={(value) => formatCurrency(Number(value ?? 0))}
            contentStyle={{
              borderRadius: 10,
              border: '1px solid #DBDFDF',
              fontSize: 12,
            }}
          />
          <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={26}>
            {data.map((_, index) => (
              <Cell key={index} fill={barColors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
