import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import gsap from 'gsap';
import Badge from './Badge';

const ProductCard = ({ product }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(cardRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  return (
    <div 
      ref={cardRef}
      className="group relative flex flex-col"
    >
      <Link to={`/product/${product.id}`} className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && <Badge variant="new">New</Badge>}
          {product.discount > 0 && <Badge variant="sale">Save {product.discount}%</Badge>}
        </div>
        <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-black hover:text-white">
          <Heart className="w-5 h-5" />
        </button>
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-black/60 backdrop-blur-sm">
            <button className="w-full bg-white text-black py-2 font-display uppercase text-xs tracking-widest hover:bg-black hover:text-white transition-colors">
                Quick Add
            </button>
        </div>
      </Link>

      <div className="mt-4 flex flex-col gap-1">
        <h3 className="text-sm font-display uppercase tracking-tight truncate leading-tight !text-black">
          <Link to={`/product/${product.id}`}>
            {product.name}
          </Link>
        </h3>
        <p className="text-[10px] text-muted uppercase">{product.category}</p>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm font-bold !text-black">₹{product.price}</span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-muted line-through">₹{product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
