'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { getProperties } from '@/lib/database/queries';
import { addProperty, deleteProperty, updateProperty } from '@/lib/database/actions';
import { useRealtime } from '@/lib/database/useRealtime';
import type { Property } from '@/lib/database/types';

export default function AdminProperties() {
  const [initialProperties, setInitialProperties] = useState<Property[]>([]);
  const properties = useRealtime(initialProperties, 'properties');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    loadProperties();
  }, []);

  async function loadProperties() {
    setLoading(true);
    const data = await getProperties();
    setInitialProperties(data);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this property?')) return;

    setLoading(true);
    const result = await deleteProperty(id);
    if (result.success) {
      setMessage({ type: 'success', text: 'Property deleted successfully!' });
      // list will update via realtime
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to delete property' });
    }
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    let result;
    if (editingId) {
      result = await updateProperty(editingId, formData);
    } else {
      result = await addProperty(formData);
    }

    if (result.success) {
      setMessage({ type: 'success', text: editingId ? 'Property updated successfully!' : 'Property added successfully!' });
      setIsAdding(false);
      setEditingId(null);
      loadProperties();
    } else {
      setMessage({ type: 'error', text: result.error || 'Operation failed' });
    }
    setLoading(false);
  }

  const editingProperty = editingId ? properties.find(p => p.id === editingId) : null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Properties</h2>
          <p className="text-gray-500 text-sm">Add, edit or remove property listings from LuxEstate.</p>
        </div>
        <button
          onClick={() => {
            setIsAdding(!isAdding);
            setEditingId(null);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Icon name={isAdding || editingId ? 'XMarkIcon' : 'PlusIcon'} size={20} />
          {isAdding || editingId ? 'Cancel' : 'Add New Property'}
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          <Icon name={message.type === 'success' ? 'CheckCircleIcon' : 'ExclamationCircleIcon'} size={20} />
          <p className="text-sm font-medium">{message.text}</p>
          <button onClick={() => setMessage(null)} className="ml-auto text-gray-400 hover:text-gray-600">
            <Icon name="XMarkIcon" size={16} />
          </button>
        </div>
      )}

      {(isAdding || editingId) && (
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
          <h3 className="text-lg font-bold text-gray-900 mb-6">{editingId ? 'Edit Property Listing' : 'Add New Listing'}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">Property Title *</label>
                <input name="title" required defaultValue={editingProperty?.title} className="input-field w-full" placeholder="e.g. Modern 3BHK Apartment" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">Price (Numeric) *</label>
                  <input name="price" type="number" required defaultValue={editingProperty?.price} className="input-field w-full" placeholder="18000000" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">Price Display *</label>
                  <input name="price_display" required defaultValue={editingProperty?.price_display} className="input-field w-full" placeholder="₹1.8 Cr" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">City *</label>
                  <select name="city" required defaultValue={editingProperty?.city || 'Mumbai'} className="input-field w-full">
                    <option>Mumbai</option>
                    <option>Pune</option>
                    <option>Bengaluru</option>
                    <option>Hyderabad</option>
                    <option>Delhi NCR</option>
                    <option>Chennai</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">Location *</label>
                  <input name="location" required defaultValue={editingProperty?.location} className="input-field w-full" placeholder="Area Name" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">BHK</label>
                  <input name="bhk" type="number" defaultValue={editingProperty?.bhk} className="input-field w-full" placeholder="3" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">Sqft *</label>
                  <input name="sqft" type="number" required defaultValue={editingProperty?.sqft} className="input-field w-full" placeholder="1800" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">Status *</label>
                  <select name="status" defaultValue={editingProperty?.status || 'Buy'} className="input-field w-full">
                    <option value="Buy">Buy</option>
                    <option value="Rent">Rent</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">Image URL *</label>
                <input name="image" required defaultValue={editingProperty?.image} className="input-field w-full" placeholder="https://..." />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">Property Type *</label>
                <select name="type" required defaultValue={editingProperty?.type || 'Apartment'} className="input-field w-full">
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>Penthouse</option>
                  <option>Bungalow</option>
                  <option>Plot</option>
                  <option>Commercial</option>
                  <option>Studio</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">About This Property (Description)</label>
                <textarea name="description" rows={3} defaultValue={editingProperty?.description || ''} className="input-field w-full resize-none" placeholder="Details about the property..." />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">Floor</label>
                  <input name="floor" defaultValue={editingProperty?.floor || ''} className="input-field w-full" placeholder="e.g. 12th of 20" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">Furnishing</label>
                  <select name="furnishing" defaultValue={editingProperty?.furnishing || 'Semi-Furnished'} className="input-field w-full">
                    <option value="Unfurnished">Unfurnished</option>
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Fully Furnished">Fully Furnished</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">Property Age</label>
                  <input name="age" defaultValue={editingProperty?.age || ''} className="input-field w-full" placeholder="e.g. 5 Years" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">Amenities (Comma separated) *</label>
                <textarea 
                  name="amenities" 
                  rows={2} 
                  defaultValue={editingProperty?.amenities?.join(', ') || ''} 
                  className="input-field w-full resize-none" 
                  placeholder="Swimming Pool, Gym, 24/7 Security, Parking..." 
                />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" name="featured" id="featured" defaultChecked={!!editingProperty?.featured} className="w-4 h-4 rounded accent-primary" />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700">Mark as Featured Property</label>
              </div>
              <button type="submit" disabled={loading} className="w-full btn-primary py-4 mt-2">
                {loading ? 'Processing...' : (editingId ? 'Update Property Listing' : 'Save Property Listing')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Properties Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 text-gray-400 uppercase text-[11px] tracking-wider font-bold">
              <th className="px-6 py-4">Property</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Details</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Amenities</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {properties.map((prop) => (
              <tr key={prop.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                      <AppImage src={prop.image} alt={prop.title} width={48} height={48} className="object-cover w-full h-full" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{prop.title}</p>
                      <p className="text-xs text-gray-500">{prop.location}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-bold text-primary text-sm">{prop.price_display}</p>
                </td>
                <td className="px-6 py-4 text-xs text-gray-600">
                  {prop.bhk} BHK • {prop.sqft} sqft • {prop.type}
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${prop.status === 'Buy' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                    {prop.status === 'Buy' ? 'Sale' : 'Rent'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {prop.amenities && prop.amenities.length > 0 ? (
                      prop.amenities.slice(0, 3).map((a, i) => (
                        <span key={i} className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                          {a}
                        </span>
                      ))
                    ) : (
                      <span className="text-[9px] text-gray-300 italic">None added</span>
                    )}
                    {prop.amenities && prop.amenities.length > 3 && (
                      <span className="text-[9px] text-gray-400">+{prop.amenities.length - 3}</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => {
                        setEditingId(prop.id);
                        setIsAdding(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Icon name="PencilSquareIcon" size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(prop.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Icon name="TrashIcon" size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {properties.length === 0 && !loading && (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center text-gray-400 italic">No properties found. Add your first listing!</td>
              </tr>
            )}
            {loading && (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center text-gray-400">Loading listings...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
