import { BarChart3, Braces, BrainCircuit, Code2, Palette, Smartphone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Language = 'fr' | 'en' | 'ar';
export type Localized = Record<Language, string>;

export const copy = {
  fr: {
    navCourses: 'Formations', navMethod: 'Notre approche', navAbout: 'À propos', navReviews: 'Témoignages', navContact: 'Nous contacter',
    heroEyebrow: 'Centre de formation numérique · Tunis', heroTitle: 'Apprenez les compétences numériques qui comptent vraiment.',
    heroCopy: 'Des formations pratiques, encadrées par des formateurs, pour progresser avec une méthode claire et des projets concrets.',
    explore: 'Voir les formations', talk: 'Parler à un conseiller', nextSession: 'Prochaine session', openRegistration: 'Inscriptions ouvertes',
    practical: 'Apprentissage pratique', instructorLed: 'Avec un formateur', smallGroups: 'Groupes à taille humaine', certificate: 'Attestation de formation',
    statsEyebrow: 'L’essentiel', statsTitle: 'Une formation structurée autour de votre progression.',
    categoryEyebrow: 'Domaines', categoryTitle: 'Choisissez le domaine qui vous correspond.', categoryCopy: 'Des parcours lisibles, du niveau débutant à la spécialisation.', discover: 'Découvrir',
    featuredEyebrow: 'Programmes', featuredTitle: 'Les formations à la une.', featuredCopy: 'Chaque programme combine cours guidés, exercices et projet de fin de parcours.',
    all: 'Toutes', duration: 'Durée', format: 'Format', level: 'Niveau', details: 'Voir le programme',
    whyEyebrow: 'Pourquoi MBS Skills', whyTitle: 'Un cadre sérieux pour apprendre et pratiquer.',
    whyCopy: 'Nous privilégions les explications claires, la pratique régulière et un accompagnement accessible tout au long du parcours.',
    methodEyebrow: 'Votre parcours', methodTitle: 'Une méthode simple, du choix à la maîtrise.',
    testimonialEyebrow: 'Paroles d’apprenants', testimonialTitle: 'Ce qu’ils retiennent de leur expérience.',
    ctaTitle: 'Vous ne savez pas quelle formation choisir ?', ctaCopy: 'Échangez avec notre équipe. Nous vous aiderons à identifier le parcours adapté à votre niveau et à votre objectif.',
    contactTitle: 'Construisons votre parcours', contactCopy: 'Laissez-nous vos coordonnées. Un conseiller vous répondra avec les prochaines dates et les modalités.',
    name: 'Nom complet', email: 'E-mail', phone: 'Téléphone', interest: 'Formation souhaitée', message: 'Votre objectif', send: 'Envoyer ma demande', success: 'Merci. Votre demande a bien été préparée.',
    footer: 'Des formations numériques pratiques, accessibles et encadrées à Tunis.', quickLinks: 'Navigation', contact: 'Contact', follow: 'Suivez-nous', rights: 'Tous droits réservés.',
    courseTitle: 'Détails de la formation', courseIncludes: 'Ce programme comprend', close: 'Fermer',
    privacy: 'Confidentialité', privacyCopy: 'Les informations saisies dans ce formulaire ne quittent pas cette page dans cette version de démonstration.',
  },
  en: {
    navCourses: 'Courses', navMethod: 'Our approach', navAbout: 'About', navReviews: 'Testimonials', navContact: 'Contact us',
    heroEyebrow: 'Digital training center · Tunis', heroTitle: 'Learn the digital skills that truly matter.',
    heroCopy: 'Practical, instructor-led courses designed to help you progress through a clear method and real projects.',
    explore: 'Browse courses', talk: 'Talk to an advisor', nextSession: 'Next session', openRegistration: 'Registration open',
    practical: 'Practical learning', instructorLed: 'Instructor-led', smallGroups: 'Small groups', certificate: 'Training certificate',
    statsEyebrow: 'At a glance', statsTitle: 'Training built around your progress.',
    categoryEyebrow: 'Fields', categoryTitle: 'Choose the field that fits you.', categoryCopy: 'Clear learning paths, from beginner level to specialization.', discover: 'Explore',
    featuredEyebrow: 'Programs', featuredTitle: 'Featured courses.', featuredCopy: 'Every program combines guided lessons, exercises and a final project.',
    all: 'All', duration: 'Duration', format: 'Format', level: 'Level', details: 'View program',
    whyEyebrow: 'Why MBS Skills', whyTitle: 'A focused environment to learn and practise.',
    whyCopy: 'We prioritize clear explanations, regular practice and accessible support throughout your course.',
    methodEyebrow: 'Your journey', methodTitle: 'A simple method, from choosing to mastering.',
    testimonialEyebrow: 'Learner stories', testimonialTitle: 'What they took away from the experience.',
    ctaTitle: 'Not sure which course to choose?', ctaCopy: 'Talk with our team. We will help you identify the path that fits your level and goals.',
    contactTitle: 'Let’s build your learning path', contactCopy: 'Leave your details. An advisor will reply with upcoming dates and enrollment options.',
    name: 'Full name', email: 'Email', phone: 'Phone', interest: 'Course of interest', message: 'Your goal', send: 'Send my request', success: 'Thank you. Your request has been prepared.',
    footer: 'Practical, accessible and instructor-led digital training in Tunis.', quickLinks: 'Navigation', contact: 'Contact', follow: 'Follow us', rights: 'All rights reserved.',
    courseTitle: 'Course details', courseIncludes: 'This program includes', close: 'Close',
    privacy: 'Privacy', privacyCopy: 'The information entered in this form does not leave this page in this demo version.',
  },
  ar: {
    navCourses: 'الدورات', navMethod: 'منهجنا', navAbout: 'من نحن', navReviews: 'آراء المتدربين', navContact: 'اتصل بنا',
    heroEyebrow: 'مركز تدريب رقمي · تونس', heroTitle: 'تعلّم المهارات الرقمية التي تحتاجها فعلاً.',
    heroCopy: 'دورات تطبيقية بإشراف مدربين تساعدك على التقدم بمنهج واضح ومشاريع واقعية.',
    explore: 'اكتشف الدورات', talk: 'تحدث مع مستشار', nextSession: 'الدورة القادمة', openRegistration: 'التسجيل مفتوح',
    practical: 'تعلّم تطبيقي', instructorLed: 'بإشراف مدرب', smallGroups: 'مجموعات صغيرة', certificate: 'شهادة تدريب',
    statsEyebrow: 'باختصار', statsTitle: 'تدريب منظّم حول تقدمك.',
    categoryEyebrow: 'المجالات', categoryTitle: 'اختر المجال المناسب لك.', categoryCopy: 'مسارات واضحة من المبتدئ إلى التخصص.', discover: 'اكتشف',
    featuredEyebrow: 'البرامج', featuredTitle: 'الدورات المميزة.', featuredCopy: 'يجمع كل برنامج بين الدروس الموجهة والتمارين ومشروع ختامي.',
    all: 'الكل', duration: 'المدة', format: 'الصيغة', level: 'المستوى', details: 'عرض البرنامج',
    whyEyebrow: 'لماذا MBS Skills', whyTitle: 'إطار جاد للتعلّم والتطبيق.',
    whyCopy: 'نركز على الشرح الواضح والممارسة المنتظمة والدعم المتاح طوال المسار.',
    methodEyebrow: 'مسارك', methodTitle: 'طريقة بسيطة من الاختيار إلى الإتقان.',
    testimonialEyebrow: 'آراء المتدربين', testimonialTitle: 'ماذا استفادوا من التجربة.',
    ctaTitle: 'لست متأكداً من الدورة المناسبة؟', ctaCopy: 'تحدث مع فريقنا لمساعدتك على تحديد المسار المناسب لمستواك وهدفك.',
    contactTitle: 'لنصمم مسارك', contactCopy: 'اترك بياناتك وسيرد عليك مستشار بالمواعيد القادمة وخيارات التسجيل.',
    name: 'الاسم الكامل', email: 'البريد الإلكتروني', phone: 'الهاتف', interest: 'الدورة المطلوبة', message: 'هدفك', send: 'إرسال الطلب', success: 'شكراً. تم إعداد طلبك بنجاح.',
    footer: 'تدريب رقمي تطبيقي ومتاح بإشراف مدربين في تونس.', quickLinks: 'روابط', contact: 'اتصال', follow: 'تابعنا', rights: 'جميع الحقوق محفوظة.',
    courseTitle: 'تفاصيل الدورة', courseIncludes: 'يتضمن هذا البرنامج', close: 'إغلاق',
    privacy: 'الخصوصية', privacyCopy: 'المعلومات المدخلة في هذا النموذج لا تغادر هذه الصفحة في النسخة التجريبية.',
  },
};

export const categories: { id: string; icon: LucideIcon; title: Localized; description: Localized }[] = [
  { id: 'web', icon: Code2, title: { fr: 'Développement web', en: 'Web development', ar: 'تطوير الويب' }, description: { fr: 'Concevoir des interfaces et applications web modernes.', en: 'Build modern web interfaces and applications.', ar: 'تصميم واجهات وتطبيقات ويب حديثة.' } },
  { id: 'mobile', icon: Smartphone, title: { fr: 'Développement mobile', en: 'Mobile development', ar: 'تطوير الجوال' }, description: { fr: 'Créer des applications mobiles utiles et performantes.', en: 'Create useful, reliable mobile applications.', ar: 'إنشاء تطبيقات جوال عملية وموثوقة.' } },
  { id: 'data', icon: BarChart3, title: { fr: 'Data & analyse', en: 'Data & analytics', ar: 'البيانات والتحليل' }, description: { fr: 'Comprendre, analyser et présenter les données.', en: 'Understand, analyse and present data.', ar: 'فهم البيانات وتحليلها وعرضها.' } },
  { id: 'ai', icon: BrainCircuit, title: { fr: 'Intelligence artificielle', en: 'Artificial intelligence', ar: 'الذكاء الاصطناعي' }, description: { fr: 'Apprendre les bases du machine learning par la pratique.', en: 'Learn machine learning fundamentals through practice.', ar: 'تعلم أساسيات تعلم الآلة بالتطبيق.' } },
  { id: 'design', icon: Palette, title: { fr: 'Design UI/UX', en: 'UI/UX design', ar: 'تصميم UI/UX' }, description: { fr: 'Créer des expériences numériques simples et cohérentes.', en: 'Create simple, coherent digital experiences.', ar: 'إنشاء تجارب رقمية بسيطة ومتناسقة.' } },
  { id: 'software', icon: Braces, title: { fr: 'Ingénierie logicielle', en: 'Software engineering', ar: 'هندسة البرمجيات' }, description: { fr: 'Structurer des logiciels robustes et maintenables.', en: 'Structure robust, maintainable software.', ar: 'بناء برمجيات قوية وقابلة للصيانة.' } },
];

export type Course = {
  id: string; category: string; title: Localized; description: Localized; level: Localized; duration: Localized; format: Localized; tone: string; icon: LucideIcon; modules: Localized[];
};

export const courses: Course[] = [
  { id: 'fullstack', category: 'web', icon: Code2, title: { fr: 'Développement Web Full Stack', en: 'Full-Stack Web Development', ar: 'تطوير الويب Full Stack' }, description: { fr: 'Du HTML à React et Node.js, construisez une application web complète.', en: 'From HTML to React and Node.js, build a complete web application.', ar: 'من HTML إلى React وNode.js، أنشئ تطبيق ويب متكاملاً.' }, level: { fr: 'Débutant', en: 'Beginner', ar: 'مبتدئ' }, duration: { fr: '16 semaines', en: '16 weeks', ar: '16 أسبوعاً' }, format: { fr: 'Présentiel / hybride', en: 'On-site / hybrid', ar: 'حضوري / هجين' }, tone: 'blue', modules: [ { fr: 'Fondamentaux du web', en: 'Web fundamentals', ar: 'أساسيات الويب' }, { fr: 'Interfaces avec React', en: 'React interfaces', ar: 'واجهات React' }, { fr: 'API et bases de données', en: 'APIs and databases', ar: 'واجهات API وقواعد البيانات' } ] },
  { id: 'data', category: 'data', icon: BarChart3, title: { fr: 'Data Analytics avec Python', en: 'Data Analytics with Python', ar: 'تحليل البيانات بـ Python' }, description: { fr: 'Nettoyez, analysez et présentez des données pour guider la décision.', en: 'Clean, analyse and present data to support decisions.', ar: 'نظّف البيانات وحللها واعرضها لدعم القرار.' }, level: { fr: 'Intermédiaire', en: 'Intermediate', ar: 'متوسط' }, duration: { fr: '10 semaines', en: '10 weeks', ar: '10 أسابيع' }, format: { fr: 'Hybride', en: 'Hybrid', ar: 'هجين' }, tone: 'teal', modules: [ { fr: 'Python pour la data', en: 'Python for data', ar: 'Python للبيانات' }, { fr: 'Analyse et visualisation', en: 'Analysis and visualisation', ar: 'التحليل والتصور' }, { fr: 'Projet d’analyse', en: 'Analytics project', ar: 'مشروع تحليلي' } ] },
  { id: 'ux', category: 'design', icon: Palette, title: { fr: 'Design UI/UX', en: 'UI/UX Design', ar: 'تصميم UI/UX' }, description: { fr: 'Passez de la recherche utilisateur à un prototype clair et testable.', en: 'Move from user research to a clear, testable prototype.', ar: 'انتقل من بحث المستخدم إلى نموذج واضح وقابل للاختبار.' }, level: { fr: 'Tous niveaux', en: 'All levels', ar: 'كل المستويات' }, duration: { fr: '8 semaines', en: '8 weeks', ar: '8 أسابيع' }, format: { fr: 'Présentiel', en: 'On-site', ar: 'حضوري' }, tone: 'sand', modules: [ { fr: 'Recherche et parcours', en: 'Research and journeys', ar: 'البحث والمسارات' }, { fr: 'Wireframes et interface', en: 'Wireframes and interface', ar: 'المخططات والواجهات' }, { fr: 'Prototype et tests', en: 'Prototype and testing', ar: 'النموذج والاختبار' } ] },
  { id: 'mobile', category: 'mobile', icon: Smartphone, title: { fr: 'Applications mobiles avec Flutter', en: 'Mobile Apps with Flutter', ar: 'تطبيقات الجوال بـ Flutter' }, description: { fr: 'Développez une application multiplateforme, de l’idée à la publication.', en: 'Develop a cross-platform app, from idea to release.', ar: 'طوّر تطبيقاً متعدد المنصات من الفكرة إلى النشر.' }, level: { fr: 'Intermédiaire', en: 'Intermediate', ar: 'متوسط' }, duration: { fr: '12 semaines', en: '12 weeks', ar: '12 أسبوعاً' }, format: { fr: 'Hybride', en: 'Hybrid', ar: 'هجين' }, tone: 'purple', modules: [ { fr: 'Dart et composants', en: 'Dart and components', ar: 'Dart والمكونات' }, { fr: 'Données et navigation', en: 'Data and navigation', ar: 'البيانات والتنقل' }, { fr: 'Projet mobile', en: 'Mobile project', ar: 'مشروع جوال' } ] },
];
