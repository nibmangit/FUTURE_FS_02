import { useNavigate } from "react-router-dom"
import { AlertTriangle, ChevronLeft } from 'lucide-react';

function NotFound() {
  const navigate = useNavigate();
  
  return ( 
    <div className="min-h-[80vh] flex items-center justify-center p-4 sm:p-6"> 
      <div className="absolute inset-0 bg-gray-950 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/5 blur-[120px] rounded-full"></div>
      </div>

      <main className="w-full max-w-lg">
        <div className="bg-gray-900/80 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-gray-800 shadow-2xl text-center relative overflow-hidden">
           
          <div className="relative flex justify-center mb-6">
            <AlertTriangle 
              size={100} 
              className="text-red-500/10 absolute top-0 animate-pulse" 
            />
            <AlertTriangle 
              size={80} 
              className="text-red-500 relative z-10" 
            />
          </div>

          <h1 className="text-7xl sm:text-8xl font-black text-white mb-2 tracking-tighter opacity-90">
            404
          </h1>
          
          <h2 className="text-xl sm:text-2xl font-bold text-gray-200 mb-4">
            System Error: Sector Not Found
          </h2>
          
          <p className="text-gray-400 text-sm sm:text-base mb-10 max-w-xs mx-auto leading-relaxed">
            The resource you are looking for has been moved to a restricted sector or is currently offline.
          </p>

          <button 
            onClick={() => navigate('/')}
            className="group w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-10 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-cyan-900/40 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>Return to Base</span>
          </button>  
        </div>
      </main>
    </div>
  );
}

export default NotFound;