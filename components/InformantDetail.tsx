
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { INFORMANTS } from '../constants';
import { InformantStatus } from '../types';

export const InformantDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const informant = INFORMANTS.find(i => i.id === id);

    if (!informant) return <div className="p-8 text-center font-bold">정보원을 찾을 수 없습니다.</div>;

    const getStatusText = (status: InformantStatus) => {
        switch (status) {
            case InformantStatus.ACTIVE: return '활동 중';
            case InformantStatus.IDLE: return '휴면';
            case InformantStatus.INACTIVE: return '비활성';
            default: return status;
        }
    };

    return (
        <div className="flex flex-col min-h-full pb-32">
            <div className="sticky top-[64px] z-30 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
                <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full">
                    <span className="material-symbols-outlined">arrow_back_ios_new</span>
                </button>
                <h2 className="text-lg font-bold">정보원 상세 프로필</h2>
                <button className="size-10 flex items-center justify-center rounded-full">
                    <span className="material-symbols-outlined">more_horiz</span>
                </button>
            </div>

            <div className="flex flex-col items-center pt-8 pb-6 px-6 bg-white dark:bg-background-dark">
                <div className="relative mb-4 group cursor-pointer">
                    <img src={informant.imageUrl} className="size-28 rounded-full object-cover border-4 border-white dark:border-surface-dark shadow-xl" alt={informant.name} />
                    <div className="absolute bottom-1 right-1 size-6 rounded-full bg-emerald-500 border-2 border-white dark:border-background-dark"></div>
                </div>
                <h2 className="text-2xl font-bold mb-1">{informant.name}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">({informant.nationality})</p>
                <div className="flex gap-2 mb-8">
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 dark:bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary border border-primary/20">
                        <span className="material-symbols-outlined text-[14px]">verified_user</span>
                        신뢰도 {informant.reliability}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-800 px-4 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                        상태: {getStatusText(informant.status)}
                    </span>
                </div>

                <div className="grid grid-cols-3 gap-6 w-full max-w-[300px]">
                    <div className="flex flex-col items-center gap-2 cursor-pointer group">
                        <div className="size-12 rounded-full bg-slate-100 dark:bg-surface-dark flex items-center justify-center group-active:bg-primary transition-colors border border-slate-200 dark:border-slate-700 shadow-sm">
                            <span className="material-symbols-outlined text-slate-700 dark:text-slate-200 group-active:text-white">call</span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">전화</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 cursor-pointer group">
                        <div className="size-12 rounded-full bg-slate-100 dark:bg-surface-dark flex items-center justify-center group-active:bg-primary transition-colors border border-slate-200 dark:border-slate-700 shadow-sm">
                            <span className="material-symbols-outlined text-slate-700 dark:text-slate-200 group-active:text-white">sms</span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">메시지</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 cursor-pointer group">
                        <div className="size-12 rounded-full bg-slate-100 dark:bg-surface-dark flex items-center justify-center group-active:bg-primary transition-colors border border-slate-200 dark:border-slate-700 shadow-sm">
                            <span className="material-symbols-outlined text-slate-700 dark:text-slate-200 group-active:text-white">lock</span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">보안</span>
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-4">
                <div className="bg-white dark:bg-surface-dark rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800">
                    <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">badge</span>
                        기본 정보
                    </h3>
                    <div className="space-y-4">
                        {[
                            { label: '국적', value: informant.nationality },
                            { label: '생년월일', value: informant.birthDate },
                            { label: '체류 자격', value: informant.visaStatus },
                            { label: '연락처', value: informant.contact, hide: true },
                            { label: '거주지', value: informant.address }
                        ].map((row, i) => (
                            <div key={i} className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/50 pb-3 last:border-0 last:pb-0">
                                <span className="text-sm text-slate-500 font-medium">{row.label}</span>
                                <div className="flex items-center gap-2 text-sm font-bold">
                                    {row.value}
                                    {row.hide && <span className="material-symbols-outlined text-[16px] text-slate-400">visibility_off</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-surface-dark rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-bold flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">history</span>
                            최근 활동 및 제보 이력
                        </h3>
                        <button className="text-xs font-bold text-primary">전체보기</button>
                    </div>
                    <div className="relative pl-2 space-y-6 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200 dark:before:bg-slate-800">
                        {informant.history.length > 0 ? informant.history.map((act, i) => (
                            <div key={i} className="relative pl-7">
                                <div className={`absolute left-0 top-1.5 size-[24px] -ml-[1px] rounded-full bg-white dark:bg-surface-dark border-2 z-10 flex items-center justify-center ${i === 0 ? 'border-primary' : 'border-slate-300 dark:border-slate-700'}`}>
                                    {i === 0 && <div className="size-2 rounded-full bg-primary"></div>}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-slate-400 mb-0.5">{act.date}</span>
                                    <h4 className="text-sm font-bold mb-1">{act.title}</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{act.description}</p>
                                </div>
                            </div>
                        )) : <div className="text-sm text-slate-400 p-2">기록된 활동 이력이 없습니다.</div>}
                    </div>
                </div>

                <div className="bg-white dark:bg-surface-dark rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800">
                    <h3 className="text-base font-bold mb-3 flex items-center gap-2 text-orange-500">
                        <span className="material-symbols-outlined">warning</span>
                        보안 주의사항
                    </h3>
                    <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/20">
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                            {informant.notes}
                        </p>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-4 pb-8 flex gap-3 shadow-[0_-8px_24px_rgba(0,0,0,0.1)] z-40">
                <button className="flex-1 h-12 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-red-500 border border-slate-200 dark:border-slate-700 active:scale-95 transition-transform">
                    <span className="material-symbols-outlined mr-2">delete</span>
                    삭제
                </button>
                <button className="flex-[2] h-12 flex items-center justify-center rounded-xl bg-primary text-white font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-transform">
                    <span className="material-symbols-outlined mr-2">edit</span>
                    정보 수정
                </button>
            </div>
        </div>
    );
};
