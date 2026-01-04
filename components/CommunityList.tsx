
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { COMMUNITIES } from '../constants';
import { CountryCode } from '../types';

export const CommunityList: React.FC = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<CountryCode>('ALL');

    const filteredCommunities = COMMUNITIES.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                              c.country.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'ALL' || c.countryCode === filter;
        return matchesSearch && matchesFilter;
    });

    const FilterChip = ({ label, code, flag }: { label: string, code: CountryCode, flag?: string }) => (
        <button 
            onClick={() => setFilter(code)}
            className={`flex shrink-0 items-center justify-center h-9 px-4 rounded-full border transition-all text-sm font-medium ${
                filter === code 
                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                : 'bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
            }`}
        >
            {flag && <span className="mr-1.5">{flag}</span>}
            {label}
        </button>
    );

    return (
        <div className="flex flex-col min-h-full">
            <div className="sticky top-[64px] z-30 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 pt-3">
                <div className="px-4 flex items-center justify-between mb-3">
                    <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h2 className="text-lg font-bold">국가별 커뮤니티</h2>
                    <button onClick={() => navigate('/communities/new')} className="size-10 flex items-center justify-center rounded-full text-primary">
                        <span className="material-symbols-outlined">add</span>
                    </button>
                </div>
                
                <div className="px-4 pb-3">
                    <div className="flex w-full items-center rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700/50 h-11 focus-within:ring-2 focus-within:ring-primary/50 transition-all">
                        <span className="material-symbols-outlined text-slate-400 pl-3">search</span>
                        <input 
                            className="bg-transparent border-none w-full h-full px-3 text-sm focus:ring-0" 
                            placeholder="커뮤니티명, 국가 검색..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex gap-2 px-4 pb-4 overflow-x-auto no-scrollbar">
                    <FilterChip label="전체" code="ALL" />
                    <FilterChip label="베트남" code="VN" flag="🇻🇳" />
                    <FilterChip label="태국" code="TH" flag="🇹🇭" />
                    <FilterChip label="중국" code="CN" flag="🇨🇳" />
                    <FilterChip label="필리핀" code="PH" flag="🇵🇭" />
                </div>
            </div>

            <div className="p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between px-1">
                    <span className="text-sm font-medium text-slate-500">총 {filteredCommunities.length}개의 커뮤니티</span>
                    <button className="text-primary text-sm font-bold flex items-center gap-1">
                        최신순 <span className="material-symbols-outlined text-base">sort</span>
                    </button>
                </div>

                {filteredCommunities.map(c => (
                    <div 
                        key={c.id}
                        onClick={() => navigate(`/communities/${c.id}`)}
                        className="flex flex-col gap-3 bg-white dark:bg-surface-dark p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm active:scale-[0.99] transition-transform cursor-pointer"
                    >
                        <div className="flex gap-4">
                            <div className="relative shrink-0">
                                <img src={c.imageUrl} className="size-14 rounded-2xl object-cover ring-2 ring-slate-100 dark:ring-slate-700" alt={c.name} />
                                <div className="absolute -bottom-1 -right-1 size-6 flex items-center justify-center bg-white dark:bg-slate-800 rounded-full shadow-sm text-xs border border-slate-200 dark:border-slate-700">
                                    {c.countryCode === 'VN' ? '🇻🇳' : c.countryCode === 'TH' ? '🇹🇭' : '🇨🇳'}
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <h3 className="text-base font-bold truncate">{c.name}</h3>
                                    <span className={`size-2 rounded-full ${c.riskLevel === 'High Risk' ? 'bg-red-500' : 'bg-green-500'}`}></span>
                                </div>
                                <span className="inline-flex items-center rounded-md bg-slate-100 dark:bg-slate-700/50 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                                    회원수 {c.memberCount}
                                </span>
                                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-medium">
                                    {c.description}
                                </p>
                            </div>
                        </div>
                        <div className="h-px w-full bg-slate-100 dark:bg-slate-800/50"></div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-slate-400 text-sm">schedule</span>
                                <span className="text-xs text-slate-500 font-medium">최근 활동: {c.lastActive}</span>
                            </div>
                            <span className="text-primary text-sm font-bold flex items-center">
                                상세보기 <span className="material-symbols-outlined text-lg">chevron_right</span>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
