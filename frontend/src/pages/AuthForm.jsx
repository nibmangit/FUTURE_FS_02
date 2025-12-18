import { useState } from "react";
import {useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from "lucide-react";
import InputField from "../components/InputField";

function AuthForm({handleLogin}) {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({})

    const validate = () => {
        const newErrors = {}; 
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Valid Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            
            try {
                const action = isLogin ? 'Logging in...' : 'Signing up...';
                console.log(`${action} with:`, formData.email);
                
                // Simulating API call with a delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                handleLogin(formData.email);
                navigate('/');
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsSubmitting(false);
            }
        }
    } 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value }); 
    };

    const toggleMode = () => {
        setIsLogin(p => !p); 
        setFormData({ email: '', password: '' });
        setErrors({});
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4"> 
      <div className="fixed inset-0 bg-black/40 backdrop-blur-md" aria-hidden="true">
        <main className="container mx-auto max-w-sm px-4 sm:px-6 lg:px-8 py-20 min-h-[60vh]">
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-8 text-center">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 shadow-xl">
            <form onSubmit={handleSubmit}> 
              <InputField formData={formData} handleChange={handleChange} label={isLogin? "Email Address":"Email Address(👉 Used for order)"} name="email" type="email" error={errors.email} />
              <InputField formData={formData} handleChange={handleChange} label="Password" name="password" type="password" error={errors.password} />
 
             <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white disabled:bg-gray-600 font-semibold text-lg rounded-xl shadow-lg transition duration-200 active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-cyan-500/50 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {isLogin ? 'Logging in...' : 'Signing up...'}
                  </>
                ) : (
                  isLogin ? 'Login' : 'Sign Up'
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-gray-400">
                <button
                    onClick={toggleMode}
                    className="text-cyan-400 hover:text-cyan-300 transition font-medium cursor-pointer"
                >
                    {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
                </button>
            </div>
          <button 
          onClick={()=>navigate(-1)}
          className="mt-4 text-left w-full text-gray-500 hover:text-white transition cursor-pointer">
         <ArrowLeft size={24} className="absolute" /> <span className="ml-7">Return Back </span>
        </button>
          </div>
        </main>
        </div>
        </div>
    )
}

export default AuthForm
