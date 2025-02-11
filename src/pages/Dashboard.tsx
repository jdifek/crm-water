import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ShoppingCart, Droplets, DollarSign } from 'lucide-react';

const data = [
  { date: '01.01', '₴': 6000, expenses: 1000 },
  { date: '02.01', '₴': 8000, expenses: 1000 },
  { date: '03.01', '₴': 9000, expenses: 1000 },
  // Add more data points...
];

const smallChartData = [
  { date: '01.01', value: 100 },
  { date: '02.01', value: 120 },
  { date: '03.01', value: 110 },
  // Add more data points...
];

const Dashboard = () => {
  return (
    <div className="p-4 lg:p-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Сеансов за сегодня</p>
              <p className="text-2xl font-bold">1 003</p>
            </div>
            <ShoppingCart className="text-blue-500" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Литров за сегодня</p>
              <p className="text-2xl font-bold">8 729 л</p>
            </div>
            <Droplets className="text-blue-500" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Доход за сегодня</p>
              <p className="text-2xl font-bold">8 814,50</p>
            </div>
            <DollarSign className="text-blue-500" size={24} />
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white rounded-lg shadow p-4 mb-8">
        <h2 className="text-lg font-semibold mb-4">Доход и затраты за последние 30 дней</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="₴" stroke="#22c55e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Small Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Литров за последние 30 дней</h2>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={smallChartData}>
                <Line type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={2} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Сеансов за последние 30 дней</h2>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={smallChartData}>
                <Line type="monotone" dataKey="value" stroke="#ec4899" strokeWidth={2} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Дата</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Сеансы</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Литров</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Доход</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-01-30</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1 003</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">8 729</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">8 814,50</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;