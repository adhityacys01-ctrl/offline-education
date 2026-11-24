import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Eye, ChevronDown, X, Check } from 'lucide-react';
const SUBMISSIONS_DATA = [
    {
        id: 'sub-1',
        studentName: 'Aarav Sharma',
        studentEmail: 'aarav@student.com',
        course: 'Mathematics - Class 10',
        quizTitle: 'Algebraic Expressions & Polynomials',
        attemptDate: '24 Nov, 10:24 AM',
        score: 95,
        totalQuestions: 5,
        status: 'Reviewed',
        feedback: 'Excellent mastery of polynomial factorization and quadratic roots!',
        clientAttemptId: 'ca-8472-aarav-math',
        payloadHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        idempotencyKey: 'idemp-550e8400-e29b-41d4-a716-446655440000',
        answers: [
            { questionId: 'q1', prompt: 'What is the degree of the zero polynomial?', selectedOption: 'Not defined', correctOption: 'Not defined', isCorrect: true },
            { questionId: 'q2', prompt: 'Factorize: 6x^2 + 17x + 5', selectedOption: '(2x + 5)(3x + 1)', correctOption: '(2x + 5)(3x + 1)', isCorrect: true },
            { questionId: 'q3', prompt: 'Find the discriminant of 2x^2 - 4x + 3 = 0', selectedOption: '-8', correctOption: '-8', isCorrect: true },
            { questionId: 'q4', prompt: 'Which of the following is not a polynomial?', selectedOption: 'x + 1/x', correctOption: 'x + 1/x', isCorrect: true },
            { questionId: 'q5', prompt: 'Sum of roots of ax^2 + bx + c = 0 is:', selectedOption: '-b/a', correctOption: '-b/a', isCorrect: true },
        ],
    },
    {
        id: 'sub-2',
        studentName: 'Diya Patel',
        studentEmail: 'diya@student.com',
        course: 'Mathematics - Class 10',
        quizTitle: 'Algebraic Expressions & Polynomials',
        attemptDate: '24 Nov, 09:50 AM',
        score: 90,
        totalQuestions: 5,
        status: 'Reviewed',
        feedback: 'Very thorough solutions. Review discriminant definitions.',
        clientAttemptId: 'ca-9214-diya-math',
        payloadHash: '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945',
        idempotencyKey: 'idemp-770e8400-e29b-41d4-a716-446655440111',
        answers: [
            { questionId: 'q1', prompt: 'What is the degree of the zero polynomial?', selectedOption: 'Not defined', correctOption: 'Not defined', isCorrect: true },
            { questionId: 'q2', prompt: 'Factorize: 6x^2 + 17x + 5', selectedOption: '(2x + 5)(3x + 1)', correctOption: '(2x + 5)(3x + 1)', isCorrect: true },
            { questionId: 'q3', prompt: 'Find the discriminant of 2x^2 - 4x + 3 = 0', selectedOption: '8', correctOption: '-8', isCorrect: false },
            { questionId: 'q4', prompt: 'Which of the following is not a polynomial?', selectedOption: 'x + 1/x', correctOption: 'x + 1/x', isCorrect: true },
            { questionId: 'q5', prompt: 'Sum of roots of ax^2 + bx + c = 0 is:', selectedOption: '-b/a', correctOption: '-b/a', isCorrect: true },
        ],
    },
    {
        id: 'sub-3',
        studentName: 'Rohan Mehta',
        studentEmail: 'rohan@student.com',
        course: 'Mathematics - Class 10',
        quizTitle: 'Algebraic Expressions & Polynomials',
        attemptDate: '24 Nov, 09:12 AM',
        score: 75,
        totalQuestions: 5,
        status: 'Pending',
        feedback: '',
        clientAttemptId: 'ca-1082-rohan-math',
        payloadHash: '9a53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b999',
        idempotencyKey: 'idemp-990e8400-e29b-41d4-a716-446655440222',
        answers: [
            { questionId: 'q1', prompt: 'What is the degree of the zero polynomial?', selectedOption: '0', correctOption: 'Not defined', isCorrect: false },
            { questionId: 'q2', prompt: 'Factorize: 6x^2 + 17x + 5', selectedOption: '(2x + 5)(3x + 1)', correctOption: '(2x + 5)(3x + 1)', isCorrect: true },
            { questionId: 'q3', prompt: 'Find the discriminant of 2x^2 - 4x + 3 = 0', selectedOption: '-8', correctOption: '-8', isCorrect: true },
            { questionId: 'q4', prompt: 'Which of the following is not a polynomial?', selectedOption: 'x^2 + 5', correctOption: 'x + 1/x', isCorrect: false },
            { questionId: 'q5', prompt: 'Sum of roots of ax^2 + bx + c = 0 is:', selectedOption: '-b/a', correctOption: '-b/a', isCorrect: true },
        ],
    },
];
export default function TeacherAssessmentReviewPage() {
    const [activeTab, setActiveTab] = useState('submissions');
    const [courseFilter, setCourseFilter] = useState('Mathematics - Class 10');
    const [submissions, setSubmissions] = useState(SUBMISSIONS_DATA);
    const [selectedSubId, setSelectedSubId] = useState(SUBMISSIONS_DATA[0].id);
    // Modals
    const [viewAnswersModal, setViewAnswersModal] = useState(false);
    const [feedbackModal, setFeedbackModal] = useState(false);
    const [feedbackText, setFeedbackText] = useState('');
    const [feedbackScore, setFeedbackScore] = useState(95);
    const [feedbackSaved, setFeedbackSaved] = useState(false);
    const activeSubmission = submissions.find((s) => s.id === selectedSubId) || submissions[0];
    const handleOpenFeedback = () => {
        setFeedbackText(activeSubmission.feedback || '');
        setFeedbackScore(activeSubmission.score);
        setFeedbackSaved(false);
        setFeedbackModal(true);
    };
    const handleSaveFeedback = (e) => {
        e.preventDefault();
        setSubmissions((prev) => prev.map((s) => s.id === activeSubmission.id
            ? { ...s, score: feedbackScore, feedback: feedbackText, status: 'Reviewed' }
            : s));
        setFeedbackSaved(true);
        setTimeout(() => {
            setFeedbackModal(false);
            setFeedbackSaved(false);
        }, 1000);
    };
    return (_jsxs("div", { className: "space-y-6 max-w-5xl mx-auto pb-10", children: [_jsx("div", { className: "flex items-center justify-between", children: _jsx("h1", { className: "text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight", children: "Assessment Review" }) }), _jsxs("div", { className: "flex items-center gap-6 border-b border-[#D7E5F0] dark:border-[#1E2D48]", children: [_jsxs("button", { onClick: () => setActiveTab('submissions'), className: `pb-3 text-sm font-bold transition-all relative ${activeTab === 'submissions'
                            ? 'text-[#1B7FC9]'
                            : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'}`, children: ["Submissions", activeTab === 'submissions' && (_jsx("span", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-[#1B7FC9] rounded-full" }))] }), _jsxs("button", { onClick: () => setActiveTab('analytics'), className: `pb-3 text-sm font-bold transition-all relative ${activeTab === 'analytics'
                            ? 'text-[#1B7FC9]'
                            : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'}`, children: ["Analytics", activeTab === 'analytics' && (_jsx("span", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-[#1B7FC9] rounded-full" }))] })] }), _jsx("div", { className: "flex items-center gap-3", children: _jsxs("div", { className: "relative", children: [_jsxs("select", { value: courseFilter, onChange: (e) => setCourseFilter(e.target.value), className: "appearance-none pl-4 pr-9 py-2 bg-white dark:bg-[#131F33] border border-[#D7E5F0] dark:border-[#1E2D48] rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1B7FC9]", children: [_jsx("option", { value: "Mathematics - Class 10", children: "Mathematics - Class 10" }), _jsx("option", { value: "Science - Class 10", children: "Science - Class 10" }), _jsx("option", { value: "History - Class 10", children: "History - Class 10" })] }), _jsx(ChevronDown, { size: 14, className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" })] }) }), activeTab === 'submissions' ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] overflow-hidden shadow-xs", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-left border-collapse", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-[#D7E5F0] dark:border-[#1E2D48] bg-[#F8FAFC] dark:bg-[#0E1726]/50", children: [_jsx("th", { className: "py-3.5 px-5 text-xs font-bold text-slate-600 dark:text-slate-300", children: "Student" }), _jsx("th", { className: "py-3.5 px-5 text-xs font-bold text-slate-600 dark:text-slate-300", children: "Attempt Date" }), _jsx("th", { className: "py-3.5 px-5 text-xs font-bold text-slate-600 dark:text-slate-300", children: "Score" }), _jsx("th", { className: "py-3.5 px-5 text-xs font-bold text-slate-600 dark:text-slate-300", children: "Status" })] }) }), _jsx("tbody", { className: "divide-y divide-[#EBF2F7] dark:divide-[#1A2E46]", children: submissions.map((sub) => {
                                            const isSelected = sub.id === selectedSubId;
                                            return (_jsxs("tr", { onClick: () => setSelectedSubId(sub.id), className: `cursor-pointer transition-colors ${isSelected
                                                    ? 'bg-[#EBF4FA] dark:bg-[#162842]'
                                                    : 'hover:bg-[#F0F5FA] dark:hover:bg-[#1A2E46]/40'}`, children: [_jsx("td", { className: "py-4 px-5", children: _jsx("p", { className: "text-xs font-bold text-slate-900 dark:text-slate-100", children: sub.studentName }) }), _jsx("td", { className: "py-4 px-5", children: _jsx("span", { className: "text-xs font-semibold text-slate-600 dark:text-slate-300", children: sub.attemptDate }) }), _jsx("td", { className: "py-4 px-5", children: _jsxs("span", { className: "text-xs font-bold text-slate-900 dark:text-slate-100", children: [sub.score, "%"] }) }), _jsx("td", { className: "py-4 px-5", children: sub.status === 'Reviewed' ? (_jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400", children: "Reviewed" })) : (_jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400", children: "Pending" })) })] }, sub.id));
                                        }) })] }) }) }), _jsxs("div", { className: "bg-[#EBF4FA] dark:bg-[#132035] rounded-2xl border border-[#C5DCF0] dark:border-[#1E2D48] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "w-1.5 h-8 bg-[#1B7FC9] rounded-full" }), _jsxs("button", { onClick: () => setViewAnswersModal(true), className: "flex items-center gap-2 text-xs font-bold text-[#1465A3] dark:text-[#38BDF8] hover:text-[#1B7FC9] transition-colors", children: [_jsx(Eye, { size: 16 }), "View Answers (", activeSubmission.studentName, ")"] })] }), _jsx("button", { onClick: handleOpenFeedback, className: "w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white dark:bg-[#1A2E46] text-[#1465A3] dark:text-[#38BDF8] border border-[#BFDCF2] dark:border-[#223D61] text-xs font-bold hover:bg-[#1B7FC9] hover:text-white transition-all shadow-xs", children: "Provide Feedback" })] })] })) : (
            /* ── Analytics Tab ─────────────────────────────────────────────────── */
            _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [_jsxs("div", { className: "bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] p-5", children: [_jsx("p", { className: "text-xs font-semibold text-slate-500", children: "Class Average" }), _jsx("p", { className: "text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1", children: "86.6%" })] }), _jsxs("div", { className: "bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] p-5", children: [_jsx("p", { className: "text-xs font-semibold text-slate-500", children: "Pass Rate" }), _jsx("p", { className: "text-2xl font-bold text-emerald-600 mt-1", children: "100%" })] }), _jsxs("div", { className: "bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] p-5", children: [_jsx("p", { className: "text-xs font-semibold text-slate-500", children: "Completion Time (Avg)" }), _jsx("p", { className: "text-2xl font-bold text-[#1465A3] dark:text-[#38BDF8] mt-1", children: "14.2 min" })] })] }), _jsxs("div", { className: "bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] p-6", children: [_jsx("h2", { className: "text-base font-bold text-slate-900 dark:text-slate-100 mb-4", children: "Question Difficulty Breakdown" }), _jsx("div", { className: "space-y-3", children: [
                                    { q: 'Q1: Degree of zero polynomial', passRate: 75, correct: 3, total: 4 },
                                    { q: 'Q2: Quadratic factorization', passRate: 100, correct: 4, total: 4 },
                                    { q: 'Q3: Discriminant formula', passRate: 75, correct: 3, total: 4 },
                                    { q: 'Q4: Polynomial terms identification', passRate: 80, correct: 4, total: 5 },
                                    { q: 'Q5: Sum of quadratic roots', passRate: 100, correct: 4, total: 4 },
                                ].map((item, idx) => (_jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex justify-between text-xs font-semibold", children: [_jsx("span", { className: "text-slate-700 dark:text-slate-300", children: item.q }), _jsxs("span", { className: "text-[#1465A3] font-bold", children: [item.passRate, "% Correct"] })] }), _jsx("div", { className: "w-full h-2 rounded-full bg-[#E5EEF6] dark:bg-[#1E2D48] overflow-hidden", children: _jsx("div", { className: "h-full rounded-full bg-gradient-to-r from-[#1B7FC9] to-emerald-500", style: { width: `${item.passRate}%` } }) })] }, idx))) })] })] })), viewAnswersModal && (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4", children: _jsxs("div", { className: "bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] max-w-2xl w-full p-6 shadow-xl max-h-[85vh] overflow-y-auto", children: [_jsxs("div", { className: "flex items-center justify-between pb-3 border-b border-[#D7E5F0] dark:border-[#1E2D48]", children: [_jsxs("div", { children: [_jsxs("h2", { className: "text-base font-bold text-slate-900 dark:text-slate-100", children: [activeSubmission.studentName, " \u2014 Answer Sheet"] }), _jsxs("p", { className: "text-xs text-slate-400 font-medium", children: [activeSubmission.quizTitle, " \u2022 Score: ", activeSubmission.score, "%"] })] }), _jsx("button", { onClick: () => setViewAnswersModal(false), className: "text-slate-400 hover:text-slate-600 p-1 rounded-lg", children: _jsx(X, { size: 18 }) })] }), _jsx("div", { className: "mt-5 space-y-4", children: activeSubmission.answers.map((ans, idx) => (_jsxs("div", { className: `p-4 rounded-xl border ${ans.isCorrect
                                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40'
                                    : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40'}`, children: [_jsxs("div", { className: "flex items-start justify-between gap-2", children: [_jsxs("p", { className: "text-xs font-bold text-slate-900 dark:text-slate-100", children: ["Q", idx + 1, ". ", ans.prompt] }), _jsx("span", { className: `text-[10px] font-bold px-2 py-0.5 rounded-full ${ans.isCorrect
                                                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
                                                    : 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300'}`, children: ans.isCorrect ? 'Correct' : 'Incorrect' })] }), _jsxs("div", { className: "mt-2.5 text-xs space-y-1", children: [_jsxs("p", { className: "text-slate-600 dark:text-slate-400", children: ["Student Choice:", ' ', _jsx("span", { className: `font-bold ${ans.isCorrect ? 'text-emerald-700' : 'text-rose-700'}`, children: ans.selectedOption })] }), !ans.isCorrect && (_jsxs("p", { className: "text-slate-600 dark:text-slate-400", children: ["Correct Answer:", ' ', _jsx("span", { className: "font-bold text-emerald-700", children: ans.correctOption })] }))] })] }, ans.questionId))) }), _jsxs("div", { className: "mt-5 p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#0E1726] border border-[#D7E5F0] dark:border-[#1E2D48] text-xs space-y-1.5 font-mono", children: [_jsx("p", { className: "font-sans font-bold text-slate-700 dark:text-slate-300 text-[11px]", children: "Cryptographic Submission Integrity" }), _jsxs("p", { className: "text-[10px] text-slate-500 truncate", children: ["Client Attempt ID: ", activeSubmission.clientAttemptId] }), _jsxs("p", { className: "text-[10px] text-slate-500 truncate", children: ["Payload SHA-256: ", activeSubmission.payloadHash] }), _jsxs("p", { className: "text-[10px] text-slate-500 truncate", children: ["Idempotency Key: ", activeSubmission.idempotencyKey] })] }), _jsx("div", { className: "mt-6 pt-4 border-t border-[#D7E5F0] dark:border-[#1E2D48] flex justify-end", children: _jsx("button", { onClick: () => setViewAnswersModal(false), className: "px-4 py-2 text-xs font-bold rounded-xl bg-[#1B7FC9] hover:bg-[#1465A3] text-white", children: "Close Answer Sheet" }) })] }) })), feedbackModal && (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4", children: _jsxs("div", { className: "bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] max-w-md w-full p-6 shadow-xl animate-fade-in", children: [_jsxs("div", { className: "flex items-center justify-between pb-3 border-b border-[#D7E5F0] dark:border-[#1E2D48]", children: [_jsxs("h2", { className: "text-base font-bold text-slate-900 dark:text-slate-100", children: ["Provide Feedback \u2014 ", activeSubmission.studentName] }), _jsx("button", { onClick: () => setFeedbackModal(false), className: "text-slate-400 hover:text-slate-600 p-1 rounded-lg", children: _jsx(X, { size: 18 }) })] }), feedbackSaved ? (_jsxs("div", { className: "py-8 text-center text-emerald-600 font-bold text-sm flex flex-col items-center gap-2", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center", children: _jsx(Check, { size: 20 }) }), "Feedback Saved & Sent to Student"] })) : (_jsxs("form", { onSubmit: handleSaveFeedback, className: "space-y-4 mt-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1", children: "Score / Marks (%)" }), _jsx("input", { type: "number", min: "0", max: "100", value: feedbackScore, onChange: (e) => setFeedbackScore(Number(e.target.value)), className: "w-full px-3.5 py-2 text-xs rounded-xl border border-[#D7E5F0] dark:border-[#1E2D48] bg-white dark:bg-[#0E1726] text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#1B7FC9]" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1", children: "Teacher Feedback & Recommendations" }), _jsx("textarea", { rows: 4, required: true, placeholder: "Write constructive notes for the student...", value: feedbackText, onChange: (e) => setFeedbackText(e.target.value), className: "w-full px-3.5 py-2 text-xs rounded-xl border border-[#D7E5F0] dark:border-[#1E2D48] bg-white dark:bg-[#0E1726] text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#1B7FC9]" })] }), _jsxs("div", { className: "pt-2 flex items-center justify-end gap-2", children: [_jsx("button", { type: "button", onClick: () => setFeedbackModal(false), className: "px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800", children: "Cancel" }), _jsx("button", { type: "submit", className: "px-4 py-2 text-xs font-bold rounded-xl bg-[#1B7FC9] hover:bg-[#1465A3] text-white transition-all", children: "Submit Feedback" })] })] }))] }) }))] }));
}
//# sourceMappingURL=TeacherAssessmentReviewPage.js.map