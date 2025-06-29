import React, { useState, useEffect } from "react";
import { User, Package, Calendar, ShoppingBag } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { getUserOrders, updateUser } from "../services/api";
import { formatPhone, formatCarNumber } from "../hooks/formats";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({
    fullName: user?.fullName || "",
    phone: user?.phone || "",
    birthday: user?.birthday || "",
    cars: user?.cars?.length
      ? user.cars.map((car) => ({
          model: car.model || "",
          plateNumber: car.plateNumber || "",
        }))
      : [{ model: "", plateNumber: "" }],
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrders();
        setOrders(data);
      } catch (error) {
        console.error("Buyurtmalarni yuklashda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const formatNarx = (narx) => {
    return new Intl.NumberFormat("uz-UZ").format(narx) + " so'm";
  };

  const getHolatColor = (holat) => {
    switch (holat) {
      case "Yetkazildi":
        return "text-green-600 bg-green-100";
      case "Jarayonda":
        return "text-yellow-600 bg-yellow-100";
      case "Yangi":
        return "text-blue-600 bg-blue-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const handleEditChange = (e, idx) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "phone") newValue = formatPhone(value);
    if (name === "plateNumber") newValue = formatCarNumber(value);
    if (name === "model" || name === "plateNumber") {
      setEditData((prev) => ({
        ...prev,
        cars: prev.cars.map((car, i) =>
          i === idx ? { ...car, [name]: newValue } : car
        ),
      }));
    } else {
      setEditData((prev) => ({ ...prev, [name]: newValue }));
    }
  };

  const handleAddCar = () => {
    setEditData((prev) => ({
      ...prev,
      cars: [...prev.cars, { model: "", plateNumber: "" }],
    }));
  };

  const handleRemoveCar = (idx) => {
    setEditData((prev) => ({
      ...prev,
      cars: prev.cars.filter((_, i) => i !== idx),
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (
      !editData.fullName.trim() ||
      !editData.phone.replace(/\s/g, "").trim()
    ) {
      alert("Ism va telefon majburiy!");
      return;
    }
    try {
      const patchData = {
        fullName: editData.fullName.trim(),
        phone: editData.phone.replace(/\s/g, "").trim(),
        birthday: editData.birthday || undefined,
        cars: editData.cars.filter((car) => car.model || car.plateNumber),
      };
      Object.keys(patchData).forEach((key) => {
        if (patchData[key] === undefined || patchData[key] === "") {
          delete patchData[key];
        }
      });
      const updated = await updateUser(patchData);
      setUser(updated);
      setEditOpen(false);
    } catch (err) {
      alert("Xatolik yuz berdi");
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
      <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">
        Profil
      </h2>

      <div className="space-y-6">
        {/* Профиль */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex flex-col gap-2 space-y-1">
              <h3 className="text-xl font-semibold text-gray-900">
                {user.fullName || "N/A"}
              </h3>
              <p className="text-gray-600">{user.phone || "N/A"}</p>
              <p className="text-gray-600">
                Tug'ilgan sana:{" "}
                {user.birthday ? user.birthday.split("T")[0] : "Mavjud emas"}
              </p>
              <button
                onClick={() => setEditOpen(true)}
                className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Tahrirlash
              </button>
            </div>
          </div>
          {editOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative animate-fadeIn">
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
                  onClick={() => setEditOpen(false)}
                  aria-label="Yopish"
                >
                  ×
                </button>
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                  Profilni tahrirlash
                </h3>
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Ism</label>
                    <input
                      type="text"
                      name="fullName"
                      value={editData.fullName}
                      onChange={handleEditChange}
                      className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Telefon</label>
                    <input
                      type="text"
                      name="phone"
                      value={editData.phone}
                      onChange={handleEditChange}
                      className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">
                      Tug'ilgan sana
                    </label>
                    <input
                      type="date"
                      name="birthday"
                      value={editData.birthday || ""}
                      onChange={handleEditChange}
                      className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">
                      Mashinalar
                    </label>
                    <div className="space-y-2">
                      {editData.cars.map((car, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                          <input
                            type="text"
                            name="model"
                            placeholder="Model"
                            value={car.model}
                            onChange={(e) => handleEditChange(e, idx)}
                            className="flex-1 rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />
                          <input
                            type="text"
                            name="plateNumber"
                            placeholder="Raqam (01A123BC)"
                            value={car.plateNumber}
                            onChange={(e) => handleEditChange(e, idx)}
                            className="flex-1 rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />
                          {editData.cars.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveCar(idx)}
                              className="text-red-500 hover:text-red-700 text-lg px-2"
                              aria-label="Mashina o'chirish"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={handleAddCar}
                      className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      + Mashina qo'shish
                    </button>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => setEditOpen(false)}
                      className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                    >
                      Bekor qilish
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Saqlash
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            Mashinalar
          </h3>
          {user.cars && user.cars.length > 0 ? (
            <div className="space-y-3">
              {user.cars.map((car, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row gap-2 items-center border p-3 rounded-lg bg-gray-50"
                >
                  <div className="flex-1">
                    <span className="block text-gray-700 font-medium">
                      Model:
                    </span>
                    <span className="block text-gray-900">
                      {car.model || "-"}
                    </span>
                  </div>
                  <div className="flex-1">
                    <span className="block text-gray-700 font-medium">
                      Raqam:
                    </span>
                    <span className="block text-gray-900">
                      {car.plateNumber || "-"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Mashinalar mavjud emas</p>
          )}
        </div>

        {/* История заказов */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Package className="h-6 w-6 text-gray-600" />
            <h3 className="text-xl font-semibold text-gray-900">
              Buyurtmalar tarixi
            </h3>
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
              <p className="text-gray-500 text-center">
                Buyurtmalar mavjud emas
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Birinchi buyurtmangizni bering
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {order.sana}
                        </span>
                      </div>
                      <p className="font-semibold text-lg">
                        {formatNarx(order.jami)}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getHolatColor(
                        order.holat
                      )}`}
                    >
                      {order.holat}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {order.mahsulotlar.map((mahsulot, index) => (
                      <div
                        key={index}
                        className="flex justify-between text-sm text-gray-600"
                      >
                        <span>
                          {mahsulot.nomi} x{mahsulot.soni}
                        </span>
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
