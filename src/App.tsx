import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Calendar,
  ChevronRight,
  Globe,
} from 'lucide-react';
import { HeroSection } from './components/HeroSection';
import { QuizSection } from './components/QuizSection';
import { SuccessModal } from './components/SuccessModal';
import { DEFAULT_WHATSAPP_PHONE } from './data';
import { QuizState, Language } from './types';
import { TRANSLATIONS } from './translations';

function getInitialLanguage(): Language {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang')?.toLowerCase();
    if (langParam === 'ru' || langParam === 'kz' || langParam === 'kk') {
      return langParam === 'ru' ? 'ru' : 'kz';
    }
    const saved = localStorage.getItem('app_lang');
    if (saved === 'ru' || saved === 'kz') {
      return saved;
    }
  }
  return 'kz';
}

export default function App() {
  const [lang, setLang] = useState<Language>(getInitialLanguage);
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

  // Sync language with URL query parameter & document title/lang
  const changeLanguage = useCallback((newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('app_lang', newLang);

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', newLang);
      window.history.replaceState({}, '', url.toString());

      document.documentElement.lang = newLang === 'ru' ? 'ru' : 'kk';
      document.title =
        newLang === 'ru'
          ? 'Стратегическая Диагностика Бизнеса — Микро-лендинг'
          : 'Стратегиялық Диагностика — Микро-лендинг';
    }
  }, []);

  // Listen to browser navigation changes (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const langParam = params.get('lang')?.toLowerCase();
      if (langParam === 'ru' || langParam === 'kz') {
        setLang(langParam);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update URL on initial mount if missing
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (!params.has('lang')) {
        const url = new URL(window.location.href);
        url.searchParams.set('lang', lang);
        window.history.replaceState({}, '', url.toString());
      }
    }
  }, [lang]);

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
      {/* Top Header with Language Switcher */}
      <header className="flex items-center justify-between px-3.5 sm:px-6 py-2 sm:py-2.5 bg-white border-b border-neutral-200/80 shadow-xs z-30 sticky top-0">
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-500 text-neutral-950 flex items-center justify-center font-black text-xs sm:text-sm shadow-xs shrink-0">
            M
          </div>
          <div className="min-w-0">
            <span className="text-[11px] sm:text-xs font-bold text-neutral-900 block leading-tight truncate">
              {lang === 'ru'
                ? 'Микро-лендинг (15 мин диагностика)'
                : 'Микро-лендинг (15 мин диагностика)'}
            </span>
            <span className="text-[10px] sm:text-[11px] text-neutral-500 font-medium block truncate">
              WhatsApp: +{whatsappPhone}
            </span>
          </div>
        </div>

        {/* Header Language Switcher (Only 2 buttons: Kazakh and Russian) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <div className="hidden xs:flex items-center gap-1 text-[11px] sm:text-xs text-neutral-500 font-medium mr-0.5">
            <Globe className="w-3.5 h-3.5 text-neutral-600" />
            <span className="hidden sm:inline">{lang === 'ru' ? 'Язык:' : 'Тіл:'}</span>
          </div>
          <div className="inline-flex items-center bg-neutral-100 border border-neutral-200/90 rounded-xl p-0.5 shadow-xs">
            <button
              id="header-lang-kz"
              type="button"
              onClick={() => changeLanguage('kz')}
              className={`px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer ${
                lang === 'kz'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
              }`}
            >
              Қазақша
            </button>
            <button
              id="header-lang-ru"
              type="button"
              onClick={() => changeLanguage('ru')}
              className={`px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer ${
                lang === 'ru'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
              }`}
            >
              Русский
            </button>
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
                  key={`hero-screen-${lang}`}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  <HeroSection
                    lang={lang}
                    onOpenQuiz={handleOpenQuiz}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key={`quiz-screen-${lang}`}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.25 }}
                >
                  <QuizSection
                    lang={lang}
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

      {/* Floating Bottom Quick Action when on Hero view on mobile */}
      {currentView === 'hero' && (
        <div className="sm:hidden fixed bottom-4 inset-x-4 z-40">
          <button
            type="button"
            onClick={handleOpenQuiz}
            className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-neutral-950 font-black text-xs uppercase tracking-tight py-3 px-4 rounded-2xl shadow-xl shadow-amber-500/30 flex items-center justify-between border border-amber-300 active:scale-95 transition-transform cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-neutral-900 shrink-0" />
              <span className="truncate">{TRANSLATIONS[lang].hero.floatingCta}</span>
            </div>
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      )}

      {/* Modals */}
      <SuccessModal
        lang={lang}
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

