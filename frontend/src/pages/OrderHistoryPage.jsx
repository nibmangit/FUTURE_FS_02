import {ChevronLeft, Package} from 'lucide-react'
import { useNavigate } from 'react-router-dom';

function OrderHistoryPage() {
    const navigate = useNavigate();
    const orders = [
        {
            id: '12-32',
            date: "09-06-2025",
            total: 60,
            items: [{
                name: "Product One",
                quantity:4,
                price: 20
            }],
            user: "nibretu@gmail.com",
  },
        {
            id: '12-33',
            date: "09-07-2025",
            total: 1000,
            items: [{
                name: "Product One",
                quantity:5,
                price: 200
            }],
            user: "nibretu@gmail.com",
  },
];
    return (
        <main className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 min-h-[60vh]">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white mb-8 border-b border-gray-800 pb-4">
                        Order History for <span className="text-cyan-400">nibretu@gmail.com</span>
                    </h1>
        
                    {orders.length === 0 ? (
                        <div className="text-center py-20 bg-gray-900 rounded-xl p-8 border border-gray-800">
                            <Package size={48} className="text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400 text-xl mb-4">No past orders found.</p>
                            <button 
                                className="text-cyan-400 hover:text-cyan-300 transition flex items-center justify-center mx-auto"
                            >
                                <ChevronLeft size={20} className="mr-1" /> Start Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map(order => (
                                <div key={order.id} className="bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-xl">
                                    <div className="flex justify-between items-center border-b border-gray-800 pb-3 mb-3">
                                        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                                            <Package size={20} className="text-cyan-400" />
                                            <span>Order <span className="text-cyan-400">#{order.id}</span></span>
                                        </h3>
                                        <span className="text-lg font-extrabold text-white">${order.total}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-400 mb-4">
                                        <span>Date Placed: {order.date}</span>
                                        <span>Items: {order.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="flex justify-between items-center text-gray-300 bg-gray-800/50 p-2 rounded">
                                                <span>{item.name} x {item.quantity}</span>
                                                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <button
                        onClick={()=>navigate('/')}
                        className="mt-8 text-gray-400 hover:text-cyan-400 transition flex items-center space-x-1 cursor-pointer"
                    >
                        <ChevronLeft size={20} />
                        <span>Back to Products</span>
                    </button>
                </main>
    )
}

export default OrderHistoryPage
