'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { getAgents } from '@/lib/database/queries';
import { addAgent, deleteAgent, updateAgent } from '@/lib/database/actions';
import { useRealtime } from '@/lib/database/useRealtime';
import type { Agent } from '@/lib/database/types';

export default function AdminAgents() {
  const [initialAgents, setInitialAgents] = useState<Agent[]>([]);
  const agents = useRealtime(initialAgents, 'agents');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    loadAgents();
  }, []);

  async function loadAgents() {
    setLoading(true);
    const data = await getAgents();
    setInitialAgents(data);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this agent?')) return;
    
    setLoading(true);
    const result = await deleteAgent(id);
    if (result.success) {
      setMessage({ type: 'success', text: 'Agent deleted successfully!' });
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to delete agent' });
    }
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    let result;
    if (editingId) {
      result = await updateAgent(editingId, formData);
    } else {
      result = await addAgent(formData);
    }
    
    if (result.success) {
      setMessage({ type: 'success', text: editingId ? 'Agent updated successfully!' : 'Agent added successfully!' });
      setIsAdding(false);
      setEditingId(null);
      loadAgents();
    } else {
      setMessage({ type: 'error', text: result.error || 'Operation failed' });
    }
    setLoading(false);
  }

  const editingAgent = editingId ? agents.find(a => a.id === editingId) : null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
          <p className="text-gray-500 text-sm">Manage your expert real estate agents and their profiles.</p>
        </div>
        <button 
          onClick={() => {
            setIsAdding(!isAdding);
            setEditingId(null);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Icon name={isAdding || editingId ? 'XMarkIcon' : 'UserPlusIcon'} size={20} />
          {isAdding || editingId ? 'Cancel' : 'Register New Agent'}
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          <Icon name={message.type === 'success' ? 'CheckCircleIcon' : 'ExclamationCircleIcon'} size={20} />
          <p className="text-sm font-medium">{message.text}</p>
        </div>
      )}

      {(isAdding || editingId) && (
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl">
          <h3 className="text-lg font-bold text-gray-900 mb-6">{editingId ? 'Edit Agent Profile' : 'New Agent Registration'}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">Full Name *</label>
                <input name="name" required defaultValue={editingAgent?.name} className="input-field w-full" placeholder="e.g. Rahul Sharma" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">Designation *</label>
                <input name="designation" required defaultValue={editingAgent?.designation} className="input-field w-full" placeholder="e.g. Senior Consultant" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">City *</label>
                  <input name="city" required defaultValue={editingAgent?.city} className="input-field w-full" placeholder="Mumbai" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">Experience *</label>
                  <input name="experience" required defaultValue={editingAgent?.experience} className="input-field w-full" placeholder="e.g. 5 Years" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">Speciality *</label>
                <input name="speciality" required defaultValue={editingAgent?.speciality} className="input-field w-full" placeholder="e.g. Luxury Villas" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">Photo URL *</label>
                <input name="photo" required defaultValue={editingAgent?.photo} className="input-field w-full" placeholder="https://..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">Mobile Phone *</label>
                  <input name="phone" required defaultValue={editingAgent?.phone} className="input-field w-full" placeholder="+91..." />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">WhatsApp Number</label>
                  <input name="whatsapp" defaultValue={editingAgent?.whatsapp || ''} className="input-field w-full" placeholder="+91..." />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">Photo Alt Text (SEO)</label>
                <input name="photo_alt" defaultValue={editingAgent?.photo_alt || ''} className="input-field w-full" placeholder="Photo of Rahul Sharma" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">Initial Rating</label>
                  <input name="rating" type="number" step="0.1" defaultValue={editingAgent?.rating || "5.0"} className="input-field w-full" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">Properties Managed</label>
                  <input name="properties" type="number" defaultValue={editingAgent?.properties || "0"} className="input-field w-full" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">Detailed Bio (About Agent)</label>
                <textarea name="bio" rows={4} defaultValue={editingAgent?.bio || ''} className="input-field w-full resize-none" placeholder="Experience, achievements, and approach..." />
              </div>
              <button type="submit" disabled={loading} className="w-full btn-primary py-4">
                {loading ? 'Processing...' : (editingId ? 'Update Profile' : 'Complete Registration')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Agents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all group">
            <div className="h-48 relative">
              <AppImage src={agent.photo} alt={agent.name} fill className="object-cover" />
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => {
                    setEditingId(agent.id);
                    setIsAdding(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-400 hover:text-primary transition-colors"
                >
                  <Icon name="PencilSquareIcon" size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(agent.id)}
                  className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Icon name="TrashIcon" size={16} />
                </button>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-gray-900">{agent.name}</h3>
              <p className="text-xs text-primary font-medium mb-3">{agent.designation}</p>
              
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-50">
                <div className="flex items-center gap-1">
                  <Icon name="BriefcaseIcon" size={14} className="text-gray-400" />
                  {agent.experience}
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="HomeIcon" size={14} className="text-gray-400" />
                  {agent.properties} Listings
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Icon name="StarIcon" size={14} variant="solid" className="text-yellow-400" />
                  <span className="text-xs font-bold text-gray-700">{agent.rating}</span>
                </div>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{agent.city}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
