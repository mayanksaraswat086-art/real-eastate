'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { logout } from '@/lib/database/auth-actions';

export default function LogoutButton() {
  return (
    <button
      onClick={() => logout()}
      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all w-full"
    >
      <Icon name="ArrowLeftOnRectangleIcon" size={20} />
      Logout
    </button>
  );
}
