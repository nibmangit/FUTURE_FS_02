import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  ShoppingCart, 
  Users, 
  LogOut, 
  Search, 
  Bell, 
  Menu, 
  ChevronLeft, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  MoreVertical,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  ArrowUpRight,
  Upload,
  X,
  UserCheck,
  UserX,
  FileText,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

// --- MOCK DATA ---

const INITIAL_STATS = [
  { label: 'Total Orders', value: '1,284', icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-100', trend: '+12%' },
  { label: 'Total Revenue', value: '$42,500', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100', trend: '+8%' },
  { label: 'Pending Orders', value: '23', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100', trend: '-3%' },
  { label: 'Delivered', value: '1,150', icon: CheckCircle, color: 'text-purple-600', bg: 'bg-purple-100', trend: '+15%' },
];

const REVENUE_DATA = [
  { date: '2026-04-20', revenue: 1000 },
  { date: '2026-04-21', revenue: 2500 },
  { date: '2026-04-22', revenue: 1800 },
  { date: '2026-04-23', revenue: 3200 },
  { date: '2026-04-24', revenue: 2100 },
  { date: '2026-04-25', revenue: 4500 },
  { date: '2026-04-26', revenue: 3800 },
];

const MOCK_PRODUCTS = [
  { id: '1', title: 'MacBook Pro M3', category: 'Electronics', price: 1999.99, stock: 12, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop', createdAt: '2026-01-15' },
  { id: '2', title: 'Logitech MX Master 3', category: 'Accessories', price: 99.00, stock: 3, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop', createdAt: '2026-02-10' },
  { id: '3', title: 'Dell UltraSharp 27"', category: 'Electronics', price: 450.00, stock: 8, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200&h=200&fit=crop', createdAt: '2026-03-05' },
  { id: '4', title: 'Keychron K2 V2', category: 'Accessories', price: 89.99, stock: 0, image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=200&h=200&fit=crop', createdAt: '2026-03-20' },
];

const MOCK_CATEGORIES = [
  { id: '1', name: 'Electronics', slug: 'electronics' },
  { id: '2', name: 'Accessories', slug: 'accessories' },
  { id: '3', name: 'Software', slug: 'software' },
];

const MOCK_ORDERS = [
  { 
    id: 'ORD-7721', 
    email: 'john@example.com', 
    total: 1250.00, 
    status: 'Delivered', 
    date: '2026-04-25',
    address: { name: 'John Doe', phone: '+1 234 567 890', city: 'San Francisco', district: 'Downtown', detail: '123 Tech Lane, Apt 4B' },
    items: [
      { title: 'MacBook Pro M3', qty: 1, price: 1200.00 },
      { title: 'USB-C Cable', qty: 1, price: 50.00 }
    ]
  },
  { 
    id: 'ORD-8832', 
    email: 'sarah.w@tech.io', 
    total: 89.99, 
    status: 'Processing', 
    date: '2026-04-26',
    address: { name: 'Sarah Williams', phone: '+1 987 654 321', city: 'Seattle', district: 'Capitol Hill', detail: '456 Cloud Blvd' },
    items: [
      { title: 'Keychron K2 V2', qty: 1, price: 89.99 }
    ]
  },
  { 
    id: 'ORD-9910', 
    email: 'mike@dev.com', 
    total: 450.00, 
    status: 'Pending', 
    date: '2026-04-26',
    address: { name: 'Mike Johnson', phone: '+1 555 010 999', city: 'Austin', district: 'South Congress', detail: '789 Startup Way' },
    items: [
      { title: 'Dell UltraSharp 27"', qty: 1, price: 450.00 }
    ]
  },
];

const MOCK_USERS = [
  { id: 'u1', email: 'admin@minitech.com', role: 'Admin', active: true, joined: '2025-12-01', totalOrders: 5, spent: 4500.20 },
  { id: 'u2', email: 'customer@gmail.com', role: 'Customer', active: true, joined: '2026-01-10', totalOrders: 2, spent: 120.50 },
  { id: 'u3', email: 'banned@user.com', role: 'Customer', active: false, joined: '2026-02-15', totalOrders: 0, spent: 0 },
];

// --- REUSABLE COMPONENTS ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl border border-gray-100 shadow-sm ${className}`}>
    {children}
  </div>
);

const Button = ({ children, variant = 'primary', size = 'md', className = "", ...props }) => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    ghost: 'bg-transparent hover:bg-gray-50 text-gray-600',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };
  return (
    <button 
      className={`inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    danger: 'bg-red-100 text-red-700',
    blue: 'bg-blue-100 text-blue-700',
    Processing: 'bg-blue-100 text-blue-700',
    Delivered: 'bg-green-100 text-green-700',
    Pending: 'bg-yellow-100 text-yellow-700',
    Cancelled: 'bg-red-100 text-red-700',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[children] || variants[variant]}`}>
      {children}
    </span>
  );
};

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- PAGE COMPONENTS ---

const DashboardView = ({ products }) => {
  const lowStock = products.filter(p => p.stock <= 5);
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {INITIAL_STATS.map((stat, i) => (
          <Card key={i} className="p-5 flex items-center gap-4">
            <div className={`p-3 rounded-xl ${stat.bg}`}>
              <stat.icon className={stat.color} size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <h4 className="text-2xl font-bold text-gray-800">{stat.value}</h4>
                <span className={`text-xs font-medium ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800 text-lg">Revenue Overview</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="text-yellow-500" size={20} />
            <h3 className="font-bold text-gray-800 text-lg">Inventory Alerts</h3>
          </div>
          <div className="space-y-4">
            {lowStock.length > 0 ? (
              lowStock.map(p => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <img src={p.image} className="w-10 h-10 rounded-lg object-cover" alt={p.title} />
                    <div>
                      <p className="text-sm font-semibold text-gray-700">{p.title}</p>
                      <p className="text-xs text-gray-500">{p.category}</p>
                    </div>
                  </div>
                  <Badge variant={p.stock === 0 ? 'danger' : 'warning'}>
                    {p.stock === 0 ? 'Out of Stock' : `${p.stock} left`}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="mx-auto text-green-400 mb-2" size={32} />
                <p className="text-gray-500">All stock levels are healthy</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

const ProductsView = ({ products, setProducts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ title: '', category: 'Electronics', price: '', stock: '', description: '' });

  const handleEdit = (p) => {
    setEditingProduct(p);
    setFormData({ ...p });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...formData } : p));
    } else {
      const newProduct = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
        image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=200&h=200&fit=crop',
        createdAt: new Date().toISOString().split('T')[0]
      };
      setProducts([...products, newProduct]);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({ title: '', category: 'Electronics', price: '', stock: '', description: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
          />
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto">
          <Plus size={18} /> Add Product
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Product</th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Category</th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Price</th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Stock</th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image} className="w-12 h-12 rounded-lg object-cover" alt="" />
                      <div>
                        <p className="font-bold text-gray-800">{p.title}</p>
                        <p className="text-xs text-gray-500">Created: {p.createdAt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="blue">{p.category}</Badge>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    ${parseFloat(p.price).toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${p.stock < 5 ? 'bg-red-500' : 'bg-green-500'}`} 
                          style={{ width: `${Math.min((p.stock/20)*100, 100)}%` }}
                        />
                      </div>
                      <span className={`text-xs font-medium ${p.stock < 5 ? 'text-red-500' : 'text-gray-500'}`}>
                        {p.stock} units
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleEdit(p)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditingProduct(null); }}
        title={editingProduct ? "Edit Product" : "Add New Product"}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Product Title</label>
            <input 
              required
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Price ($)</label>
              <input 
                required
                type="number"
                step="0.01"
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Stock</label>
              <input 
                required
                type="number"
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.stock}
                onChange={e => setFormData({...formData, stock: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Category</label>
            <select 
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
              {MOCK_CATEGORIES.map(c => <option key={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" className="flex-1">{editingProduct ? "Save Changes" : "Create Product"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

const CategoriesView = () => {
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [catName, setCatName] = useState('');

  const handleEdit = (c) => {
    setEditingCategory(c);
    setCatName(c.name);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      setCategories(categories.map(c => c.id === editingCategory.id ? { ...c, name: catName, slug: catName.toLowerCase().replace(/ /g, '-') } : c));
    } else {
      setCategories([...categories, { id: Date.now().toString(), name: catName, slug: catName.toLowerCase().replace(/ /g, '-') }]);
    }
    setIsModalOpen(false);
    setEditingCategory(null);
    setCatName('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800">Product Categories</h2>
        <Button onClick={() => setIsModalOpen(true)}><Plus size={18} /> Add Category</Button>
      </div>
      <Card>
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Name</th>
              <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Slug</th>
              <th className="px-6 py-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.map(c => (
              <tr key={c.id}>
                <td className="px-6 py-4 font-medium text-gray-800">{c.name}</td>
                <td className="px-6 py-4 text-gray-500 font-mono text-xs">/{c.slug}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleEdit(c)} className="p-2 text-gray-400 hover:text-blue-600"><Edit size={18} /></button>
                    <button onClick={() => setCategories(categories.filter(x => x.id !== c.id))} className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingCategory ? "Edit Category" : "New Category"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700">Category Name</label>
            <input value={catName} onChange={e => setCatName(e.target.value)} required className="w-full px-4 py-2 border rounded-xl mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <Button type="submit" className="w-full">{editingCategory ? "Update" : "Create"}</Button>
        </form>
      </Modal>
    </div>
  );
};

const OrdersView = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState('All');

  const filteredOrders = filter === 'All' ? MOCK_ORDERS : MOCK_ORDERS.filter(o => o.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input className="w-full pl-10 pr-4 py-2 border rounded-xl" placeholder="Search by email or ID..." />
        </div>
        <div className="flex gap-2">
          {['All', 'Pending', 'Processing', 'Delivered'].map(s => (
            <button 
              key={s} 
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === s ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border hover:bg-gray-50'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <Card className="overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 font-semibold text-sm">Order ID</th>
              <th className="px-6 py-4 font-semibold text-sm">Customer</th>
              <th className="px-6 py-4 font-semibold text-sm">Total</th>
              <th className="px-6 py-4 font-semibold text-sm">Status</th>
              <th className="px-6 py-4 font-semibold text-sm">Date</th>
              <th className="px-6 py-4 font-semibold text-sm text-right">View</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredOrders.map(o => (
              <tr key={o.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-mono text-sm text-blue-600 font-semibold">{o.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{o.email}</td>
                <td className="px-6 py-4 font-bold text-gray-800">${o.total.toFixed(2)}</td>
                <td className="px-6 py-4"><Badge>{o.status}</Badge></td>
                <td className="px-6 py-4 text-sm text-gray-500">{o.date}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => setSelectedOrder(o)} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-all"><Eye size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Modal isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} title="Order Details">
        {selectedOrder && (
          <div className="space-y-6">
            <div className="flex justify-between items-start bg-gray-50 p-4 rounded-xl border">
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Order ID</p>
                <p className="font-mono text-lg font-bold text-blue-600">{selectedOrder.id}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase font-bold">Current Status</p>
                <Badge variant="blue">{selectedOrder.status}</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-800 font-bold"><MapPin size={16}/> Shipping Address</div>
                <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600 leading-relaxed border">
                  <p className="font-bold text-gray-800">{selectedOrder.address.name}</p>
                  <p>{selectedOrder.address.detail}</p>
                  <p>{selectedOrder.address.district}, {selectedOrder.address.city}</p>
                  <p className="mt-1 flex items-center gap-1 font-medium"><Phone size={12}/> {selectedOrder.address.phone}</p>
                </div>
              </div>
              <div className="space-y-2">
                 <div className="flex items-center gap-2 text-gray-800 font-bold"><FileText size={16}/> Order Summary</div>
                 <div className="bg-gray-50 p-3 rounded-lg text-sm space-y-1 border">
                    <div className="flex justify-between"><span>Subtotal:</span><span>${(selectedOrder.total * 0.9).toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Shipping:</span><span>$5.00</span></div>
                    <div className="flex justify-between"><span>Tax (10%):</span><span>${(selectedOrder.total * 0.1).toFixed(2)}</span></div>
                    <div className="flex justify-between border-t pt-1 font-bold text-blue-600"><span>Total:</span><span>${selectedOrder.total.toFixed(2)}</span></div>
                 </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-bold text-gray-800">Order Items</p>
              <div className="border rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr><th className="px-4 py-2 text-left">Item</th><th className="px-4 py-2 text-center">Qty</th><th className="px-4 py-2 text-right">Price</th></tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="px-4 py-2">{item.title}</td>
                        <td className="px-4 py-2 text-center">x{item.qty}</td>
                        <td className="px-4 py-2 text-right font-medium">${item.price.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex gap-2">
               <select className="flex-1 bg-white border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                  <option>Update Status...</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
               </select>
               <Button className="flex-1">Update Order</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

const UsersView = () => {
  const [users, setUsers] = useState(MOCK_USERS);
  const [selectedUser, setSelectedUser] = useState(null);

  const toggleUserStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, active: !u.active } : u));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">User Management</h2>
        <div className="text-sm text-gray-500">Showing {users.length} registered users</div>
      </div>

      <Card className="overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 font-semibold text-sm">Email</th>
              <th className="px-6 py-4 font-semibold text-sm">Role</th>
              <th className="px-6 py-4 font-semibold text-sm">Status</th>
              <th className="px-6 py-4 font-semibold text-sm">Joined</th>
              <th className="px-6 py-4 font-semibold text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map(u => (
              <tr key={u.id}>
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${u.active ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                    {u.email[0].toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-800">{u.email}</span>
                </td>
                <td className="px-6 py-4"><Badge variant={u.role === 'Admin' ? 'danger' : 'default'}>{u.role}</Badge></td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-1.5 text-xs font-bold uppercase ${u.active ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${u.active ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    {u.active ? 'Active' : 'Blocked'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{u.joined}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-1">
                    <button onClick={() => setSelectedUser(u)} className="p-2 hover:bg-gray-100 text-gray-500 rounded-lg"><Eye size={18}/></button>
                    <button onClick={() => toggleUserStatus(u.id)} className={`p-2 rounded-lg transition-all ${u.active ? 'hover:bg-red-50 text-red-400 hover:text-red-600' : 'hover:bg-green-50 text-green-400 hover:text-green-600'}`}>
                      {u.active ? <UserX size={18}/> : <UserCheck size={18}/>}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Modal isOpen={!!selectedUser} onClose={() => setSelectedUser(null)} title="User Details">
        {selectedUser && (
          <div className="space-y-6">
            <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl border">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mb-4 shadow-xl">
                {selectedUser.email[0].toUpperCase()}
              </div>
              <h4 className="text-xl font-bold text-gray-800">{selectedUser.email}</h4>
              <p className="text-sm text-gray-500 mt-1">Joined MiniTech on {selectedUser.joined}</p>
              <div className="flex gap-2 mt-4">
                <Badge variant={selectedUser.role === 'Admin' ? 'danger' : 'blue'}>{selectedUser.role}</Badge>
                <Badge variant={selectedUser.active ? 'success' : 'danger'}>{selectedUser.active ? 'Active Account' : 'Blocked'}</Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white border rounded-xl shadow-sm text-center">
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Total Orders</p>
                <p className="text-2xl font-black text-gray-800">{selectedUser.totalOrders}</p>
              </div>
              <div className="p-4 bg-white border rounded-xl shadow-sm text-center">
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Total Spent</p>
                <p className="text-2xl font-black text-green-600">${selectedUser.spent.toFixed(2)}</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-bold text-gray-700">Administrative Actions</p>
              <div className="grid grid-cols-1 gap-2">
                 <Button variant={selectedUser.active ? 'danger' : 'primary'} onClick={() => { toggleUserStatus(selectedUser.id); setSelectedUser(null); }}>
                    {selectedUser.active ? 'Block User Access' : 'Unblock User Account'}
                 </Button>
                 <select className="w-full bg-white border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none font-medium">
                    <option>Change User Role...</option>
                    <option>Customer</option>
                    <option>Moderator</option>
                    <option>Admin</option>
                 </select>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// --- MAIN APPLICATION ---

export default function App() {
  const [activePage, setActivePage] = useState('Dashboard');
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [user, setUser] = useState({ name: 'Admin User', role: 'Super Admin' });

  const menuItems = [
    { id: 'Dashboard', icon: LayoutDashboard },
    { id: 'Products', icon: Package },
    { id: 'Categories', icon: Layers },
    { id: 'Orders', icon: ShoppingCart },
    { id: 'Users', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-0 h-full bg-white border-r border-slate-200 z-40 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        } hidden md:flex flex-col`}
      >
        <div className="p-6 flex items-center justify-between">
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Package className="text-white" size={20} />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800">MiniTech</span>
            </div>
          )}
          {isSidebarCollapsed && (
            <div className="w-8 h-8 bg-blue-600 rounded-lg mx-auto flex items-center justify-center">
              <Package className="text-white" size={20} />
            </div>
          )}
        </div>

        <nav className="flex-1 px-4 mt-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                activePage === item.id 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <item.icon size={22} className={activePage === item.id ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'} />
              {!isSidebarCollapsed && <span className="font-medium">{item.id}</span>}
              {activePage === item.id && !isSidebarCollapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-medium">
            <LogOut size={22} />
            {!isSidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
        
        <button 
          onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
          className="absolute -right-3 top-20 bg-white border border-slate-200 rounded-full p-1 shadow-sm hover:bg-slate-50 transition-colors"
        >
          {isSidebarCollapsed ? <Plus className="rotate-45" size={16} /> : <ChevronLeft size={16} />}
        </button>
      </aside>

      {/* Main Content Area */}
      <main 
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
        }`}
      >
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-30 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 hover:bg-slate-100 rounded-lg">
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-slate-800">{activePage}</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Global search..." 
                className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm w-64 focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            
            <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-all">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            
            <div className="flex items-center gap-3 cursor-pointer p-1 pr-3 rounded-xl hover:bg-slate-50 transition-all">
              <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-blue-200">
                A
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold leading-none text-slate-800">{user.name}</p>
                <p className="text-[10px] font-medium text-slate-500 mt-1 uppercase tracking-wider">{user.role}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 max-w-[1600px] mx-auto animate-in fade-in duration-300">
          {activePage === 'Dashboard' && <DashboardView products={products} />}
          {activePage === 'Products' && <ProductsView products={products} setProducts={setProducts} />}
          {activePage === 'Categories' && <CategoriesView />}
          {activePage === 'Orders' && <OrdersView />}
          {activePage === 'Users' && <UsersView />}
        </div>
      </main>
    </div>
  );
}