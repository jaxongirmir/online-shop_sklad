import axios from "axios";
import {API_BASE_URL} from "../api/api.js";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getMahsulotlar = async () => {
  await delay(800);
  return fakeProducts;
};
export const registerUser = async (userData) => {
  const res = await axios.post(`${API_BASE_URL}/api/clients`, userData, {
    headers: { "Content-Type": "application/json" },
  });
  if (res.status !== 200 && res.status !== 201) {
    throw new Error("Ro‘yxatdan o‘tishda xatolik yuz berdi");
  }
};

export const loginUser = async (loginData) => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/api/clients/login`,
      loginData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return res.data;
  } catch (err) {
    return { success: false };
  }
};

export const fetchProducts = async () => {
  const res = await axios.get(`${API_BASE_URL}/api/products`);
  if (res.status !== 200) {
    throw new Error("Mahsulotlarni olishda xatolik yuz berdi");
  }
  return res.data;
};

export const getCurrentUser = async () => {
  await delay(300);
  return fakeUser;
};

export const getUserOrders = async () => {
  await delay(500);
  return [];
};

export const createOrder = async (items) => {
  await delay(1500);
  const newOrder = {
    id: Date.now(),
    sana: new Date().toISOString().split("T")[0],
    jami: items.reduce((sum, item) => sum + item.narx * item.soni, 0),
    holat: "Yangi",
    mahsulotlar: items.map((item) => ({
      nomi: item.nomi,
      soni: item.soni,
      narx: item.narx,
    })),
  };
  return { success: true, order: newOrder };
};
