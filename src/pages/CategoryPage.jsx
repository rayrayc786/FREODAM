import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const CategoryPage = () => {
    const { categoryId } = useParams();
    const allProducts = useSelector(state => state.products.items);
    const [sortBy, setSortBy] = useState('Newest');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState('All');
    const [priceRange, setPriceRange] = useState('All');

    const categories = useMemo(() => ['All', ...new Set(allProducts.map(p => p.category))], [allProducts]);
    
    const priceOptions = [
        { label: 'All', value: 'All' },
        { label: 'Under ₹1000', value: '0-1000' },
        { label: '₹1000 - ₹2000', value: '1000-2000' },
        { label: 'Over ₹2000', value: '2000-10000' },
    ];

    const filteredProducts = useMemo(() => {
        let result = [...allProducts];

        // 1. Initial category filter from path
        if (categoryId !== 'All') {
            result = result.filter(p => p.category === categoryId);
        }

        // 2. Secondary category filter from sidebar
        if (activeCategory !== 'All') {
            result = result.filter(p => p.category === activeCategory);
        }

        // 3. Price filter
        if (priceRange !== 'All') {
            const [min, max] = priceRange.split('-').map(Number);
            result = result.filter(p => p.price >= min && p.price <= max);
        }

        // 4. Sorting
        return result.sort((a, b) => {
            if (sortBy === 'Price: Low to High') return a.price - b.price;
            if (sortBy === 'Price: High to Low') return b.price - a.price;
            return 0;
        });
    }, [allProducts, categoryId, activeCategory, priceRange, sortBy]);

    return (
        <div className="pt-24 pb-24 max-w-7xl mx-auto px-4 relative">
            {/* Filter Sidebar Overlay */}
            <div className={`fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 ${isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div 
                    className={`absolute inset-y-0 right-0 w-full max-w-sm bg-white p-8 transition-transform duration-500 ease-out transform ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    <div className="flex items-center justify-between mb-12 border-b pb-6">
                        <h2 className="text-2xl font-black italic tracking-tighter">FILTERS</h2>
                        <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="space-y-12">
                        {/* Categories (only show if on 'All' page) */}
                        {categoryId === 'All' && (
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-accent">Categories</h3>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map(cat => (
                                        <button 
                                            key={cat}
                                            onClick={() => setActiveCategory(cat)}
                                            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${
                                                activeCategory === cat ? 'bg-black text-white border-black' : 'hover:border-black'
                                            }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Price Range */}
                        <div>
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-accent">Price Range</h3>
                            <div className="grid grid-cols-1 gap-3">
                                {priceOptions.map(opt => (
                                    <button 
                                        key={opt.value}
                                        onClick={() => setPriceRange(opt.value)}
                                        className={`text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest border transition-all flex justify-between items-center ${
                                            priceRange === opt.value ? 'bg-black text-white border-black' : 'hover:border-black'
                                        }`}
                                    >
                                        {opt.label}
                                        {priceRange === opt.value && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-12">
                            <button 
                                onClick={() => setIsFilterOpen(false)}
                                className="w-full bg-black text-white py-4 font-display font-black italic text-sm tracking-widest uppercase hover:bg-gray-900 transition-all"
                            >
                                Show {filteredProducts.length} Products
                            </button>
                            <button 
                                onClick={() => {
                                    setActiveCategory('All');
                                    setPriceRange('All');
                                }}
                                className="w-full mt-4 text-[10px] font-bold uppercase tracking-widest text-muted hover:text-black transition-colors underline underline-offset-4"
                            >
                                Reset All Filters
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-5xl font-black italic tracking-tighter uppercase">{categoryId}</h1>
                    <p className="text-muted text-xs font-bold uppercase tracking-widest mt-2">{filteredProducts.length} PRODUCTS FOUND</p>
                </div>
                
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-none">
                        <select 
                            className="w-full md:w-48 appearance-none bg-white border border-gray-200 px-4 py-3 text-[10px] font-bold uppercase tracking-widest outline-none focus:border-black cursor-pointer"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option>Newest</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
                    </div>
                    <button 
                        onClick={() => setIsFilterOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-gray-900 transition-all active:scale-95"
                    >
                        <SlidersHorizontal className="w-4 h-4 text-accent" /> Filter
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="py-32 text-center border-2 border-dashed border-gray-100 rounded-[3rem]">
                    <SlidersHorizontal className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-muted uppercase tracking-widest font-bold">No products match your selected filters.</p>
                    <button 
                        onClick={() => {
                            setActiveCategory('All');
                            setPriceRange('All');
                        }}
                        className="mt-6 text-[10px] font-black uppercase tracking-widest text-accent underline underline-offset-8"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default CategoryPage;
