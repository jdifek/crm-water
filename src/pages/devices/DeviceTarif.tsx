import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SelectDevice } from "../../components/Device/SelectDevice";
import { DeviceNavigate } from "../../components/Device/Navigate";
import { devices } from "../../data/device/device";
import { DeviceSidebar } from "../../components/Device/DeviceSidebar";

export const DeviceTarif = () => {
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

          <div className="p-4 lg:p-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="space-y-6">
                <div className="flex gap-5 items-center">
                  <label className="block text-sm font-medium text-gray-700">
                    Модель купюроприемника
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      className="block w-full rounded-md border-gray-300 shadow-sm"
                      defaultValue="FSKJSD"
                    />
                  </div>
                </div>

                <div className="flex gap-5 items-center">
                  <label className="block text-sm font-medium text-gray-700">
                    Модель монетоприемника
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      className="block w-full rounded-md border-gray-300 shadow-sm"
                      defaultValue="MICROCOIN SP"
                    />
                  </div>
                </div>

                <div className="flex gap-5 items-center">
                  <label className="block text-sm font-medium text-gray-700">
                    Чуствительность датчика вибрации
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="number"
                      className="block w-full rounded-md border-gray-300 shadow-sm"
                      defaultValue="54"
                    />
                  </div>
                </div>

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
