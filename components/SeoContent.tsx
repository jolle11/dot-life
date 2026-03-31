"use client";

import type { Locale } from "@/lib/i18n";
import { SITE_NAME, SITE_URL } from "@/lib/site";

interface FaqItem {
  question: string;
  answer: string;
}

interface SeoCopy {
  label: string;
  introTitle: string;
  introBody: string;
  benefitsTitle: string;
  benefits: [string, string, string];
  faqTitle: string;
  faqItems: [FaqItem, FaqItem, FaqItem];
  websiteDescription: string;
}

const seoCopy: Record<Locale, SeoCopy> = {
  es: {
    label: "Life Calendar",
    introTitle:
      "Un life calendar interactivo para visualizar tu vida en semanas, meses o años",
    introBody:
      "dot life te ayuda a ver el tiempo de forma concreta. En lugar de pensar tu vida como un numero abstracto, cada punto representa una unidad real de tiempo y te permite entender mejor tus etapas, tus decisiones y los hitos que han marcado tu historia.",
    benefitsTitle: "Para que sirve",
    benefits: [
      "Convierte tu esperanza de vida en una cuadricula visual de semanas, meses o anos.",
      "Entiende de un vistazo cuanto tiempo has vivido y cuanto queda por delante.",
      "Anade hitos personales para ver tu vida como una linea temporal real.",
    ],
    faqTitle: "Preguntas frecuentes",
    faqItems: [
      {
        question: "Que es dot life?",
        answer:
          "dot life es una aplicacion visual tipo life calendar que transforma tu vida en puntos para ayudarte a entender el paso del tiempo de forma tangible.",
      },
      {
        question: "Como funciona la cuadricula de vida?",
        answer:
          "Introduces tu fecha de nacimiento y una esperanza de vida estimada. La app dibuja una cuadricula en la que cada punto representa una semana, un mes o un ano.",
      },
      {
        question: "Se guardan mis datos?",
        answer:
          "La configuracion se guarda localmente en tu navegador. No hace falta crear cuenta para usar la aplicacion.",
      },
    ],
    websiteDescription:
      "Visualiza cuanto tiempo has vivido y cuanto te queda. Cada punto es una semana, un mes o un ano de tu vida. Anade hitos y comparte tu grid.",
  },
  ca: {
    label: "Life Calendar",
    introTitle:
      "Un life calendar interactiu per visualitzar la teva vida en setmanes, mesos o anys",
    introBody:
      "dot life t'ajuda a veure el temps d'una manera concreta. En lloc de pensar la teva vida com un numero abstracte, cada punt representa una unitat real de temps i et permet entendre millor les teves etapes, les teves decisions i les fites que han marcat la teva historia.",
    benefitsTitle: "Per a que serveix",
    benefits: [
      "Converteix la teva esperanca de vida en una quadrícula visual de setmanes, mesos o anys.",
      "Enten d'un cop d'ull quant temps has viscut i quant queda per endavant.",
      "Afegeix fites personals per veure la teva vida com una linia temporal real.",
    ],
    faqTitle: "Preguntes frequents",
    faqItems: [
      {
        question: "Que es dot life?",
        answer:
          "dot life es una aplicacio visual tipus life calendar que transforma la teva vida en punts per ajudar-te a entendre el pas del temps de manera tangible.",
      },
      {
        question: "Com funciona la quadrícula de vida?",
        answer:
          "Introdueixes la teva data de naixement i una esperanca de vida estimada. L'aplicacio dibuixa una quadrícula on cada punt representa una setmana, un mes o un any.",
      },
      {
        question: "Es guarden les meves dades?",
        answer:
          "La configuracio es guarda localment al teu navegador. No cal crear cap compte per fer servir l'aplicacio.",
      },
    ],
    websiteDescription:
      "Visualitza quant temps has viscut i quant et queda. Cada punt es una setmana, un mes o un any de la teva vida. Afegeix fites i comparteix la teva graella.",
  },
  en: {
    label: "Life Calendar",
    introTitle:
      "An interactive life calendar to visualize your life in weeks, months, or years",
    introBody:
      "dot life helps you see time in a concrete way. Instead of thinking about your life as an abstract number, each dot represents a real unit of time and helps you understand your stages, decisions, and milestones more clearly.",
    benefitsTitle: "What it is for",
    benefits: [
      "Turn your life expectancy into a visual grid of weeks, months, or years.",
      "See at a glance how much of your life you have lived and what still lies ahead.",
      "Add personal milestones to view your life as a real timeline.",
    ],
    faqTitle: "Frequently asked questions",
    faqItems: [
      {
        question: "What is dot life?",
        answer:
          "dot life is a visual life calendar app that turns your life into dots so you can understand the passage of time in a more tangible way.",
      },
      {
        question: "How does the life grid work?",
        answer:
          "You enter your birth date and an estimated life expectancy. The app draws a grid where each dot represents a week, a month, or a year.",
      },
      {
        question: "Is my data stored?",
        answer:
          "Your configuration is stored locally in your browser. You do not need an account to use the app.",
      },
    ],
    websiteDescription:
      "Visualize how much of your life you have lived and how much is left. Each dot is a week, a month, or a year of your life. Add milestones and share your grid.",
  },
  fr: {
    label: "Life Calendar",
    introTitle:
      "Un life calendar interactif pour visualiser votre vie en semaines, mois ou annees",
    introBody:
      "dot life vous aide a voir le temps de facon concrete. Au lieu de penser votre vie comme un nombre abstrait, chaque point represente une unite reelle de temps et vous aide a mieux comprendre vos etapes, vos decisions et vos moments marquants.",
    benefitsTitle: "A quoi cela sert",
    benefits: [
      "Transformez votre esperance de vie en une grille visuelle de semaines, de mois ou d'annees.",
      "Comprenez en un coup d'oeil combien de temps vous avez deja vecu et ce qu'il vous reste.",
      "Ajoutez des moments marquants pour voir votre vie comme une vraie ligne du temps.",
    ],
    faqTitle: "Questions frequentes",
    faqItems: [
      {
        question: "Qu'est-ce que dot life ?",
        answer:
          "dot life est une application visuelle de type life calendar qui transforme votre vie en points pour vous aider a percevoir le temps de maniere concrete.",
      },
      {
        question: "Comment fonctionne la grille de vie ?",
        answer:
          "Vous indiquez votre date de naissance et une esperance de vie estimee. L'application dessine une grille dans laquelle chaque point represente une semaine, un mois ou une annee.",
      },
      {
        question: "Mes donnees sont-elles enregistrees ?",
        answer:
          "La configuration est enregistree localement dans votre navigateur. Aucun compte n'est necessaire pour utiliser l'application.",
      },
    ],
    websiteDescription:
      "Visualisez le temps deja vecu et celui qu'il vous reste. Chaque point represente une semaine, un mois ou une annee de votre vie. Ajoutez des moments marquants et partagez votre grille.",
  },
  de: {
    label: "Life Calendar",
    introTitle:
      "Ein interaktiver life calendar, um dein Leben in Wochen, Monaten oder Jahren zu visualisieren",
    introBody:
      "dot life hilft dir, Zeit greifbar zu sehen. Anstatt dein Leben als abstrakte Zahl zu betrachten, steht jeder Punkt fur eine reale Zeiteinheit und hilft dir, Lebensphasen, Entscheidungen und Meilensteine besser zu verstehen.",
    benefitsTitle: "Wofur es gedacht ist",
    benefits: [
      "Verwandle deine Lebenserwartung in ein visuelles Raster aus Wochen, Monaten oder Jahren.",
      "Erkenne auf einen Blick, wie viel Lebenszeit bereits vergangen ist und was noch vor dir liegt.",
      "Fuge personliche Meilensteine hinzu, um dein Leben als echte Zeitleiste zu sehen.",
    ],
    faqTitle: "Haufige Fragen",
    faqItems: [
      {
        question: "Was ist dot life?",
        answer:
          "dot life ist eine visuelle Life-Calendar-App, die dein Leben in Punkte verwandelt, damit du den Lauf der Zeit greifbarer verstehst.",
      },
      {
        question: "Wie funktioniert das Lebensraster?",
        answer:
          "Du gibst dein Geburtsdatum und eine geschatzte Lebenserwartung ein. Die App zeichnet ein Raster, in dem jeder Punkt fur eine Woche, einen Monat oder ein Jahr steht.",
      },
      {
        question: "Werden meine Daten gespeichert?",
        answer:
          "Deine Konfiguration wird lokal in deinem Browser gespeichert. Du brauchst kein Konto, um die App zu nutzen.",
      },
    ],
    websiteDescription:
      "Visualisiere, wie viel Lebenszeit du bereits gelebt hast und wie viel noch bleibt. Jeder Punkt steht fur eine Woche, einen Monat oder ein Jahr deines Lebens. Fuge Meilensteine hinzu und teile dein Raster.",
  },
  pt: {
    label: "Life Calendar",
    introTitle:
      "Um life calendar interativo para visualizar sua vida em semanas, meses ou anos",
    introBody:
      "dot life ajuda voce a enxergar o tempo de forma concreta. Em vez de pensar sua vida como um numero abstrato, cada ponto representa uma unidade real de tempo e ajuda voce a entender melhor suas fases, decisoes e marcos pessoais.",
    benefitsTitle: "Para que serve",
    benefits: [
      "Transforme sua expectativa de vida em uma grade visual de semanas, meses ou anos.",
      "Veja rapidamente quanto tempo voce ja viveu e quanto ainda existe pela frente.",
      "Adicione marcos pessoais para enxergar sua vida como uma linha do tempo real.",
    ],
    faqTitle: "Perguntas frequentes",
    faqItems: [
      {
        question: "O que e dot life?",
        answer:
          "dot life e um aplicativo visual no estilo life calendar que transforma sua vida em pontos para ajudar voce a perceber a passagem do tempo de forma mais concreta.",
      },
      {
        question: "Como funciona a grade da vida?",
        answer:
          "Voce informa sua data de nascimento e uma expectativa de vida estimada. O aplicativo desenha uma grade em que cada ponto representa uma semana, um mes ou um ano.",
      },
      {
        question: "Meus dados sao armazenados?",
        answer:
          "A configuracao fica salva localmente no seu navegador. Nao e preciso criar uma conta para usar o aplicativo.",
      },
    ],
    websiteDescription:
      "Visualize quanto da sua vida voce ja viveu e quanto ainda resta. Cada ponto representa uma semana, um mes ou um ano da sua vida. Adicione marcos e compartilhe sua grade.",
  },
  it: {
    label: "Life Calendar",
    introTitle:
      "Un life calendar interattivo per visualizzare la tua vita in settimane, mesi o anni",
    introBody:
      "dot life ti aiuta a vedere il tempo in modo concreto. Invece di pensare alla tua vita come a un numero astratto, ogni punto rappresenta un'unita reale di tempo e ti aiuta a capire meglio fasi, decisioni e momenti importanti.",
    benefitsTitle: "A cosa serve",
    benefits: [
      "Trasforma la tua aspettativa di vita in una griglia visiva di settimane, mesi o anni.",
      "Capisci a colpo d'occhio quanto tempo hai gia vissuto e quanto ne rimane.",
      "Aggiungi traguardi personali per vedere la tua vita come una vera linea temporale.",
    ],
    faqTitle: "Domande frequenti",
    faqItems: [
      {
        question: "Che cos'e dot life?",
        answer:
          "dot life e un'app visiva in stile life calendar che trasforma la tua vita in punti per aiutarti a percepire il tempo in modo piu tangibile.",
      },
      {
        question: "Come funziona la griglia della vita?",
        answer:
          "Inserisci la tua data di nascita e una stima della tua aspettativa di vita. L'app disegna una griglia in cui ogni punto rappresenta una settimana, un mese o un anno.",
      },
      {
        question: "I miei dati vengono salvati?",
        answer:
          "La configurazione viene salvata localmente nel browser. Non serve creare un account per usare l'app.",
      },
    ],
    websiteDescription:
      "Visualizza quanto tempo della tua vita hai gia vissuto e quanto ne resta. Ogni punto rappresenta una settimana, un mese o un anno della tua vita. Aggiungi traguardi e condividi la tua griglia.",
  },
  ja: {
    label: "Life Calendar",
    introTitle:
      "人生を週、月、年で可視化するインタラクティブなライフカレンダー",
    introBody:
      "dot life は時間をより具体的に見せてくれます。人生を抽象的な数字として考えるのではなく、各ドットが実際の時間単位を表し、自分の節目や選択、これまでの流れを理解しやすくします。",
    benefitsTitle: "できること",
    benefits: [
      "平均寿命を週、月、年のビジュアルグリッドに変換できます。",
      "どれだけ生きてきたか、どれだけ先があるかを一目で把握できます。",
      "個人的なマイルストーンを追加して、人生を本当のタイムラインとして見られます。",
    ],
    faqTitle: "よくある質問",
    faqItems: [
      {
        question: "dot life とは？",
        answer:
          "dot life は人生をドットで表現するライフカレンダー型アプリです。時間の流れをより実感しやすくします。",
      },
      {
        question: "ライフグリッドはどう動きますか？",
        answer:
          "生年月日と想定寿命を入力すると、各ドットが 1 週間、1 か月、または 1 年を表すグリッドが表示されます。",
      },
      {
        question: "データは保存されますか？",
        answer:
          "設定はブラウザ内にローカル保存されます。アカウント作成は不要です。",
      },
    ],
    websiteDescription:
      "人生のうちどれだけ生きてきたか、あとどれくらい残っているかを可視化します。各ドットは 1 週間、1 か月、または 1 年を表します。マイルストーンを追加してグリッドを共有できます。",
  },
  ko: {
    label: "Life Calendar",
    introTitle: "삶을 주, 월, 연 단위로 시각화하는 인터랙티브 라이프 캘린더",
    introBody:
      "dot life는 시간을 더 구체적으로 볼 수 있게 해줍니다. 삶을 추상적인 숫자로 생각하는 대신 각 점이 실제 시간 단위를 나타내어 삶의 단계, 결정, 중요한 순간을 더 잘 이해하게 도와줍니다.",
    benefitsTitle: "무엇에 도움이 되나요",
    benefits: [
      "기대 수명을 주, 월, 연 단위의 시각적 그리드로 바꿔 볼 수 있습니다.",
      "얼마나 살아왔고 얼마나 남았는지 한눈에 확인할 수 있습니다.",
      "개인적인 이정표를 추가해 삶을 실제 타임라인처럼 볼 수 있습니다.",
    ],
    faqTitle: "자주 묻는 질문",
    faqItems: [
      {
        question: "dot life는 무엇인가요?",
        answer:
          "dot life는 삶을 점으로 표현하는 라이프 캘린더 앱으로, 시간의 흐름을 더 직관적으로 이해하도록 도와줍니다.",
      },
      {
        question: "라이프 그리드는 어떻게 동작하나요?",
        answer:
          "생년월일과 예상 수명을 입력하면 각 점이 1주, 1개월 또는 1년을 나타내는 그리드가 생성됩니다.",
      },
      {
        question: "내 데이터는 저장되나요?",
        answer:
          "설정은 브라우저에 로컬로 저장됩니다. 앱을 사용하기 위해 계정을 만들 필요는 없습니다.",
      },
    ],
    websiteDescription:
      "지금까지 살아온 시간과 앞으로 남은 시간을 시각화합니다. 각 점은 삶의 1주, 1개월 또는 1년을 나타냅니다. 이정표를 추가하고 그리드를 공유할 수 있습니다.",
  },
  zh: {
    label: "Life Calendar",
    introTitle: "一个用周、月或年可视化人生的交互式生命日历",
    introBody:
      "dot life 帮助你更具体地看待时间。你不再把人生当作一个抽象数字，而是把每一个点都视为真实的时间单位，从而更清楚地理解自己的阶段、决定和重要里程碑。",
    benefitsTitle: "它能做什么",
    benefits: [
      "把你的预期寿命转换成按周、月或年显示的可视化网格。",
      "一眼看出你已经度过了多少时间，以及前方还剩多少。",
      "添加个人里程碑，把人生看作一条真实的时间线。",
    ],
    faqTitle: "常见问题",
    faqItems: [
      {
        question: "什么是 dot life？",
        answer:
          "dot life 是一款以点阵方式呈现人生的生命日历应用，帮助你更直观地理解时间流逝。",
      },
      {
        question: "生命网格如何运作？",
        answer:
          "你输入出生日期和预估寿命后，应用会生成一个网格，其中每个点代表一周、一个月或一年。",
      },
      {
        question: "我的数据会被保存吗？",
        answer: "配置会保存在你的浏览器本地。使用这款应用不需要创建账号。",
      },
    ],
    websiteDescription:
      "可视化你已经度过了多少人生，以及还剩下多少。每一个点代表你生命中的一周、一个月或一年。你可以添加里程碑并分享你的网格。",
  },
  ar: {
    label: "Life Calendar",
    introTitle: "تقويم حياة تفاعلي لعرض حياتك على شكل أسابيع أو أشهر أو سنوات",
    introBody:
      "يساعدك dot life على رؤية الوقت بشكل ملموس. بدلا من التفكير في حياتك كرقم مجرد، تمثل كل نقطة وحدة زمنية حقيقية وتساعدك على فهم مراحل حياتك وقراراتك ومحطاتك المهمة بشكل اوضح.",
    benefitsTitle: "ما الذي يفيدك به",
    benefits: [
      "حوّل متوسط العمر المتوقع الى شبكة مرئية من اسابيع او اشهر او سنوات.",
      "اعرف بسرعة كم من حياتك قد مضى وكم بقي امامك.",
      "اضف محطات شخصية لترى حياتك كخط زمني حقيقي.",
    ],
    faqTitle: "الاسئلة الشائعة",
    faqItems: [
      {
        question: "ما هو dot life؟",
        answer:
          "dot life هو تطبيق بصري من نوع life calendar يحول حياتك الى نقاط ليساعدك على فهم مرور الوقت بطريقة اكثر واقعية.",
      },
      {
        question: "كيف تعمل شبكة الحياة؟",
        answer:
          "تدخل تاريخ ميلادك ومتوسط العمر المتوقع، ثم يرسم التطبيق شبكة تمثل فيها كل نقطة اسبوعا او شهرا او سنة.",
      },
      {
        question: "هل يتم حفظ بياناتي؟",
        answer:
          "يتم حفظ الاعدادات محليا في متصفحك. لا تحتاج الى انشاء حساب لاستخدام التطبيق.",
      },
    ],
    websiteDescription:
      "اعرض بصريا كم عشت من حياتك وكم بقي منها. كل نقطة تمثل اسبوعا او شهرا او سنة من حياتك. اضف المحطات المهمة وشارك الشبكة.",
  },
  hi: {
    label: "Life Calendar",
    introTitle:
      "आपकी ज़िंदगी को हफ्तों, महीनों या वर्षों में दिखाने वाला एक इंटरैक्टिव लाइफ कैलेंडर",
    introBody:
      "dot life आपको समय को ज्यादा ठोस तरीके से देखने में मदद करता है। अपनी ज़िंदगी को केवल एक अमूर्त संख्या की तरह देखने के बजाय, हर डॉट समय की एक वास्तविक इकाई दिखाता है और आपके चरणों, फैसलों और अहम माइलस्टोन को समझना आसान बनाता है।",
    benefitsTitle: "यह किस काम आता है",
    benefits: [
      "अपनी जीवन प्रत्याशा को हफ्तों, महीनों या वर्षों की विजुअल ग्रिड में बदलें।",
      "एक नज़र में देखें कि आपने कितना जीवन जी लिया है और कितना आगे बाकी है।",
      "अपनी ज़िंदगी को वास्तविक टाइमलाइन की तरह देखने के लिए निजी माइलस्टोन जोड़ें।",
    ],
    faqTitle: "अक्सर पूछे जाने वाले सवाल",
    faqItems: [
      {
        question: "dot life क्या है?",
        answer:
          "dot life एक विजुअल life calendar ऐप है जो आपकी ज़िंदगी को डॉट्स में बदलता है ताकि समय के गुजरने को अधिक ठोस तरीके से समझा जा सके।",
      },
      {
        question: "लाइफ ग्रिड कैसे काम करती है?",
        answer:
          "आप अपनी जन्मतिथि और अनुमानित जीवन प्रत्याशा दर्ज करते हैं। ऐप एक ग्रिड बनाती है जिसमें हर डॉट एक हफ्ता, एक महीना या एक साल दर्शाता है।",
      },
      {
        question: "क्या मेरा डेटा सेव होता है?",
        answer:
          "आपकी कॉन्फ़िगरेशन आपके ब्राउज़र में लोकली सेव होती है। ऐप इस्तेमाल करने के लिए अकाउंट बनाने की ज़रूरत नहीं है।",
      },
    ],
    websiteDescription:
      "देखें कि आपने अपनी ज़िंदगी का कितना हिस्सा जी लिया है और कितना बाकी है। हर डॉट आपकी ज़िंदगी के एक हफ्ते, एक महीने या एक साल को दर्शाता है। माइलस्टोन जोड़ें और अपनी ग्रिड साझा करें।",
  },
};

