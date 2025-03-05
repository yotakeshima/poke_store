import { toast } from 'sonner';
import { X, AlertTriangle, CheckCircle } from 'lucide-react';

export function showCustomToast(
  title: string,
  description?: string,
  type: 'success' | 'error' = 'success'
) {
  toast.custom((t) => (
    <div
      className={`relative flex w-full max-w-sm p-4 rounded-lg shadow-lg border ${
        type === 'error'
          ? 'bg-red-100 border-red-400 text-red-800'
          : 'bg-green-100 border-green-400 text-green-800'
      }`}
    >
      {/* Icon */}
      <div className="mr-3">
        {type === 'error' ? (
          <AlertTriangle className="w-5 h-5 text-red-600" />
        ) : (
          <CheckCircle className="w-5 h-5 text-green-600" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <p className="font-semibold">{title}</p>
        {description && <p className="text-sm">{description}</p>}
      </div>

      {/* Close Button (X) */}
      <button
        onClick={() => toast.dismiss(t)}
        className="absolute top-1 right-1 text-gray-600 hover:text-gray-400"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  ));
}
