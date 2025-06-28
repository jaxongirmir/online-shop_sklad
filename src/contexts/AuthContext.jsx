import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, getCurrentUser, registerUser } from "../services/api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    if (token) {
      getCurrentUser(id)
        .then((userData) => {
          setUser(userData);
        })
        .catch(() => {
          localStorage.removeItem("token");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (phone, password) => {
    try {
      const response = await loginUser(phone, password);
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("id", response.client._id);
        setUser(response.client);
        toast.success(response.message || "Kirish muvaffaqiyatli!");
        return true;
      }
      toast.error(response.message || "Kirishda xatolik");
      return false;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Kirish xatoligi");
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const response = await registerUser(userData);
      toast.success("Ro‘yxatdan o‘tish muvaffaqiyatli!");
      return response;
    } catch (error) {
      console.error("Register error:", error);
      toast.error("Ro‘yxatdan o‘tishda xatolik");
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Tizimdan chiqildi");
  };

  const value = {
    user,
    setUser,
    login,
    logout,
    register,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
