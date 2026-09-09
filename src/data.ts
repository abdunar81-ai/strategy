import { Question } from './types';

export const DEFAULT_WHATSAPP_PHONE = '77757426111';

export const QUIZ_QUESTIONS: Question[] = [
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

export const WHATSAPP_DEFAULT_TEMPLATE =
  'Сәлеметсіз бе! Мен сайттағы анкетаны толтырдым. Менің бизнесімдегі негізгі кедергіні анықтауға арналған 15 минуттық тегін стратегиялық диагностика уақытын бекітуге дайынмын';

export function buildWhatsAppUrl(
  phoneNumber: string,
  answers: {
    name: string;
    phone: string;
    revenue: string;
    teamSize: string;
    bottleneck: string;
    readiness: string;
  }
): string {
  // Clean phone number (remove +, -, spaces, () )
  const cleanPhone = phoneNumber.replace(/\D/g, '');

  let text = `${WHATSAPP_DEFAULT_TEMPLATE}\n\n`;
  text += `📋 *Анкета жауаптары:*\n`;
  if (answers.name) text += `👤 *Аты:* ${answers.name}\n`;
  if (answers.phone) text += `📞 *Телефон:* ${answers.phone}\n`;
  if (answers.revenue) text += `💰 *Айлық оборот:* ${answers.revenue}\n`;
  if (answers.teamSize) text += `👥 *Команда:* ${answers.teamSize}\n`;
  if (answers.bottleneck) text += `⚠️ *Негізгі кедергі:* ${answers.bottleneck}\n`;
  if (answers.readiness) text += `🎯 *Дайындық:* ${answers.readiness}\n`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
