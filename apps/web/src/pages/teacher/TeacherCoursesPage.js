import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Plus, ArrowRight, X, BookOpen, CheckSquare, Check } from 'lucide-react';
import { COURSE_CATALOG } from '@/data/course-data';
import { useI18n } from '@/lib/i18n';
const INITIAL_COURSES = [
    {
        id: 'seed-course-math',
        title: 'Mathematics',
        grade: 'Class 10',
        students: 150,
        avgScore: 85,
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80',
        studentDotColor: 'bg-[#1B7FC9]',
        lessonsCount: 10,
        quizzesCount: 3,
    },
    {
        id: 'seed-course-science',
        title: 'Science',
        grade: 'Class 10',
        students: 110,
        avgScore: 82,
        image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
        studentDotColor: 'bg-emerald-500',
        lessonsCount: 10,
        quizzesCount: 3,
    },
    {
        id: 'seed-course-history',
        title: 'History',
        grade: 'Class 10',
        students: 95,
        avgScore: 78,
        image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=600&q=80',
        studentDotColor: 'bg-amber-500',
        lessonsCount: 10,
        quizzesCount: 3,
    },
];
export default function TeacherCoursesPage() {
    const { t, translateCourseTitle } = useI18n();
    const [courses, setCourses] = useState(INITIAL_COURSES);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newGrade, setNewGrade] = useState('Class 10');
    const [newSubject, setNewSubject] = useState('Science');
    const [saveSuccess, setSaveSuccess] = useState(false);
    const handleCreateCourse = (e) => {
        e.preventDefault();
        if (!newTitle.trim())
            return;
        const newCourseItem = {
            id: `course-${Date.now()}`,
            title: newTitle.trim(),
            grade: newGrade,
            students: 45,
            avgScore: 80,
            image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
            studentDotColor: 'bg-emerald-500',
            lessonsCount: 8,
            quizzesCount: 2,
        };
        setCourses([newCourseItem, ...courses]);
        setSaveSuccess(true);
        setTimeout(() => {
            setSaveSuccess(false);
            setShowCreateModal(false);
            setNewTitle('');
        }, 1200);
    };
    // Find detailed lessons and quizzes from catalog for selected course
    const catalogMatch = COURSE_CATALOG.find((c) => c.title.toLowerCase().includes(selectedCourse?.title.toLowerCase() || '') ||
        c.subject.toLowerCase().includes(selectedCourse?.title.toLowerCase() || '')) || COURSE_CATALOG[0];
    return (_jsxs("div", { className: "space-y-6 max-w-5xl mx-auto pb-10", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h1", { className: "text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight", children: t('myCourses') }), _jsxs("button", { onClick: () => setShowCreateModal(true), className: "px-4 py-2 rounded-xl bg-[#1B7FC9] hover:bg-[#1465A3] active:scale-[0.98] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5", children: [_jsx(Plus, { size: 15 }), t('createCourse')] })] }), _jsx("div", { className: "space-y-4", children: courses.map((course) => (_jsxs("div", { className: "bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs hover:border-[#1B7FC9] transition-all", children: [_jsxs("div", { className: "flex items-center gap-4 min-w-0", children: [_jsx("img", { src: course.image, alt: course.title, className: "w-24 h-24 sm:w-28 sm:h-24 rounded-xl object-cover flex-shrink-0 border border-[#D7E5F0] dark:border-[#1E2D48]" }), _jsxs("div", { className: "min-w-0", children: [_jsx("h3", { className: "text-base font-bold text-slate-900 dark:text-slate-100", children: translateCourseTitle(course.title) }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5", children: course.grade }), _jsxs("div", { className: "flex items-center gap-4 mt-2.5 text-xs font-semibold", children: [_jsxs("span", { className: "flex items-center gap-1.5 text-slate-600 dark:text-slate-300", children: [_jsx("span", { className: `w-2 h-2 rounded-full ${course.studentDotColor}` }), course.students, " ", t('studentsCountLabel')] }), _jsxs("span", { className: "flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400", children: [_jsx("span", { className: "w-2 h-2 rounded-full bg-emerald-500" }), course.avgScore, "% ", t('averageScore')] })] })] })] }), _jsxs("button", { onClick: () => setSelectedCourse(course), className: "w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#E1EEF8] dark:bg-[#1A2E46] text-[#1465A3] dark:text-[#38BDF8] text-xs font-bold hover:bg-[#1B7FC9] hover:text-white transition-all flex items-center justify-center gap-1.5 flex-shrink-0", children: [t('viewDetails'), " ", _jsx(ArrowRight, { size: 14 })] })] }, course.id))) }), showCreateModal && (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4", children: _jsxs("div", { className: "bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] max-w-md w-full p-6 shadow-xl animate-fade-in", children: [_jsxs("div", { className: "flex items-center justify-between pb-3 border-b border-[#D7E5F0] dark:border-[#1E2D48]", children: [_jsx("h2", { className: "text-base font-bold text-slate-900 dark:text-slate-100", children: "Create Course" }), _jsx("button", { onClick: () => setShowCreateModal(false), className: "text-slate-400 hover:text-slate-600 p-1 rounded-lg", children: _jsx(X, { size: 18 }) })] }), saveSuccess ? (_jsxs("div", { className: "py-8 text-center text-emerald-600 font-bold text-sm flex flex-col items-center gap-2", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center", children: _jsx(Check, { size: 20 }) }), "Course Created Successfully"] })) : (_jsxs("form", { onSubmit: handleCreateCourse, className: "space-y-4 mt-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1", children: "Course Title" }), _jsx("input", { type: "text", required: true, placeholder: "e.g. Advanced Physics", value: newTitle, onChange: (e) => setNewTitle(e.target.value), className: "w-full px-3.5 py-2 text-xs rounded-xl border border-[#D7E5F0] dark:border-[#1E2D48] bg-white dark:bg-[#0E1726] text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#1B7FC9]" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1", children: "Class Level" }), _jsxs("select", { value: newGrade, onChange: (e) => setNewGrade(e.target.value), className: "w-full px-3 py-2 text-xs rounded-xl border border-[#D7E5F0] dark:border-[#1E2D48] bg-white dark:bg-[#0E1726] text-slate-900 dark:text-slate-100", children: [_jsx("option", { value: "Class 9", children: "Class 9" }), _jsx("option", { value: "Class 10", children: "Class 10" }), _jsx("option", { value: "Class 11", children: "Class 11" }), _jsx("option", { value: "Class 12", children: "Class 12" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1", children: "Subject" }), _jsxs("select", { value: newSubject, onChange: (e) => setNewSubject(e.target.value), className: "w-full px-3 py-2 text-xs rounded-xl border border-[#D7E5F0] dark:border-[#1E2D48] bg-white dark:bg-[#0E1726] text-slate-900 dark:text-slate-100", children: [_jsx("option", { value: "Mathematics", children: "Mathematics" }), _jsx("option", { value: "Science", children: "Science" }), _jsx("option", { value: "History", children: "History" }), _jsx("option", { value: "Biology", children: "Biology" }), _jsx("option", { value: "Physics", children: "Physics" })] })] })] }), _jsxs("div", { className: "pt-2 flex items-center justify-end gap-2", children: [_jsx("button", { type: "button", onClick: () => setShowCreateModal(false), className: "px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800", children: "Cancel" }), _jsx("button", { type: "submit", className: "px-4 py-2 text-xs font-bold rounded-xl bg-[#1B7FC9] hover:bg-[#1465A3] text-white transition-all", children: "Save Course" })] })] }))] }) })), selectedCourse && (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4", children: _jsxs("div", { className: "bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] max-w-2xl w-full p-6 shadow-xl max-h-[85vh] overflow-y-auto", children: [_jsxs("div", { className: "flex items-center justify-between pb-3 border-b border-[#D7E5F0] dark:border-[#1E2D48]", children: [_jsxs("div", { children: [_jsxs("h2", { className: "text-lg font-bold text-slate-900 dark:text-slate-100", children: [selectedCourse.title, " \u2014 ", selectedCourse.grade] }), _jsxs("div", { className: "flex items-center gap-4 text-xs font-medium text-slate-500 mt-1", children: [_jsxs("span", { children: [selectedCourse.students, " Enrolled Students"] }), _jsx("span", { children: "\u2022" }), _jsxs("span", { children: [selectedCourse.avgScore, "% Class Average"] })] })] }), _jsx("button", { onClick: () => setSelectedCourse(null), className: "text-slate-400 hover:text-slate-600 p-1 rounded-lg", children: _jsx(X, { size: 18 }) })] }), _jsxs("div", { className: "mt-5 space-y-5", children: [_jsxs("div", { children: [_jsxs("h3", { className: "text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5", children: [_jsx(BookOpen, { size: 14, className: "text-[#1B7FC9]" }), "Published Lessons (", catalogMatch.lessons.length, ")"] }), _jsx("div", { className: "space-y-2", children: catalogMatch.lessons.slice(0, 5).map((lesson) => (_jsxs("div", { className: "p-3 rounded-xl bg-[#F4F8FC] dark:bg-[#0E1726] border border-[#D7E5F0] dark:border-[#1E2D48] flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2.5", children: [_jsx("span", { className: "w-6 h-6 rounded-lg bg-white dark:bg-[#162C46] text-[#1465A3] dark:text-[#38BDF8] text-xs font-bold flex items-center justify-center border border-[#CBE4F6]", children: lesson.order }), _jsx("span", { className: "text-xs font-semibold text-slate-900 dark:text-slate-100", children: lesson.title })] }), _jsx("span", { className: "text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full", children: "Published" })] }, lesson.order))) })] }), _jsxs("div", { children: [_jsxs("h3", { className: "text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5", children: [_jsx(CheckSquare, { size: 14, className: "text-[#1B7FC9]" }), "Published Quizzes (", catalogMatch.quizzes.length, ")"] }), _jsx("div", { className: "space-y-2", children: catalogMatch.quizzes.map((quiz, qIdx) => (_jsxs("div", { className: "p-3 rounded-xl bg-[#F4F8FC] dark:bg-[#0E1726] border border-[#D7E5F0] dark:border-[#1E2D48] flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs font-semibold text-slate-900 dark:text-slate-100", children: quiz.title }), _jsxs("p", { className: "text-[10px] text-slate-400 mt-0.5", children: [quiz.questions.length, " Questions \u2022 Version ", quiz.version] })] }), _jsx("span", { className: "text-[11px] font-semibold text-[#1465A3] bg-[#E1EEF8] dark:bg-[#162C46] px-2 py-0.5 rounded-full", children: "Active" })] }, qIdx))) })] })] }), _jsx("div", { className: "mt-6 pt-4 border-t border-[#D7E5F0] dark:border-[#1E2D48] flex justify-end", children: _jsx("button", { onClick: () => setSelectedCourse(null), className: "px-4 py-2 text-xs font-bold rounded-xl bg-[#1B7FC9] hover:bg-[#1465A3] text-white", children: "Close Details" }) })] }) }))] }));
}
//# sourceMappingURL=TeacherCoursesPage.js.map