import React, { useEffect, useRef, useState } from 'react';
import { LANGUAGES } from '../constants';
import { Languages as LanguagesIcon } from 'lucide-react';

const Languages: React.FC = () => {
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
        <section id="languages" ref={sectionRef} className="py-24 bg-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className={`text-3xl font-bold text-white mb-12 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        Idiomas
                    </span>
                </h2>

                <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    {LANGUAGES.map((lang, index) => (
                        <div
                            key={index}
                            className={`bg-slate-900/50 p-6 rounded-xl border border-slate-800 hover:border-primary/50 transition-all duration-500 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    <LanguagesIcon size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">{lang.name}</h3>
                                    <p className="text-slate-400">{lang.level}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Languages;
