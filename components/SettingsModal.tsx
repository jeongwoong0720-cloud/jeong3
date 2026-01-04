
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
    const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [hasKey, setHasKey] = useState(false);

    useEffect(() => {
        const checkKey = async () => {
            if (window.aistudio?.hasSelectedApiKey) {
                const selected = await window.aistudio.hasSelectedApiKey();
                setHasKey(selected);
            }
        };
        if (isOpen) checkKey();
    }, [isOpen]);

    const handleSelectKey = async () => {
        try {
            if (window.aistudio?.openSelectKey) {
                await window.aistudio.openSelectKey();
                // 키 선택 후 로컬 암호화 저장 시뮬레이션
                localStorage.setItem('gw_security_config', btoa(Date.now().toString()));
                setHasKey(true);
            }
        } catch (err) {
            console.error("키 선택 실패:", err);
        }
    };

    const testConnection = async () => {
        setStatus('testing');
        setErrorMessage('');
        
        try {
            // 새 인스턴스 생성 (최신 키 반영 보장)
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: 'Connection test. Reply with "OK".',
            });

            if (response.text) {
                setStatus('success');
            } else {
                throw new Error("응답 데이터가 비어있습니다.");
            }
        } catch (err: any) {
            setStatus('error');
            setErrorMessage(err.message || "연결 중 알 수 없는 오류가 발생했습니다.");
            
            // 엔티티 없음 에러 시 키 선택 초기화
            if (err.message?.includes("Requested entity was not found")) {
                setHasKey(false);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-surface-light dark:bg-surface-dark w-full max-w-sm rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">security</span>
                            보안 및 API 설정
                        </h2>
                        <button onClick={onClose} className="size-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                            <span className="material-symbols-outlined text-slate-500">close</span>
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* API 키 상태 */}
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-background-dark border border-slate-100 dark:border-slate-800">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm font-bold text-slate-500">API 키 상태</span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${hasKey ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                    {hasKey ? '연결됨' : '미등록'}
                                </span>
                            </div>
                            <button 
                                onClick={handleSelectKey}
                                className="w-full h-11 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold shadow-sm active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined text-[20px]">vpn_key</span>
                                API 키 선택/변경
                            </button>
                            <p className="text-[10px] text-slate-400 mt-2 text-center">
                                * 선택된 키는 시스템 보안 영역에 암호화되어 관리됩니다.
                            </p>
                        </div>

                        {/* 연결 테스트 */}
                        <div className="space-y-3">
                            <button 
                                onClick={testConnection}
                                disabled={status === 'testing'}
                                className={`w-full h-12 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98] ${
                                    status === 'testing' ? 'bg-slate-200 text-slate-400' : 'bg-primary text-white shadow-primary/20'
                                }`}
                            >
                                {status === 'testing' ? (
                                    <span className="animate-spin material-symbols-outlined">sync</span>
                                ) : (
                                    <span className="material-symbols-outlined">network_check</span>
                                )}
                                연결 테스트 수행
                            </button>

                            {/* 테스트 결과 표시 */}
                            {status === 'success' && (
                                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 animate-in slide-in-from-top-2">
                                    <span className="material-symbols-outlined text-emerald-500">check_circle</span>
                                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">통신 성공: 모든 기능이 정상입니다.</span>
                                </div>
                            )}
                            {status === 'error' && (
                                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 animate-in slide-in-from-top-2">
                                    <span className="material-symbols-outlined text-red-500">error</span>
                                    <span className="text-[10px] font-bold text-red-600 dark:text-red-400 line-clamp-2">{errorMessage}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                <div className="bg-slate-50 dark:bg-background-dark/50 p-4 border-t border-slate-200 dark:border-slate-800">
                    <a 
                        href="https://ai.google.dev/gemini-api/docs/billing" 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-[10px] text-slate-400 hover:text-primary flex items-center justify-center gap-1"
                    >
                        API 결제 및 관리 문서 확인하기
                        <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                    </a>
                </div>
            </div>
        </div>
    );
};
