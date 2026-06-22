import { ArrowUpRight, Clock3, MapPin, Signal } from 'lucide-react';
import type { Course, Language } from './content';

export function CourseCard({ course, language, labels, onOpen }: { course: Course; language: Language; labels: Record<string, string>; onOpen: () => void }) {
  const Icon = course.icon;
  return (
    <article className="course-card">
      <div className={`course-card__visual course-card__visual--${course.tone}`}>
        <span className="course-card__icon"><Icon size={28} /></span>
        <span className="course-card__code">MBS / {course.category.toUpperCase()}</span>
      </div>
      <div className="course-card__body">
        <h3>{course.title[language]}</h3>
        <p>{course.description[language]}</p>
        <dl className="course-meta">
          <div><Clock3 size={16} /><dt>{labels.duration}</dt><dd>{course.duration[language]}</dd></div>
          <div><MapPin size={16} /><dt>{labels.format}</dt><dd>{course.format[language]}</dd></div>
          <div><Signal size={16} /><dt>{labels.level}</dt><dd>{course.level[language]}</dd></div>
        </dl>
        <button className="course-card__link" onClick={onOpen}>{labels.details} <ArrowUpRight size={17} /></button>
      </div>
    </article>
  );
}
