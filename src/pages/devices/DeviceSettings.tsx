import { useState } from "react";
import { DeviceNavigate } from "../../components/Device/Navigate";
import { useNavigate } from "react-router-dom";
import { SelectDevice } from "../../components/Device/SelectDevice";
import { devices } from "../../data/device/device";
import { DeviceSidebar } from "../../components/Device/DeviceSidebar";
import ConcentrationInput from "../../components/Device/ConcentrationInput";

const DeviceSettings = () => {
  const navigate = useNavigate();

  const [selectedDeviceId, setSelectedDeviceId] = useState(devices[0].id);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value);
    setSelectedDeviceId(id);
    navigate(`/devices/details/${id}`);
  };

  return (
    <div className="p-4 lg:p-8">
      <SelectDevice
        handleChange={handleChange}
        selectedDeviceId={selectedDeviceId}
      />

      <div className="flex gap-3 flex-nowrap w-full">
        <div className="bg-white rounded-lg shadow p-5 flex flex-col flex-1">
          <DeviceNavigate selectedDeviceId={selectedDeviceId} />

          <div className="flex justify-between mb-8">
            <p className="font-bold">Состояние автомата</p>
            <p className="bg-green-500 text-white p-2">Активирован</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Сохранить
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* WiFi Settings */}
            <div>
              <h2 className="text-xl font-semibold mb-6">
                Настройки подключения к сети WiFi
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input type="checkbox" id="useWifi" className="mr-2" />
                  <label htmlFor="useWifi">Использовать WiFi</label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Имя WiFi
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Пароль WiFi
                  </label>
                  <input
                    type="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  Сохранить
                </button>
              </div>
            </div>

            {/* Interface Settings */}
            <div>
              <h2 className="text-xl font-semibold mb-6">
                Настройки интерфейса
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Язык интерфейса
                  </label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                    <option>Украинский</option>
                    <option>Русский</option>
                    <option>English</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Список продуктов
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  Сохранить
                </button>
              </div>
            </div>

            {/* Payment Settings */}
            <div>
              <h2 className="text-xl font-semibold mb-6">
                Настройки платежных систем
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input type="checkbox" id="useCards" className="mr-2" />
                  <label htmlFor="useCards">
                    Использовать карты покупателей
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="useSMS" className="mr-2" />
                  <label htmlFor="useSMS">Отправка SMS</label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Модель POS терминала
                  </label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                    <option>Ingenico iCT250</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Идентефикатор продавца
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    defaultValue="STK3223"
                  />
                </div>
              </div>
            </div>

            {/* Payment Settings */}
            <div>
              <h2 className="text-xl font-semibold mb-6">Другие настройки</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input type="checkbox" id="useCards" className="mr-2" />
                  <label htmlFor="useCards">Обновить</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="useCards" className="mr-2" />
                  <label htmlFor="useCards">Проверять версию прошивки</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="useCards" className="mr-2" />
                  <label htmlFor="useCards">Отправка смс</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="useCards" className="mr-2" />
                  <label htmlFor="useCards">Отправка данных о фильтрах</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="useCards" className="mr-2" />
                  <label htmlFor="useCards">Сигнализация</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="useCards" className="mr-2" />
                  <label htmlFor="useCards">Датчик TDS</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="useCards" className="mr-2" />
                  <label htmlFor="useCards">Работа в одной филии</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="useCards" className="mr-2" />
                  <label htmlFor="useCards">Автооплата тарифа</label>
                </div>

                <ConcentrationInput />

                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>

        <DeviceSidebar />
      </div>
    </div>
  );
};

export default DeviceSettings;
