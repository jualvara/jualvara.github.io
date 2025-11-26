import React, { useEffect, useRef, useState } from 'react';
import { EDUCATION } from '../constants';
import { GraduationCap } from 'lucide-react';

const Education: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="education" ref={sectionRef} className="py-24 bg-dark/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className={`text-3xl font-bold text-white mb-12 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        Formación Académica
                    </span>
                </h2>

                <div className="max-w-3xl mx-auto">
                    <div className="space-y-8 relative border-l border-slate-800 ml-3 pl-8">
                        {EDUCATION.map((edu, index) => (
                            <div
                                key={index}
                                className={`relative group transition-all duration-700 ease-out`}
                                style={{ transitionDelay: `${index * 100}ms`, opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(20px)' }}
                            >
                                <span className="absolute -left-[41px] top-1 h-6 w-6 rounded-full bg-dark border-2 border-primary flex items-center justify-center z-10">
                                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                                </span>
                                <div className="mb-1">
                                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{edu.degree}</h3>
                                    <div className="text-primary font-medium">{edu.school}</div>
                                </div>
                                <div className="text-sm text-slate-500 mb-3 flex items-center gap-2">
                                    <GraduationCap size={14} />
                                    {edu.period}
                                </div>
                                {edu.description && (
                                    <p className="text-slate-400">
                                        {edu.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
