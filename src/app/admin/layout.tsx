'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import LogoutButton from './components/LogoutButton';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  const menuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: 'Squares2X2Icon' },
    { name: 'Properties', href: '/admin/properties', icon: 'HomeIcon' },
    { name: 'Agents', href: '/admin/agents', icon: 'UsersIcon' },
    { name: 'Appointments', href: '/admin/appointments', icon: 'CalendarIcon' },
    { name: 'Queries', href: '/admin/queries', icon: 'ChatBubbleLeftEllipsisIcon' },
  ];

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 sticky top-0 h-screen hidden md:block">
        <div className="p-6 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Icon name="HomeModernIcon" size={18} variant="solid" className="text-white" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-gray-900">LuxEstate <span className="text-primary text-xs uppercase ml-1">Admin</span></span>
          </Link>
        </div>
        
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
                pathname === item.href 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
              }`}
            >
              <Icon name={item.icon} size={20} className={pathname === item.href ? 'text-primary' : 'text-gray-400 group-hover:text-primary'} />
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="font-semibold text-gray-800">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 relative">
              <Icon name="BellIcon" size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
              AD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
