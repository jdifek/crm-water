import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeviceNavigate } from "../../components/Device/Navigate";

const DeviceRegulations = () => {
  const devices = [
    {
      id: 1,
      name: "One",
      imei: "869345035389563",
      serial: "111730",
      model: "G3",
      microcontroller: "MICROCON SP",
      sensors: {
        temperature: "24 °C",
        tds: "Есть",
      },
      counters: {
        productRemaining: "2 126,000 л",
        waterMeter: "0,000 л",
        electricityMeter: "195,60 kWh",
      },
      statistics: {
        totalWaterSold: "004,000 л",
        totalRevenue: "33,00 B",
        coinCount: "68 шт",
        coinAmount: "777,10 B",
        banknoteCount: "220 шт",
        banknoteAmount: "777,10 B",
        lastActivityDate: "2025-01-29 23:28:16",
      },
      connectivity: {
        connectionType: "GSM",
        simNumber: "1",
        operator: "Kyivstar",
        signalLevel: "-75dBm",
        simBalance: "777,10 B",
        connectivityLastActivity: "2025-01-29 23:28:16",
      },
      products: {
        cleanWaterPrice: "1,00 B/л",
      },
      software: {
        firmwareVersionMainController: "GSU:GD:6:1",
        firmwareVersionWaterPrepController: "NONE",
        firmwareVersionDisplayController: "GW-A:5.7",
        firmwareDateMainController: "2025-01-16 19:20:21",
      },
    },
    {
      id: 2,
      name: "Two",
      imei: "869345035389564",
      serial: "222730",
      model: "G4",
      microcontroller: "MICROCON XP",
      sensors: {
        temperature: "26 °C",
        tds: "Нет",
      },
      counters: {
        productRemaining: "1 500,000 л",
        waterMeter: "0,500 л",
        electricityMeter: "210,30 kWh",
      },
      statistics: {
        totalWaterSold: "005,000 л",
        totalRevenue: "40,00 B",
        coinCount: "75 шт",
        coinAmount: "800,00 B",
        banknoteCount: "230 шт",
        banknoteAmount: "800,00 B",
        lastActivityDate: "2025-01-30 12:00:00",
      },
      connectivity: {
        connectionType: "LTE",
        simNumber: "2",
        operator: "Vodafone",
        signalLevel: "-65dBm",
        simBalance: "800,00 B",
        connectivityLastActivity: "2025-01-30 12:00:00",
      },
      products: {
        cleanWaterPrice: "1,20 B/л",
      },
      software: {
        firmwareVersionMainController: "GSU:GD:6:2",
        firmwareVersionWaterPrepController: "v1.0",
        firmwareVersionDisplayController: "GW-A:5.8",
        firmwareDateMainController: "2025-01-17 10:00:00",
      },
    },
    {
      id: 3,
      name: "Three",
      imei: "869345035389565",
      serial: "333730",
      model: "G5",
      microcontroller: "MICROCON ZP",
      sensors: {
        temperature: "22 °C",
        tds: "Есть",
      },
      counters: {
        productRemaining: "2 500,000 л",
        waterMeter: "0,200 л",
        electricityMeter: "180,00 kWh",
      },
      statistics: {
        totalWaterSold: "003,500 л",
        totalRevenue: "30,00 B",
        coinCount: "65 шт",
        coinAmount: "750,00 B",
        banknoteCount: "210 шт",
        banknoteAmount: "750,00 B",
        lastActivityDate: "2025-01-28 20:30:00",
      },
      connectivity: {
        connectionType: "3G",
        simNumber: "3",
        operator: "Beeline",
        signalLevel: "-80dBm",
        simBalance: "750,00 B",
        connectivityLastActivity: "2025-01-28 20:30:00",
      },
      products: {
        cleanWaterPrice: "0,90 B/л",
      },
      software: {
        firmwareVersionMainController: "GSU:GD:6:0",
        firmwareVersionWaterPrepController: "v0.9",
        firmwareVersionDisplayController: "GW-A:5.6",
        firmwareDateMainController: "2025-01-15 08:45:00",
      },
    },
  ];

  const navigate = useNavigate();

  const [selectedDeviceId, setSelectedDeviceId] = useState(devices[0].id);

  const handleChange = (e) => {
    const id = Number(e.target.value);
    setSelectedDeviceId(id);
    navigate(`/devices/details/${id}`);
  };

  return (
    <div className="p-4 lg:p-8">
      <select
        className="mb-3 border p-2 rounded"
        value={selectedDeviceId}
        onChange={handleChange}
      >
        {devices.map((device) => (
          <option key={device.id} value={device.id}>
            {device.name}
          </option>
        ))}
      </select>

      <div className="flex gap-3 flex-nowrap w-full">
        <div className="bg-white rounded-lg shadow p-5 flex flex-col flex-1">
          <DeviceNavigate selectedDeviceId={selectedDeviceId} />

          <div className="p-4 lg:p-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    До замены предварительных фильтров
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="number"
                      className="block w-full rounded-md border-gray-300 shadow-sm"
                      defaultValue="25000"
                    />
                    <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500">
                      л
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    До замены постфильтров
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="number"
                      className="block w-full rounded-md border-gray-300 shadow-sm"
                      defaultValue="3000"
                    />
                    <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500">
                      л
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    До замены (промывки) мембран
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="number"
                      className="block w-full rounded-md border-gray-300 shadow-sm"
                      defaultValue="150000"
                    />
                    <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500">
                      л
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    До замены антискаланта
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="number"
                      className="block w-full rounded-md border-gray-300 shadow-sm"
                      defaultValue="30000"
                    />
                    <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500">
                      л
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    До замены минералов
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="number"
                      className="block w-full rounded-md border-gray-300 shadow-sm"
                      defaultValue="4000"
                    />
                    <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500">
                      л
                    </span>
                  </div>
                </div>

                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 w-[300px] shrink-0">
          <button className="mb-3 text-white bg-blue-500 rounded-lg shadow-md p-2">
            Перезагрузка аппарата
          </button>
          <button className="mb-10 text-white bg-blue-500 rounded-lg shadow-md p-2">
            Сервисный режим
          </button>

          <div className="mb-10">
            <span className="font-bold">Торговая точка</span>
            <p>вул.Головна,1а:№1212332</p>
            <p>....</p>
          </div>

          <div className="mb-10">
            <span className="font-bold">Номера SMS оповещений:</span>
            <div className="flex">
              <p>техник андрей</p>
              <p>Тел. 38043443</p>
            </div>
          </div>

          <div>
            <span className="font-bold">
              Пользователи с доступом к аппарату:
            </span>
            <p>техник андрей</p>
            <p>техник павел</p>
            <p>техник иван</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceRegulations;
