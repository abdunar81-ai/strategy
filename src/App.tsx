import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Settings as SettingsIcon,
  Calendar,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { HeroSection } from './components/HeroSection';
import { QuizSection } from './components/QuizSection';
import { SuccessModal } from './components/SuccessModal';
import { DEFAULT_WHATSAPP_PHONE } from './data';
import { QuizState } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'hero' | 'quiz'>('hero');
  const [whatsappPhone] = useState<string>(() => {
    const saved = localStorage.getItem('mentor_whatsapp_phone');
    if (!saved || saved === '77071234567') {
      return DEFAULT_WHATSAPP_PHONE;
    }
    return saved;
  });
  const [successData, setSuccessData] = useState<{
    answers: QuizState;
    url: string;
  } | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleOpenQuiz = () => {
    setCurrentView('quiz');
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToHero = () => {
    setCurrentView('hero');
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleQuizSuccess = (answers: QuizState, url: string) => {
    setSuccessData({ answers, url });
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-neutral-900 flex flex-col font-sans selection:bg-amber-400 selection:text-neutral-950">
      {/* Top Desktop Controls Bar (shown on larger screens) */}
      <header className="hidden sm:flex items-center justify-between px-6 py-2.5 bg-white border-b border-neutral-200/80 shadow-xs z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-neutral-950 flex items-center justify-center font-black text-sm shadow-xs">
            M
          </div>
          <div>
            <span className="text-xs font-bold text-neutral-900 block leading-tight">
              Микро-лендинг (15 мин диагностика)
            </span>
            <span className="text-[11px] text-neutral-500 font-medium">
              WhatsApp: +{whatsappPhone}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto relative bg-[#F0F2F5]">
        <div
          ref={scrollContainerRef}
          className="w-full max-w-xl mx-auto px-4 sm:px-8 py-6 sm:py-10 flex-1 flex flex-col scroll-smooth bg-[#FAFAFA] sm:my-6 sm:rounded-3xl sm:shadow-xl sm:border sm:border-neutral-200 overflow-y-auto"
        >
          <div className="flex-1 flex flex-col">
            <AnimatePresence mode="wait">
                {currentView === 'hero' ? (
                  <motion.div
                    key="hero-screen"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.25 }}
                  >
                    <HeroSection onOpenQuiz={handleOpenQuiz} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="quiz-screen"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.25 }}
                  >
                    <QuizSection
                      onBack={handleBackToHero}
                      whatsappPhone={whatsappPhone}
                      onSuccess={handleQuizSuccess}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
      </main>

      {/* Floating Bottom Quick Action when on Hero view and scrolled on mobile */}
      {currentView === 'hero' && (
        <div className="sm:hidden fixed bottom-4 inset-x-4 z-40">
          <button
            type="button"
            onClick={handleOpenQuiz}
            className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-neutral-950 font-black text-xs uppercase tracking-tight py-3 px-4 rounded-2xl shadow-xl shadow-amber-500/30 flex items-center justify-between border border-amber-300 active:scale-95 transition-transform"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-neutral-900" />
              <span>15 мин диагностикаға жазылу</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Modals */}
      <SuccessModal
        isOpen={!!successData}
        onClose={() => {
          setSuccessData(null);
          setCurrentView('hero');
        }}
        whatsappUrl={successData?.url || ''}
        answers={successData?.answers || null}
      />
    </div>
  );
}
