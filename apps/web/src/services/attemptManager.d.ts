import type { Attempt, Answer } from '@/db/types';
export declare function getOrCreateAttempt(quizVersionId: string, courseId: string, quizTitle: string): Promise<Attempt>;
export declare function saveAnswerTransactionally(clientAttemptId: string, questionId: string, selectedOptionId: string | null): Promise<Answer>;
export declare function finalizeAttempt(clientAttemptId: string): Promise<string>;
export declare function loadAttemptWithAnswers(clientAttemptId: string): Promise<{
    attempt: Attempt;
    answers: Record<string, Answer>;
} | null>;
export declare function getPendingOutboxCount(): Promise<number>;
//# sourceMappingURL=attemptManager.d.ts.map