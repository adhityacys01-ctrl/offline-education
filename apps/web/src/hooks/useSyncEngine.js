import { useEffect, useRef } from 'react';
import { startSyncEngine, processOutbox } from '@/services/syncEngine';
// ── useSyncEngine ─────────────────────────────────────────────────────────────
// Mount this once at the root of the authenticated app.
// Starts the engine, registers all listeners, returns a cleanup.
export function useSyncEngine() {
    const cleanupRef = useRef(null);
    useEffect(() => {
        cleanupRef.current = startSyncEngine();
        return () => {
            cleanupRef.current?.();
            cleanupRef.current = null;
        };
    }, []);
}
// ── useManualSync ─────────────────────────────────────────────────────────────
// Exposes a one-shot trigger for user-initiated "Sync Now" actions.
export function useManualSync() {
    return { syncNow: () => processOutbox(true) };
}
//# sourceMappingURL=useSyncEngine.js.map