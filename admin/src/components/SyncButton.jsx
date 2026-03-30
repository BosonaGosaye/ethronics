import { useState } from 'react';
import { RefreshCw, Check, X } from 'lucide-react';

export default function SyncButton({ onSync, disabled = false, label = "Sync Images to All Languages" }) {
  const [syncing, setSyncing] = useState(false);
  const [result, setResult] = useState(null);

  const handleSync = async () => {
    setSyncing(true);
    setResult(null);

    try {
      const syncResult = await onSync();
      setResult(syncResult);
      
      // Clear result after 3 seconds
      setTimeout(() => setResult(null), 3000);
    } catch (error) {
      setResult({ success: [], failed: [{ error: error.message }] });
      setTimeout(() => setResult(null), 3000);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={handleSync}
        disabled={disabled || syncing}
        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
        <span>{syncing ? 'Syncing...' : label}</span>
      </button>

      {result && (
        <div className="flex items-center space-x-2">
          {result.success.length > 0 && (
            <div className="flex items-center space-x-1 text-green-600">
              <Check className="w-4 h-4" />
              <span className="text-sm">
                Synced to {result.success.join(', ').toUpperCase()}
              </span>
            </div>
          )}
          {result.failed.length > 0 && (
            <div className="flex items-center space-x-1 text-red-600">
              <X className="w-4 h-4" />
              <span className="text-sm">
                Failed: {result.failed.length} language(s)
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
