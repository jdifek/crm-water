import { ButtonSave } from "../../ui/Button";

interface MachineStateProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MachineState = ({ active, setActive }: MachineStateProps) => {
  return (
    <div className="flex justify-between mb-8">
      <p className="font-bold">Состояние автомата</p>
      <div
        className={`flex border-solid w-[15rem] border-2 ${
          active ? "justify-start" : "justify-end"
        }`}
      >
        <p
          onClick={() => setActive((data) => !data)}
          className={`text-white p-2 cursor-pointer ${
            active ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {active ? "Активирован" : "Деактивирован"}
        </p>
      </div>
      <ButtonSave />
    </div>
  );
};
