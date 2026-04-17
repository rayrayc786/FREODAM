import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Heart, ShoppingBag, Send, ChevronRight, Truck, RefreshCw, Shield } from 'lucide-react';
import { addToCart } from '../store/cartSlice';
import Button from '../components/Button';
import Badge from '../components/Badge';
import gsap from 'gsap';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.items.find(p => p.id === id));
    
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
        gsap.fromTo(".product-image", 
            { x: -30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
        );
        gsap.fromTo(".product-info > *", 
            { x: 30, opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power2.out" }
        );
    }, [id]);

    if (!product) return <div className="pt-24 text-center">Product not found</div>;

    const handleWhatsAppOrder = () => {
        const sizeMsg = selectedSize ? `(Size: ${selectedSize})` : '';
        const message = `*INQUIRY FROM FREODAM*\n\nI want to buy: *${product.name}* ${sizeMsg}\nPrice: ₹${product.price}\nImage: ${window.location.href}`;
        const phone = "919056697204";
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }
        dispatch(addToCart({ product, size: selectedSize }));
    };

    return (
        <div className="pt-24 pb-24 max-w-7xl mx-auto px-4 !text-black">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-muted mb-8">
                <span className="cursor-pointer hover:!text-black" onClick={() => navigate('/')}>Home</span>
                <ChevronRight className="w-3 h-3" />
                <span className="cursor-pointer hover:!text-black" onClick={() => navigate(`/category/${product.category}`)}>{product.category}</span>
                <ChevronRight className="w-3 h-3" />
                <span className="!text-black">{product.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Images */}
                <div className="lg:col-span-7 flex flex-col md:flex-row-reverse gap-4">
                    <div className="flex-1 aspect-[3/4] bg-gray-100 product-image">
                        <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible">
                        {product.images.map((img, idx) => (
                            <button 
                                key={idx} 
                                onClick={() => setSelectedImage(idx)}
                                className={`w-20 md:w-24 aspect-[3/4] border-2 transition-all ${selectedImage === idx ? 'border-black' : 'border-transparent opacity-60'}`}
                            >
                                <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Info */}
                <div className="lg:col-span-5 product-info flex flex-col !text-black">
                    <div className="mb-2">
                        {product.isNew && <Badge variant="new" className="mr-2">New Arrival</Badge>}
                        {product.discount > 0 && <Badge variant="sale">Save {product.discount}%</Badge>}
                    </div>
                    <h1 className="text-4xl font-black italic tracking-tighter leading-tight mb-2 uppercase !text-black">{product.name}</h1>
                    <p className="text-muted text-sm uppercase tracking-widest mb-6">{product.category}</p>
                    
                    <div className="flex items-center gap-4 mb-8 !text-black">
                        <span className="text-3xl font-black !text-black">₹{product.price}</span>
                        {product.originalPrice > product.price && (
                            <div className="flex flex-col">
                                <span className="text-sm text-muted line-through">₹{product.originalPrice}</span>
                                <span className="text-[10px] text-accent font-bold uppercase">Incl. of all taxes</span>
                            </div>
                        )}
                    </div>

                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs uppercase font-bold tracking-widest">Select Size</span>
                            <button className="text-[10px] uppercase font-bold underline underline-offset-4">Size Guide</button>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {product.sizes.map(size => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`py-3 text-sm font-bold border transition-all ${
                                        selectedSize === size ? 'bg-black text-white border-black' : 'border-gray-200 hover:border-black'
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 mb-12">
                        {/* THE MOST PROMINENT BUTTON */}
                        <Button 
                            className="w-full flex items-center justify-center gap-3 py-6 text-lg !bg-[#25D366] !text-white border-none shadow-[0_10px_20px_-10px_#25D366] hover:opacity-90 transition-opacity" 
                            onClick={handleWhatsAppOrder}
                        >
                            <Send className="w-6 h-6 fill-current !text-white" />
                            ORDER ON WHATSAPP
                        </Button>
                        
                        <Button variant="outline" className="w-full flex items-center justify-center gap-3 py-5 !border-black !text-black hover:bg-black hover:!text-white" onClick={handleAddToCart}>
                            <ShoppingBag className="w-5 h-5" />
                            Add to Bag
                        </Button>
                    </div>

                    <div className="space-y-6 pt-8 border-t">
                        <div className="flex gap-4 items-start">
                             <div className="bg-gray-100 p-2"><Truck className="w-5 h-5" /></div>
                             <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest">Free Express Shipping</h4>
                                <p className="text-[10px] text-muted uppercase mt-1">Delivery in 2-4 working days across India.</p>
                             </div>
                        </div>
                        <div className="flex gap-4 items-start">
                             <div className="bg-gray-100 p-2"><RefreshCw className="w-5 h-5" /></div>
                             <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest">7 Days Return Policy</h4>
                                <p className="text-[10px] text-muted uppercase mt-1">Easy returns and quick refunds guaranteed.</p>
                             </div>
                        </div>
                    </div>

                    <div className="mt-12">
                        <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Product details</h4>
                        <p className="text-sm text-gray-600 leading-relaxed uppercase tracking-tight">
                            {product.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
