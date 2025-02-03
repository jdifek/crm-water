import { Check, X, AlertTriangle } from "lucide-react";

interface Device {
  id: number;
  name: string;
  address: string;
  connection: "ok" | "error" | "warning";
  sensor: "ok" | "error" | "warning";
  system: "ok" | "error" | "warning";
  tankVolume: number;
  soldLiters: number;
  filledLiters: number;
  remainingLiters: number;
}

const StatusIcon = ({ status }: { status: "ok" | "error" | "warning" }) => {
  switch (status) {
    case "ok":
      return <Check className="text-green-500" />;
    case "error":
      return <X className="text-red-500" />;
    case "warning":
      return <AlertTriangle className="text-yellow-500" />;
  }
};

const DevicesList = () => {
  const devices: Device[] = [
    {
      id: 1860,
      name: '№ 111902 (Пробный "Фуни" до 2025-04-30)',
      address: "вулиця Головна, 1, Київ, Україна, 5...",
      connection: "error",
      sensor: "warning",
      system: "ok",
      tankVolume: 1000,
      soldLiters: 200,
      filledLiters: 300,
      remainingLiters: 800,
    },
    {
      id: 1613,
      name: "№ 111737 (Фуни)",
      address: "вул Соборности, 123, W111737",
      connection: "ok",
      sensor: "ok",
      system: "ok",
      tankVolume: 34,
      soldLiters: 123,
      filledLiters: 123,
      remainingLiters: 123,
    },
  ];

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
        <h1 className="text-xl lg:text-2xl font-semibold">Список аппаратов</h1>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm lg:text-base whitespace-nowrap">
            Обновить статистику
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm lg:text-base whitespace-nowrap">
            Деактивированные аппараты
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <div className="min-w-[1000px]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Аппарат
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Связь
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Сенсор
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Система
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Объем резервуара (литров)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Продано (литров)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Заправка (литров)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Остаток (литров)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {devices.map((device) => (
                <tr key={device.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {device.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {device.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {device.address}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusIcon status={device.connection} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusIcon status={device.sensor} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusIcon status={device.system} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {device.tankVolume}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {device.soldLiters}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {device.filledLiters}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {device.remainingLiters}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DevicesList;
