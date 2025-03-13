'use client';

import { toast } from 'sonner';
import { X } from 'lucide-react';

// Helper function to show error toast
export const showErrorToast = (message: string) => {
  toast.error(message, {
    richColors: true,
    actionButtonStyle: {
      position: 'absolute',
      top: '0.1rem',
      right: '0.1rem',
      width: '31px',
      height: '31px',
      border: 'none',
      backgroundColor: 'transparent',
      color: '#4b5563',
    },
    action: {
      label: <X />,
      onClick: () => toast.dismiss(),
    },
  });
};
