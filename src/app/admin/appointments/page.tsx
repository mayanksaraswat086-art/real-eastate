'use client';

import React, { useEffect, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { getAppointments } from '@/lib/database/queries';
import { deleteAppointment } from '@/lib/database/actions';

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = () => {
    setLoading(true);
    getAppointments().then(data => {
      setAppointments(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleAction = async (id: number) => {
    if (confirm(`Are you sure you want to delete this appointment?`)) {
      const result = await deleteAppointment(id);
      if (result.success) {
        alert(`Appointment deleted successfully.`);
        loadAppointments();
      } else {
        alert('Action failed. Please try again.');
      }
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
        <p className="text-gray-500 text-sm">Review and manage client site visits and consultations.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 text-gray-400 uppercase text-[11px] tracking-wider font-bold">
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Service Type</th>
              <th className="px-6 py-4">Preferred Slot</th>
              <th className="px-6 py-4">Details</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {appointments.map((app) => (
              <tr key={app.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <p className="font-bold text-gray-900 text-sm">{app.name}</p>
                  <p className="text-xs text-gray-500">{app.email}</p>
                  <p className="text-xs text-primary font-medium">{app.phone}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="capitalize text-sm font-medium text-gray-700 bg-gray-100 px-2.5 py-1 rounded-lg">
                    {app.service_type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-gray-900">{app.preferred_date}</p>
                  <p className="text-xs text-gray-500">{app.preferred_time}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-xs text-gray-600 line-clamp-2 max-w-xs">{app.description || 'No additional details provided.'}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{app.address}</p>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleAction(app.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete Appointment"
                    >
                      <Icon name="TrashIcon" size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {appointments.length === 0 && !loading && (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center text-gray-400 italic">No appointments booked yet.</td>
              </tr>
            )}
            {loading && (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center text-gray-400">Loading appointments...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
