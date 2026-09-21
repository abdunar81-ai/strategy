import React, { useState } from 'react';
import { CheckCircle2, Copy, Check, MessageSquare, ExternalLink, X } from 'lucide-react';
import { QuizState, Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface SuccessModalProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  whatsappUrl: string;
  answers: QuizState | null;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  lang,
  isOpen,
  onClose,
  whatsappUrl,
  answers,
}) => {
  const [copied, setCopied] = useState(false);
  const t = TRANSLATIONS[lang].successModal;

  if (!isOpen || !answers) return null;

  const handleCopyText = () => {
    const text = decodeURIComponent(whatsappUrl.split('text=')[1] || '');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-neutral-200 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 p-1 rounded-full cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2.5">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h3 className="text-[17px] font-extrabold text-neutral-900 leading-tight">
            {t.title}
          </h3>
          <p className="text-[12px] text-neutral-600 mt-1">
            {t.description}
          </p>
        </div>

        {/* WhatsApp action button */}
        <div className="space-y-2.5">
          <a
            id="modal-open-whatsapp-link"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#20BE5C] active:scale-[0.98] text-white font-extrabold text-[13px] py-3.5 px-4 rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>{t.openWhatsApp}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={handleCopyText}
            className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold text-[12px] py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">{t.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{t.copyMessage}</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-100 text-center">
          <button
            type="button"
            onClick={onClose}
            className="text-[11.5px] font-semibold text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer"
          >
            {t.closeHome}
          </button>
        </div>
      </div>
    </div>
  );
};

