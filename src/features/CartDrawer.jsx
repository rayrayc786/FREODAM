import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, Plus, Minus, Trash2, Send, ShoppingBag } from 'lucide-react';
import { toggleCart, removeFromCart, updateQuantity } from '../store/cartSlice';
import Button from '../components/Button';

const CartDrawer = () => {
    const { items, isOpen } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handleWhatsAppOrder = () => {
        if (items.length === 0) return;

        let message = `*NEW ORDER FROM FREODEM*\n\n`;
        items.forEach((item, index) => {
            message += `${index + 1}. *${item.name}*\n`;
            message += `   Size: ${item.size} | Qty: ${item.quantity}\n`;
            message += `   Price: ₹${item.price * item.quantity}\n\n`;
        });
        message += `*Total Amount: ₹${total}*\n\n`;
        message += `Please confirm the order. Thanks!`;

        const phone = "919056697204"; // Admin phone number
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={() => dispatch(toggleCart())}
            />
            
            <div className="relative w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
                <div className="p-6 border-b flex items-center justify-between">
                    <h2 className="font-display text-xl font-bold uppercase tracking-tight">Shopping Bag ({items.length})</h2>
                    <button onClick={() => dispatch(toggleCart())} className="p-2 hover:bg-gray-100 transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <ShoppingBag className="w-16 h-16 text-gray-200 mb-4" />
                            <p className="text-gray-500 font-display uppercase text-sm tracking-widest">Your bag is empty</p>
                            <Button variant="outline" className="mt-6" onClick={() => dispatch(toggleCart())}>Start Shopping</Button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={`${item.id}-${item.size}`} className="flex gap-4">
                                <div className="w-24 aspect-[3/4] bg-gray-100 flex-shrink-0">
                                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between gap-2">
                                            <h3 className="text-sm font-bold uppercase tracking-tight truncate leading-tight w-36">{item.name}</h3>
                                            <button 
                                                onClick={() => dispatch(removeFromCart({ id: item.id, size: item.size }))}
                                                className="text-gray-400 hover:text-accent"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <p className="text-xs text-muted uppercase mt-1">Size: {item.size}</p>
                                        <p className="text-sm font-bold mt-1">₹{item.price}</p>
                                    </div>
                                    
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center border border-gray-200">
                                            <button 
                                                className="p-1 hover:bg-gray-100"
                                                onClick={() => dispatch(updateQuantity({ id: item.id, size: item.size, quantity: item.quantity - 1 }))}
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                                            <button 
                                                className="p-1 hover:bg-gray-100"
                                                onClick={() => dispatch(updateQuantity({ id: item.id, size: item.size, quantity: item.quantity + 1 }))}
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="p-6 border-t bg-gray-50">
                        <div className="flex justify-between items-center mb-6">
                            <span className="font-display uppercase text-sm tracking-widest text-muted">Subtotal</span>
                            <span className="text-xl font-bold tracking-tighter">₹{total}</span>
                        </div>
                        <Button 
                            className="w-full flex items-center justify-center gap-3 py-5 text-base"
                            onClick={handleWhatsAppOrder}
                        >
                            <Send className="w-5 h-5 fill-current" />
                            Order on WhatsApp
                        </Button>
                        <p className="mt-4 text-[10px] text-center text-muted uppercase tracking-wider">
                            By clicking, you will be redirected to WhatsApp to confirm your order.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;
