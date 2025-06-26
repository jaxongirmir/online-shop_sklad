import React, { useState, useEffect } from 'react';
import { User, Package, Calendar, ShoppingBag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getUserOrders } from '../services/api';

const Profile = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrders();
        setOrders(data);
      } catch (error) {
        console.error('Buyurtmalarni yuklashda xatolik:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const formatNarx = (narx) => {
    return new Intl.NumberFormat('uz-UZ').format(narx) + ' so\'m';
  };

  const getHolatColor = (holat) => {
    switch (holat) {
      case 'Yetkazildi':
        return 'text-green-600 bg-green-100';
      case 'Jarayonda':
        return 'text-yellow-600 bg-yellow-100';
      case 'Yangi':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (!user) {
    return (
      <div className="p-4 lg:p-6">
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
            <User className="h-12 w-12 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg">Iltimos, tizimga kiring</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6">
      <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">Profil</h2>
      
      <div className="space-y-6">
        {/* User Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">{user.ism}</h3>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">{user.telefon}</p>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Package className="h-6 w-6 text-gray-600" />
            <h3 className="text-xl font-semibold text-gray-900">Buyurtmalar tarixi</h3>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="text-gray-600">Buyurtmalar yuklanmoqda...</p>
              </div>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-8">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-center">Buyurtmalar mavjud emas</p>
              <p className="text-gray-400 text-sm mt-2">Birinchi buyurtmangizni bering</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{order.sana}</span>
                      </div>
                      <p className="font-semibold text-lg">{formatNarx(order.jami)}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getHolatColor(order.holat)}`}>
                      {order.holat}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    {order.mahsulotlar.map((mahsulot, index) => (
                      <div key={index} className="flex justify-between text-sm text-gray-600">
                        <span>{mahsulot.nomi} x{mahsulot.soni}</span>
                        <span>{formatNarx(mahsulot.narx * mahsulot.soni)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;