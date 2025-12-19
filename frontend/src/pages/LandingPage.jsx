import { useMemo } from "react";
import { useProducts } from "../hooks/useProducts"; 
import { ArrowRight, ShieldCheck, Terminal, Activity } from 'lucide-react';
import LoadingScreen from "./LoadingScreen";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const { products, isProductLoading, error } = useProducts();
  const navigate = useNavigate();
 
  const featuredProducts = useMemo(() => {
    const slice = products.slice(0, 8);
    return [...slice, ...slice];
  }, [products]);

  if (isProductLoading) return <LoadingScreen />;
  if (error) return (
    <div className="text-red-500 flex flex-col items-center justify-center min-h-screen bg-[#030712]">
      <Activity className="mb-4 animate-pulse" />
      <p className="font-mono tracking-widest uppercase text-sm">{error}</p>
    </div>
  );

  return (
    <div className="bg-[#030712] z-10 text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">
     <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>
 
      <section className="relative min-h-[70vh] lg:min-h-[85vh] flex items-center pt-20 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md animate-fade-in">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em]">
                Mini Tech Store
              </span>
            </div>

            <h1 className="text-5xl md:text-[90px] font-black tracking-tighter leading-[0.9]">
              Future-Ready <br />
              <span className="text-transparent bg-clip-text bg-linear-to-b from-white via-white to-gray-500">
                Tech Gadgets
              </span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Explore premium tech products built for productivity, performance, and modern workflows.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <button
                onClick={() => navigate('/products')}
                className="group px-10 py-5 bg-white text-black font-black rounded-full hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer shadow-lg hover:shadow-cyan-500/20"
              >
                SHOP PRODUCTS <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/cart')}
                className="px-10 py-5 bg-transparent border border-white/10 rounded-full hover:bg-white/10 hover:border-white/40 transition-all font-bold backdrop-blur-sm cursor-pointer active:scale-95"
              >
                VIEW CART
              </button>
            </div>
          </div>

          <div className="hidden lg:block relative group">
          <div className="absolute inset-0 bg-cyan-500/20 blur-3xl group-hover:bg-cyan-500/40 transition-all duration-700" />
          <img
            src="https://images.unsplash.com/photo-1550009158-9ebf69173e03"
            className="relative rounded-[40px] border border-white/10 shadow-2xl 
                      grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-[1.02] 
                      transition-all duration-700 
                      object-cover h-125 w-full" 
            alt="Tech products"
          />
        </div>
        </div>
      </section>
 
      <section className="relative py-24 border-y border-white/5 bg-white/2 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16 px-6">
          {[
            { title: "Curated Tech", desc: "Hand-picked gadgets focused on performance and reliability.", icon: <Terminal size={24} /> },
            { title: "Secure Checkout", desc: "Safe and smooth checkout experience with validation.", icon: <ShieldCheck size={24} /> },
            { title: "Fast Experience", desc: "Optimized UI with instant cart updates and smooth navigation.", icon: <Activity size={24} /> }
          ].map((item, i) => (
            <div key={i} className="group space-y-5 p-8 rounded-3xl hover:bg-white/5 transition-all duration-500 border border-transparent hover:border-white/10 cursor-default">
              <div className="mb-4 text-cyan-400 group-hover:scale-110 group-hover:rotate-3 transition-transform">{item.icon}</div>
              <h3 className="text-2xl font-black uppercase tracking-tight group-hover:text-cyan-400 transition-colors">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
 
      <section className="py-24 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 mb-16 flex justify-between items-end">
          <div>
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.4em] mb-2 block animate-pulse">Live_Drops</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">Featured_Drops</h2>
          </div>
          <button 
            onClick={() => navigate('/products')}
            className="group flex items-center gap-2 text-sm font-bold border-b border-cyan-400/30 pb-1 hover:border-cyan-400 transition-all cursor-pointer"
          >
            VIEW ALL <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
 
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-8 animate-marquee hover:pause-marquee py-4">
            {featuredProducts.map((product, idx) => (
              <div
                key={`${product.id}-${idx}`}
                className="w-80 shrink-0 group cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="relative aspect-square mb-6 overflow-hidden rounded-4xl bg-gray-900 border border-white/5 shadow-xl transition-all duration-500 group-hover:border-cyan-500/50 group-hover:shadow-cyan-500/10">
                  <img
                    src={product.imageUrl}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                    alt={product.name}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <div className="w-full py-3 bg-white text-black text-center font-black rounded-xl text-xs uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      Deploy Hardware
                    </div>
                  </div>
                </div>
                <div className="px-2 transition-transform duration-300 group-hover:translate-x-2">
                  <p className="text-[10px] text-cyan-400 font-black uppercase tracking-widest mb-1">{product.category}</p>
                  <h3 className="text-xl font-black truncate text-white/90 group-hover:text-cyan-400 transition-colors">{product.name}</h3>
                  <p className="text-gray-500 font-bold mt-1 text-lg">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8 bg-white/5 border border-white/10 p-16 rounded-[60px] backdrop-blur-xl relative overflow-hidden group">
         <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
           <h2 className="text-5xl md:text-8xl font-black tracking-tighter italic uppercase leading-none transition-transform duration-700 group-hover:scale-[1.02]">
            Ready to <br /> Explore?
          </h2>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            Browse our full catalog and build your perfect tech setup with our curated collection.
          </p>
          <div className="pt-6">
            <button
              onClick={() => navigate('/products')}
              className="px-12 py-6 bg-white text-black font-black rounded-full hover:bg-cyan-400 transition-all uppercase tracking-widest text-xs shadow-2xl active:scale-95 cursor-pointer relative z-10"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </section>

      <style>{`
        /* Smooth infinite scroll animation */
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 1rem)); }
        }

        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }

        .hover\\:pause-marquee:hover {
          animation-play-state: paused;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default LandingPage;