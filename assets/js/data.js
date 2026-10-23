/* ==========================================================================
   بيانات الموقع — عدّلي من هنا فقط
   --------------------------------------------------------------------------
   لإضافة مشروع جديد: انسخي أي كائن داخل projects، وغيّري القيم.
   - image  : مسار الصورة داخل assets/projects
   - url    : رابط المشروع (يُفتح في تبويب جديد تلقائيًا)
   - filters: ecommerce / personal / design  (تظهر حسب التصنيفات بالأسفل)
   ========================================================================== */

window.PORTFOLIO = {
  phone: "0542308267",
  phoneIntl: "+966542308267",
  whatsapp: "966542308267",
  github: "https://github.com/ureemz",

  filters: [
    { id: "all", label: "الكل" },
    { id: "ecommerce", label: "متاجر إلكترونية" },
    { id: "personal", label: "مواقع شخصية" },
    { id: "design", label: "تصميم وتجربة" }
  ],

  projects: [
    {
      id: "raem",
      index: "01",
      title: "RAËM — عبايات نسائية فاخرة",
      kicker: "E-COMMERCE · FASHION",
      category: "متجر إلكتروني",
      filters: ["ecommerce", "design"],
      description: "متجر عبايات بهوية هادئة، تصفية ألوان، حقيبة عرض، وإتمام الطلب عبر واتساب.",
      longDescription:
        "تجربة متجر عبايات نسائية فاخرة تعتمد على الهدوء البصري بدل الضجيج. يجمع المشروع بين سرد للبراند، مجموعة قابلة للتصفية حسب الدرجة اللونية، صفحة تفاصيل للمنتج، وحقيبة تسوق تجريبية تُكمل الطلب عبر واتساب — بواجهة عربية RTL كاملة وتفاصيل حركة ناعمة.",
      image: "assets/projects/raem.jpg",
      imageAlt: "الصفحة الرئيسية لمتجر RAËM للعبايات النسائية",
      url: "https://ureemz.github.io/raem-abaya/",
      displayUrl: "ureemz.github.io/raem-abaya",
      tags: ["HTML5", "CSS3", "JavaScript", "RTL", "UI / UX", "E-commerce"],
      role: "تصميم وتطوير كامل",
      year: "2026",
      accent: "#c9a36a",
      highlights: [
        "هوية بصرية هادئة وتجربة عربية RTL بالكامل.",
        "تصفية المجموعة حسب الدرجة اللونية وتفاصيل المنتج.",
        "حقيبة تسوق عرضية مع إتمام الطلب عبر واتساب.",
        "تصميم متجاوب مع حركات وانتقالات ناعمة."
      ]
    },
    {
      id: "sight",
      index: "02",
      title: "Sight — أكثر من مجرد نظارة",
      kicker: "E-COMMERCE · EYEWEAR",
      category: "متجر إلكتروني",
      filters: ["ecommerce", "design"],
      description: "تجربة تسوق نظارات كاملة: مجموعات، دليل شكل الوجه، مفضلة، سلة، وتعدد عملات.",
      longDescription:
        "تجربة متجر نظارات تُبنى حول فكرة «الإطار الذي يشبهك». يتضمن الموقع عرض المجموعات، دليلًا تفاعليًا لاختيار الإطار حسب شكل الوجه، مفضلة وسلة تسوق، دعمًا لعدة عملات، وسردًا إنسانيًا لقصة البراند — مع تجربة استخدام سلسة على الجوال.",
      image: "assets/projects/sight.jpg",
      imageAlt: "الصفحة الرئيسية لمتجر Sight للنظارات",
      url: "https://ureemz.github.io/sight/",
      displayUrl: "ureemz.github.io/sight",
      tags: ["E-commerce", "UI / UX", "JavaScript", "Responsive", "Motion"],
      role: "تصميم وتطوير واجهات",
      year: "2026",
      accent: "#d7c39a",
      highlights: [
        "تجربة تسوق متكاملة مع مفضلة وسلة عرض.",
        "دليل تفاعلي لاختيار الإطار حسب شكل الوجه.",
        "دعم تعدد العملات وواجهة عربية وإنجليزية.",
        "إتمام الطلب عبر واتساب وتجربة جوال سلسة."
      ]
    },
    {
      id: "shamati",
      index: "03",
      title: "شمعتي — شموع يدوية في جدة",
      kicker: "BRANDING · HANDMADE",
      category: "متجر إلكتروني",
      filters: ["ecommerce", "design"],
      description: "هوية دافئة لمشروع شموع يدوية، مع قائمة منتجات وتجربة طلب مباشرة عبر واتساب.",
      longDescription:
        "هوية رقمية لمشروع شموع يدوية في جدة، مبنية على الدفء والهدوء والحرفية. يقدّم الموقع قائمة منتجات منظمة، سردًا لطريقة الصنع والتغليف، تجربة طلب مباشرة عبر واتساب، وتفاصيل بصرية تمنح المنتج إحساس الهدية قبل أن تصل.",
      image: "assets/projects/shamati.jpg",
      imageAlt: "الصفحة الرئيسية لموقع شمعتي للشموع اليدوية",
      url: "https://ureemz.github.io/shamati/",
      displayUrl: "ureemz.github.io/shamati",
      tags: ["Branding", "Web Design", "JavaScript", "RTL", "Responsive"],
      role: "هوية وتصميم وتطوير",
      year: "2026",
      accent: "#dd9a5f",
      highlights: [
        "هوية دافئة تعكس طابع الشموع اليدوية.",
        "قائمة منتجات منظمة مع تفاصيل لكل شمعة.",
        "تجربة طلب مباشرة عبر واتساب.",
        "تغليف وهدايا ضمن السرد البصري للمشروع."
      ]
    },
    {
      id: "reem-cv",
      index: "04",
      title: "السيرة الذاتية الرقمية",
      kicker: "PERSONAL · DIGITAL CV",
      category: "موقع شخصي",
      filters: ["personal", "design"],
      description: "سيرة ذاتية تفاعلية بالعربية تعرض الملف المهني والمهارات مع دعم الطباعة إلى PDF.",
      longDescription:
        "سيرة ذاتية رقمية عربية تعرض الملف المهني، المهارات، التعليم، والمشاريع في تجربة تصفح أنيقة. صُممت لتكون قابلة للطباعة إلى PDF، مع أزرار مباشرة للتواصل عبر واتساب ونسخ رقم الجوال، وتخطيط متجاوب يعمل بسلاسة على مختلف الشاشات.",
      image: "assets/projects/reem-cv.jpg",
      imageAlt: "الصفحة الرئيسية للسيرة الذاتية الرقمية لريم محمد عبدالله",
      url: "https://ureemz.github.io/reem-cv/",
      displayUrl: "ureemz.github.io/reem-cv",
      tags: ["HTML5", "CSS3", "JavaScript", "Responsive", "Print"],
      role: "تصميم وتطوير",
      year: "2026",
      accent: "#82d3bf",
      highlights: [
        "سيرة ذاتية رقمية كاملة باللغة العربية.",
        "دعم الطباعة إلى PDF بتنسيق نظيف.",
        "نسخ رقم التواصل وروابط مباشرة لواتساب.",
        "تخطيط متجاوب وسهل التحديث."
      ]
    }
  ]
};
