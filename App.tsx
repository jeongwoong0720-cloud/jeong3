
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { CommunityList } from './components/CommunityList';
import { CommunityDetail } from './components/CommunityDetail';
import { InformantList } from './components/InformantList';
import { InformantDetail } from './components/InformantDetail';
import { AddCommunityForm } from './components/AddCommunityForm';
import { AddInformantForm } from './components/AddInformantForm';
import { SettingsModal } from './components/SettingsModal';

const BottomNav = ({ onOpenSettings }: { onOpenSettings: () => void }) => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="fixed bottom-0 w-full max-w-md left-1/2 -translate-x-1/2 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 pb-safe pt-2 z-50">
            <div className="flex justify-around items-center h-16">
                <Link to="/" className={`flex flex-col items-center gap-1 w-16 group transition-colors ${isActive('/') ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}>
                    <span className={`material-symbols-outlined text-[28px] ${isActive('/') ? 'material-symbols-filled' : ''}`}>dashboard</span>
                    <span className="text-[10px] font-bold">대시보드</span>
                </Link>
                <Link to="/communities" className={`flex flex-col items-center gap-1 w-16 group transition-colors ${isActive('/communities') ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}>
                    <span className={`material-symbols-outlined text-[28px] ${isActive('/communities') ? 'material-symbols-filled' : ''}`}>groups</span>
                    <span className="text-[10px] font-medium">커뮤니티</span>
                </Link>
                <Link to="/informants" className={`flex flex-col items-center gap-1 w-16 group transition-colors ${isActive('/informants') ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}>
                    <span className={`material-symbols-outlined text-[28px] ${isActive('/informants') ? 'material-symbols-filled' : ''}`}>person_search</span>
                    <span className="text-[10px] font-medium">정보원</span>
                </Link>
                <button 
                    onClick={onOpenSettings}
                    className="flex flex-col items-center gap-1 w-16 group text-slate-400 dark:text-slate-500"
                >
                    <span className="material-symbols-outlined text-[28px]">settings</span>
                    <span className="text-[10px] font-medium">설정</span>
                </button>
            </div>
        </nav>
    );
};

const Header = () => {
    return (
        <header className="sticky top-0 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary">
                        <span className="material-symbols-outlined text-[24px]">local_police</span>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold leading-tight">관할 모니터링</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">강남구청 외국인 관리팀</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors relative">
                        <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">notifications</span>
                        <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-red-500 border-2 border-background-light dark:border-background-dark"></span>
                    </button>
                    <div className="size-9 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
                        <img src="https://picsum.photos/seed/police/100/100" alt="프로필" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </header>
    );
};

function App() {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return (
        <HashRouter>
            <div className="min-h-screen max-w-md mx-auto flex flex-col relative bg-background-light dark:bg-background-dark shadow-2xl overflow-x-hidden font-sans">
                <Header />
                <main className="flex-1 pb-24">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/communities" element={<CommunityList />} />
                        <Route path="/communities/:id" element={<CommunityDetail />} />
                        <Route path="/communities/new" element={<AddCommunityForm />} />
                        <Route path="/informants" element={<InformantList />} />
                        <Route path="/informants/:id" element={<InformantDetail />} />
                        <Route path="/informants/new" element={<AddInformantForm />} />
                    </Routes>
                </main>
                <BottomNav onOpenSettings={() => setIsSettingsOpen(true)} />
                <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
            </div>
        </HashRouter>
    );
}

export default App;
