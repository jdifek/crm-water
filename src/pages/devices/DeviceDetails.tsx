import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeviceNavigate } from "../../components/Device/Navigate";
import { SelectDevice } from "../../components/Device/SelectDevice";
import { devices } from "../../data/device/device";
import { DeviceSidebar } from "../../components/Device/DeviceSidebar";

const DeviceDetails = () => {
  const navigate = useNavigate();

  const [selectedDeviceId, setSelectedDeviceId] = useState(devices[0].id);

  const selectedDevice = devices.find(
    (device) => device.id === Number(selectedDeviceId)
  );

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

        <DeviceSidebar />
      </div>
    </div>
  );
};

export default DeviceDetails;
