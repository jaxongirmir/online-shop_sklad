import React, { useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { createOrder } from "../services/api";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    savatItems,
    savatdanOlib,
    savatgaQoshish,
    soniniKamaytirish,
    savatniTozalash,
    jamiNarx,
  } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [promoValue, setPromoValue] = useState("");

  const formatNarx = (narx) => {
    return new Intl.NumberFormat("uz-UZ").format(narx) + " so'm";
  };
  const promoActivate = () => {
    setPromoValue("");
    toast.success("Iltimos, avval tizimga kiring");
  };
  const buyurtmaRasmiylashtirish = async () => {
    if (!user) {
      toast.error("Iltimos, avval tizimga kiring");
      return;
    }

    if (savatItems.length === 0) {
      toast.error("Savat bo'sh");
      return;
    }

    setLoading(true);
    try {
      const response = await createOrder(savatItems);
      if (response.success) {
        toast.success("Buyurtma muvaffaqiyatli rasmiylashtiruldi!");
        savatniTozalash();
      }
    } catch (error) {
      console.error("Buyurtma berish xatoligi:", error);
      toast.error("Buyurtma berishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 lg:p-6">
      <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">
        Savat
      </h2>

      {savatItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
            <Trash2 className="h-12 w-12 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg">Savat bo'sh</p>
          <p className="text-gray-400 text-sm mt-2">
            Mahsulotlarni savatga qo'shing
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md">
            {savatItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center p-4 border-b last:border-b-0 gap-4"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {item.name}
                  </h3>
                  <p className="text-blue-600 font-medium">
                    {formatNarx(item.salePrice)}
                  </p>
                </div>
                <div className="flex items-center space-x-3 flex-shrink-0">
                  <button
                    onClick={() => soniniKamaytirish(item.id)}
                    className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                    disabled={item.soni <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="font-semibold min-w-[2rem] text-center">
                    {item.soni}
                  </span>
                  <button
                    onClick={() => savatgaQoshish(item)}
                    className="p-1 text-gray-500 hover:text-green-600 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => savatdanOlib(item.id)}
                    className="p-2 text-gray-500 hover:text-red-600 transition-colors ml-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="relative w-full h-[50px] mb-2">
              <input
                className="absolute top-0 left-0 w-full py-2 indent-3 rounded border border-black "
                type="text"
                placeholder="Promokodni kiriting"
                value={promoValue}
                onChange={(v) => setPromoValue(v.target.value)}
              />
              <button
                className="absolute top-[-2px] right-[-2px] py-2.5 px-5 bg-[#2563eb] text-white rounded-lg"
                onClick={() => promoActivate()}
              >
                Kiritish
              </button>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold">Jami:</span>
              <span className="text-2xl font-bold text-blue-600">
                {formatNarx(jamiNarx)}
              </span>
            </div>
            <button
              onClick={buyurtmaRasmiylashtirish}
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Buyurtma berilmoqda...
                </>
              ) : (
                "Buyurtmani rasmiylashtirish"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
