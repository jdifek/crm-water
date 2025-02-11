import { ButtonSave } from "../../ui/Button";

export const Interface = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Настройки интерфейса</h2>
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
        <ButtonSave />
      </div>
    </div>
  );
};
