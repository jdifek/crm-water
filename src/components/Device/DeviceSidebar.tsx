import { IoReloadOutline, IoKeyOutline } from 'react-icons/io5'; 

export const DeviceSidebar = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6 w-[240px] shrink-0">
      <button className="mb-3 text-white bg-blue-500 rounded-lg shadow-md p-2 flex items-center gap-2">
        <IoReloadOutline size={20} />
        Перезагрузка аппарата
      </button>
      <button className="mb-10 text-white bg-blue-500 rounded-lg shadow-md p-2 flex items-center gap-2">
        <IoKeyOutline size={20} />
        Сервисный режим
      </button>

      <div className="mb-10">
        <span className="font-bold">Торговая точка</span>
        <p>вул.Головна,1а:№1212332</p>
        <p>....</p>
      </div>

      <div className="mb-10">
        <span className="font-bold">Номера SMS оповещений:</span>
        <div className="flex">
          <p>техник андрей</p>
          <p>Тел. 38043443</p>
        </div>
      </div>

      <div>
        <span className="font-bold">Пользователи с доступом к аппарату:</span>
        <p>техник андрей</p>
        <p>техник павел</p>
        <p>техник иван</p>
      </div>
    </div>
  );
};
