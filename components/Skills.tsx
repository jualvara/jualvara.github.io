import React, { useEffect, useRef, useState } from 'react';
import { DETAILED_SKILLS, EXPERIENCE } from '../constants';
import { Briefcase, Settings, Database, BarChart, Server, Wrench, CheckCircle2 } from 'lucide-react';

const Skills: React.FC = () => {
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
      case 'Settings': return <Settings size={24} />;
      case 'Database': return <Database size={24} />;
      case 'BarChart': return <BarChart size={24} />;
      case 'Server': return <Server size={24} />;
      case 'Wrench': return <Wrench size={24} />;
      default: return <Settings size={24} />;
    }
  };

  return (
    <section id="skills" ref={sectionRef} className="py-24 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Skills Column */}
          <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Habilidades Técnicas
              </span>
            </h2>
            <div className="space-y-6">
              {DETAILED_SKILLS.map((category, index) => (
                <div key={index} className="bg-slate-900/50 rounded-xl border border-slate-800 p-6 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-primary">
                      {getIcon(category.icon)}
                    </div>
                    <h3 className="text-xl font-bold text-white">{category.title}</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {category.skills.map((skill, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-slate-400 text-sm">
                        <CheckCircle2 size={16} className="text-secondary mt-0.5 shrink-0" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Column */}
          <div id="experience" className={`transition-all duration-1000 delay-300 ease-out transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              Experiencia Laboral
            </h2>
            <div className="space-y-8 relative border-l border-slate-800 ml-3 pl-8">
              {EXPERIENCE.map((exp, index) => (
                <div key={index} className="relative group">
                  <span className="absolute -left-[41px] top-1 h-6 w-6 rounded-full bg-dark border-2 border-primary flex items-center justify-center z-10">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  </span>
                  <div className="mb-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{exp.role}</h3>
                    <div className="text-primary font-medium">{exp.company}</div>
                  </div>
                  <div className="text-sm text-slate-500 mb-3 flex items-center gap-2">
                    <Briefcase size={14} />
                    {exp.period}
                  </div>
                  <p className="text-slate-400">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;