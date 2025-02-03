import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: '01.01', sales: 4000 },
  { date: '02.01', sales: 3000 },
  { date: '03.01', sales: 5000 },
  { date: '04.01', sales: 4500 },
  { date: '05.01', sales: 6000 },
];

const Statistics = () => {
  return (
    <div className="p-4 lg:p-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Статистика продаж</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-8">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Дата</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Продажи</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Сеансы</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Литры</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item) => (
                <tr key={item.date}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.sales}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{Math.floor(item.sales / 10)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.sales * 2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Statistics;