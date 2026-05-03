'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export function useRealtime<T extends { id: string | number }>(
  initialData: T[],
  tableName: string
) {
  const [data, setData] = useState<T[]>(initialData);
  const supabase = createClient();

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    const channelId = `realtime:${tableName}-${Math.random().toString(36).substring(2, 9)}`;
    const channel = supabase
      .channel(channelId)

      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: tableName },
        (payload) => {
          console.log(`Realtime change in ${tableName}:`, payload);
          
          if (payload.eventType === 'INSERT') {
            setData((prev) => [payload.new as T, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setData((prev) =>
              prev.map((item) => (item.id === (payload.new as T).id ? (payload.new as T) : item))
            );
          } else if (payload.eventType === 'DELETE') {
            setData((prev) => prev.filter((item) => item.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tableName, supabase]);

  return data;
}
