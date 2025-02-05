import { ButtonSave } from "../../ui/Button";
import PaymentMethodsList from "../PaymentMethodsList";

export const Payment = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Настройки платежных систем</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <input type="checkbox" id="useCards" className="mr-2" />
          <label htmlFor="useCards">Использовать карты покупателей</label>
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

        <PaymentMethodsList />
        <ButtonSave />
      </div>
    </div>
  );
};
