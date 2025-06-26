import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getMahsulotlar } from '../services/api';
import { useCart } from '../contexts/CartContext';

const ProductList = () => {
  const [mahsulotlar, setMahsulotlar] = useState([]);
  const [loading, setLoading] = useState(true);
  const { savatgaQoshish } = useCart();

  useEffect(() => {
    const fetchMahsulotlar = async () => {
      try {
        const data = await getMahsulotlar();
        setMahsulotlar(data);
      } catch (error) {
        console.error('Mahsulotlarni yuklashda xatolik:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMahsulotlar();
  }, []);

  const formatNarx = (narx) => {
    return new Intl.NumberFormat('uz-UZ').format(narx) + ' so\'m';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Mahsulotlar yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6">
      <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">Barcha mahsulotlar</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {mahsulotlar.map((mahsulot) => (
          <div key={mahsulot._id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <div className="p-4">
              <p className="text-xs text-gray-500 mb-1">Partiya: {'25-iyun'}</p>
              {/* <p className="text-xs text-gray-500 mb-1">Partiya: {mahsulot.batch_number && '25-iyun'}</p> */}
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{mahsulot.name && 'Maxsulot Nomi'}</h3>
              <p className="text-sm text-gray-600 mb-1">Narxi: {formatNarx(mahsulot.salePrice) && formatNarx(23400)}</p>
              {/* <p className="text-sm text-gray-600 mb-1">Omborda: {mahsulot.quantity} dona</p> */}
              <p className="text-sm text-gray-600 mb-1">Omborda:  68 dona</p>
              <p className="text-sm text-gray-500 mb-3">Yaratilgan:  23-04-2025</p>
              {/* <p className="text-sm text-gray-500 mb-3">Yaratilgan:  {new Date(mahsulot.createdAt).toLocaleString('uz-UZ')}</p> */}
              <button
                onClick={() => savatgaQoshish(mahsulot)}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-sm"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Savatga qo'shish</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
