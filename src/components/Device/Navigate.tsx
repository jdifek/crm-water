import { NavLink } from "react-router-dom";

interface DeviceNavigateProps {
  selectedDeviceId: number;
}

export const DeviceNavigate = ({ selectedDeviceId }: DeviceNavigateProps) => {
  const menuItems = [
    { name: "Подробно", path: `/devices/details/${selectedDeviceId}` },
    { name: "Настройки", path: `/devices/settings/${selectedDeviceId}` },
    { name: "Регламент", path: `/devices/regulations/${selectedDeviceId}` },
    { name: "Замена значений", path: `/devices/replacing/${selectedDeviceId}` },
    { name: "Конфигурация", path: `/devices/config/${selectedDeviceId}` },
    { name: "Тариф", path: `/devices/tarif/${selectedDeviceId}` },
  ];

  return (
    <ul className="flex gap-3 mb-4">
      {menuItems.map(({ name, path }) => (
        <li key={name} className="p-2 rounded-lg">
          {path !== "#" ? (
            <NavLink
              to={path}
              className={({ isActive }) =>
                `p-2 rounded-lg ${
                  isActive
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-black hover:underline"
                }`
              }
            >
              {name}
            </NavLink>
          ) : (
            <span className="text-black">{name}</span>
          )}
        </li>
      ))}
    </ul>
  );
};
