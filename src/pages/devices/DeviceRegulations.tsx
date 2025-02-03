const DeviceRegulations = () => {
  return (
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
  );
};

export default DeviceRegulations;
