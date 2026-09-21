export type Language = 'kz' | 'ru';

export interface Translations {
  meta: {
    title: string;
    description: string;
  };
  desktopHeader: {
    title: string;
    whatsappLabel: string;
  };
  hero: {
    badge: string;
    headline: string;
    subhead: string;
    handwriting1: string;
    handwriting2: string;
    card1Title: string;
    card1Desc: string;
    stat1Number: string;
    stat1Label: string;
    stat1Desc: string;
    stat2Number: string;
    stat2Label: string;
    stat2Desc: string;
    ctaButton: string;
    floatingCta: string;
  };
  quiz: {
    title: string;
    subheadSteps: string;
    subheadContact: string;
    backHome: string;
    back: string;
    questionStepLabel: string; // e.g. "сұрақ" / "из 4"
    finalStepLabel: string;
    questionBadge: string;
    nextButton: string;
    selectOptionError: string;
    contactHeader: string;
    contactExplanation: string;
    nameLabel: string;
    namePlaceholder: string;
    nameError: string;
    phoneLabel: string;
    phonePlaceholder: string;
    phoneError: string;
    submitButton: string;
  };
  whatsapp: {
    intro: string;
    answersTitle: string;
    nameLabel: string;
    phoneLabel: string;
    revenueLabel: string;
    teamSizeLabel: string;
    bottleneckLabel: string;
    readinessLabel: string;
  };
  successModal: {
    title: string;
    description: string;
    openWhatsApp: string;
    copyMessage: string;
    copied: string;
    closeHome: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  kz: {
    meta: {
      title: 'Стратегиялық Диагностика — Микро-лендинг',
      description: '15 минуттық тегін стратегиялық диагностикаға арналған телефонға арналған микро-лендинг және сүзгі-анкета.',
    },
    desktopHeader: {
      title: 'Микро-лендинг (15 мин диагностика)',
      whatsappLabel: 'WhatsApp',
    },
    hero: {
      badge: '15 минуттық тегін диагностика',
      headline: 'Оборот бар — <br /> қалтаңда ақша жоқ па?',
      subhead:
        'Бизнес өсу үшін - көп сату немесе үлкен жарнамаға байланысты емес. Бизнес моделің дұрыс болмаса, көп сатылым - шығынды еселей түседі. Бізге керегі бар обороттан таза пайданы жүйелі түрде шығару.',
      handwriting1: 'Көбірек таза пайда.',
      handwriting2: 'Нақты жүйе.',
      card1Title: 'ЖҮЙЕ ЕРКІНДІК СЫЙЛАЙДЫ.',
      card1Desc: 'Дұрыс жүйе — үлкен мүмкіндіктерге апарады.',
      stat1Number: '$3 000 000',
      stat1Label: 'жылдық оборот:',
      stat1Desc: 'Мен құрған бизнес-жүйенің нақты нәтижесі',
      stat2Number: '2 000 000',
      stat2Label: 'YouTube жазылушы:',
      stat2Desc: 'контент алгоритмдерін жүйелі басқарудың дәлелі',
      ctaButton: '15 МИНУТТЫҚ ТЕГІН СТРАТЕГИЯЛЫҚ ДИАГНОСТИКАҒА ЖАЗЫЛУ',
      floatingCta: '15 мин диагностикаға жазылу',
    },
    quiz: {
      title: 'КВАЛИФИКАЦИЯЛЫҚ СҮЗГІ-АНКЕТА',
      subheadSteps: 'Сізге нақты көмектесе алуымыз үшін бірнеше сұраққа жауап беріңіз.',
      subheadContact: 'Диагностикаға жазылу үшін байланыс нөміріңізді қалдырыңыз:',
      backHome: 'Басты бетке оралу',
      back: 'Артқа',
      questionStepLabel: 'сұрақ',
      finalStepLabel: 'Соңғы қадам',
      questionBadge: 'Сұрақ #',
      nextButton: 'КЕЛЕСІ',
      selectOptionError: 'Жалғастыру үшін бір жауапты таңдаңыз',
      contactHeader: 'Байланыс деректеріңіз:',
      contactExplanation: 'Анкета бойынша стратегиялық қорытындыны WhatsApp арқылы жібереміз.',
      nameLabel: 'Атыңыз:',
      namePlaceholder: 'Атыңызды жазыңыз',
      nameError: 'Атыңызды жазыңыз',
      phoneLabel: 'Телефон нөміріңіз (WhatsApp):',
      phonePlaceholder: '+7 (___) ___-__-__',
      phoneError: 'Телефон нөміріңізді толық жазыңыз',
      submitButton: 'ЖІБЕРУ',
    },
    whatsapp: {
      intro:
        'Сәлеметсіз бе! Мен сайттағы анкетаны толтырдым. Менің бизнесімдегі негізгі кедергіні анықтауға арналған 15 минуттық тегін стратегиялық диагностика уақытын бекітуге дайынмын.',
      answersTitle: '📋 *Анкета жауаптары:*',
      nameLabel: '👤 *Аты:*',
      phoneLabel: '📞 *Телефон:*',
      revenueLabel: '💰 *Айлық оборот:*',
      teamSizeLabel: '👥 *Команда:*',
      bottleneckLabel: '⚠️ *Негізгі кедергі:*',
      readinessLabel: '🎯 *Дайындық:*',
    },
    successModal: {
      title: 'Анкета сәтті қабылданды!',
      description: 'WhatsApp ашылмаса, төмендегі батырманы басыңыз:',
      openWhatsApp: 'WhatsApp-ты ашу',
      copyMessage: 'Хабарлама мәтінін көшіру',
      copied: 'Мәтін көшірілді',
      closeHome: 'Жабу және басты бетке оралу',
    },
  },
  ru: {
    meta: {
      title: 'Стратегическая Диагностика — Микролендинг',
      description: 'Мобильный микролендинг и квалификационная анкета для записи на 15-минутную стратегическую диагностику бизнеса.',
    },
    desktopHeader: {
      title: 'Микролендинг (15-мин диагностика)',
      whatsappLabel: 'WhatsApp',
    },
    hero: {
      badge: '15-минутная стратегическая диагностика',
      headline: 'Оборот есть — <br /> а денег в кармане нет?',
      subhead:
        'Рост бизнеса — это не всегда про «продавать больше» или заливать рекламу деньгами. Если бизнес-модель неверна, рост продаж лишь множит ваши расходы. Вам нужна система, которая извлекает максимум чистой прибыли из текущего оборота.',
      handwriting1: 'Больше чистой прибыли.',
      handwriting2: 'Четкая система.',
      card1Title: 'СИСТЕМА ДАРИТ СВОБОДУ.',
      card1Desc: 'Правильная система открывает большие возможности.',
      stat1Number: '$3 000 000',
      stat1Label: 'годовой оборот:',
      stat1Desc: 'конкретный результат созданной мной бизнес-системы',
      stat2Number: '2 000 000',
      stat2Label: 'подписчиков YouTube:',
      stat2Desc: 'системное управление алгоритмами контента',
      ctaButton: 'ЗАПИСАТЬСЯ НА 15-МИНУТНУЮ СТРАТЕГИЧЕСКУЮ ДИАГНОСТИКУ',
      floatingCta: 'Записаться на 15-мин диагностику',
    },
    quiz: {
      title: 'КВАЛИФИКАЦИОННАЯ АНКЕТА-ФИЛЬТР',
      subheadSteps: 'Ответьте на несколько вопросов, чтобы мы могли точно оценить вашу ситуацию.',
      subheadContact: 'Оставьте контакты для записи на стратегическую диагностику:',
      backHome: 'На главную',
      back: 'Назад',
      questionStepLabel: 'из 4',
      finalStepLabel: 'Финальный шаг',
      questionBadge: 'Вопрос #',
      nextButton: 'ДАЛЕЕ',
      selectOptionError: 'Выберите вариант ответа для продолжения',
      contactHeader: 'Ваши контактные данные:',
      contactExplanation: 'По результатам анкеты мы свяжемся с вами в WhatsApp для согласования времени диагностики.',
      nameLabel: 'Ваше имя:',
      namePlaceholder: 'Введите ваше имя',
      nameError: 'Укажите ваше имя',
      phoneLabel: 'Номер телефона (WhatsApp):',
      phonePlaceholder: '+7 (___) ___-__-__',
      phoneError: 'Укажите полный номер телефона',
      submitButton: 'ОТПРАВИТЬ',
    },
    whatsapp: {
      intro:
        'Здравствуйте! Я заполнил анкету на сайте. Готов зафиксировать время на 15-минутную стратегическую диагностику для выявления ключевого барьера в моем бизнесе.',
      answersTitle: '📋 *Ответы на анкету:*',
      nameLabel: '👤 *Имя:*',
      phoneLabel: '📞 *Телефон:*',
      revenueLabel: '💰 *Месячный оборот:*',
      teamSizeLabel: '👥 *Команда:*',
      bottleneckLabel: '⚠️ *Главный барьер:*',
      readinessLabel: '🎯 *Готовность:*',
    },
    successModal: {
      title: 'Анкета успешно принята!',
      description: 'Если WhatsApp не открылся автоматически, нажмите кнопку ниже:',
      openWhatsApp: 'Открыть WhatsApp',
      copyMessage: 'Скопировать текст сообщения',
      copied: 'Текст скопирован',
      closeHome: 'Закрыть и вернуться на главную',
    },
  },
};
