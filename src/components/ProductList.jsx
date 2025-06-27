import React, { useState, useEffect } from "react";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { fetchProducts, getMahsulotlar } from "../services/api";
import { useCart } from "../contexts/CartContext";

const ProductList = () => {
  const [mahsulotlar, setMahsulotlar] = useState([]);
  const [loading, setLoading] = useState(true);
  const { savatgaQoshish, soniniKamaytirish, savatItems, savatdanOlib } =
    useCart();

  useEffect(() => {
    const fetchMahsulotlar = async () => {
      try {
        const data = await fetchProducts();
        console.log(data);

        setMahsulotlar(data);
      } catch (error) {
        console.error("Mahsulotlarni yuklashda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMahsulotlar();
  }, []);
  const selectItem = (productId) => {
    return savatItems.find((saveProduct) => saveProduct._id === productId);
  };
  const minusButton = (productId) => {
    const current = selectItem(productId);
    if (current?.soni === 1) {
      savatdanOlib(productId);
    } else {
      soniniKamaytirish(productId);
    }
  };

  const formatNarx = (narx) => {
    return new Intl.NumberFormat("uz-UZ").format(narx) + " so'm";
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
      <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">
        Barcha mahsulotlar
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {mahsulotlar.map((mahsulot) => (
          <div
            key={mahsulot._id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="p-4">
              {/* <p className="text-xs text-gray-500 mb-1">Partiya: {'25-iyun'}</p> */}
              <p className="text-xs text-gray-500 mb-1">
                Partiya: {mahsulot.batch_number}
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {mahsulot.name}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                Narxi: {formatNarx(mahsulot.salePrice)}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Omborda: {mahsulot.quantity} dona
              </p>
              {/* <p className="text-sm text-gray-600 mb-1">Omborda: 68 dona</p> */}
              {/* <p className="text-sm text-gray-500 mb-3">
                Yaratilgan: 23-04-2025
              </p> */}
              <p className="text-sm text-gray-500 mb-3">
                Yaratilgan:
                {new Date(mahsulot.createdAt).toLocaleString("uz-UZ")}
              </p>
              {selectItem(mahsulot._id)?.soni ? (
                <div className="flex justify-start gap-2">
                  <button
                    onClick={() => minusButton(mahsulot._id)}
                    className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="font-semibold min-w-[2rem] text-center">
                    {selectItem(mahsulot._id)?.soni}
                  </span>
                  <button
                    onClick={() => savatgaQoshish(mahsulot)}
                    className="p-1 text-gray-500 hover:text-green-600 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => savatdanOlib(mahsulot._id)}
                    className="p-2 text-gray-500 hover:text-red-600 transition-colors ml-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => savatgaQoshish(mahsulot)}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-sm"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Savatga</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
