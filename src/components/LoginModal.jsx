import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { formatCarNumber, formatPhone } from "../hooks/formats";

const LoginModal = ({ isOpen, onClose }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [parol, setParol] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁
  const [ism, setIsm] = useState("");
  const [birthday, setBirthday] = useState("");
  const [cars, setCars] = useState([{ model: "", plateNumber: "" }]); // ✅
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  const resetForm = () => {
    setPhoneNumber("");
    setParol("");
    setIsm("");
    setBirthday("");
    setCars([{ model: "", plateNumber: "" }]);
  };

  const handleCarChange = (index, field, value) => {
    setCars((prev) =>
      prev.map((car, i) =>
        i === index
          ? {
              ...car,
              [field]: field === "plateNumber" ? formatCarNumber(value) : value,
            }
          : car
      )
    );
  };

  const handleAddCar = () => {
    setCars((prev) => [...prev, { model: "", plateNumber: "" }]);
  };

  const handleRemoveCar = (index) => {
    setCars((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegistering) {
        const userData = {
          fullName: ism,
          phone: phoneNumber.replace(/\s/g, ""),
          password: parol,
          birthday: birthday || null,
          isVip: false,
          notes: "Sitda yangi ro‘yxatdan o‘tgan foydalanuvchi",
          cars: cars.filter((car) => car.model || car.plateNumber),
        };
        if (!birthday) delete userData.birthday;

        await register(userData);
        setIsRegistering(false);
        resetForm();
      } else {
        const loginData = {
          phone: phoneNumber.replace(/\s/g, ""),
          password: parol,
        };
        const success = await login(loginData);
        if (success) {
          onClose();
          resetForm();
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            {isRegistering ? "Ro‘yxatdan o‘tish" : "Tizimga kirish"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To‘liq ismingiz
                </label>
                <input
                  type="text"
                  value={ism}
                  onChange={(e) => setIsm(e.target.value)}
                  className="w-full px-4 py-2 border rounded-xl"
                  required
                  placeholder="Ismingiz"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tug‘ilgan sana
                </label>
                <input
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  className="w-full px-4 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mashinalar
                </label>
                <div className="space-y-2">
                  {cars.map((car, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Model"
                        value={car.model}
                        onChange={(e) =>
                          handleCarChange(idx, "model", e.target.value)
                        }
                        className="flex-1 px-3 py-2 border rounded-lg"
                      />
                      <input
                        type="text"
                        placeholder="01A123BC"
                        value={car.plateNumber}
                        onChange={(e) =>
                          handleCarChange(idx, "plateNumber", e.target.value)
                        }
                        className="flex-1 px-3 py-2 border rounded-lg uppercase"
                      />
                      {cars.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveCar(idx)}
                          className="text-red-500 hover:text-red-700 text-lg"
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
                  + Mashina qo‘shish
                </button>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefon
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(formatPhone(e.target.value))}
              maxLength={17}
              className="w-full px-4 py-2 border rounded-xl"
              required
              placeholder="+998 90 123 45 67"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parol
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // 👁
                value={parol}
                onChange={(e) => setParol(e.target.value)}
                className="w-full px-4 py-2 border rounded-xl pr-10"
                required
                placeholder="Parolingiz"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {isRegistering ? "Ro‘yxatdan o‘tmoqda..." : "Kirish..."}
              </div>
            ) : isRegistering ? (
              "Ro‘yxatdan o‘tish"
            ) : (
              "Kirish"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {isRegistering
              ? "Allaqachon hisobingiz bormi?"
              : "Hisobingiz yo‘qmi?"}
            <button
              onClick={() => {
                setIsRegistering(!isRegistering);
                resetForm();
              }}
              className="text-blue-600 ml-1 underline"
            >
              {isRegistering ? "Kirish" : "Ro‘yxatdan o‘tish"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
