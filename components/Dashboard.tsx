
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { COUNTRIES } from '../constants';
import { RiskLevel } from '../types';

export const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    const getRiskBadgeColor = (level: RiskLevel) => {
        switch (level) {
            case RiskLevel.HIGH_RISK: return 'bg-red-500/10 text-red-500 border-red-500/20';
            case RiskLevel.MONITOR: return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
            case RiskLevel.STABLE: return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
            default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
        }
    };

    const getRiskLevelText = (level: RiskLevel) => {
        switch (level) {
            case RiskLevel.HIGH_RISK: return '고위험';
            case RiskLevel.MONITOR: return '주의';
            case RiskLevel.STABLE: return '안정';
            default: return level;
        }
    };

    return (
        <div className="p-4 flex flex-col gap-6">
            {/* 통계 */}
            <section className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-surface-light dark:bg-surface-dark shadow-sm border border-slate-100 dark:border-slate-800/60">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">커뮤니티</span>
                        <span className="material-symbols-outlined text-primary text-[20px]">groups</span>
                    </div>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold tracking-tight">142</span>
                        <span className="text-emerald-500 text-xs font-bold mb-1.5 flex items-center">
                            <span className="material-symbols-outlined text-[14px]">trending_up</span> 5%
                        </span>
                    </div>
                </div>
                <div className="p-5 rounded-2xl bg-surface-light dark:bg-surface-dark shadow-sm border border-slate-100 dark:border-slate-800/60">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">정보원</span>
                        <span className="material-symbols-outlined text-primary text-[20px]">person_search</span>
                    </div>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold tracking-tight">35</span>
                        <span className="text-emerald-500 text-xs font-bold mb-1.5 flex items-center">
                            <span className="material-symbols-outlined text-[14px]">trending_up</span> 2%
                        </span>
                    </div>
                </div>
            </section>

            {/* 빠른 작업 */}
            <section className="flex gap-3">
                <button 
                    onClick={() => navigate('/communities/new')}
                    className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-primary hover:bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
                >
                    <span className="material-symbols-outlined text-[20px]">add_circle</span>
                    <span>커뮤니티 추가</span>
                </button>
                <button 
                    onClick={() => navigate('/informants/new')}
                    className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-surface-light dark:bg-surface-dark border border-primary/30 text-primary hover:bg-primary/5 font-bold text-sm transition-all active:scale-[0.98]"
                >
                    <span className="material-symbols-outlined text-[20px]">person_add</span>
                    <span>정보원 등록</span>
                </button>
            </section>

            {/* 국가별 카드 */}
            <section className="flex flex-col gap-4">
                <div className="flex items-center justify-between px-1">
                    <h2 className="text-base font-bold dark:text-white">국가별 현황</h2>
                    <button className="text-primary text-xs font-bold hover:underline">전체보기</button>
                </div>
                
                {COUNTRIES.map((country) => (
                    <div 
                        key={country.id} 
                        className="group flex flex-col p-4 rounded-2xl bg-surface-light dark:bg-surface-dark border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden active:scale-[0.99] transition-transform cursor-pointer"
                        onClick={() => navigate('/communities')}
                    >
                        <div className="absolute top-0 right-0 p-4">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${getRiskBadgeColor(country.riskLevel)}`}>
                                {getRiskLevelText(country.riskLevel)}
                            </span>
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="size-12 rounded-full bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center text-3xl shadow-inner border border-slate-200/50 dark:border-slate-700">
                                {country.flag}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">{country.name === 'Vietnam' ? '베트남' : country.name === 'Thailand' ? '태국' : country.name === 'China' ? '중국' : country.name === 'Uzbekistan' ? '우즈베키스탄' : country.name === 'Philippines' ? '필리핀' : country.name}</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">관할 구역: {country.jurisdiction}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-background-light dark:bg-background-dark/50 border border-slate-100 dark:border-slate-800">
                                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">커뮤니티 수</span>
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold">{country.communityCount}개</span>
                                    <div className="h-1.5 w-12 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                                        <div 
                                            className="h-full bg-primary rounded-full" 
                                            style={{ width: `${Math.min(100, country.communityCount * 8)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-background-light dark:bg-background-dark/50 border border-slate-100 dark:border-slate-800">
                                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">정보원 수</span>
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold">{country.informantCount}명</span>
                                    <div className="h-1.5 w-12 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                                        <div 
                                            className="h-full bg-purple-500 rounded-full" 
                                            style={{ width: `${Math.min(100, country.informantCount * 12)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};
