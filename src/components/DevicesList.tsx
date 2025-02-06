import { AlertTriangle, Check, X } from "lucide-react";
import { useState } from "react";

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
  const statusColors = {
    ok: "text-green-500",
    error: "text-red-500",
    warning: "text-yellow-500",
  };

  const icons = {
    ok: Check,
    error: X,
    warning: AlertTriangle,
  };

  const Icon = icons[status];
  return <Icon className={statusColors[status]} />;
};

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

const DevicesList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDevices = devices.filter((device) =>
    device.id.toString().includes(searchQuery)
  );

  const total = (
    key: keyof Omit<
      Device,
      "id" | "name" | "address" | "connection" | "sensor" | "system"
    >
  ) =>
    key === "remainingLiters"
      ? filteredDevices.reduce(
          (sum, device) =>
            sum + (device.tankVolume - device.soldLiters + device.filledLiters),
          0
        )
      : filteredDevices.reduce((sum, device) => sum + device[key], 0);

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-6 space-y-4 lg:space-y-0">
        <h1 className="text-xl lg:text-2xl font-semibold">Список аппаратов</h1>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm lg:text-base">
            Обновить статистику
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm lg:text-base">
            Деактивированные аппараты
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-5">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm">Поиск:</span>
          <input
            type="text"
            placeholder="По ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-b border-gray-400 py-1 px-2 text-gray-700 focus:outline-none focus:border-blue-500 w-full sm:w-auto"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "ID",
                  "Аппарат",
                  "Адрес",
                  "Связь",
                  "Сенсор",
                  "Система",
                  "Объем",
                  "Продано",
                  "Заправка",
                  "Остаток",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDevices.map((device) => (
                <tr key={device.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{device.id}</td>
                  <td className="px-4 py-2">{device.name}</td>
                  <td className="px-4 py-2">{device.address}</td>
                  <td className="px-4 py-2">
                    <StatusIcon status={device.connection} />
                  </td>
                  <td className="px-4 py-2">
                    <StatusIcon status={device.sensor} />
                  </td>
                  <td className="px-4 py-2">
                    <StatusIcon status={device.system} />
                  </td>
                  <td className="px-4 py-2">{device.tankVolume}</td>
                  <td className="px-4 py-2">{device.soldLiters}</td>
                  <td className="px-4 py-2">{device.filledLiters}</td>
                  <td className="px-4 py-2">{device.remainingLiters}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-100 font-bold">
              <tr>
                <td className="px-4 py-2">Сумма</td>
                <td className="px-4 py-2">—</td>
                <td className="px-4 py-2">—</td>
                <td className="px-4 py-2">—</td>
                <td className="px-4 py-2">—</td>
                <td className="px-4 py-2">—</td>
                <td className="px-4 py-2">{total("tankVolume")}</td>
                <td className="px-4 py-2">{total("soldLiters")}</td>
                <td className="px-4 py-2">{total("filledLiters")}</td>
                <td className="px-4 py-2">{total("remainingLiters")}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DevicesList;
