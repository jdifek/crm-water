import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeviceDetails = () => {
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

  const selectedDevice = devices.find(
    (device) => device.id === Number(selectedDeviceId)
  );

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

      <div className="flex gap-3">
        <div className="bg-white rounded-lg shadow p-6">
          <ul className="flex gap-3 mb-4">
            <li className="text-white bg-blue-500 rounded-lg shadow-md p-2">
              Подробно
            </li>
            <li className="text-black p-2 hover:underline cursor-pointer">
              Настройки
            </li>
            <li className="text-black p-2 hover:underline cursor-pointer">
              Регламент
            </li>
            <li className="text-black p-2 hover:underline cursor-pointer">
              Замена значений
            </li>
            <li className="text-black p-2 hover:underline cursor-pointer">
              Конфигурация
            </li>
            <li className="text-black p-2 hover:underline cursor-pointer">
              Тариф
            </li>
          </ul>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Информация об устройстве */}
            <div>
              <h2 className="text-xl font-semibold mb-6">Аппарат</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-gray-600">IMEI</div>
                  <div>{selectedDevice.imei}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-gray-600">Серийный номер</div>
                  <div>{selectedDevice.serial}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-gray-600">Модель аппарата</div>
                  <div>{selectedDevice.model}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-gray-600">Модель микроконтроллера</div>
                  <div>{selectedDevice.microcontroller}</div>
                </div>
              </div>
            </div>

            {/* Датчики */}
            <div>
              <h2 className="text-xl font-semibold mb-6">Датчики</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-gray-600">Температура</div>
                  <div>{selectedDevice.sensors.temperature}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-gray-600">TDS</div>
                  <div>{selectedDevice.sensors.tds}</div>
                </div>
              </div>
            </div>

            {/* Счетчики */}
            <div>
              <h2 className="text-xl font-semibold mb-6">Счетчики</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-gray-600">Остаток продукта</div>
                  <div>{selectedDevice.counters.productRemaining}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-gray-600">Счетчик воды на входе</div>
                  <div>{selectedDevice.counters.waterMeter}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-gray-600">
                    Счетчик электрической энергии
                  </div>
                  <div>{selectedDevice.counters.electricityMeter}</div>
                </div>
              </div>
            </div>

            {/* Статистика */}
            <div>
              <h2 className="text-xl font-semibold mb-6">Статистика</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-gray-600">
                    Всего продано воды со дня запуска
                  </div>
                  <div>{selectedDevice.statistics.totalWaterSold}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-gray-600">
                    Всего вырученно денег со дня запуска
                  </div>
                  <div>{selectedDevice.statistics.totalRevenue}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-gray-600">
                    Количество монет за все время
                  </div>
                  <div>{selectedDevice.statistics.coinCount}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-gray-600">Сумма монет за все время</div>
                  <div>{selectedDevice.statistics.coinAmount}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-gray-600">Сумма купюр за все время</div>
                  <div>{selectedDevice.statistics.banknoteCount}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-gray-600">Сумма купюр за все время</div>
                  <div>{selectedDevice.statistics.banknoteAmount}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-gray-600">Дата последней активности</div>
                  <div>{selectedDevice.statistics.lastActivityDate}</div>
                </div>
              </div>
            </div>

            {/* Связь */}
            <div>
              <h2 className="text-xl font-semibold mb-6">Связь</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-gray-600">Тип подключения</div>
                  <div>{selectedDevice.connectivity.connectionType}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-gray-600">Номер SIM-карты</div>
                  <div>{selectedDevice.connectivity.simNumber}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-gray-600">Оператор связи</div>
                  <div>{selectedDevice.connectivity.operator}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-gray-600">Уровень сигнала</div>
                  <div>{selectedDevice.connectivity.signalLevel}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-gray-600">Баланс SIM-карты</div>
                  <div>{selectedDevice.connectivity.simBalance}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-gray-600">Дата последней активности</div>
                  <div>
                    {selectedDevice.connectivity.connectivityLastActivity}
                  </div>
                </div>
              </div>
            </div>

            {/* Продукты */}
            <div>
              <h2 className="text-xl font-semibold mb-6">Продукты</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-gray-600">Цена "очищена вода"</div>
                  <div>{selectedDevice.products.cleanWaterPrice}</div>
                </div>
              </div>
            </div>

            {/* Программное обеспечение */}
            <div>
              <h2 className="text-xl font-semibold mb-6">
                Программное обеспечение
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-gray-600">
                    Версия прошивки главного контроллера
                  </div>
                  <div>
                    {selectedDevice.software.firmwareVersionMainController}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-gray-600">
                    Версия прошивки контроллера подготовки воды
                  </div>
                  <div>
                    {selectedDevice.software.firmwareVersionWaterPrepController}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-gray-600">
                    Версия прошивки контроллера Дисплея
                  </div>
                  <div>
                    {selectedDevice.software.firmwareVersionDisplayController}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-gray-600">
                    Дата прошивки главного контроллера
                  </div>
                  <div>
                    {selectedDevice.software.firmwareDateMainController}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <button className="mb-3 text-white bg-blue-500 rounded-lg shadow-md p-2">
            Перезагрузка аппарата
          </button>
          <button className="mb-10 text-white bg-blue-500 rounded-lg shadow-md p-2">
            Сервисный режим
          </button>

          <div className="mb-10">
            <span>Торговая точка</span>
            <p>вул.Головна,1а:№1212332</p>
            <p>....</p>
          </div>

          <div  className="mb-10">
            <span>Номера SMS оповещений:</span>
            <div className="flex">
              <p>техник андрей</p>
              <p>Тел. 38043443</p>
            </div>
          </div>

          <div>
            <span>Пользователи с доступом к аппарату:</span>
            <p>техник андрей</p>
            <p>техник павел</p>
            <p>техник иван</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetails;
