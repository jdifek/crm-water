import { ButtonSave } from "../../ui/Button";

export const Wifi = () => {
  return (
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
        <ButtonSave />
      </div>
    </div>
  );
};
