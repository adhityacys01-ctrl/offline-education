import type { CoursePack } from '@/db/types';
import type { CourseListItem } from '@/lib/api';
export declare function useCoursePacks(): CoursePack[];
export declare function useCoursePackStatus(courseId: string): CoursePack | undefined;
export declare function useDownloadManager(): {
    downloading: Record<string, number>;
    errors: Record<string, string>;
    startDownload: (course: CourseListItem) => Promise<void>;
    removeDownload: (courseId: string) => Promise<void>;
};
export declare function useStorageEstimate(): {
    usedGb: number;
    quotaGb: number;
    usedPct: number;
};
//# sourceMappingURL=useDownload.d.ts.map