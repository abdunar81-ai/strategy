import React from 'react';
import { Calendar, ChevronRight, TrendingUp, Youtube, Zap } from 'lucide-react';

interface HeroSectionProps {
  onOpenQuiz: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenQuiz }) => {
  return (
    <div className="flex flex-col min-h-full pb-8">
      {/* 1. Pill tag */}
      <div className="pt-2 pb-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200/90 text-amber-800 text-xs font-semibold shadow-xs">
          <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span>15 минуттық тегін диагностика</span>
        </div>
      </div>

      {/* 2. Main Offer Headline */}
      <h1 className="text-[26px] sm:text-[30px] font-extrabold tracking-tight text-neutral-900 leading-[1.18] mb-3">
        Оборот бар — <br />
        қалтаңда ақша жоқ па?
      </h1>

      {/* 3. Subhead & Mentor Portrait row */}
      <div className="grid grid-cols-[1.25fr_1fr] gap-2.5 items-center mb-4">
        <p className="text-[12.5px] sm:text-[13.5px] leading-relaxed text-neutral-600 font-normal">
          Бизнес өсу үшін - көп сату немесе үлкен жарнамаға байланысты емес. Бизнес моделің дұрыс болмаса, көп сатылым - шығынды еселей түседі. Бізге керегі бар обороттан таза пайданы жүйелі түрде шығару.
        </p>

        <div className="relative flex flex-col items-center">
          <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-md border border-neutral-200/80 bg-neutral-100">
            <img
              src="https://imagedelivery.net/Sfn_8qOzRlEhFqpC-0doYw/2a959410-c5d9-43ac-7e53-73edb82f7d00/public"
              alt="Бизнес эксперт"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-bottom"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
          </div>
          {/* Handwritten aesthetic accent */}
          <div className="mt-1 text-center">
            <span className="font-handwriting text-[15px] text-neutral-800 leading-none font-bold tracking-wide block">
              Көбірек таза пайда.
            </span>
            <span className="font-handwriting text-[14px] text-amber-700 leading-none font-bold block">
              Нақты жүйе.
            </span>
          </div>
        </div>
      </div>

      {/* 4. Photo Proof Card (Full width 16:9) */}
      <div className="mb-5">
        <div className="group relative aspect-video rounded-2xl overflow-hidden shadow-sm border border-neutral-200/90 bg-neutral-900">
          <img
            src="https://imagedelivery.net/Sfn_8qOzRlEhFqpC-0doYw/ad5e5956-76f2-4717-3c9c-af93b0b62f00/public"
            alt="Жүйе және автокөлік"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-white">
            <p className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-amber-400 mb-1 leading-tight">
              ЖҮЙЕ ЕРКІНДІК СЫЙЛАЙДЫ.
            </p>
            <p className="text-[10.5px] sm:text-[11px] text-neutral-200 leading-tight">
              Дұрыс жүйе — үлкен мүмкіндіктерге апарады.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Stat cards section */}
      <div className="mb-4">
        <div className="grid grid-cols-2 gap-2">
          {/* Stat Card 1: Turnover */}
          <div className="bg-white rounded-xl p-2.5 border border-neutral-200/80 shadow-xs flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-8 h-8 rounded-lg bg-amber-100/90 text-amber-600 flex items-center justify-center shrink-0">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-[15px] font-extrabold text-neutral-900 tracking-tight leading-none">
                $3 000 000
              </div>
            </div>
            <p className="text-[10px] text-neutral-600 leading-snug">
              <strong className="text-neutral-800">жылдық оборот:</strong> Мен құрған бизнес-жүйенің нақты нәтижесі
            </p>
          </div>

          {/* Stat Card 2: YouTube subscribers */}
          <div className="bg-white rounded-xl p-2.5 border border-neutral-200/80 shadow-xs flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-8 h-8 rounded-lg bg-amber-100/90 text-amber-600 flex items-center justify-center shrink-0">
                <Youtube className="w-4 h-4" />
              </div>
              <div className="text-[15px] font-extrabold text-neutral-900 tracking-tight leading-none">
                2 000 000
              </div>
            </div>
            <p className="text-[10px] text-neutral-600 leading-snug">
              <strong className="text-neutral-800">YouTube жазылушы:</strong> контент алгоритмдерін жүйелі басқарудың дәлелі
            </p>
          </div>
        </div>
      </div>

      {/* 6. Gold CTA Button */}
      <div className="mt-2">
        <button
          id="hero-cta-btn"
          type="button"
          onClick={onOpenQuiz}
          className="w-full relative group overflow-hidden bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-neutral-950 font-extrabold text-[12.5px] sm:text-[13px] tracking-tight py-3.5 px-3 rounded-2xl shadow-lg shadow-amber-500/25 active:scale-[0.98] hover:shadow-amber-500/40 transition-all flex items-center justify-between gap-2 border border-amber-300 cursor-pointer"
        >
          <div className="w-7 h-7 rounded-lg bg-amber-300/60 flex items-center justify-center shrink-0 text-neutral-900">
            <Calendar className="w-4 h-4" />
          </div>
          <span className="flex-1 text-center font-black uppercase text-[11.5px] sm:text-[12px] leading-tight">
            15 МИНУТТЫҚ ТЕГІН СТРАТЕГИЯЛЫҚ ДИАГНОСТИКАҒА ЖАЗЫЛУ
          </span>
          <ChevronRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
