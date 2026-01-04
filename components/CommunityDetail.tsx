
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { COMMUNITIES, INFORMANTS } from '../constants';
import { RiskLevel } from '../types';

export const CommunityDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const community = COMMUNITIES.find(c => c.id === id);

    if (!community) return <div className="p-8 text-center font-bold">커뮤니티를 찾을 수 없습니다.</div>;

    const relatedInformants = INFORMANTS.filter(i => i.countryCode === community.countryCode);

    return (
        <div className="flex flex-col min-h-full pb-32">
            <div className="sticky top-[64px] z-30 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
                <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h2 className="text-lg font-bold">커뮤니티 상세 정보</h2>
                <button className="size-10 flex items-center justify-center rounded-full">
                    <span className="material-symbols-outlined">more_vert</span>
                </button>
            </div>

            <div className="p-4 flex flex-col gap-6">
                <div className="flex gap-5 items-start">
                    <div className="relative shrink-0">
                        <img src={community.imageUrl} className="size-24 rounded-2xl object-cover shadow-lg ring-4 ring-white dark:ring-slate-800" alt={community.name} />
                        <div className={`absolute -bottom-2 -right-2 px-2 py-0.5 text-white text-[10px] font-bold rounded-full border-2 border-background-light dark:border-background-dark ${community.riskLevel === RiskLevel.HIGH_RISK ? 'bg-red-500' : 'bg-emerald-500'}`}>
                            {community.riskLevel === RiskLevel.HIGH_RISK ? '위험' : '안전'}
                        </div>
                    </div>
                    <div className="flex-1 pt-1">
                        <h1 className="text-xl font-bold leading-tight mb-1">{community.name}</h1>
                        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                            <span className="material-symbols-outlined text-primary text-[18px]">public</span>
                            <span>{community.platform}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-2 font-medium">최종 업데이트: 2023.10.27</p>
                    </div>
                </div>

                {community.riskLevel === RiskLevel.HIGH_RISK && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
                        <span className="material-symbols-outlined text-red-500">warning</span>
                        <p className="text-sm font-bold text-red-600 dark:text-red-400">
                            위험도: 높음 (불법 취업 알선 의심)
                        </p>
                    </div>
                )}

                <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all">
                        <span className="material-symbols-outlined text-[20px]">open_in_new</span>
                        <span>SNS 링크 열기</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 font-bold text-sm active:scale-[0.98] transition-all">
                        <span className="material-symbols-outlined text-[20px]">call</span>
                        <span>담당자 연락</span>
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    <div className="p-4 rounded-2xl bg-surface-light dark:bg-surface-dark border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-1">
                        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">가입자 수</p>
                        <p className="text-lg font-bold">{community.memberCount}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-surface-light dark:bg-surface-dark border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-1">
                        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">활동 빈도</p>
                        <p className="text-lg font-bold text-emerald-500">매우 높음</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-surface-light dark:bg-surface-dark border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-1">
                        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">관할 지역</p>
                        <p className="text-lg font-bold truncate">서울 남부</p>
                    </div>
                </div>

                <section className="space-y-3">
                    <h3 className="text-base font-bold flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">article</span>
                        주요 활동 내용
                    </h3>
                    <div className="p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-slate-100 dark:border-slate-800 shadow-sm">
                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 font-medium">
                            {community.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {['#불법취업', '#환전', '#비자상담'].map(tag => (
                                <span key={tag} className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">diversity_3</span>
                            관련 정보원
                        </h3>
                        <button className="text-xs font-bold text-primary hover:underline">전체보기</button>
                    </div>
                    <div className="flex flex-col gap-3">
                        {relatedInformants.map(informant => (
                            <div 
                                key={informant.id} 
                                onClick={() => navigate(`/informants/${informant.id}`)}
                                className="flex items-center justify-between p-3 rounded-2xl bg-surface-light dark:bg-surface-dark border border-slate-100 dark:border-slate-800 shadow-sm cursor-pointer active:scale-[0.99] transition-transform"
                            >
                                <div className="flex items-center gap-3">
                                    <img src={informant.imageUrl} className="size-10 rounded-full object-cover grayscale" alt="" />
                                    <div className="flex flex-col">
                                        <p className="text-sm font-bold">{informant.name}</p>
                                        <p className="text-[10px] text-slate-500 font-medium">최근 제보: {informant.lastContact}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                                    <span className="size-1.5 rounded-full bg-emerald-500"></span>
                                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">신뢰도 {informant.reliability}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <div className="mt-auto px-4 py-6 border-t border-slate-200 dark:border-slate-800 flex gap-3">
                <button className="flex-1 h-11 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-600 dark:text-slate-300">
                    <span className="material-symbols-outlined mr-2 text-[20px]">edit</span>
                    정보 수정
                </button>
                <button className="flex-1 h-11 flex items-center justify-center rounded-xl border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 font-bold text-sm">
                    <span className="material-symbols-outlined mr-2 text-[20px]">delete</span>
                    삭제
                </button>
            </div>
        </div>
    );
};
