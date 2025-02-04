interface DeviceNavigateProps {
  selectedDeviceId: number;
}

export const DeviceNavigate = ({ selectedDeviceId }: DeviceNavigateProps) => {
  return (
    <ul className="flex gap-3 mb-4">
      <li className="text-white bg-blue-500 rounded-lg shadow-md p-2">
        Подробно
      </li>
      <li className="text-black p-2 hover:underline cursor-pointer">
        Настройки
      </li>
      <li className="text-black p-2 hover:underline cursor-pointer">
        <a href={`/devices/regulations/${selectedDeviceId}`}>Регламент</a>
      </li>
      <li className="text-black p-2 hover:underline cursor-pointer">
        Замена значений
      </li>
      <li className="text-black p-2 hover:underline cursor-pointer">
        Конфигурация
      </li>
      <li className="text-black p-2 hover:underline cursor-pointer">Тариф</li>
    </ul>
  );
};
