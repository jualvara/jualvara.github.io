import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, Database, BarChart3, Code2, Settings, CheckCircle2, ArrowRight, Lightbulb, AlertCircle, ChevronDown } from 'lucide-react';
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

  // Group projects by category for "Todas" view
  const projectsByCategory = activeCategory === 'Todas'
    ? categories.slice(1).map(cat => ({
      category: cat.id as ProjectCategory,
      label: cat.label,
      icon: cat.icon,
      projects: PROJECTS.filter(p => p.category === cat.id)
    })).filter(group => group.projects.length > 0)
    : [];

  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getCategoryGradient = (category: ProjectCategory) => {
    switch (category) {
      case 'Odoo': return 'from-[#714B67] to-[#E0B0D0]';
      case 'Data Science': return 'from-emerald-500 to-teal-500';
      case 'Business Intelligence': return 'from-amber-500 to-orange-500';
      case 'Developer': return 'from-blue-500 to-cyan-500';
      default: return 'from-slate-500 to-slate-700';
    }
  };

  const getCategoryBadgeStyle = (category: ProjectCategory) => {
    switch (category) {
      case 'Odoo': return 'bg-[#714B67]/40 border-[#714B67]/50 text-[#E0B0D0]';
      case 'Data Science': return 'bg-emerald-500/30 border-emerald-500/50 text-emerald-300';
      case 'Business Intelligence': return 'bg-amber-500/30 border-amber-500/50 text-amber-300';
      case 'Developer': return 'bg-blue-500/30 border-blue-500/50 text-blue-300';
      default: return 'bg-slate-500/30 border-slate-500/50 text-slate-300';
    }
  };

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

        {/* Unified Category Navigation - Stagger 2 */}
        <div className={`flex flex-wrap justify-center gap-2 mb-12 transition-all duration-700 delay-200 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Todo button */}
          <button
            onClick={() => setActiveCategory('Todas')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === 'Todas'
              ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-105'
              : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/80 hover:text-white border border-slate-700/50'
              }`}
          >
            Todo
          </button>

          {/* Category buttons with counters */}
          {categories.slice(1).map((cat) => {
            const projectCount = PROJECTS.filter(p => p.category === cat.id).length;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-105'
                  : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/80 hover:text-white border border-slate-700/50'
                  }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
                {projectCount > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-700 text-slate-300'
                    }`}>
                    {projectCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Category Introduction - Shows only when a specific category is selected */}
        {categoryIntro && (
          <div className={`mb-12 rounded-2xl border backdrop-blur-sm relative overflow-hidden ${activeCategory !== 'Odoo'
            ? 'bg-gradient-to-br from-amber-900/10 to-slate-800/60 border-amber-500/30'
            : 'bg-gradient-to-br from-slate-900/80 to-slate-800/60 border-slate-700/50'
            }`}>
            {/* Overlay pattern for "En construcción" categories */}
            {activeCategory !== 'Odoo' && (
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(251,191,36,0.03)_25%,rgba(251,191,36,0.03)_50%,transparent_50%,transparent_75%,rgba(251,191,36,0.03)_75%,rgba(251,191,36,0.03))] bg-[length:20px_20px] pointer-events-none" />
            )}

            <div className="relative z-10 p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className={`p-3 rounded-xl ${activeCategory !== 'Odoo'
                  ? 'bg-amber-500/20'
                  : 'bg-primary/20'
                  }`}>
                  <Lightbulb className={`w-6 h-6 ${activeCategory !== 'Odoo'
                    ? 'text-amber-400'
                    : 'text-primary'
                    }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-white">{categoryIntro.title}</h3>
                    {activeCategory !== 'Odoo' && (
                      <span className="px-4 py-1.5 bg-amber-500/30 border-2 border-amber-500/50 text-amber-200 text-sm font-bold rounded-full shadow-lg backdrop-blur-md flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-300"></span>
                        </span>
                        En Construcción
                      </span>
                    )}
                  </div>
                  <p className="text-slate-300 leading-relaxed">{categoryIntro.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                {/* Key Points */}
                <div className="space-y-3">
                  <h4 className={`text-sm font-semibold uppercase tracking-wider flex items-center gap-2 ${activeCategory !== 'Odoo' ? 'text-amber-400' : 'text-primary'
                    }`}>
                    <CheckCircle2 size={16} />
                    Puntos Clave
                  </h4>
                  <ul className="space-y-2">
                    {categoryIntro.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                        <ArrowRight size={16} className={`mt-0.5 flex-shrink-0 ${activeCategory !== 'Odoo' ? 'text-amber-400' : 'text-primary'
                          }`} />
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
          </div>
        )}

        {/* Projects Display */}
        {activeCategory === 'Todas' ? (
          /* Grouped by Category Layout for "Todas" */
          <div className="space-y-16">
            {projectsByCategory.map((group, groupIndex) => {
              // Odoo gets full display, others are grouped
              const isOdoo = group.category === 'Odoo';

              if (isOdoo) {
                // Show Odoo with full display
                return (
                  <div
                    key={group.category}
                    id={`category-${group.category}`}
                    className="scroll-mt-24"
                  >
                    {/* Category Header - Clickable */}
                    <div className={`flex items-center gap-4 mb-6 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                      style={{ transitionDelay: `${(groupIndex + 3) * 100}ms` }}>
                      <button
                        onClick={() => setActiveCategory(group.category)}
                        className={`flex items-center gap-3 px-5 py-3 bg-gradient-to-r ${getCategoryGradient(group.category)} rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group`}
                      >
                        <div className="text-white group-hover:scale-110 transition-transform">
                          {group.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white">{group.label}</h3>
                        <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                          {group.projects.length}
                        </span>
                        <span className="text-white/60 text-xs ml-1 group-hover:text-white/80 transition-colors">Ver detalles →</span>
                      </button>
                      <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent" />
                    </div>

                    {/* Projects List - Compact Diagram Style */}
                    <div className="space-y-3">
                      {group.projects.map((project, projIndex) => (
                        <div
                          key={project.id}
                          className="group"
                        >
                          {/* Compact Project Row */}
                          <button
                            onClick={() => setActiveCategory(group.category)}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all hover:shadow-md ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                              } bg-slate-900/40 backdrop-blur-sm border-slate-800 hover:border-primary/40 hover:bg-slate-900/60`}
                            style={{ transitionDelay: `${(groupIndex + 3) * 100 + projIndex * 100}ms` }}
                          >
                            {/* Project Icon/Number */}
                            <div className="flex-shrink-0 w-8 h-8 bg-slate-800 rounded flex items-center justify-center text-xs font-bold text-slate-400 border border-slate-700">
                              {projIndex + 1}
                            </div>

                            {/* Project Title */}
                            <div className="flex-1 text-left">
                              <h4 className="text-sm font-semibold text-white group-hover:text-primary transition-colors">
                                {project.title}
                              </h4>
                            </div>

                            {/* Tags - Compact */}
                            <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
                              {project.tags.slice(0, 2).map((tag) => (
                                <span key={tag} className="px-2 py-0.5 text-[9px] font-medium text-slate-400 bg-slate-800/60 rounded border border-slate-700/50">
                                  {tag}
                                </span>
                              ))}
                              {project.tags.length > 2 && (
                                <span className="text-[9px] text-slate-500">+{project.tags.length - 2}</span>
                              )}
                            </div>

                            {/* View Details Arrow */}
                            <div className="flex-shrink-0 text-slate-500 group-hover:text-primary transition-colors">
                              <ArrowRight size={16} />
                            </div>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              return null; // Other categories will be grouped below
            })}

            {/* Grouped "Other Specialties" - In Development */}
            {projectsByCategory.filter(g => g.category !== 'Odoo').length > 0 && (
              <div className="scroll-mt-24">
                {/* Compact grouped header */}
                <div className={`mb-4 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: '600ms' }}>
                  <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-amber-900/20 to-slate-800/40 border border-amber-500/20 rounded-xl backdrop-blur-sm">
                    <Lightbulb className="w-5 h-5 text-amber-400" />
                    <h3 className="text-lg font-bold text-white">Otras Especialidades</h3>
                    <span className="px-3 py-1 bg-amber-500/30 border border-amber-500/50 text-amber-200 text-xs font-bold rounded-full flex items-center gap-1.5">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-300"></span>
                      </span>
                      En Desarrollo
                    </span>
                    <span className="text-xs text-slate-400 ml-auto">Click para explorar →</span>
                  </div>
                </div>

                {/* Compact list of other categories */}
                <div className="grid md:grid-cols-3 gap-3">
                  {projectsByCategory.filter(g => g.category !== 'Odoo').map((group, idx) => (
                    <button
                      key={group.category}
                      onClick={() => setActiveCategory(group.category)}
                      className="group p-4 bg-slate-900/30 hover:bg-amber-900/10 border border-slate-800 hover:border-amber-500/30 rounded-lg transition-all hover:shadow-lg text-left"
                    >
                      <div className="flex items-start gap-3 mb-2">
                        <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400 group-hover:scale-110 transition-transform">
                          {group.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-white mb-1 group-hover:text-amber-400 transition-colors truncate">
                            {group.label}
                          </h4>
                          <p className="text-[10px] text-slate-500 line-clamp-1">
                            {group.projects.length} proyecto{group.projects.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-2">
                        <span>Ver introducción y proyectos</span>
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Pipeline Layout for specific category */
          <div className="space-y-8">
            <div className="flex items-center justify-center gap-3 mb-8">
              <h3 className="text-xl font-bold text-white text-center">
                Flujo de Proyectos
              </h3>
              {activeCategory !== 'Odoo' && (
                <span className="px-4 py-1.5 bg-amber-500/30 border-2 border-amber-500/50 text-amber-200 text-sm font-bold rounded-full shadow-lg backdrop-blur-md flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-300"></span>
                  </span>
                  En Construcción
                </span>
              )}
            </div>
            {filteredProjects.map((project, index) => (
              <div key={project.id} className="relative">
                {/* Connector Line */}
                {index < filteredProjects.length - 1 && (
                  <div className={`absolute left-1/2 bottom-0 w-0.5 h-8 bg-gradient-to-b transform translate-y-full -translate-x-1/2 z-0 ${activeCategory !== 'Odoo'
                    ? 'from-amber-500 to-transparent'
                    : 'from-primary to-transparent'
                    }`} />
                )}

                {/* Project Card in Pipeline */}
                <div className={`group relative rounded-2xl overflow-hidden border backdrop-blur-sm transition-all hover:shadow-2xl relative ${activeCategory !== 'Odoo'
                  ? 'bg-gradient-to-br from-amber-900/10 to-slate-800/60 border-amber-500/30 hover:shadow-amber-500/10'
                  : 'bg-slate-900 border-slate-800 hover:border-primary/50 hover:shadow-primary/10'
                  }`}>
                  {/* Overlay pattern for "En construcción" categories */}
                  {activeCategory !== 'Odoo' && (
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(251,191,36,0.03)_25%,rgba(251,191,36,0.03)_50%,transparent_50%,transparent_75%,rgba(251,191,36,0.03)_75%,rgba(251,191,36,0.03))] bg-[length:20px_20px] pointer-events-none z-0" />
                  )}

                  <div className="md:flex relative z-10">
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
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${activeCategory !== 'Odoo'
                          ? 'bg-amber-500'
                          : 'bg-primary'
                          }`}>
                          {index + 1}
                        </div>
                      </div>

                      {/* Action buttons now hidden on image - moved to content area */}
                    </div>

                    {/* Content */}
                    <div className="p-6 md:w-3/5 flex flex-col justify-center relative">
                      {/* Action Buttons - Prominent placement */}
                      <div className="absolute top-4 right-4 flex gap-2 z-30">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all shadow-lg hover:shadow-xl hover:scale-105 ${activeCategory !== 'Odoo'
                              ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700'
                              : 'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary'
                              }`}
                          >
                            <Github size={16} />
                            <span className="hidden sm:inline">Repositorio</span>
                          </a>
                        )}
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all shadow-lg hover:shadow-xl hover:scale-105 ${activeCategory !== 'Odoo'
                              ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                              : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                              }`}
                          >
                            <ExternalLink size={16} />
                            <span className="hidden sm:inline">Demo</span>
                          </a>
                        )}
                      </div>

                      {/* Logo and Title Section - For special Odoo projects */}
                      {activeCategory === 'Odoo' && project.id === 'odoo-everyone' ? (
                        <div className="flex items-center gap-4 mb-4 pr-32">
                          <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl p-2 border border-primary/20">
                            <img
                              src="/images/projects/odoo-everyone-logo-v2.png"
                              alt="Odoo for Everyone Logo"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                              {project.title}
                            </h3>
                            <p className="text-sm text-primary/70 font-medium">Interactive Learning Platform</p>
                          </div>
                        </div>
                      ) : activeCategory === 'Odoo' && project.id === 'crm-lead-scoring' ? (
                        <div className="flex items-center gap-4 mb-4 pr-32">
                          <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl p-2 border border-primary/20">
                            <img
                              src="/images/projects/crm-lead-scoring-logo.png"
                              alt="CRM Lead Scoring Logo"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                              {project.title}
                            </h3>
                            <p className="text-sm text-primary/70 font-medium">Odoo 18 Community Module</p>
                          </div>
                        </div>
                      ) : (
                        <h3 className={`text-2xl font-bold text-white mb-3 transition-colors ${activeCategory !== 'Odoo'
                          ? 'group-hover:text-amber-400'
                          : 'group-hover:text-primary'
                          }`}>{project.title}</h3>
                      )}

                      <div className="text-slate-300 mb-4 leading-relaxed">
                        <p className="text-base mb-3">{project.description}</p>
                        {/* Simplified description - only first paragraph for Odoo category */}
                        {activeCategory === 'Odoo' && project.longDescription && (
                          <div className="relative text-sm text-slate-400 p-4 bg-gradient-to-br from-slate-900/60 to-slate-950/70 rounded-lg border border-slate-700/40">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-primary/20 rounded-l-lg"></div>
                            <p className="pl-3 text-slate-300/90 line-clamp-3">
                              {project.longDescription.split('\n\n')[0]}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Highlights only for specific category - limited to 3 */}
                      {activeCategory === 'Odoo' && project.highlights && (
                        <div className="mt-3 mb-4">
                          <h5 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <CheckCircle2 size={12} className="text-primary" />
                            Beneficios Clave
                          </h5>
                          <div className="space-y-2">
                            {project.highlights.slice(0, 3).map((highlight, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                                <ArrowRight size={14} className="text-primary mt-0.5 flex-shrink-0" />
                                <span>{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Demonstrated Skills only for specific category - simplified */}
                      {activeCategory === 'Odoo' && project.demonstratedSkills && (
                        <div className="mb-4">
                          <h5 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Code2 size={12} className="text-amber-400" />
                            Tecnologías
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {project.demonstratedSkills.slice(0, 4).map((skill, idx) => (
                              <span key={idx} className="px-3 py-1.5 text-xs font-medium text-amber-200 bg-amber-500/10 rounded-md border border-amber-500/30">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 mt-auto">
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