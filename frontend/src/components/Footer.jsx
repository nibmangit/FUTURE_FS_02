function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8 px-4 mt-auto">
      <div className="container mx-auto max-w-5xl flex flex-col md:flex-row justify-between items-center gap-4">
         
        <div className="text-lg font-bold tracking-tight text-cyan-400">
          <span className="text-gray-200">Mini</span>Tech <span className="hidden sm:inline">Shop</span>
        </div>
 
        <p className="text-gray-500 text-sm">
          © {currentYear} All rights reserved.
        </p>
 
        <div className="flex space-x-6 text-sm text-gray-400">
          <button className="hover:text-cyan-400 transition cursor-pointer">Privacy</button>
          <button className="hover:text-cyan-400 transition cursor-pointer">Terms</button>
          <button className="hover:text-cyan-400 transition cursor-pointer">Support</button>
        </div>

      </div>
    </footer>
  );
}

export default Footer;