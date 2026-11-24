declare const api: {
    get(path: string): Promise<{
        data: any;
    }>;
    patch(path: string, body: unknown): Promise<{
        data: any;
    }>;
    post(path: string, body?: unknown): Promise<{
        data: any;
    }>;
};
export default api;
//# sourceMappingURL=api.d.ts.map