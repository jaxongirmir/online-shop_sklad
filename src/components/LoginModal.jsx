import { useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const LoginModal = ({ isOpen, onClose }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [parol, setParol] = useState("");
  const [ism, setIsm] = useState("");
  const [telefon, setTelefon] = useState("");
  const [birthday, setBirthday] = useState("");
  const [loading, setLoading] = useState(false);
  const [carNumber, setCarNumber] = useState("");
  const [carModel, setCarModel] = useState("");
  const { login, register } = useAuth();

  const resetForm = () => {
    setPhoneNumber("");
    setParol("");
    setIsm("");
    setTelefon("");
    setBirthday("");
    setCarNumber("");
    setCarModel("");
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
          birthday: birthday || "",
          isVip: false,
          notes: "Sitda yangi ro‘yxatdan o‘tgan foydalanuvchi",
          cars: carNumber ? [{ model: carModel, plateNumber: carNumber }] : [],
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

  const formatPhone = (value) => {
    let digits = value.replace(/\D/g, "");
    if (digits.startsWith("998")) digits = digits.slice(3);
    digits = digits.slice(0, 9);
    let formatted = "+998";
    if (digits.length > 0) formatted += " " + digits.slice(0, 2);
    if (digits.length > 2) formatted += " " + digits.slice(2, 5);
    if (digits.length > 5) formatted += " " + digits.slice(5, 7);
    if (digits.length > 7) formatted += " " + digits.slice(7, 9);
    return formatted;
  };

  const formatCarNumber = (value) => {
    let v = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    let formatted = "";
    if (v.length > 0) formatted += v.slice(0, 2);
    if (v.length > 2) formatted += v.slice(2, 3);
    if (v.length > 3) formatted += v.slice(3, 6);
    if (v.length > 6) formatted += v.slice(6, 8);
    return formatted;
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
            className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Toliq Ismingiz
                </label>
                <input
                  type="text"
                  value={ism}
                  onChange={(e) => setIsm(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 shadow-sm bg-gradient-to-r from-white to-blue-50 placeholder-gray-400 text-gray-800"
                  required
                  placeholder="Ismingiz"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tug'ilgan sana
                </label>
                <input
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 shadow-sm bg-gradient-to-r from-white to-blue-50 placeholder-gray-400 text-gray-800 appearance-none relative"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg width='20' height='20' fill='none' stroke='%236B7280' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    backgroundSize: "1.5em 1.5em",
                  }}
                  placeholder="YYYY-MM-DD"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Avtomobil raqami
                </label>
                <input
                  type="text"
                  value={carNumber}
                  onChange={(e) =>
                    setCarNumber(formatCarNumber(e.target.value))
                  }
                  maxLength={8}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 shadow-sm bg-gradient-to-r from-white to-blue-50 placeholder-gray-400 text-gray-800 uppercase"
                  placeholder="01A123BC"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Avtomobil modeli
                </label>
                <input
                  type="text"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 shadow-sm bg-gradient-to-r from-white to-blue-50 placeholder-gray-400 text-gray-800"
                  placeholder="Nexia 3"
                />
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
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 shadow-sm bg-gradient-to-r from-white to-blue-50 placeholder-gray-400 text-gray-800"
              required
              placeholder="+998 90 123 45 67"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parol
            </label>
            <input
              type="password"
              value={parol}
              onChange={(e) => setParol(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 shadow-sm bg-gradient-to-r from-white to-blue-50 placeholder-gray-400 text-gray-800"
              required
              placeholder="Parolingiz"
            />
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
