
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const AddInformantForm: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-full">
            <header className="sticky top-[64px] z-30 bg-background-light dark:bg-background-dark border-b border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between">
                <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full">
                    <span className="material-symbols-outlined">close</span>
                </button>
                <h2 className="text-lg font-bold">새 정보원 등록</h2>
                <button onClick={() => navigate('/informants')} className="text-primary font-bold">저장</button>
            </header>

            <form className="p-4 flex flex-col gap-8 pb-32">
                <div className="flex justify-center py-2">
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative cursor-pointer group">
                            <div className="size-32 rounded-full bg-slate-200 dark:bg-surface-dark border-2 border-white dark:border-slate-800 flex items-center justify-center overflow-hidden">
                                <span className="material-symbols-outlined text-slate-400 text-[64px]">person</span>
                            </div>
                            <div className="absolute bottom-0 right-0 size-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg ring-4 ring-white dark:ring-slate-900">
                                <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-bold">사진 등록</p>
                            <p className="text-xs text-slate-500 mt-0.5">프로필 사진을 추가하세요</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold tracking-widest">
                        <span className="material-symbols-outlined text-[16px]">lock</span>
                        대외비 (CONFIDENTIAL)
                    </span>
                </div>

                <section className="space-y-4">
                    <h3 className="text-[10px] uppercase font-bold tracking-widest text-slate-400 px-1">기본 정보</h3>
                    <div className="bg-white dark:bg-surface-dark rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-slate-500">성명 <span className="text-primary">*</span></label>
                            <input className="w-full h-12 bg-slate-50 dark:bg-background-dark px-4 rounded-xl border border-slate-200 dark:border-slate-700 font-medium" placeholder="실명 또는 가명" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-slate-500">연락처 <span className="text-primary">*</span></label>
                            <div className="flex gap-2">
                                <select className="w-24 h-12 bg-slate-50 dark:bg-background-dark px-2 rounded-xl border border-slate-200 dark:border-slate-700 font-medium">+82</select>
                                <input className="flex-1 h-12 bg-slate-50 dark:bg-background-dark px-4 rounded-xl border border-slate-200 dark:border-slate-700 font-medium" placeholder="010-0000-0000" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <h3 className="text-[10px] uppercase font-bold tracking-widest text-slate-400 px-1">신상 정보</h3>
                    <div className="bg-white dark:bg-surface-dark rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-slate-500">국적</label>
                            <input className="w-full h-12 bg-slate-50 dark:bg-background-dark px-4 rounded-xl border border-slate-200 dark:border-slate-700 font-medium" placeholder="국가 검색" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-slate-500">체류 자격</label>
                            <select className="w-full h-12 bg-slate-50 dark:bg-background-dark px-4 rounded-xl border border-slate-200 dark:border-slate-700 font-medium appearance-none">
                                <option>선택하세요</option>
                                <option>E-9 (비전문취업)</option>
                                <option>H-2 (방문취업)</option>
                                <option>F-5 (영주권)</option>
                            </select>
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <h3 className="text-[10px] uppercase font-bold tracking-widest text-slate-400 px-1">활동 정보</h3>
                    <div className="bg-white dark:bg-surface-dark rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-slate-500">주요 활동 커뮤니티</label>
                            <input className="w-full h-12 bg-slate-50 dark:bg-background-dark px-4 rounded-xl border border-slate-200 dark:border-slate-700 font-medium" placeholder="예: 페이스북 베트남 모임" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-slate-500">협조 상태</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['활동 중', '휴면', '주의'].map(s => (
                                    <button 
                                        key={s}
                                        type="button"
                                        className={`h-11 rounded-xl border text-xs font-bold transition-all ${s === '활동 중' ? 'bg-primary/10 border-primary text-primary' : 'bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-slate-700 text-slate-500'}`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="space-y-4 mb-10">
                    <h3 className="text-[10px] uppercase font-bold tracking-widest text-slate-400 px-1">특이사항</h3>
                    <textarea 
                        className="w-full min-h-[140px] p-5 rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm focus:ring-2 focus:ring-primary/50 transition-all font-medium resize-none text-sm leading-relaxed" 
                        placeholder="정보원 관련 특이사항, 신뢰도 메모 등" 
                    />
                </section>
            </form>

            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[calc(100%-32px)] px-4 pointer-events-none z-50">
                <button 
                    onClick={() => navigate('/informants')}
                    className="pointer-events-auto w-full h-14 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                    <span className="material-symbols-outlined">person_add</span>
                    정보원 등록하기
                </button>
            </div>
        </div>
    );
};
