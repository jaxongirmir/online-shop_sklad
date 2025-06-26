import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [savatItems, setSavatItems] = useState([]);

  const savatgaQoshish = (mahsulot) => {
    setSavatItems(prev => {
      const mavjudItem = prev.find(item => item.id === mahsulot.id);
      if (mavjudItem) {
        toast.success('Mahsulot miqdori oshirildi');
        return prev.map(item =>
          item.id === mahsulot.id
            ? { ...item, soni: item.soni + 1 }
            : item
        );
      }
      toast.success('Mahsulot savatga qo\'shildi');
      return [...prev, { ...mahsulot, soni: 1 }];
    });
  };

  const savatdanOlib = (id) => {
    setSavatItems(prev => prev.filter(item => item.id !== id));
    toast.success('Mahsulot savatdan olib tashlandi');
  };

  const soniniKamaytirish = (id) => {
    setSavatItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          if (item.soni > 1) {
            return { ...item, soni: item.soni - 1 };
          }
        }
        return item;
      });
    });
  };

  const savatniTozalash = () => {
    setSavatItems([]);
  };

  const jamiNarx = savatItems.reduce((jami, item) => jami + (item.narx * item.soni), 0);
  const jamiSoni = savatItems.reduce((jami, item) => jami + item.soni, 0);

  const value = {
    savatItems,
    savatgaQoshish,
    savatdanOlib,
    soniniKamaytirish,
    savatniTozalash,
    jamiNarx,
    jamiSoni
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};