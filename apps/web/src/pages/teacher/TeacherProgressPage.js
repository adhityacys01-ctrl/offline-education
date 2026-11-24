import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
const STUDENTS_DATA = [
    {
        id: 'std-1',
        name: 'Aarav Sharma',
        grade: 'Class 10',
        course: 'Mathematics',
        progress: 95,
        avgScore: 92,
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80',
        quizzesCompleted: 6,
        lessonsCompleted: 10,
        lastActive: '10 min ago',
        status: 'Online',
    },
    {
        id: 'std-2',
        name: 'Diya Patel',
        grade: 'Class 10',
        course: 'Science',
        progress: 90,
        avgScore: 88,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        quizzesCompleted: 5,
        lessonsCompleted: 9,
        lastActive: '25 min ago',
        status: 'Online',
    },
    {
        id: 'std-3',
        name: 'Rohan Mehta',
        grade: 'Class 10',
        course: 'History',
        progress: 76,
        avgScore: 68,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        quizzesCompleted: 4,
        lessonsCompleted: 7,
        lastActive: '2 hours ago',
        status: 'Offline',
    },
    {
        id: 'std-4',
        name: 'Sneha Iyer',
        grade: 'Class 10',
        course: 'Environmental Science',
        progress: 72,
        avgScore: 71,
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
        quizzesCompleted: 4,
        lessonsCompleted: 7,
        lastActive: '1 day ago',
        status: 'Offline',
    },
];
export default function TeacherProgressPage() {
    const [courseFilter, setCourseFilter] = useState('All Courses');
    const [timeFilter, setTimeFilter] = useState('Last 30 Days');
    const [search, setSearch] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const filteredStudents = STUDENTS_DATA.filter((s) => {
        const matchesCourse = courseFilter === 'All Courses' || s.course.toLowerCase().includes(courseFilter.toLowerCase());
        const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.course.toLowerCase().includes(search.toLowerCase());
        return matchesCourse && matchesSearch;
    });
    return (_jsxs("div", { className: "space-y-6 max-w-5xl mx-auto pb-10", children: [_jsx("div", { className: "flex items-center justify-between", children: _jsx("h1", { className: "text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight", children: "Student Progress" }) }), _jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [_jsxs("div", { className: "relative", children: [_jsxs("select", { value: courseFilter, onChange: (e) => setCourseFilter(e.target.value), className: "appearance-none pl-4 pr-9 py-2 bg-white dark:bg-[#131F33] border border-[#D7E5F0] dark:border-[#1E2D48] rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1B7FC9]", children: [_jsx("option", { value: "All Courses", children: "All Courses" }), _jsx("option", { value: "Mathematics", children: "Mathematics" }), _jsx("option", { value: "Science", children: "Science" }), _jsx("option", { value: "History", children: "History" }), _jsx("option", { value: "Environmental Science", children: "Environmental Science" })] }), _jsx(ChevronDown, { size: 14, className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" })] }), _jsxs("div", { className: "relative", children: [_jsxs("select", { value: timeFilter, onChange: (e) => setTimeFilter(e.target.value), className: "appearance-none pl-4 pr-9 py-2 bg-white dark:bg-[#131F33] border border-[#D7E5F0] dark:border-[#1E2D48] rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1B7FC9]", children: [_jsx("option", { value: "Last 7 Days", children: "Last 7 Days" }), _jsx("option", { value: "Last 30 Days", children: "Last 30 Days" }), _jsx("option", { value: "Academic Term", children: "Academic Term" })] }), _jsx(ChevronDown, { size: 14, className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" })] }), _jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [_jsx(Search, { size: 14, className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" }), _jsx("input", { type: "text", placeholder: "Search student...", value: search, onChange: (e) => setSearch(e.target.value), className: "w-full pl-9 pr-3.5 py-2 bg-white dark:bg-[#131F33] border border-[#D7E5F0] dark:border-[#1E2D48] rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1B7FC9]" })] })] }), _jsx("div", { className: "bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] overflow-hidden shadow-xs", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-left border-collapse", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-[#D7E5F0] dark:border-[#1E2D48] bg-[#F8FAFC] dark:bg-[#0E1726]/50", children: [_jsx("th", { className: "py-3.5 px-5 text-xs font-bold text-slate-600 dark:text-slate-300", children: "Student" }), _jsx("th", { className: "py-3.5 px-5 text-xs font-bold text-slate-600 dark:text-slate-300", children: "Course" }), _jsx("th", { className: "py-3.5 px-5 text-xs font-bold text-slate-600 dark:text-slate-300", children: "Progress" }), _jsx("th", { className: "py-3.5 px-5 text-xs font-bold text-slate-600 dark:text-slate-300 text-right", children: "Average Score" })] }) }), _jsx("tbody", { className: "divide-y divide-[#EBF2F7] dark:divide-[#1A2E46]", children: filteredStudents.map((student) => (_jsxs("tr", { onClick: () => setSelectedStudent(student), className: "hover:bg-[#F0F5FA] dark:hover:bg-[#1A2E46]/40 cursor-pointer transition-colors", children: [_jsx("td", { className: "py-4 px-5", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("img", { src: student.avatar, alt: student.name, className: "w-10 h-10 rounded-full object-cover border border-[#D7E5F0] dark:border-[#1E2D48]" }), _jsxs("div", { children: [_jsx("p", { className: "text-xs font-bold text-slate-900 dark:text-slate-100", children: student.name }), _jsx("p", { className: "text-[11px] text-slate-400 font-medium", children: student.grade })] })] }) }), _jsx("td", { className: "py-4 px-5", children: _jsx("span", { className: "text-xs font-semibold text-slate-700 dark:text-slate-300", children: student.course }) }), _jsx("td", { className: "py-4 px-5 min-w-[200px]", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "flex-1 h-2 rounded-full bg-[#E5EEF6] dark:bg-[#1E2D48] overflow-hidden", children: _jsx("div", { className: "h-full rounded-full bg-gradient-to-r from-[#1B7FC9] to-emerald-500 transition-all duration-500", style: { width: `${student.progress}%` } }) }), _jsxs("span", { className: "text-xs font-bold text-slate-800 dark:text-slate-200 w-9 text-right", children: [student.progress, "%"] })] }) }), _jsx("td", { className: "py-4 px-5 text-right", children: _jsxs("span", { className: "text-xs font-bold text-slate-900 dark:text-slate-100", children: [student.avgScore, "%"] }) })] }, student.id))) })] }) }) }), selectedStudent && (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4", children: _jsxs("div", { className: "bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] max-w-lg w-full p-6 shadow-xl animate-fade-in", children: [_jsxs("div", { className: "flex items-center justify-between pb-3 border-b border-[#D7E5F0] dark:border-[#1E2D48]", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("img", { src: selectedStudent.avatar, alt: selectedStudent.name, className: "w-12 h-12 rounded-full object-cover border border-[#D7E5F0]" }), _jsxs("div", { children: [_jsx("h2", { className: "text-base font-bold text-slate-900 dark:text-slate-100", children: selectedStudent.name }), _jsxs("p", { className: "text-xs text-slate-400 font-medium", children: [selectedStudent.grade, " \u2022 ", selectedStudent.course] })] })] }), _jsx("button", { onClick: () => setSelectedStudent(null), className: "text-slate-400 hover:text-slate-600 p-1 rounded-lg", children: _jsx(X, { size: 18 }) })] }), _jsxs("div", { className: "mt-5 space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("div", { className: "p-3 rounded-xl bg-[#F4F8FC] dark:bg-[#0E1726] border border-[#D7E5F0] dark:border-[#1E2D48]", children: [_jsx("p", { className: "text-[11px] font-semibold text-slate-500", children: "Course Progress" }), _jsxs("p", { className: "text-xl font-bold text-[#1465A3] dark:text-[#38BDF8] mt-0.5", children: [selectedStudent.progress, "%"] })] }), _jsxs("div", { className: "p-3 rounded-xl bg-[#F4F8FC] dark:bg-[#0E1726] border border-[#D7E5F0] dark:border-[#1E2D48]", children: [_jsx("p", { className: "text-[11px] font-semibold text-slate-500", children: "Average Score" }), _jsxs("p", { className: "text-xl font-bold text-emerald-600 mt-0.5", children: [selectedStudent.avgScore, "%"] })] })] }), _jsxs("div", { className: "p-4 rounded-xl border border-[#D7E5F0] dark:border-[#1E2D48] space-y-2 text-xs", children: [_jsxs("div", { className: "flex justify-between text-slate-600 dark:text-slate-300", children: [_jsx("span", { children: "Completed Lessons:" }), _jsxs("span", { className: "font-bold text-slate-900 dark:text-slate-100", children: [selectedStudent.lessonsCompleted, "/10 Lessons"] })] }), _jsxs("div", { className: "flex justify-between text-slate-600 dark:text-slate-300", children: [_jsx("span", { children: "Completed Quizzes:" }), _jsxs("span", { className: "font-bold text-slate-900 dark:text-slate-100", children: [selectedStudent.quizzesCompleted, " Quizzes"] })] }), _jsxs("div", { className: "flex justify-between text-slate-600 dark:text-slate-300", children: [_jsx("span", { children: "Device Status:" }), _jsxs("span", { className: `font-bold ${selectedStudent.status === 'Online' ? 'text-emerald-600' : 'text-amber-600'}`, children: [selectedStudent.status, " (active ", selectedStudent.lastActive, ")"] })] })] })] }), _jsx("div", { className: "mt-6 pt-4 border-t border-[#D7E5F0] dark:border-[#1E2D48] flex justify-end gap-2", children: _jsx("button", { onClick: () => setSelectedStudent(null), className: "px-4 py-2 text-xs font-bold rounded-xl bg-[#1B7FC9] hover:bg-[#1465A3] text-white", children: "Close" }) })] }) }))] }));
}
//# sourceMappingURL=TeacherProgressPage.js.map