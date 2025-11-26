import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, Database, BarChart3, Code2, Settings, CheckCircle2, ArrowRight, Lightbulb, AlertCircle } from 'lucide-react';
import { PROJECTS, CATEGORY_INTROS } from '../constants';
import { ProjectCategory } from '../types';

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'Todas'>('Todas');
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

  const categories: { id: ProjectCategory | 'Todas'; label: string; icon: React.ReactNode }[] = [
    { id: 'Todas', label: 'Todo', icon: null },
    { id: 'Odoo', label: 'Odoo ERP', icon: <Settings size={16} /> },
    { id: 'Data Science', label: 'Data Science', icon: <Database size={16} /> },
    { id: 'Business Intelligence', label: 'BI & Analytics', icon: <BarChart3 size={16} /> },
    { id: 'Developer', label: 'Development', icon: <Code2 size={16} /> },
  ];

  const filteredProjects = activeCategory === 'Todas'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  const categoryIntro = activeCategory !== 'Todas' ? CATEGORY_INTROS[activeCategory] : null;

  return (
    <section id="projects" ref={sectionRef} className="py-24 bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Stagger 1 */}
        <div className={`text-center mb-12 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Portafolio de Proyectos</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Explora mi trabajo organizado por áreas de especialización.
          </p>
        </div>

        {/* Category Tabs - Stagger 2 */}
        <div className={`flex flex-wrap justify-center gap-2 mb-12 transition-all duration-700 delay-200 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-105'
                  : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/80 hover:text-white border border-slate-700/50'
                }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Category Introduction - Shows only when a specific category is selected */}
        {categoryIntro && (
          <div className="mb-12 bg-gradient-to-br from-slate-900/80 to-slate-800/60 rounded-2xl border border-slate-700/50 p-8 backdrop-blur-sm">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-primary/20 rounded-xl">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">{categoryIntro.title}</h3>
                <p className="text-slate-300 leading-relaxed">{categoryIntro.description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              {/* Key Points */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  Puntos Clave
                </h4>
                <ul className="space-y-2">
                  {categoryIntro.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <ArrowRight size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <AlertCircle size={16} />
                  Retos Comunes
                </h4>
                <ul className="space-y-2">
                  {categoryIntro.challenges.map((challenge, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <ArrowRight size={16} className="text-amber-400 mt-0.5 flex-shrink-0" />
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Technologies */}
            <div className="mt-6 pt-6 border-t border-slate-700/50">
              <h4 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">Tecnologías</h4>
              <div className="flex flex-wrap gap-2">
                {categoryIntro.technologies.map((tech) => (
                  <span key={tech} className="px-3 py-1.5 text-xs font-medium bg-slate-800/80 text-slate-200 rounded-lg border border-slate-700">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Projects - Pipeline view for selected category, Grid for "Todas" */}
        {activeCategory !== 'Todas' ? (
          /* Pipeline Layout */
          <div className="space-y-8">
            <h3 className="text-xl font-bold text-white text-center mb-8">
              Flujo de Proyectos
            </h3>
            {filteredProjects.map((project, index) => (
              <div key={project.id} className="relative">
                {/* Connector Line */}
                {index < filteredProjects.length - 1 && (
                  <div className="absolute left-1/2 bottom-0 w-0.5 h-8 bg-gradient-to-b from-primary to-transparent transform translate-y-full -translate-x-1/2 z-0" />
                )}

                {/* Project Card in Pipeline */}
                <div className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/10">
                  <div className="md:flex">
                    {/* Image Container */}
                    <div className="relative md:w-2/5 h-64 md:h-auto overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent opacity-80 z-10" />
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Step Number */}
                      <div className="absolute top-4 left-4 z-20">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {index + 1}
                        </div>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.githubUrl && (
                          <a href={project.githubUrl} className="p-2 bg-slate-950/80 rounded-full text-white hover:bg-primary transition-colors" title="Ver código">
                            <Github size={20} />
                          </a>
                        )}
                        {project.demoUrl && (
                          <a href={project.demoUrl} className="p-2 bg-slate-950/80 rounded-full text-white hover:bg-primary transition-colors" title="Ver demo">
                            <ExternalLink size={20} />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:w-3/5 flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                      <p className="text-slate-300 mb-4 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 rounded-md border border-slate-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Grid Layout for "Todas" */
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 transition-all duration-1000 delay-300 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {filteredProjects.map((project) => (
              <div key={project.id} className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/10">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80 z-10" />
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full border backdrop-blur-md ${project.category === 'Odoo' ? 'bg-[#714B67]/40 border-[#714B67]/50 text-[#E0B0D0]' :
                        project.category === 'Data Science' ? 'bg-emerald-500/30 border-emerald-500/50 text-emerald-300' :
                          project.category === 'Business Intelligence' ? 'bg-amber-500/30 border-amber-500/50 text-amber-300' :
                            'bg-blue-500/30 border-blue-500/50 text-blue-300'
                      }`}>
                      {project.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.githubUrl && (
                      <a href={project.githubUrl} className="p-2 bg-slate-950/80 rounded-full text-white hover:bg-primary transition-colors" title="Ver código">
                        <Github size={20} />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a href={project.demoUrl} className="p-2 bg-slate-950/80 rounded-full text-white hover:bg-primary transition-colors" title="Ver demo">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-slate-400 mb-4 line-clamp-2 h-10">{project.description}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 text-xs font-medium text-slate-300 bg-slate-800 rounded-md border border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-slate-500 animate-fade-in-up">
            No hay proyectos para mostrar en esta categoría por el momento.
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;