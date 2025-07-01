import React, { useEffect, useState } from 'react';
import { ArrowLeft, Plus, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useOrderFlowStore } from '../store/orderFlowStore';
import { useAuth } from '../hooks/useAuth';

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  name: string;
  phone: string;
  address: string;
  landmark?: string;
  pincode: string;
  isDefault: boolean;
}

export function DeliveryAddressPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { setAddress } = useOrderFlowStore();

 console.log(user?.name,"displaname")
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      type: 'home',
      name: user?.name,
      phone: user?.phone || '+91 7617028576',
      address: 'Majhawalia, Majhawalia',
      landmark: 'Near Hanuman Mandir',
      pincode: '274501',
      isDefault: true,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const [formData, setFormData] = useState({
    type: 'home' as 'home' | 'work' | 'other',
    name: user?.name || '',
    phone: user?.phone || '',
    address: '',
    landmark: '',
    pincode: '',
  });

  const onBackSafe = () => {
    window.history.back();
  };

  const resetForm = () => {
    setFormData({
      type: 'home',
      name: user?.name || '',
      phone: user?.phone || '',
      address: '',
      landmark: '',
      pincode: '',
    });
  };

  const handleAddOrUpdateAddress = () => {
    if (editingAddress) {
      // Update existing
      setAddresses(addresses.map(addr =>
        addr.id === editingAddress.id ? { ...addr, ...formData } : addr
      ));
    } else {
      // Add new
      const newAddress: Address = {
        id: Date.now().toString(),
        ...formData,
        isDefault: addresses.length === 0,
      };
      setAddresses([...addresses, newAddress]);
    }

    setShowAddForm(false);
    setEditingAddress(null);
    resetForm();
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      type: address.type,
      name: address?.name,
      phone: address.phone,
      address: address.address,
      landmark: address.landmark || '',
      pincode: address.pincode,
    });
    setShowAddForm(true);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const getAddressTypeIcon = (type: string) => {
    switch (type) {
      case 'home': return '🏠';
      case 'work': return '🏢';
      default: return '📍';
    }
  };

  if (showAddForm) {
    return (
      <div className="min-h-screen bg-white">
        <header className="bg-white shadow-sm sticky top-0 z-50 border-b">
          <div className="max-w-md mx-auto px-4 py-3">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingAddress(null);
                  resetForm();
                }}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-lg font-semibold text-gray-900">
                {editingAddress ? 'Edit Address' : 'Add New Address'}
              </h1>
            </div>
          </div>
        </header>

        <div className="max-w-md mx-auto px-4 py-6 space-y-4">
          {/* Address Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address Type
            </label>
            <div className="flex space-x-3">
              {(['home', 'work', 'other'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFormData({ ...formData, type })}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 ${
                    formData.type === type
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-xl">{getAddressTypeIcon(type)}</div>
                    <span className="text-sm capitalize">{type}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Form Inputs */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 border rounded-lg"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full px-4 py-3 border rounded-lg"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <textarea
            placeholder="Complete Address"
            className="w-full px-4 py-3 border rounded-lg"
            rows={3}
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
          <input
            type="text"
            placeholder="Landmark (Optional)"
            className="w-full px-4 py-3 border rounded-lg"
            value={formData.landmark}
            onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
          />
          <input
            type="text"
            placeholder="Pincode"
            className="w-full px-4 py-3 border rounded-lg"
            maxLength={6}
            value={formData.pincode}
            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
          />

          <button
            onClick={handleAddOrUpdateAddress}
            disabled={!formData.name || !formData.phone || !formData.address || !formData.pincode}
            className="w-full bg-emerald-500 text-white py-3 px-4 rounded-lg mt-4"
          >
            {editingAddress ? 'Update Address' : 'Save Address'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center space-x-3">
          <button onClick={onBackSafe} className="p-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Delivery Address</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6">
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-emerald-300 rounded-xl text-emerald-600 hover:border-emerald-400 hover:bg-emerald-50 mb-6"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add New Address</span>
        </button>

        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`bg-white border-2 rounded-xl p-4 ${
                address.isDefault ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{getAddressTypeIcon(address.type)}</span>
                  <div>
                    <span className="font-semibold text-gray-900 capitalize">{address.type}</span>
                    {address.isDefault && (
                      <span className="ml-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditAddress(address)}
                    className="p-2 text-gray-500 hover:text-emerald-600"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  {addresses.length > 1 && (
                    <button
                      onClick={() => handleDeleteAddress(address.id)}
                      className="p-2 text-gray-500 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-1 mb-4 text-sm text-gray-700">
                <p><strong>{address.name}</strong> — {address.phone}</p>
                <p>{address.address}</p>
                {address.landmark && <p>Landmark: {address.landmark}</p>}
                <p>Pincode: {address.pincode}</p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    setAddress(address);
                    navigate('/payment');
                  }}
                  className="flex-1 bg-emerald-500 text-white py-3 px-4 rounded-lg"
                >
                  Deliver Here
                </button>
                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="px-4 py-3 border border-emerald-500 text-emerald-600 rounded-lg"
                  >
                    Set Default
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
