'use client';

import { useTransition } from 'react';
import { toggleBreadAvailability } from '@/actions/bread';

export function BreadAvailabilityToggle({ 
  id, 
  initialAvailable 
}: { 
  id: string; 
  initialAvailable: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        startTransition(async () => {
          await toggleBreadAvailability(id, !initialAvailable);
        });
      }}
      disabled={isPending}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#DE773B] focus:ring-offset-2 ${
        initialAvailable ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'
      } ${isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span className="sr-only">Alterar disponibilidade</span>
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          initialAvailable ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}
