import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Plus, Edit2, Trash2, Eye, EyeOff, X } from 'lucide-react';
import { addProduct, updateProduct, deleteProduct, toggleStock } from '../store/productSlice';
import Button from '../components/Button';
import Badge from '../components/Badge';

const AdminDashboard = () => {
    const products = useSelector(state => state.products.items);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin123') { // Simple hardcoded password
            setIsLoggedIn(true);
        } else {
            alert('Incorrect Password');
        }
    };

    const handleSave = (productData) => {
        if (editingProduct) {
            dispatch(updateProduct({ ...productData, id: editingProduct.id }));
        } else {
            dispatch(addProduct({ ...productData, id: Date.now().toString() }));
        }
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black p-4">
                <div className="bg-white p-8 max-w-md w-full shadow-2xl">
                    <h1 className="font-display text-2xl font-black italic mb-6 text-center underline underline-offset-8 decoration-accent">FREODEM ADMIN</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input 
                            type="password" 
                            placeholder="Enter Password" 
                            className="input-field" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button className="w-full">Unlock Dashboard</Button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-black italic">DASHBOARD</h1>
                        <p className="text-muted text-sm uppercase tracking-widest font-bold">Manage your street store inventory</p>
                    </div>
                    <Button 
                        onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}
                        className="flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> Add Product
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map(product => (
                        <div key={product.id} className="bg-white p-4 shadow-sm relative group">
                             <div className="aspect-square bg-gray-100 mb-4 overflow-hidden">
                                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                             </div>
                             <div className="space-y-1">
                                <h3 className="font-bold text-xs uppercase truncate leading-tight">{product.name}</h3>
                                <p className="text-[10px] text-muted uppercase">{product.category}</p>
                                <div className="flex justify-between items-center">
                                    <span className="font-black">₹{product.price}</span>
                                    {product.inStock === false ? (
                                        <Badge variant="outline" className="text-accent border-accent">Out of Stock</Badge>
                                    ) : (
                                        <Badge variant="new">In Stock</Badge>
                                    )}
                                </div>
                             </div>

                             <div className="flex gap-2 mt-4">
                                <button 
                                    onClick={() => { setEditingProduct(product); setIsModalOpen(true); }}
                                    className="flex-1 py-2 bg-gray-100 hover:bg-black hover:text-white transition-colors flex items-center justify-center"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button 
                                    onClick={() => dispatch(toggleStock(product.id))}
                                    className="flex-1 py-2 bg-gray-100 hover:bg-black hover:text-white transition-colors flex items-center justify-center"
                                >
                                    {product.inStock === false ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                </button>
                                <button 
                                    onClick={() => { if(window.confirm('Delete this product?')) dispatch(deleteProduct(product.id)); }}
                                    className="flex-1 py-2 bg-gray-100 hover:bg-accent hover:text-white transition-colors flex items-center justify-center text-accent"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                             </div>
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
                    <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl sm:soft-radius">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-black italic">{editingProduct ? 'EDIT PRODUCT' : 'ADD PRODUCT'}</h2>
                            <button onClick={() => setIsModalOpen(false)}><X /></button>
                        </div>
                        <AdminForm product={editingProduct} onSave={handleSave} />
                    </div>
                </div>
            )}
        </div>
    );
};

const AdminForm = ({ product, onSave }) => {
    const [formData, setFormData] = useState(product || {
        name: '',
        price: '',
        originalPrice: '',
        category: 'Oversized T-Shirts',
        description: '',
        images: [''],
        sizes: ['S', 'M', 'L', 'XL'],
        isNew: true,
        discount: 0,
        inStock: true
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            price: Number(formData.price),
            originalPrice: Number(formData.originalPrice),
            discount: Number(formData.discount)
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-muted tracking-widest">Product Name</label>
                    <input type="text" className="input-field" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-muted tracking-widest">Category</label>
                    <select className="input-field" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                        <option>Oversized T-Shirts</option>
                        <option>Bottoms</option>
                        <option>Outerwear</option>
                        <option>Accessories</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-muted tracking-widest">Price (₹)</label>
                    <input type="number" className="input-field" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-muted tracking-widest">Original Price (₹)</label>
                    <input type="number" className="input-field" required value={formData.originalPrice} onChange={e => setFormData({...formData, originalPrice: e.target.value})} />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-muted tracking-widest">Discount (%)</label>
                    <input type="number" className="input-field" value={formData.discount} onChange={e => setFormData({...formData, discount: e.target.value})} />
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted tracking-widest">Image URL</label>
                <input type="url" className="input-field" required placeholder="https://unsplash..." value={formData.images[0]} onChange={e => setFormData({...formData, images: [e.target.value]})} />
            </div>

            <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted tracking-widest">Description</label>
                <textarea className="input-field min-h-[100px]" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            </div>

            <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.isNew} onChange={e => setFormData({...formData, isNew: e.target.checked})} className="w-4 h-4 accent-black" />
                    <span className="text-xs uppercase font-bold">New Arrival</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.inStock} onChange={e => setFormData({...formData, inStock: e.target.checked})} className="w-4 h-4 accent-black" />
                    <span className="text-xs uppercase font-bold">In Stock</span>
                </label>
            </div>

            <Button className="w-full">Save Changes</Button>
        </form>
    );
};

export default AdminDashboard;
