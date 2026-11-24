export declare function processOutbox(force?: boolean): Promise<void>;
export declare function startSyncEngine(): () => void;
export declare function retryOutboxItem(outboxId: string): Promise<void>;
export declare function retryAllOutboxItems(): Promise<void>;
//# sourceMappingURL=syncEngine.d.ts.map