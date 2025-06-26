import axios from 'axios';

const API_BASE_URL = 'https://api.example.com';

const fakeProducts = [
  {
    id: 1,
    nomi: 'Samsung Galaxy S23',
    narx: 8500000,
    rasm: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400',
    tavsif: 'Zamonaviy smartfon yuqori sifatli kamera bilan'
  },
  {
    id: 2,
    nomi: 'iPhone 14 Pro',
    narx: 12000000,
    rasm: 'https://images.pexels.com/photos/1275229/pexels-photo-1275229.jpeg?auto=compress&cs=tinysrgb&w=400',
    tavsif: 'Apple smartfoni professional foydalanuvchilar uchun'
  },
  {
    id: 3,
    nomi: 'MacBook Pro M2',
    narx: 25000000,
    rasm: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
    tavsif: 'Professional laptop ishbilarmonlar uchun'
  },
  {
    id: 4,
    nomi: 'AirPods Pro',
    narx: 3500000,
    rasm: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=400',
    tavsif: 'Simsiz quloqchin shovqinni bekor qilish bilan'
  },
  {
    id: 5,
    nomi: 'iPad Air',
    narx: 7500000,
    rasm: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=400',
    tavsif: 'Planshot kompyuter ijodiy ishlar uchun'
  },
  {
    id: 6,
    nomi: 'Apple Watch',
    narx: 4500000,
    rasm: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
    tavsif: 'Aqlli soat salomatlik nazorati bilan'
  },
  {
    id: 7,
    nomi: 'Sony WH-1000XM4',
    narx: 2800000,
    rasm: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
    tavsif: 'Premium simsiz quloqchin'
  },
  {
    id: 8,
    nomi: 'Dell XPS 13',
    narx: 18000000,
    rasm: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400',
    tavsif: 'Yengil va kuchli ultrabook'
  }
];

const fakeUser = {
  id: 1,
  ism: 'Jasur Karimov',
  email: 'jasur@example.com',
  telefon: '+998901234567'
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getMahsulotlar = async () => {
  await delay(800);
  return fakeProducts;
};

export const loginUser = async (email, parol) => {
  await delay(1200);
  if (email && parol) {
    return {
      success: true,
      token: 'fake-jwt-token',
      user: fakeUser
    };
  }
  return { success: false };
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
    sana: new Date().toISOString().split('T')[0],
    jami: items.reduce((sum, item) => sum + (item.narx * item.soni), 0),
    holat: 'Yangi',
    mahsulotlar: items.map(item => ({
      nomi: item.nomi,
      soni: item.soni,
      narx: item.narx
    }))
  };
  return { success: true, order: newOrder };
};