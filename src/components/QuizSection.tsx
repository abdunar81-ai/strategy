import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Send, User, Phone, AlertCircle, CheckCircle2 } from 'lucide-react';
import { QUIZ_QUESTIONS, buildWhatsAppUrl } from '../data';
import { QuizState } from '../types';

interface QuizSectionProps {
  onBack: () => void;
  whatsappPhone: string;
  onSuccess: (answers: QuizState, url: string) => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  onBack,
  whatsappPhone,
  onSuccess,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);

  const [form, setForm] = useState<QuizState>({
    revenue: '',
    teamSize: '',
    bottleneck: '',
    readiness: '',
    name: '',
    phone: '',
  });

  const [stepError, setStepError] = useState<string>('');
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Steps 0..3 are questions, Step 4 is contact form
  const totalSteps = QUIZ_QUESTIONS.length + 1; // 5 steps
  const isContactStep = currentStep === QUIZ_QUESTIONS.length;
  const currentQuestion = !isContactStep ? QUIZ_QUESTIONS[currentStep] : null;

  const handleSelectOption = (value: string) => {
    if (!currentQuestion) return;
    setForm((prev) => ({ ...prev, [currentQuestion.id]: value }));
    setStepError('');
  };

  const handleNext = () => {
    if (!isContactStep && currentQuestion) {
      const selectedValue = form[currentQuestion.id as keyof QuizState];
      if (!selectedValue) {
        setStepError('Жалғастыру үшін бір жауапты таңдаңыз');
        return;
      }
    }
    setStepError('');
    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const handlePrev = () => {
    setStepError('');
    setContactErrors({});
    if (currentStep === 0) {
      onBack();
    } else {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith('+7') && val.length > 0) {
      if (val.startsWith('8') || val.startsWith('7')) {
        val = '+7 ' + val.slice(1);
      } else {
        val = '+7 ' + val;
      }
    }
    setForm((prev) => ({ ...prev, phone: val }));
    if (contactErrors.phone) {
      setContactErrors((prev) => {
        const next = { ...prev };
        delete next.phone;
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!form.name.trim()) errors.name = 'Атыңызды жазыңыз';
    if (!form.phone.trim() || form.phone.length < 8) errors.phone = 'Телефон нөміріңізді толық жазыңыз';

    if (Object.keys(errors).length > 0) {
      setContactErrors(errors);
      return;
    }

    setIsSubmitting(true);
    const waUrl = buildWhatsAppUrl(whatsappPhone, form);

    onSuccess(form, waUrl);

    try {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch {
      window.location.href = waUrl;
    }
  };

  const progressPercent = Math.round(((currentStep + 1) / totalSteps) * 100);

  return (
    <div className="flex flex-col min-h-full pb-10">
      {/* 1. Top navigation */}
      <div className="pt-2 pb-3 flex items-center justify-between">
        <button
          id="quiz-back-button"
          type="button"
          onClick={handlePrev}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-950 transition-colors py-1 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-neutral-800" />
          <span>{currentStep === 0 ? 'Басты бетке оралу' : 'Артқа'}</span>
        </button>

        <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 rounded-full">
          {currentStep < 4 ? `${currentStep + 1} / 4 сұрақ` : 'Соңғы қадам'}
        </span>
      </div>

      {/* 2. Header Title & Progress */}
      <div className="mb-4">
        <h2 className="text-[20px] sm:text-[22px] font-extrabold uppercase tracking-tight text-neutral-950 leading-tight mb-1">
          КВАЛИФИКАЦИЯЛЫҚ СҮЗГІ-АНКЕТА
        </h2>
        <p className="text-[12.5px] text-neutral-600 font-medium leading-relaxed">
          {isContactStep
            ? 'Диагностикаға жазылу үшін байланыс нөміріңізді қалдырыңыз:'
            : 'Сізге нақты көмектесе алуымыз үшін бірнеше сұраққа жауап беріңіз.'}
        </p>

        {/* Progress Bar */}
        <div className="mt-3 bg-neutral-200 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-amber-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 3. Multi-step Container */}
      <div className="relative">
        <AnimatePresence mode="wait" custom={direction}>
          {!isContactStep && currentQuestion ? (
            /* Question Block */
            <motion.div
              key={`step-${currentStep}`}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 25 : -25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -25 : 25 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="bg-white rounded-2xl p-4 border border-neutral-200/90 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-500 text-neutral-950 font-black text-xs flex items-center justify-center shrink-0">
                    {currentQuestion.number}
                  </span>
                  <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                    Сұрақ #{currentQuestion.number}
                  </span>
                </div>

                <h3 className="text-[15px] font-extrabold text-neutral-900 leading-snug mb-3.5">
                  {currentQuestion.question}
                </h3>

                <div className="space-y-2.5">
                  {currentQuestion.options.map((opt) => {
                    const isChecked = form[currentQuestion.id as keyof QuizState] === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectOption(opt)}
                        className={`w-full text-left flex items-start gap-3 p-3 rounded-xl text-[13px] cursor-pointer transition-all border ${
                          isChecked
                            ? 'bg-amber-50/90 border-amber-500 font-semibold text-neutral-950 shadow-xs ring-1 ring-amber-400/40'
                            : 'bg-neutral-50/70 border-neutral-200 text-neutral-700 hover:bg-neutral-100 hover:border-neutral-300'
                        }`}
                      >
                        {/* Radio Circle */}
                        <div
                          className={`w-4 h-4 rounded-full border mt-0.5 shrink-0 flex items-center justify-center transition-colors ${
                            isChecked
                              ? 'border-amber-600 bg-amber-500 text-white'
                              : 'border-neutral-400 bg-white'
                          }`}
                        >
                          {isChecked && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className="leading-snug flex-1">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {stepError && (
                  <p className="mt-3 text-[11.5px] text-red-600 flex items-center gap-1.5 font-medium bg-red-50 p-2 rounded-lg border border-red-100">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{stepError}</span>
                  </p>
                )}
              </div>

              {/* Next Step Button */}
              <button
                id={`quiz-next-btn-${currentStep}`}
                type="button"
                onClick={handleNext}
                className="w-full bg-[#1A2634] hover:bg-[#111A24] active:scale-[0.98] text-white font-extrabold text-[13px] tracking-wide py-3.5 px-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>КЕЛЕСІ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            /* Contact Details Step */
            <motion.div
              key="step-contact"
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 25 : -25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -25 : 25 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="bg-white rounded-2xl p-4 border border-neutral-200/90 shadow-xs space-y-3.5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-6 h-6 rounded-lg bg-amber-500 text-neutral-950 font-black text-xs flex items-center justify-center shrink-0">
                      ✓
                    </span>
                    <h3 className="text-[14.5px] font-extrabold text-neutral-900 leading-snug">
                      Байланыс деректеріңіз:
                    </h3>
                  </div>

                  <p className="text-[12px] text-neutral-500">
                    Анкета бойынша стратегиялық қорытындыны WhatsApp арқылы жібереміз.
                  </p>

                  <div>
                    <label className="block text-[11.5px] font-bold text-neutral-700 mb-1">
                      Атыңыз:
                    </label>
                    <div
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border bg-neutral-50/70 focus-within:bg-white focus-within:border-neutral-900 transition-all ${
                        contactErrors.name ? 'border-red-400 ring-2 ring-red-100' : 'border-neutral-300'
                      }`}
                    >
                      <User className="w-4 h-4 text-neutral-400 shrink-0" />
                      <input
                        id="contact-name-input"
                        type="text"
                        value={form.name}
                        onChange={(e) => {
                          setForm((p) => ({ ...p, name: e.target.value }));
                          if (contactErrors.name) {
                            setContactErrors((p) => {
                              const next = { ...p };
                              delete next.name;
                              return next;
                            });
                          }
                        }}
                        placeholder="Атыңызды жазыңыз"
                        className="w-full bg-transparent text-[13px] text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden"
                      />
                    </div>
                    {contactErrors.name && (
                      <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3" />
                        {contactErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11.5px] font-bold text-neutral-700 mb-1">
                      Телефон нөміріңіз (WhatsApp):
                    </label>
                    <div
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border bg-neutral-50/70 focus-within:bg-white focus-within:border-neutral-900 transition-all ${
                        contactErrors.phone ? 'border-red-400 ring-2 ring-red-100' : 'border-neutral-300'
                      }`}
                    >
                      <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
                      <input
                        id="contact-phone-input"
                        type="tel"
                        value={form.phone}
                        onChange={handlePhoneChange}
                        placeholder="+7 (___) ___-__-__"
                        className="w-full bg-transparent text-[13px] text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden"
                      />
                    </div>
                    {contactErrors.phone && (
                      <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3" />
                        {contactErrors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit button */}
                <button
                  id="quiz-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 active:scale-[0.98] text-neutral-950 font-black uppercase text-[13px] tracking-wider py-3.5 px-4 rounded-2xl shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 border border-amber-300 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>ЖІБЕРУ</span>
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
