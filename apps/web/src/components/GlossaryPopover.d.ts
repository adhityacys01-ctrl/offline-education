export interface GlossaryItem {
    id?: string;
    term: string;
    enDef: string;
    hiDef?: string | null;
    mrDef?: string | null;
    enEquiv?: string | null;
    hiEquiv?: string | null;
    mrEquiv?: string | null;
}
interface GlossaryPopoverProps {
    entry: GlossaryItem;
    onClose: () => void;
}
export declare function GlossaryPopover({ entry, onClose }: GlossaryPopoverProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=GlossaryPopover.d.ts.map