interface Props {
  locale: Locale;
}

export function SeoContent({ locale }: Props) {
  const copy = seoCopy[locale];
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: copy.websiteDescription,
    inLanguage: locale,
  };

  return (
    <section className="mt-10 border-t border-zinc-200 pt-10 dark:border-zinc-800">
      <script type="application/ld+json">
        {JSON.stringify([websiteJsonLd, faqJsonLd])}
      </script>

      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          <section aria-labelledby="seo-intro">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              {copy.label}
            </p>
            <h2
              id="seo-intro"
              className="max-w-3xl text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
            >
              {copy.introTitle}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
              {copy.introBody}
            </p>
          </section>

          <section aria-labelledby="seo-benefits">
            <h2
              id="seo-benefits"
              className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
            >
              {copy.benefitsTitle}
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {copy.benefits.map((benefit) => (
                <article
                  key={benefit}
                  className="rounded-2xl border border-zinc-200 bg-zinc-50/70 p-5 dark:border-zinc-800 dark:bg-zinc-900/40"
                >
                  <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                    {benefit}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="rounded-2xl border border-zinc-200 bg-zinc-50/70 p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {copy.faqTitle}
          </h2>
          <div className="mt-5 space-y-5">
            {copy.faqItems.map((item) => (
              <article key={item.question}>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {item.question}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
