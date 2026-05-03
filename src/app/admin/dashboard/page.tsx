import React from 'react';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';
import { getProperties, getAgents, getAppointments, getContactMessages } from '@/lib/database/queries';

export default async function AdminDashboard() {
  const [properties, agents, appointments, messages] = await Promise.all([
    getProperties(),
    getAgents(),
    getAppointments(),
    getContactMessages(),
  ]);

  const stats = [
    { name: 'Total Properties', value: properties.length, icon: 'HomeIcon', color: 'bg-blue-500' },
    { name: 'Active Agents', value: agents.length, icon: 'UsersIcon', color: 'bg-purple-500' },
    { name: 'New Appointments', value: appointments.length, icon: 'CalendarIcon', color: 'bg-orange-500' },
    { name: 'Enquiries', value: messages.length, icon: 'ChatBubbleLeftIcon', color: 'bg-green-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-500 text-sm">Welcome back! Here's what's happening with LuxEstate today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} bg-opacity-10 rounded-xl flex items-center justify-center`}>
                <Icon name={stat.icon} size={24} className={stat.color.replace('bg-', 'text-')} />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
            </div>
            <p className="text-sm font-medium text-gray-500">{stat.name}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Appointments */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Recent Appointments</h3>
            <Link href="/admin/appointments" className="text-primary text-xs font-semibold hover:underline">View All</Link>
          </div>
          <div className="p-0">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-50/50 text-gray-400 uppercase text-[10px] tracking-wider">
                  <th className="px-6 py-3 font-semibold">Client</th>
                  <th className="px-6 py-3 font-semibold">Service</th>
                  <th className="px-6 py-3 font-semibold">Date</th>
                  <th className="px-6 py-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {appointments.slice(0, 5).map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{app.name}</p>
                      <p className="text-xs text-gray-500">{app.email}</p>
                    </td>
                    <td className="px-6 py-4 capitalize text-gray-600">{app.service_type}</td>
                    <td className="px-6 py-4 text-gray-600">{app.preferred_date}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-[10px] font-bold uppercase px-2 py-1 bg-yellow-50 text-yellow-600 rounded-full">Pending</span>
                    </td>
                  </tr>
                ))}
                {appointments.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-gray-400 italic">No recent appointments found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Latest Enquiries</h3>
            <Link href="/admin/queries" className="text-primary text-xs font-semibold hover:underline">View All</Link>
          </div>
          <div className="p-6 space-y-6">
            {messages.slice(0, 4).map((msg) => (
              <div key={msg.id} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <Icon name="UserIcon" size={20} className="text-gray-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-sm text-gray-900">{msg.name}</p>
                    <span className="text-[10px] text-gray-400">Today</span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-1">{msg.message}</p>
                </div>
              </div>
            ))}
            {messages.length === 0 && (
              <p className="text-center text-gray-400 italic py-4">No recent enquiries.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
