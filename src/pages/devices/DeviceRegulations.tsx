import { DeviceNavigate } from "../../components/Device/Navigate";
import { SelectDevice } from "../../components/Device/SelectDevice";
import { DeviceSidebar } from "../../components/Device/DeviceSidebar";
import { ButtonSave } from "../../components/ui/Button";

const DeviceRegulations = () => {
  return (
    <div className="p-4 lg:p-8">
      <SelectDevice
      />

      <div className="flex gap-3 flex-nowrap w-full">
        <div className="bg-white rounded-lg shadow p-5 flex flex-col flex-1">
          <DeviceNavigate  />

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

                <ButtonSave />

              </div>
            </div>
          </div>
        </div>

        <DeviceSidebar />
      </div>
    </div>
  );
};

export default DeviceRegulations;
