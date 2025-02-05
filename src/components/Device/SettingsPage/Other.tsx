import { ButtonSave } from "../../ui/Button";
import ConcentrationInput from "../ConcentrationInput";

export const Other = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Другие настройки</h2>
      <div className="space-y-4">
        {[
          "Обновить",
          "Проверять версию прошивки",
          "Отправка смс",
          "Отправка данных о фильтрах",
          "Сигнализация",
          "Датчик TDS",
          "Работа в одной филии",
          "Автооплата тарифа",
        ].map((el, index) => (
          <div key={index} className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <label>{el}</label>
          </div>
        ))}

        <ConcentrationInput />

        <ButtonSave />
      </div>
    </div>
  );
};
