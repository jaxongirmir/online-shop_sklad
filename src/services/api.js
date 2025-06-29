import axios from "axios";
import { API_BASE_URL } from "../api/api.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
export const getBranchs = async () => {
  const res = await axios.get(`${API_BASE_URL}/api/branches`);
  if (res.status !== 200) {
    throw new Error("Filial olishda xatolik yuz berdi");
  }
  return res.data;
};
export const getCurrentUser = async (id) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/clients/${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (err) {
    return { success: false };
  }
};

export const getUserOrders = async () => {
  await delay(500);
  return [];
};

export const createOrder = async (savatItems, options = {}) => {
  const clientId = options.clientId || localStorage.getItem("id");
  const branch = options.branch || "main";
  const products = savatItems.map((item) => ({
    product: item._id || item.id,
    quantity: item.soni,
    price: item.salePrice,
  }));
  const totalAmount = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const paidAmount = totalAmount;
  const debtAmount = 0;
  const orderData = {
    client: clientId,
    branch,
    orderType: "vip",
    products,
    totalAmount,
    paidAmount,
    debtAmount,
    paymentType: "cash",
    notes: "Online shop order",
    date_returned: "2025-06-28",
  };
  const res = await axios.post(`${API_BASE_URL}/api/orders`, orderData, {
    headers: { "Content-Type": "application/json" },
  });
  if (res.status !== 200 && res.status !== 201) {
    throw new Error("Buyurtma yuborishda xatolik yuz berdi");
  }
  return res.data;
};

export const updateUser = async (patchData) => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const res = await axios.patch(
    `${API_BASE_URL}/api/clients/${id}`,
    patchData,
    {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }
  );
  if (res.status !== 200 && res.status !== 201) {
    throw new Error("Profilni yangilashda xatolik yuz berdi");
  }
  return res.data;
};
