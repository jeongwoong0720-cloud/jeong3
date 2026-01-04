
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { INFORMANTS } from '../constants';
import { CountryCode, InformantStatus } from '../types';

export const InformantList: React.FC = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<CountryCode>('ALL');

    const getStatusColor = (status: InformantStatus) => {
        switch (status) {
            case InformantStatus.ACTIVE: return 'bg-emerald-500/10 text-emerald-500';
            case InformantStatus.IDLE: return 'bg-yellow-500/10 text-yellow-500';
            case InformantStatus.INACTIVE: return 'bg-slate-500/10 text-slate-500';
            default: return '';
        }
    };

    const getStatusText = (status: InformantStatus) => {
        switch (status) {
            case InformantStatus.ACTIVE: return '활동 중';
            case InformantStatus.IDLE: return '휴면';
            case InformantStatus.INACTIVE: return '비활성';
            default: return status;
        }
    };

    const filteredInformants = INFORMANTS.filter(i => {
        const matchesSearch = i.name.toLowerCase().includes(search.toLowerCase()) || 
                              i.codeName.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'ALL' || i.countryCode === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="flex flex-col min-h-full">
            <div className="sticky top-[64px] z-30 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 pt-3">
                <div className="px-4 flex items-center justify-between mb-3">
                    <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h2 className="text-lg font-bold">정보원 관리</h2>
                    <button onClick={() => navigate('/informants/new')} className="size-10 flex items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined">add</span>
                    </button>
                </div>
                
                <div className="px-4 pb-3">
                    <div className="flex w-full items-center rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700/50 h-11">
                        <span className="material-symbols-outlined text-slate-400 pl-3">search</span>
                        <input 
                            className="bg-transparent border-none w-full h-full px-3 text-sm focus:ring-0" 
                            placeholder="성함, 코드네임 검색..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex gap-2 px-4 pb-4 overflow-x-auto no-scrollbar">
                    {[
                        { code: 'ALL', label: '전체' },
                        { code: 'VN', label: '베트남' },
                        { code: 'CN', label: '중국' },
                        { code: 'TH', label: '태국' },
                        { code: 'PH', label: '필리핀' }
                    ].map((item) => (
                        <button 
                            key={item.code}
                            onClick={() => setFilter(item.code as CountryCode)}
                            className={`flex shrink-0 items-center justify-center h-9 px-4 rounded-full border transition-all text-sm font-medium ${
                                filter === item.code 
                                ? 'bg-primary border-primary text-white' 
                                : 'bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between px-1">
                    <h3 className="text-base font-bold">정보원 목록</h3>
                    <span className="text-xs font-medium text-slate-500">총 {filteredInformants.length}명</span>
                </div>

                {filteredInformants.map(i => (
                    <div 
                        key={i.id}
                        onClick={() => navigate(`/informants/${i.id}`)}
                        className="p-4 rounded-2xl bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-800 shadow-sm active:scale-[0.99] transition-transform cursor-pointer"
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex gap-4">
                                <img src={i.imageUrl} className="size-14 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-700" alt={i.name} />
                                <div className="flex flex-col justify-center">
                                    <div className="flex items-center gap-2">
                                        <p className="text-base font-bold">{i.name}</p>
                                        <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 text-[10px] font-bold tracking-wide">
                                            코드: {i.codeName}
                                        </span>
                                    </div>
                                    <p className="text-slate-500 text-xs font-medium mt-1">최근 접촉: {i.lastContact}</p>
                                    <div className="flex items-center gap-1.5 mt-2">
                                        <span className="text-base">{i.countryCode === 'VN' ? '🇻🇳' : i.countryCode === 'CN' ? '🇨🇳' : '🇹🇭'}</span>
                                        <p className="text-slate-600 dark:text-slate-300 text-sm font-bold truncate max-w-[140px]">{i.mainCommunity}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full ${getStatusColor(i.status)}`}>
                                <div className={`size-2 rounded-full ${i.status === InformantStatus.ACTIVE ? 'bg-emerald-500 animate-pulse' : 'bg-current opacity-60'}`}></div>
                                <span className="text-[10px] font-bold">{getStatusText(i.status)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
