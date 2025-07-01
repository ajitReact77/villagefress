import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { productService } from '../services/productService';
import { orderService } from '../services/orderService';

const AdminDashboard = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const { signOut } = useAuth();
  const [form, setForm] = useState({
    id: '',
    name: '',
    price: '',
    original_price: '',
    category: '',
    unit: '',
    in_stock: true,
    description: '',
    brand: '',
    type: '',
    images: [] as File[],
  });

  const fetchProducts = async () => {
    try {
      const data = await productService.getProducts();
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const data = await orderService.getAllOrders();
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleImageChange = (e: any) => {
    const files = Array.from(e.target.files || []);

    if (files.length > 3) {
      alert('You can upload up to 3 images.');
      return;
    }

    for (let file of files) {
      if (file.size > 1024 * 1024 * 2) { // 2MB
        alert(`${file.name} is too large. Max size is 2MB.`);
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not an image file.`);
        return;
      }
    }

    setForm(prev => ({ ...prev, images: files }));
  };

  const handleSubmit = async () => {
    try {
      const productId = form.id || crypto.randomUUID();
      let imageUrls: string[] = [];

      if (form.images.length > 0) {
        imageUrls = await productService.uploadProductImages(form.images, productId);
      }

      const payload = {
        id: form.id || productId,
        name: form.name,
        price: Number(form.price),
        original_price: form.original_price ? Number(form.original_price) : undefined,
        category: form.category,
        unit: form.unit,
        in_stock: form.in_stock,
        image: imageUrls,
        description: form.description,
        brand: form.brand,
        type: form.type,
      };

      if (form.id) {
        await productService.updateProduct(form.id, payload);
      } else {
        await productService.createProduct(payload);
      }

      setForm({
        id: '',
        name: '',
        price: '',
        original_price: '',
        category: '',
        unit: '',
        in_stock: true,
        description: '',
        brand: '',
        type: '',
        images: [],
      });
      fetchProducts();
      alert('Product saved successfully!');
    } catch (error: any) {
      alert('Failed to save: ' + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await productService.deleteProduct(id);
      fetchProducts();
      alert('Product deleted successfully!');
    } catch (error: any) {
      alert('Delete failed: ' + error.message);
    }
  };

  const handleOrderStatusUpdate = async (orderId: string, status: string) => {
    try {
      await orderService.updateOrderStatus(orderId, status);
      fetchOrders();
      alert('Order status updated!');
    } catch (error: any) {
      alert('Failed to update order status: ' + error.message);
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🛠 Admin Dashboard</h2>
        <button 
          onClick={() => signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Product Form */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="font-semibold mb-4 text-lg">Add / Edit Product</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            name="name" 
            value={form.name} 
            onChange={handleChange} 
            placeholder="Product Name" 
            className="border p-3 rounded" 
          />
          <input 
            name="price" 
            value={form.price} 
            onChange={handleChange} 
            placeholder="Price" 
            type="number"
            className="border p-3 rounded" 
          />
          <input 
            name="original_price" 
            value={form.original_price} 
            onChange={handleChange} 
            placeholder="Original Price (optional)" 
            type="number"
            className="border p-3 rounded" 
          />
          <input 
            name="category" 
            value={form.category} 
            onChange={handleChange} 
            placeholder="Category" 
            className="border p-3 rounded" 
          />
          <input 
            name="unit" 
            value={form.unit} 
            onChange={handleChange} 
            placeholder="Unit (e.g., 1kg, per piece)" 
            className="border p-3 rounded" 
          />
          <input 
            name="brand" 
            value={form.brand} 
            onChange={handleChange} 
            placeholder="Brand" 
            className="border p-3 rounded" 
          />
          <input 
            name="type" 
            value={form.type} 
            onChange={handleChange} 
            placeholder="Type (optional)" 
            className="border p-3 rounded" 
          />
          <div className="flex items-center">
            <input 
              name="in_stock" 
              type="checkbox"
              checked={form.in_stock} 
              onChange={handleChange} 
              className="mr-2" 
            />
            <label>In Stock</label>
          </div>
          <textarea 
            name="description" 
            value={form.description} 
            onChange={handleChange} 
            placeholder="Description" 
            className="border p-3 rounded col-span-full" 
            rows={3}
          />
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            onChange={handleImageChange} 
            className="border p-3 rounded col-span-full" 
          />
        </div>
        <button 
          onClick={handleSubmit} 
          className="mt-4 bg-emerald-600 text-white py-3 px-6 rounded hover:bg-emerald-700"
        >
          Save Product
        </button>
      </div>

      {/* Products List */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="font-semibold mb-4 text-lg">Products ({products.length})</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-t">
                  <td className="p-3">
                    {p.image && p.image[0] && (
                      <img src={p.image[0]} alt={p.name} className="w-12 h-12 object-cover rounded" />
                    )}
                  </td>
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">₹{p.price}</td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3">{p.in_stock ? '✅' : '❌'}</td>
                  <td className="p-3 space-x-2">
                    <button 
                      onClick={() => setForm({ 
                        ...p, 
                        price: p.price.toString(),
                        original_price: p.original_price?.toString() || '',
                        images: [] 
                      })} 
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(p.id)} 
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="font-semibold mb-4 text-lg">Recent Orders ({orders.length})</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-t">
                  <td className="p-3 font-mono text-xs">{order.id.slice(0, 8)}...</td>
                  <td className="p-3">{order.users?.name || 'N/A'}</td>
                  <td className="p-3">₹{order.total}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="p-3">
                    <select 
                      value={order.status}
                      onChange={(e) => handleOrderStatusUpdate(order.id, e.target.value)}
                      className="border rounded px-2 py-1 text-xs"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;