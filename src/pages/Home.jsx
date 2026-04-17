import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { ArrowRight, ShoppingBag, Zap, ShieldCheck, Truck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const products = useSelector(state => state.products.items).slice(0, 4);
    const heroRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();
        tl.fromTo(".hero-content > *", 
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.out" }
        );

        gsap.fromTo(".hero-image", 
            { scale: 1.1, opacity: 0 },
            { scale: 1, opacity: 0.6, duration: 1.5, ease: "power2.out" }
        );

        gsap.from(".feature-item", {
            scrollTrigger: {
                trigger: ".features-section",
                start: "top 80%",
            },
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8
        });
    }, []);

    return (
        <div className="overflow-x-hidden">
            {/* Hero Section */}
            <section ref={heroRef} className="relative h-screen min-h-[700px] flex items-center bg-black text-white">
                <div className="absolute inset-0 opacity-60 hero-image">
                    <img 
                        src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2000" 
                        alt="Streetwear Hero" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="max-w-7xl mx-auto px-4 w-full relative z-20 hero-content text-white">
                    <span className="inline-block px-4 py-1 bg-accent text-[10px] font-black uppercase tracking-[0.3em] mb-4">New Collection 2026</span>
                    <h1 
                        className="text-6xl md:text-8xl font-black italic tracking-tighter leading-[0.9] mb-6 hero-title"
                        style={{ color: '#ffffff' }}
                    >
                        BEYOND ORDINARY.
                    </h1>
                    <p 
                        className="max-w-md text-sm md:text-base mb-8 uppercase tracking-widest leading-relaxed"
                        style={{ color: '#ffffff', opacity: 0.9 }}
                    >
                        Streetwear that defines attitude. Experience premium comfort with our new oversized drop.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link to="/category/All">
                            <Button 
                                className="flex items-center gap-3 group px-8 bg-white !text-black hover:bg-gray-200"
                            >
                                Shop Now <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform !text-black" />
                            </Button>
                        </Link>
                        <Button 
                            variant="outline" 
                            className="border-white !text-white hover:bg-white hover:!text-black transition-all"
                            onClick={() => gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                        >
                            View Lookbook
                        </Button>
                    </div>
                </div>
                
                {/* Floating Elements/Decorative */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
                    <div className="w-px h-12 bg-white/30" />
                </div>
            </section>

            {/* Features Bar */}
            <section className="bg-white border-b features-section">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="flex flex-col items-center text-center feature-item">
                            <div className="w-16 h-16 bg-gray-50 flex items-center justify-center mb-4 transition-transform hover:rotate-12">
                                <Zap className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold uppercase tracking-widest text-sm mb-2">Fast Express Delivery</h3>
                            <p className="text-muted text-xs uppercase px-8">Ships within 24 hours anywhere across India.</p>
                        </div>
                        <div className="flex flex-col items-center text-center feature-item">
                            <div className="w-16 h-16 bg-gray-50 flex items-center justify-center mb-4 transition-transform hover:rotate-12">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold uppercase tracking-widest text-sm mb-2">Premium Quality</h3>
                            <p className="text-muted text-xs uppercase px-8">240 GSM Bio-washed premium cotton guarantee.</p>
                        </div>
                        <div className="flex flex-col items-center text-center feature-item">
                            <div className="w-16 h-16 bg-gray-50 flex items-center justify-center mb-4 transition-transform hover:rotate-12">
                                <ShoppingBag className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold uppercase tracking-widest text-sm mb-2">Direct Order Support</h3>
                            <p className="text-muted text-xs uppercase px-8">Real-time assistance for all your orders via WhatsApp.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Flashy Banner */}
            <div className="bg-accent py-4 overflow-hidden whitespace-nowrap">
                <div className="flex items-center gap-12 animate-marquee inline-block">
                    {[1,2,3,4,5,6,7,8].map(i => (
                        <span key={i} className="text-white font-black italic text-xl uppercase tracking-tighter">
                            FLAT 50% OFF • NEW DROP LIVE • FREODEM STREETWEAR • JOIN THE GANG •
                        </span>
                    ))}
                </div>
            </div>

            {/* Trending Section */}
            <section className="max-w-7xl mx-auto px-4 py-24">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <span className="text-accent font-black uppercase text-xs tracking-widest">Trending Now</span>
                        <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter">TOP SELLERS</h2>
                    </div>
                    <Link to="/category/All" className="group flex items-center gap-2 font-display uppercase text-xs tracking-[0.2em] font-bold border-b-2 border-transparent hover:border-black transition-all">
                        View All Products <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* Category Callouts */}
            <section className="grid grid-cols-1 md:grid-cols-2 h-[600px] bg-black">
                <Link to="/category/Oversized T-Shirts" className="group relative overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1000" className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                        <h3 className="text-5xl font-black italic tracking-tighter mb-4">OVERSIZED</h3>
                        <Button variant="outline" className="border-white text-white group-hover:bg-white group-hover:text-black">Shop Tee's</Button>
                    </div>
                </Link>
                <Link to="/category/Bottoms" className="group relative overflow-hidden border-t md:border-t-0 md:border-l border-white/10">
                    <img src="https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=1000" className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                        <h3 className="text-5xl font-black italic tracking-tighter mb-4">CARGOS</h3>
                        <Button variant="outline" className="border-white text-white group-hover:bg-white group-hover:text-black">Shop Bottoms</Button>
                    </div>
                </Link>
            </section>
        </div>
    );
};

export default Home;
