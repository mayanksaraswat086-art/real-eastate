'use client';

import React, { useEffect, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { getContactMessages, getPropertyEnquiries } from '@/lib/database/queries';
import { deleteContactMessage, deletePropertyEnquiry } from '@/lib/database/actions';

export default function AdminQueries() {
  const [messages, setMessages] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadQueries = () => {
    setLoading(true);
    Promise.all([getContactMessages(), getPropertyEnquiries()]).then(([msgs, enqs]) => {
      setMessages(msgs);
      setEnquiries(enqs);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadQueries();
  }, []);

  const handleMessageAction = async (id: number) => {
    if (confirm('Are you sure you want to mark this message as resolved and remove it?')) {
      const result = await deleteContactMessage(id);
      if (result.success) loadQueries();
      else alert('Failed to resolve message.');
    }
  };

  const handleEnquiryAction = async (id: number) => {
    if (confirm('Are you sure you want to mark this lead as contacted and remove it?')) {
      const result = await deletePropertyEnquiry(id);
      if (result.success) loadQueries();
      else alert('Failed to process lead.');
    }
  };

  return (
    <div className="space-y-12">
      {/* Contact Messages */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">General Enquiries</h2>
          <p className="text-gray-500 text-sm">Messages sent from the contact page.</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-400 uppercase text-[11px] tracking-wider font-bold">
                <th className="px-6 py-4">Sender</th>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Message</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {messages.map((msg) => (
                <tr key={msg.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900 text-sm">{msg.name}</p>
                    <p className="text-xs text-gray-500">{msg.email}</p>
                    <p className="text-xs text-primary font-medium">{msg.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold text-primary">{msg.subject}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-gray-600 max-w-sm">{msg.message}</p>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400">
                    {msg.created_at ? new Date(msg.created_at).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleMessageAction(msg.id)}
                      className="p-2 text-gray-400 hover:text-primary transition-colors"
                      title="Mark as Resolved"
                    >
                      <Icon name="CheckCircleIcon" size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {messages.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-400 italic">No general enquiries yet.</td>
                </tr>
              )}
              {loading && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-400">Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Property Enquiries */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Property Leads</h2>
          <p className="text-gray-500 text-sm">Queries specific to property listings.</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-400 uppercase text-[11px] tracking-wider font-bold">
                <th className="px-6 py-4">Leads</th>
                <th className="px-6 py-4">Interested In</th>
                <th className="px-6 py-4">Inquiry</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {enquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900 text-sm">{enq.name}</p>
                    <p className="text-xs text-gray-500">{enq.email}</p>
                    <p className="text-xs text-primary font-medium">{enq.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Icon name="HomeIcon" size={14} className="text-primary" />
                      <span className="text-xs font-bold text-gray-800">{(enq as any).properties?.title || 'Unknown Property'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-gray-600 max-w-sm">{enq.message}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleEnquiryAction(enq.id)}
                      className="btn-primary py-1.5 px-4 text-[10px] uppercase font-bold"
                    >
                      Mark Contacted
                    </button>
                  </td>
                </tr>
              ))}
              {enquiries.length === 0 && !loading && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-400 italic">No property leads yet.</td>
                </tr>
              )}
              {loading && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-400">Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
