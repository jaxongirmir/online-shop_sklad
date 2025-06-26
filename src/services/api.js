import axios from 'axios';

const API_BASE_URL = 'https://api.example.com';

const fakeProducts = [
  {
    id: 1,
    batch_number: '26-May',
    name: "Simeno Fall",
    salePrice: 4500000,
    quantity: 48,
    createdAt: new Date()
  },
    {
    id: 2,
    batch_number: '28-May',
    name: "Simeno Home",
    salePrice: 9830000,
    quantity: 80,
    createdAt: new Date()
  },
   {
    id: 3,
    batch_number: '28-May',
    name: "Simeno Pade",
    salePrice: 400000,
    quantity: 129,
    createdAt: new Date()
  },
 {
    id: 4,
    batch_number: '26-May',
    name: "Simeno Fall",
    salePrice: 4500000,
    quantity: 48,
    createdAt: new Date()
  },
    {
    id: 5,
    batch_number: '28-May',
    name: "Simeno Home",
    salePrice: 9830000,
    quantity: 80,
    createdAt: new Date()
  },
   {
    id: 6,
    batch_number: '28-May',
    name: "Simeno Pade",
    salePrice: 400000,
    quantity: 129,
    createdAt: new Date()
  },
{
    id: 7,
    batch_number: '26-May',
    name: "Simeno Fall",
    salePrice: 4500000,
    quantity: 48,
    createdAt: new Date()
  },
    {
    id: 8,
    batch_number: '28-May',
    name: "Simeno Home",
    salePrice: 9830000,
    quantity: 80,
    createdAt: new Date()
  },
   {
    id: 9,
    batch_number: '28-May',
    name: "Simeno Pade",
    salePrice: 400000,
    quantity: 129,
    createdAt: new Date()
  },
];

const fakeUser = {
  id: 1,
  ism: 'Jaxongir Mirhalikov',
  email: 'jaxongirmirhalikov@example.com',
  telefon: '+998774497188'
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