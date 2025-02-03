import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  
  // Get the current page title based on the route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Главная';
    if (path.startsWith('/devices/list')) return 'Список аппаратов';
    if (path.startsWith('/devices/details')) return 'Детально';
    if (path.startsWith('/devices/settings')) return 'Настройки';
    if (path.startsWith('/devices/regulations')) return 'Регламент';
    // Add more title mappings as needed
    return 'Страница';
  };

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 transform 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-200 ease-in-out
        z-30 lg:z-0
      `}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <main className="flex-1 w-full">
        <div className="bg-blue-500 text-white py-2 px-4 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center">
            <button 
              className="lg:hidden mr-4 hover:bg-blue-600 p-1 rounded"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <button className="mr-4">←</button>
            <h1 className="text-lg">{getPageTitle()}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button>👤</button>
            <button>🌐</button>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}