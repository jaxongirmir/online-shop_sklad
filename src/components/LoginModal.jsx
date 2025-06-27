import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginModal = ({ isOpen, onClose }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [parol, setParol] = useState('');
  const [ism, setIsm] = useState('Jaxongir Mirhalikov');
  const [telefon, setTelefon] = useState('+998774497188');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  const resetForm = () => {
    setEmail('');
    setParol('');
    setIsm('Jaxongir Mirhalikov');
    setTelefon('+998774497188');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegistering) {
        await register({ id: 1, ism, email, parol, telefon });
        setIsRegistering(false);
        resetForm();
      } else {
        const success = await login(email, parol);
        if (success) {
          onClose();
          resetForm();
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
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
            {isRegistering ? 'Ro‘yxatdan o‘tish' : 'Tizimga kirish'}
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
                  Ism
                </label>
                <input
                  type="text"
                  value={ism}
                  onChange={(e) => setIsm(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="Ismingiz"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon
                </label>
                <input
                  type="tel"
                  value={telefon}
                  onChange={(e) => setTelefon(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="+998..."
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
              placeholder="email@example.com"
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
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
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
                {isRegistering ? 'Ro‘yxatdan o‘tmoqda...' : 'Kirish...'}
              </div>
            ) : (
              isRegistering ? 'Ro‘yxatdan o‘tish' : 'Kirish'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {isRegistering
              ? 'Allaqachon hisobingiz bormi?'
              : 'Hisobingiz yo‘qmi?'}
            <button
              onClick={() => {
                setIsRegistering(!isRegistering);
                resetForm();
              }}
              className="text-blue-600 ml-1 underline"
            >
              {isRegistering ? 'Kirish' : 'Ro‘yxatdan o‘tish'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
