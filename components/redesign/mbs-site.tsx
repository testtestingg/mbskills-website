'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight, BookOpenCheck, Check, ChevronDown, GraduationCap, Headphones,
  Instagram, Linkedin, Mail, MapPin, Menu, Phone, Quote, Target, Users, X,
} from 'lucide-react';
import { CourseCard } from './course-card';
import { Button, Logo, Modal, SectionHeader } from './ui';
import { categories, copy, courses, type Course, type Language } from './content';

const benefits = [
  { icon: GraduationCap, title: { fr: 'Des formateurs disponibles', en: 'Available instructors', ar: 'مدربون متاحون' }, text: { fr: 'Des explications claires et des retours sur votre travail.', en: 'Clear explanations and useful feedback on your work.', ar: 'شرح واضح وملاحظات مفيدة على عملك.' } },
  { icon: Target, title: { fr: 'Des projets qui ont du sens', en: 'Projects with purpose', ar: 'مشاريع هادفة' }, text: { fr: 'Vous appliquez chaque notion dans des exercices progressifs.', en: 'Apply every concept through progressive exercises.', ar: 'تطبّق كل مفهوم من خلال تمارين تدريجية.' } },
  { icon: Headphones, title: { fr: 'Un suivi régulier', en: 'Regular support', ar: 'متابعة منتظمة' }, text: { fr: 'Des points d’étape pour identifier vos acquis et vos blocages.', en: 'Checkpoints to identify progress and roadblocks.', ar: 'محطات متابعة لتحديد التقدم والصعوبات.' } },
  { icon: Users, title: { fr: 'Des formats flexibles', en: 'Flexible formats', ar: 'صيغ مرنة' }, text: { fr: 'Des sessions en présentiel et hybrides selon le programme.', en: 'On-site and hybrid sessions depending on the program.', ar: 'جلسات حضورية وهجينة حسب البرنامج.' } },
];

const steps = [
  { n: '01', title: { fr: 'Choisissez votre parcours', en: 'Choose your path', ar: 'اختر مسارك' }, text: { fr: 'Nous clarifions votre niveau, votre disponibilité et votre objectif.', en: 'We clarify your level, schedule and goal.', ar: 'نحدد مستواك ووقتك وهدفك.' } },
  { n: '02', title: { fr: 'Apprenez avec un formateur', en: 'Learn with an instructor', ar: 'تعلّم مع مدرب' }, text: { fr: 'Chaque session alterne explication, démonstration et pratique.', en: 'Each session blends explanation, demonstration and practice.', ar: 'تمزج كل جلسة بين الشرح والعرض والتطبيق.' } },
  { n: '03', title: { fr: 'Construisez un projet', en: 'Build a project', ar: 'أنجز مشروعاً' }, text: { fr: 'Vous consolidez les acquis dans une réalisation présentable.', en: 'Consolidate your skills in a project you can present.', ar: 'ترسّخ مهاراتك في مشروع يمكنك عرضه.' } },
  { n: '04', title: { fr: 'Faites le point', en: 'Review your progress', ar: 'قيّم تقدمك' }, text: { fr: 'Vous repartez avec des retours et une feuille de route pour la suite.', en: 'Leave with feedback and a roadmap for what comes next.', ar: 'تحصل على ملاحظات وخارطة طريق للمرحلة التالية.' } },
];

const testimonials = [
  { name: 'Sarah Ben Ali', role: { fr: 'Développement web', en: 'Web development', ar: 'تطوير الويب' }, quote: { fr: 'Le rythme était exigeant mais clair. Le projet final m’a surtout permis de comprendre comment relier toutes les notions.', en: 'The pace was demanding but clear. The final project helped me connect every concept.', ar: 'كان الإيقاع جدياً وواضحاً، وساعدني المشروع النهائي على ربط كل المفاهيم.' } },
  { name: 'Mohamed Trabelsi', role: { fr: 'Data analytics', en: 'Data analytics', ar: 'تحليل البيانات' }, quote: { fr: 'J’ai apprécié les exercices progressifs et la disponibilité du formateur quand un concept n’était pas encore acquis.', en: 'I valued the progressive exercises and the instructor’s availability when a concept was not yet clear.', ar: 'أعجبتني التمارين التدريجية وتوفر المدرب عندما لم يكن المفهوم واضحاً.' } },
  { name: 'Leila Karray', role: { fr: 'Design UI/UX', en: 'UI/UX design', ar: 'تصميم UI/UX' }, quote: { fr: 'La formation m’a donné une méthode de travail, pas seulement une liste d’outils. C’est ce qui m’a été le plus utile.', en: 'The course gave me a working method, not just a list of tools. That was the most useful part.', ar: 'منحتني الدورة منهج عمل وليس مجرد قائمة أدوات، وهذا كان الأكثر فائدة.' } },
];

