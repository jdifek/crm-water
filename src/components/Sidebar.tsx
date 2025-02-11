import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MonitorSmartphone,
  BarChart3,
  CreditCard,
  Wrench,
  // Settings,
  Users,
  ChevronDown,
  ChevronRight,
  X,
} from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  path?: string;
  children?: { text: string; path: string }[];
}

const NavItem: React.FC<NavItemProps> = ({ icon, text, path, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (itemPath: string) => location.pathname === itemPath;
  const isChildActive = children?.some(
    (child) => location.pathname === child.path
  );

  if (!children) {
    return (
      <div
        className={`text-gray-300 hover:bg-gray-700 cursor-pointer ${
          isActive(path!) ? "bg-gray-700" : ""
        }`}
        onClick={() => path && navigate(path)}
      >
        <div className="flex items-center px-4 py-2">
          <span className="mr-2">{icon}</span>
          <span>{text}</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        className={`text-gray-300 hover:bg-gray-700 cursor-pointer ${
          isChildActive ? "bg-gray-700" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center px-4 py-2">
          <span className="mr-2">{icon}</span>
          <span>{text}</span>
          <span className="ml-auto">
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        </div>
      </div>
      {isOpen && (
        <div className="bg-gray-800">
          {children.map((item, index) => (
            <div
              key={index}
              className={`pl-12 py-2 text-gray-400 hover:bg-gray-700 cursor-pointer text-sm ${
                isActive(item.path) ? "bg-gray-700" : ""
              }`}
              onClick={() => navigate(item.path)}
            >
              {item.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  return (
    <div className="bg-gray-900 w-64 min-h-screen flex flex-col sticky top-0 z-50">
      <div className="p-4 text-white text-xl font-bold border-b border-gray-700 flex justify-between items-center">
        <span>НАЗВА</span>
        <button
          onClick={onClose}
          className="lg:hidden hover:bg-gray-700 p-1 rounded"
        >
          <X size={20} className="text-gray-400" />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <NavItem icon={<LayoutDashboard size={20} />} text="Главная" path="/" />
        <NavItem
          icon={<MonitorSmartphone size={20} />}
          text="Аппараты"
          children={[
            { text: "Список", path: "/devices/list" },
            { text: "Детально", path: "/devices/details/1" },
          ]}
        />
        <NavItem
          icon={<BarChart3 size={20} />}
          text="Статистика"
          children={[
            { text: "Продажи", path: "/stats/sales" },
            { text: "По дням", path: "/stats/by-days" },
            { text: "За сутки", path: "/stats/daily" },
            { text: "Аппараты", path: "/stats/devices" },
            { text: "Инкассация", path: "/stats/collection" },
            { text: "По литражу", path: "/stats/by-liters" },
            { text: "Годовой отчет", path: "/stats/yearly" },
          ]}
        />
        <NavItem
          icon={<CreditCard size={20} />}
          text="Карточки"
          path="/cards/list"
        />
        <NavItem
          icon={<Wrench size={20} />}
          text="Обслуживание"
          children={[
            { text: "История обслуживания", path: "/maintenance/history" },
          ]}
        />
        {/* <NavItem
          icon={<Settings size={20} />}
          text="Настройки"
          children={[
            { text: "Настройка филиалов", path: "/settings/branches" },
          ]}
        /> */}
        <NavItem
          icon={<Users size={20} />}
          text="Администрирование"
          children={[{ text: "Пользователи", path: "/admin/users" }]}
        />
      </nav>
    </div>
  );
};

export default Sidebar;
