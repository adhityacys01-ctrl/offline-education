interface AudioPlayerProps {
    text: string;
    language: 'en' | 'hi' | 'mr';
    audioUrl?: string | null;
    audioBlob?: Blob | null;
}
export declare function AudioPlayer({ text, language, audioUrl, audioBlob }: AudioPlayerProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=AudioPlayer.d.ts.map