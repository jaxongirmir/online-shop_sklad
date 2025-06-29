import React from 'react';
import { Home, ShoppingCart, User, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = [
    { id: '/', label: 'Bosh sahifa', icon: Home },
    { id: '/cart', label: 'Savat', icon: ShoppingCart },
    { id: '/profile', label: 'Profil', icon: User }
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <div className={`
       fixed top-0 left-0 z-50 h-full bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-300 ease-in-out
${isOpen ? 'translate-x-0' : '-translate-x-full'}
lg:translate-x-0 lg:fixed lg:top-0 lg:pt-20 lg:left-0 lg:h-screen lg:z-30
w-64

      `}>
        <div className="flex items-center justify-between px-4 py-3 border-b lg:hidden">
          <h2 className="text-lg font-semibold">Menyu</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-4 min-h-screen">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.id;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      navigate(item.id);
                      onClose();
                    }}
                    className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 
                      ${isActive
                        ? 'bg-blue-100 text-blue-600 shadow-sm'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'}
                    `}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
