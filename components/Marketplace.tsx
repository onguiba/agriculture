
import React, { useState } from 'react';
import { Product } from '../types';
import StarRating from './StarRating';

interface MarketplaceProps {
  onOrder: (product: Product, qty: number) => void;
  products: Product[];
}

const Marketplace: React.FC<MarketplaceProps> = ({ onOrder, products }) => {
  const [search, setSearch] = useState('');
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight italic">
          MARCHÉ <span className="text-emerald-600">FRAIS</span>
        </h2>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Directement depuis la source</p>
      </div>

      <div className="relative group">
        <div className="absolute inset-0 bg-emerald-400/20 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
        <input 
          type="text" 
          placeholder="Rechercher des produits..."
          className="relative w-full p-6 pl-16 rounded-[2rem] glass-card border-none shadow-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm font-semibold placeholder:text-gray-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="absolute left-7 top-6 text-xl transition-transform group-focus-within:scale-110">🔍</span>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {filtered.map(product => (
          <div key={product.id} className={`group glass-card rounded-[3rem] overflow-hidden transition-all hover:translate-y-[-8px] ${product.quantity <= 0 ? 'opacity-60 grayscale' : ''}`}>
            <div className="relative h-60 overflow-hidden">
              <img src={product.photos[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] shadow-xl">
                {product.zone}
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-black text-gray-800 leading-none mb-1">{product.name}</h3>
                  <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Par {product.farmerName}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-emerald-800 leading-none">
                    {product.pricePerUnit}
                    <span className="text-sm ml-1 text-emerald-600 font-bold uppercase">CFA</span>
                  </div>
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-tighter mt-1">Par {product.unit}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-6 border-t border-gray-100/50">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${product.quantity > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
                  <p className="text-[10px] font-black text-gray-400 uppercase">Stock: {product.quantity} {product.unit}</p>
                </div>
                <button 
                  onClick={() => product.quantity > 0 && onOrder(product, 10)}
                  disabled={product.quantity <= 0}
                  className={`bg-gradient-to-br from-emerald-600 to-teal-700 text-white px-10 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all ${product.quantity <= 0 ? 'from-gray-400 to-gray-500' : 'hover:shadow-emerald-500/50'}`}
                >
                  {product.quantity > 0 ? 'Commander' : 'Épuisé'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