function App() {
  const [language, setLanguage] = useState<Language>(() => typeof window === 'undefined' ? 'fr' : (localStorage.getItem('mbs-language') as Language) || 'fr');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const t = copy[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('mbs-language', language);
  }, [language]);

  const filteredCourses = useMemo(() => activeCategory === 'all' ? courses : courses.filter((course) => course.category === activeCategory), [activeCategory]);
  const goTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); };
  const openContact = () => { setSubmitted(false); setContactOpen(true); setMenuOpen(false); };

  return (
    <div id="top" className="site-shell">
      <a className="skip-link" href="#main">Aller au contenu</a>
      <header className="site-header">
        <div className="container header__inner">
          <Logo />
          <nav className={`nav ${menuOpen ? 'nav--open' : ''}`} aria-label="Navigation principale">
            <button onClick={() => goTo('courses')}>{t.navCourses}</button>
            <button onClick={() => goTo('method')}>{t.navMethod}</button>
            <button onClick={() => goTo('about')}>{t.navAbout}</button>
            <button onClick={() => goTo('reviews')}>{t.navReviews}</button>
          </nav>
          <div className="header__actions">
            <label className="language-select">
              <span className="sr-only">Langue</span>
              <select value={language} onChange={(event) => setLanguage(event.target.value as Language)} aria-label="Choisir la langue">
                <option value="fr">FR</option><option value="en">EN</option><option value="ar">AR</option>
              </select>
              <ChevronDown size={14} aria-hidden="true" />
            </label>
            <Button className="header__cta" onClick={openContact}>{t.navContact}</Button>
            <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero section">
          <div className="container hero__grid">
            <div className="hero__content reveal">
              <span className="eyebrow">{t.heroEyebrow}</span>
              <h1>{t.heroTitle}</h1>
              <p>{t.heroCopy}</p>
              <div className="hero__actions">
                <Button onClick={() => goTo('courses')}>{t.explore}<ArrowRight size={18} /></Button>
                <Button variant="secondary" onClick={openContact}>{t.talk}</Button>
              </div>
              <div className="hero__proof">
                {[t.practical, t.instructorLed, t.smallGroups].map((item) => <span key={item}><Check size={16} />{item}</span>)}
              </div>
            </div>
            <div className="hero-panel reveal reveal--delay" aria-label="Aperçu des prochaines formations">
              <div className="hero-panel__top">
                <div><span>{t.nextSession}</span><strong>{t.openRegistration}</strong></div>
                <span className="status-dot">JUL</span>
              </div>
              <div className="session-list">
                {courses.slice(0, 3).map((course) => {
                  const Icon = course.icon;
                  return <button key={course.id} onClick={() => setSelectedCourse(course)} className="session-row"><span className={`session-row__icon session-row__icon--${course.tone}`}><Icon size={21} /></span><span><strong>{course.title[language]}</strong><small>{course.duration[language]} · {course.format[language]}</small></span><ArrowRight size={17} /></button>;
                })}
              </div>
              <div className="hero-panel__footer"><span><BookOpenCheck size={18} /> {t.certificate}</span><strong>MBS Skills</strong></div>
            </div>
          </div>
        </section>

        <section className="stats-band" aria-label={t.statsTitle}>
          <div className="container stats-grid">
            <div className="stats-intro"><span className="eyebrow eyebrow--light">{t.statsEyebrow}</span><h2>{t.statsTitle}</h2></div>
            {[
              ['6', language === 'ar' ? 'مجالات تدريب' : language === 'en' ? 'training fields' : 'domaines de formation'],
              ['3', language === 'ar' ? 'صيغ تعلم' : language === 'en' ? 'learning formats' : 'formats d’apprentissage'],
              ['4', language === 'ar' ? 'مراحل واضحة' : language === 'en' ? 'clear learning steps' : 'étapes claires'],
              ['3', language === 'ar' ? 'لغات متاحة' : language === 'en' ? 'available languages' : 'langues disponibles'],
            ].map(([number, label]) => <div className="stat" key={label}><strong>{number}</strong><span>{label}</span></div>)}
          </div>
        </section>

        <section id="courses" className="section section--soft">
          <div className="container">
            <SectionHeader eyebrow={t.categoryEyebrow} title={t.categoryTitle} copy={t.categoryCopy} />
            <div className="category-grid">
              {categories.map((category) => { const Icon = category.icon; return <button key={category.id} className="category-card" onClick={() => { setActiveCategory(category.id); document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' }); }}><span className="category-card__icon"><Icon size={24} /></span><h3>{category.title[language]}</h3><p>{category.description[language]}</p><span>{t.discover}<ArrowRight size={16} /></span></button>; })}
            </div>
          </div>
        </section>

        <section id="programs" className="section">
          <div className="container">
            <div className="programs-head"><SectionHeader eyebrow={t.featuredEyebrow} title={t.featuredTitle} copy={t.featuredCopy} /><div className="filters" role="group" aria-label="Filtrer les formations"><button className={activeCategory === 'all' ? 'active' : ''} onClick={() => setActiveCategory('all')}>{t.all}</button>{categories.slice(0, 5).map((category) => <button key={category.id} className={activeCategory === category.id ? 'active' : ''} onClick={() => setActiveCategory(category.id)}>{category.title[language]}</button>)}</div></div>
            <div className="course-grid">
              {filteredCourses.length ? filteredCourses.map((course) => <CourseCard key={course.id} course={course} language={language} labels={{ duration: t.duration, format: t.format, level: t.level, details: t.details }} onOpen={() => setSelectedCourse(course)} />) : <div className="empty-state">{language === 'ar' ? 'سيتم نشر هذا البرنامج قريباً.' : language === 'en' ? 'This program will be published soon.' : 'Ce programme sera publié prochainement.'}</div>}
            </div>
          </div>
        </section>

        <section id="about" className="section section--navy">
          <div className="container why-grid">
            <div><SectionHeader eyebrow={t.whyEyebrow} title={t.whyTitle} copy={t.whyCopy} /></div>
            <div className="benefit-grid">{benefits.map(({ icon: Icon, title, text }) => <article className="benefit" key={title.fr}><Icon size={23} /><h3>{title[language]}</h3><p>{text[language]}</p></article>)}</div>
          </div>
        </section>

        <section id="method" className="section method">
          <div className="container"><SectionHeader eyebrow={t.methodEyebrow} title={t.methodTitle} align="center" /><div className="steps">{steps.map((step) => <article className="step" key={step.n}><span>{step.n}</span><h3>{step.title[language]}</h3><p>{step.text[language]}</p></article>)}</div></div>
        </section>

        <section id="reviews" className="section section--soft">
          <div className="container"><SectionHeader eyebrow={t.testimonialEyebrow} title={t.testimonialTitle} /><div className="testimonial-grid">{testimonials.map((testimonial) => <article className="testimonial" key={testimonial.name}><Quote size={24} /><blockquote>“{testimonial.quote[language]}”</blockquote><footer><span className="avatar">{testimonial.name.split(' ').map((word) => word[0]).slice(0, 2).join('')}</span><div><strong>{testimonial.name}</strong><small>{testimonial.role[language]}</small></div></footer></article>)}</div></div>
        </section>

        <section className="section cta-section">
          <div className="container cta-box"><div><h2>{t.ctaTitle}</h2><p>{t.ctaCopy}</p></div><Button onClick={openContact}>{t.talk}<ArrowRight size={18} /></Button></div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__grid">
          <div><Logo inverse /><p>{t.footer}</p></div>
          <div><h3>{t.quickLinks}</h3><button onClick={() => goTo('courses')}>{t.navCourses}</button><button onClick={() => goTo('method')}>{t.navMethod}</button><button onClick={() => goTo('about')}>{t.navAbout}</button></div>
          <div><h3>{t.contact}</h3><a href="mailto:contact@mbskills.tn"><Mail size={16} />contact@mbskills.tn</a><a href="tel:+21620497239"><Phone size={16} />+216 20 497 239</a><span><MapPin size={16} />Tunis, Tunisie</span></div>
          <div><h3>{t.follow}</h3><div className="socials"><a href="https://www.instagram.com/mbskills/" aria-label="Instagram"><Instagram /></a><a href="https://linkedin.com/company/mbskills/" aria-label="LinkedIn"><Linkedin /></a></div></div>
        </div>
        <div className="container footer__bottom"><span>© {new Date().getFullYear()} MBS Skills. {t.rights}</span><button>{t.privacy}</button></div>
      </footer>

      {selectedCourse && <Modal title={selectedCourse.title[language]} onClose={() => setSelectedCourse(null)}><div className="course-detail"><p>{selectedCourse.description[language]}</p><dl><div><dt>{t.duration}</dt><dd>{selectedCourse.duration[language]}</dd></div><div><dt>{t.format}</dt><dd>{selectedCourse.format[language]}</dd></div><div><dt>{t.level}</dt><dd>{selectedCourse.level[language]}</dd></div></dl><h3>{t.courseIncludes}</h3><ul>{selectedCourse.modules.map((module) => <li key={module.fr}><Check size={17} />{module[language]}</li>)}</ul><Button onClick={() => { setSelectedCourse(null); openContact(); }}>{t.talk}</Button></div></Modal>}
      {contactOpen && <Modal title={t.contactTitle} onClose={() => setContactOpen(false)}>{submitted ? <div className="success-state"><span><Check size={30} /></span><h3>{t.success}</h3><p>{t.privacyCopy}</p><Button onClick={() => setContactOpen(false)}>{t.close}</Button></div> : <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><p>{t.contactCopy}</p><div className="form-row"><label>{t.name}<input name="name" required autoComplete="name" /></label><label>{t.email}<input name="email" type="email" required autoComplete="email" /></label></div><div className="form-row"><label>{t.phone}<input name="phone" type="tel" autoComplete="tel" /></label><label>{t.interest}<select name="course" defaultValue=""><option value="" disabled>—</option>{courses.map((course) => <option key={course.id}>{course.title[language]}</option>)}</select></label></div><label>{t.message}<textarea name="message" rows={4} required /></label><Button type="submit">{t.send}<ArrowRight size={18} /></Button><small>{t.privacyCopy}</small></form>}</Modal>}
    </div>
  );
}

export default App;
