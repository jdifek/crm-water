import { ButtonSave } from "../../ui/Button";

interface DialSensorProps {
  isOn: boolean;
  setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DialSensor = ({ isOn, setIsOn }: DialSensorProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Настройка датчика набора</h2>
      <div className="space-y-4">
        <div className="flex gap-3">
          <label className="relative flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={isOn}
              onChange={() => setIsOn(!isOn)}
            />
            <div
              className={`w-14 h-7 bg-gray-300 rounded-full p-1 transition ${
                isOn ? "bg-green-500" : ""
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition ${
                  isOn ? "translate-x-7" : ""
                }`}
              ></div>
            </div>
          </label>

          <p>Рассчитать автоматически из:</p>
        </div>

        {[0.5, 1.0, 1.5, 2.0, 5.0, 6.0, 10.0, 12.0, 19.0].map((el, index) => (
          <div key={index} className="flex items-center">
            <label className="block text-sm font-medium text-blue-300 mr-2">
              {el}л
            </label>
            <div className="mt-1 flex ">
              <input
                type="number"
                className="block w-full rounded-md border-gray-300 shadow-sm"
                defaultValue="25"
              />
            </div>
          </div>
        ))}

        <ButtonSave />
      </div>
    </div>
  );
};
