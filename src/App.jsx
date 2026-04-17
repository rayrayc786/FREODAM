import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CartDrawer from './features/CartDrawer';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ProductDetail from './pages/ProductDetail';
import AdminDashboard from './pages/AdminDashboard';
import Search from './pages/Search';
import { useSelector } from 'react-redux';

function App() {
  const isCartOpen = useSelector(state => state.cart.isOpen);

  return (
    <div className={`min-h-screen flex flex-col ${isCartOpen ? 'overflow-hidden' : ''}`}>
      <Navbar />
      <CartDrawer />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <h2 className="font-display text-2xl font-black italic mb-6">FREO<span className="text-accent underline">DAM</span></h2>
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest leading-loose">
              Streetwear that defines attitude. Experience premium comfort with our new oversized drop.
            </p>
          </div>
          <div>
            <h4 className="font-display text-xs font-black mb-6 uppercase tracking-widest">Shop</h4>
            <ul className="space-y-4 text-[10px] text-gray-400 uppercase font-bold tracking-widest">
              <li><a href="#" className="hover:text-white">Oversized T-Shirts</a></li>
              <li><a href="#" className="hover:text-white">Bottoms</a></li>
              <li><a href="#" className="hover:text-white">Outerwear</a></li>
              <li><a href="#" className="hover:text-white">Accessories</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-xs font-black mb-6 uppercase tracking-widest">Help</h4>
            <ul className="space-y-4 text-[10px] text-gray-400 uppercase font-bold tracking-widest">
              <li><a href="#" className="hover:text-white">Order Tracking</a></li>
              <li><a href="#" className="hover:text-white">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-white">Size Guide</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-xs font-black mb-6 uppercase tracking-widest">Social</h4>
            <ul className="space-y-4 text-[10px] text-gray-400 uppercase font-bold tracking-widest">
              <li><a href="#" className="hover:text-white">Instagram</a></li>
              <li><a href="#" className="hover:text-white">Discord</a></li>
              <li><a href="#" className="hover:text-white">YouTube</a></li>
              <li><a href="#" className="hover:text-white">Pinterest</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/10 mt-16 pt-8 text-center">
          <p className="text-[9px] text-gray-500 uppercase font-bold tracking-[0.2em]">© 2026 FREODAM. BEYOND ORDINARY. DESIGNED FOR THE GANG.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
