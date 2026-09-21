import { Question, Language } from './types';
import { TRANSLATIONS } from './translations';

export const DEFAULT_WHATSAPP_PHONE = '77757426111';

export const QUIZ_QUESTIONS_KZ: Question[] = [
  {
    id: 'revenue',
    number: 1,
    question: 'Сіздің бизнесіңіздің қазіргі айлық обороты қанша?',
    options: [
      '5 миллион теңгеге дейін',
      '5 - 20 миллион теңге аралығында',
      '20 - 100 миллион теңге аралығында',
      '100 миллион теңгеден жоғары',
    ],
  },
  {
    id: 'teamSize',
    number: 2,
    question: 'Командаңызда жұмыс істейтін қанша адам бар?',
    options: [
      '1 - 5 адам',
      '5 - 15 адам',
      '15 адамнан жоғары',
    ],
  },
  {
    id: 'bottleneck',
    number: 3,
    question: 'Қазіргі таңда бизнесіңіздің өсуіне ең үлкен кедергі болып тұрған не?',
    options: [
      'Өзім операционкадан шыға алмай жүрмін, бәрі маған байланған',
      'Оборот бар, бірақ нақты қанша таза пайда қалатыны белгісіз',
      'Маркетологтар мен команда нәтиже бермейді, уақыт созылып жатыр',
      'Бірнеше бағыттың арасында ресурстарым шашырап кетті',
    ],
  },
  {
    id: 'readiness',
    number: 4,
    question: 'Бизнестегі процестерді өзгертуге және стратегияны енгізуге жеке ресурсыңыз бен энергияңызды салуға дайынсыз ба?',
    options: [
      'Иә, нақты шешім қабылдап, өзгеруге дайынмын',
      'Әлі де зерттеу керек',
    ],
  },
];

export const QUIZ_QUESTIONS_RU: Question[] = [
  {
    id: 'revenue',
    number: 1,
    question: 'Какой текущий месячный оборот вашего бизнеса?',
    options: [
      'До 5 миллионов тенге',
      'От 5 до 20 миллионов тенге',
      'От 20 до 100 миллионов тенге',
      'Свыше 100 миллионов тенге',
    ],
  },
  {
    id: 'teamSize',
    number: 2,
    question: 'Сколько человек работает в вашей команде?',
    options: [
      '1 - 5 человек',
      '5 - 15 человек',
      'Более 15 человек',
    ],
  },
  {
    id: 'bottleneck',
    number: 3,
    question: 'Что сейчас является главным барьером для роста вашего бизнеса?',
    options: [
      'Сам не могу выйти из операционки, все завязано на мне',
      'Оборот есть, но непонятно, сколько чистой прибыли остается',
      'Маркетологи и команда не дают результата, время затягивается',
      'Ресурсы распылены между несколькими направлениями',
    ],
  },
  {
    id: 'readiness',
    number: 4,
    question: 'Готовы ли вы инвестировать личные ресурсы и энергию в изменение процессов и внедрение стратегии?',
    options: [
      'Да, готов принимать твердые решения и меняться',
      'Пока нужно изучить детальнее',
    ],
  },
];

export function getQuizQuestions(lang: Language): Question[] {
  return lang === 'ru' ? QUIZ_QUESTIONS_RU : QUIZ_QUESTIONS_KZ;
}

export function buildWhatsAppUrl(
  phoneNumber: string,
  answers: {
    name: string;
    phone: string;
    revenue: string;
    teamSize: string;
    bottleneck: string;
    readiness: string;
  },
  lang: Language = 'kz'
): string {
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  const t = TRANSLATIONS[lang].whatsapp;

  let text = `${t.intro}\n\n`;
  text += `${t.answersTitle}\n`;
  if (answers.name) text += `${t.nameLabel} ${answers.name}\n`;
  if (answers.phone) text += `${t.phoneLabel} ${answers.phone}\n`;
  if (answers.revenue) text += `${t.revenueLabel} ${answers.revenue}\n`;
  if (answers.teamSize) text += `${t.teamSizeLabel} ${answers.teamSize}\n`;
  if (answers.bottleneck) text += `${t.bottleneckLabel} ${answers.bottleneck}\n`;
  if (answers.readiness) text += `${t.readinessLabel} ${answers.readiness}\n`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

