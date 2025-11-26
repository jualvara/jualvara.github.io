import React, { useEffect, useRef, useState } from 'react';
import { PROCESS_STEPS } from '../constants';
import { Database, BrainCircuit, Box, ArrowRight } from 'lucide-react';

const ProcessPipeline: React.FC = () => {
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

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'Database': return <Database size={32} />;
            case 'BrainCircuit': return <BrainCircuit size={32} />;
            case 'Box': return <Box size={32} />;
            default: return <Database size={32} />;
        }
    };

    return (
        <section id="process" ref={sectionRef} className="py-24 bg-dark relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <h2 className={`text-3xl font-bold text-white mb-16 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        Mi Proceso de Trabajo
                    </span>
                </h2>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 z-0">
                        <div
                            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1500 ease-out"
                            style={{ width: isVisible ? '100%' : '0%' }}
                        ></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
                        {PROCESS_STEPS.map((step, index) => (
                            <div
                                key={index}
                                className={`relative flex flex-col items-center text-center transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 300}ms` }}
                            >
                                {/* Step Circle */}
                                <div className="w-20 h-20 rounded-full bg-dark border-4 border-slate-800 flex items-center justify-center mb-6 relative z-10 group hover:border-primary transition-colors duration-300 shadow-xl">
                                    <div className="text-slate-400 group-hover:text-primary transition-colors duration-300">
                                        {getIcon(step.icon)}
                                    </div>
                                    {/* Pulse Effect */}
                                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                {/* Content Card */}
                                <div className="bg-slate-900/80 backdrop-blur-sm p-6 rounded-xl border border-slate-800 hover:border-primary/50 transition-all duration-300 w-full hover:-translate-y-2 shadow-lg">
                                    <div className="text-xs font-bold text-primary tracking-wider mb-1 uppercase">{step.title}</div>
                                    <h3 className="text-xl font-bold text-white mb-3">{step.subtitle}</h3>
                                    <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                                        {step.description}
                                    </p>

                                    <div className="flex flex-wrap justify-center gap-2 mt-auto">
                                        {step.tags.map((tag, i) => (
                                            <span key={i} className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded-md border border-slate-700">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Mobile Arrow */}
                                {index < PROCESS_STEPS.length - 1 && (
                                    <div className="lg:hidden mt-8 text-slate-600 animate-bounce">
                                        <ArrowRight className="rotate-90" size={24} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProcessPipeline;
