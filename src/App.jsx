import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import LoginModal from './components/LoginModal';
import Profile from './components/Profile';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Header
              onLoginClick={() => setIsLoginModalOpen(true)}
              onCartClick={() => {}}
              onProfileClick={() => {}}
              onMenuClick={() => setIsSidebarOpen(true)}
            />
            <div className="flex">
              <Sidebar
                activeTab={activeTab}
                onTabChange={(tab) => {}}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
              />
              <main className="flex-1 lg:ml-64">
                <Routes>
                  <Route path="/" element={<ProductList />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </div>
            <LoginModal
              isOpen={isLoginModalOpen}
              onClose={() => setIsLoginModalOpen(false)}
            />
            <Toaster
              position="top-left"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#2563eb',
                  color: '#fff',
                },
                success: {
                  style: {
                    background: '#2563eb',
                  },
                },
                error: {
                  style: {
                    background: '#EF4444',
                  },
                },
              }}
            />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;