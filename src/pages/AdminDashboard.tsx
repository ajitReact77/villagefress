import React, { useEffect, useState } from 'react';
import { supabase } from '../data/supabase'; // your supabase client
import {useAuth} from '../hooks/useAuth'

const  AdminDashboard =()=> {
    const [products, setProducts] = useState<any[]>([]);
    const {logout} = useAuth()
    const [form, setForm] = useState({
        id: '',
        name: '',
        price: '',
        category: '',
        unit: '',
        in_stock: true,
        description: '',
        images: [] as File[],
    });

    const fetchProducts = async () => {
        const { data, error } = await supabase.from('products').select('*');
        if (error) console.error(error);
        else setProducts(data || []);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: any) => {
        const files = Array.from(e.target.files || []);

        if (files.length > 3) {
            alert('You can upload up to 3 PNG images.');
            return;
        }

        for (let file of files) {
            if (file.size > 1024 * 2048) {
                alert(`${file.name} is too large. Max size is 1mb.`);
                return;
            }
            if (file.type !== 'image/png') {
                alert(`${file.name} is not a PNG file.`);
                return;
            }
        }

        setForm(prev => ({ ...prev, images: files }));
    };

    const uploadImages = async (files: File[], productId: string) => {
        const uploadedUrls: string[] = [];

        for (let file of files) {
            const filePath = `products/${productId}/${Date.now()}-${file.name}`;

            const { error: uploadError } = await supabase.storage
                .from('product-images')
                .upload(filePath, file);

            if (uploadError) throw new Error(uploadError.message);

            const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);
            uploadedUrls.push(data.publicUrl);
        }

        return uploadedUrls;
    };

    const handleSubmit = async () => {
        const productId = form.id || crypto.randomUUID();
        let imageUrls: string[] = [];

        try {
            if (form.images.length > 0) {
                imageUrls = await uploadImages(form.images, productId);
                console.log(imageUrls)
            }
        } catch (err: any) {
            alert('Image upload failed: ' + err.message);
            return;
        }
        const payload = {
            id: form.id || productId,
            name: form.name,
            price: Number(form.price),
            category: form.category,
            unit: form.unit,
            in_stock: form.in_stock === 'true' || form.in_stock === true,
            image: imageUrls, // Save as JSON string
            description: form.description,
        };

        const { error } = form.id
            ? await supabase.from('products').update(payload).eq('id', form.id)
            : await supabase.from('products').insert(payload);

        if (error) {
            alert('Failed to save: ' + error.message);
            return;
        }

        setForm({
            id: '',
            name: '',
            price: '',
            category: '',
            unit: '',
            in_stock: true,
            description: '',
            images: [],
        });
        fetchProducts();
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Delete this product?')) return;
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) alert('Delete failed: ' + error.message);
        else fetchProducts();
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">🛠 Admin Dashboard</h2>
             <button onClick={() => logout()}>Logout</button>
            {/* Product Form */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h3 className="font-semibold mb-2">Add / Edit Product</h3>
                <div className="grid grid-cols-2 gap-4">
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2" />
                    <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="border p-2" />
                    <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="border p-2" />
                    <input name="unit" value={form.unit} onChange={handleChange} placeholder="Unit" className="border p-2" />
                    <input name="in_stock" value={form.in_stock.toString()} onChange={handleChange} placeholder="true/false" className="border p-2" />
                    <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 col-span-2" />
                    <input type="file" multiple accept="image/png" onChange={handleImageChange} placeholder="images" className="border p-2 col-span-2" />
                </div>
                <button onClick={handleSubmit} className="mt-4 bg-emerald-600 text-white py-2 px-4 rounded">
                    Save Product
                </button>
            </div>

            {/* Product List */}
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold mb-4">All Products</h3>
                <table className="w-full text-sm border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2">Name</th>
                            <th className="p-2">Price</th>
                            <th className="p-2">Stock</th>
                            <th className="p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.id} className="border-t">
                                
                                <td className="p-2">{p.name}</td>
                                <td className="p-2">₹{p.price}</td>
                                <td className="p-2">{p.in_stock ? '✅' : '❌'}</td>
                                <td className="p-2 space-x-2">
                                    <button onClick={() => setForm({ ...p, images: [] })} className="text-blue-600">Edit</button>
                                    <button onClick={() => handleDelete(p.id)} className="text-red-600">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
 export default AdminDashboard
