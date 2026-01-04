
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddCommunityForm: React.FC = () => {
    const navigate = useNavigate();
    const [selectedPlatform, setSelectedPlatform] = useState('Facebook');

    const platforms = ['Facebook', 'Telegram', 'Instagram', 'WeChat', 'TikTok', 'Zalo', '기타'];

    return (
        <div className="flex flex-col min-h-full">
            <header className="sticky top-[64px] z-30 bg-background-light dark:bg-background-dark border-b border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between">
                <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full">
                    <span className="material-symbols-outlined">close</span>
                </button>
                <h2 className="text-lg font-bold">새 커뮤니티 추가</h2>
                <button onClick={() => navigate('/communities')} className="text-primary font-bold">저장</button>
            </header>

            <form className="p-4 flex flex-col gap-8 pb-32">
                <section className="space-y-4">
                    <h3 className="text-[10px] uppercase font-bold tracking-widest text-slate-400 px-1">기본 정보</h3>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold">커뮤니티 명 <span className="text-red-500">*</span></label>
                        <input className="w-full h-14 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark focus:ring-2 focus:ring-primary/50 transition-all font-medium" placeholder="커뮤니티 이름을 입력하세요" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold">소속 국가 <span className="text-red-500">*</span></label>
                        <select className="w-full h-14 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark focus:ring-2 focus:ring-primary/50 transition-all font-medium appearance-none">
                            <option>베트남 (Vietnam)</option>
                            <option>태국 (Thailand)</option>
                            <option>중국 (China)</option>
                            <option>캄보디아 (Cambodia)</option>
                        </select>
                    </div>
                </section>

                <section className="space-y-4">
                    <h3 className="text-[10px] uppercase font-bold tracking-widest text-slate-400 px-1">활동 플랫폼</h3>
                    <div className="flex flex-col gap-3">
                        <label className="text-sm font-bold">플랫폼 유형</label>
                        <div className="flex flex-wrap gap-2">
                            {platforms.map(p => (
                                <button 
                                    key={p}
                                    type="button"
                                    onClick={() => setSelectedPlatform(p)}
                                    className={`px-4 h-9 rounded-full border text-sm font-bold transition-all ${
                                        selectedPlatform === p 
                                        ? 'bg-primary border-primary text-white' 
                                        : 'bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 text-slate-500'
                                    }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold">SNS 링크</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">link</span>
                            <input className="w-full h-14 pl-12 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark focus:ring-2 focus:ring-primary/50 transition-all font-medium" placeholder="https://example.com" />
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <h3 className="text-[10px] uppercase font-bold tracking-widest text-slate-400 px-1">상세 정보</h3>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold">주요 활동 및 특이사항</label>
                        <textarea className="w-full min-h-[140px] p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark focus:ring-2 focus:ring-primary/50 transition-all font-medium resize-none leading-relaxed" placeholder="범죄 연관성, 감시 필요 이유 등 상세 입력" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold">참고 이미지</label>
                        <div className="h-32 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                            <span className="material-symbols-outlined text-[32px] group-hover:scale-110 transition-transform mb-1">add_photo_alternate</span>
                            <span className="text-xs font-bold">이미지 업로드</span>
                        </div>
                    </div>
                </section>
            </form>

            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[calc(100%-32px)] px-4 pointer-events-none z-50">
                <button 
                    onClick={() => navigate('/communities')}
                    className="pointer-events-auto w-full h-14 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                    <span className="material-symbols-outlined">save</span>
                    커뮤니티 등록하기
                </button>
            </div>
        </div>
    );
};
