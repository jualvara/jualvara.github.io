import React, { useEffect, useRef, useState } from 'react';
import { Brain, Users, GitBranch, TrendingUp, GraduationCap, Zap } from 'lucide-react';

const AboutMe: React.FC = () => {
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

    const attributes = [
        {
            icon: <Brain className="w-6 h-6" />,
            title: "Perfil Híbrido",
            description: "Desarrollo en Odoo (v16–18), Python y SQL con visión funcional de ventas, finanzas y operaciones. Pasar de los datos o necesidades, al proceso de negocio sin perder el objetivo.",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Liderazgo & Equipos",
            description: "Experiencia coordinando equipos técnicos/no técnico y formando usuarios. Reduzco fricción entre negocio y tecnología, facilitando desarrollos ordenados y una adopción real de las soluciones.",
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            icon: <GitBranch className="w-6 h-6" />,
            title: "Visión de Procesos",
            description: "Comprensión del flujo completo: requisitos, modelado de datos, desarrollo y soporte. Cuellos de botella, ahorrando tiempo y errores.",
            gradient: "from-emerald-500 to-teal-500"
        },
        {
            icon: <TrendingUp className="w-6 h-6" />,
            title: "Visión a Largo Plazo",
            description: "Pienso en mantenibilidad: código entendible, documentación y homogeneidad. Reducir flujo técnico, trazabilidad y conversión funcional.",
            gradient: "from-orange-500 to-red-500"
        },
        {
            icon: <GraduationCap className="w-6 h-6" />,
            title: "Formación Interdisciplinaria",
            description: "Máster en Data Science (UCM) y posgrados en Gobierno y Finanzas Públicas (UNAM). Combino analítica rigurosa, comprensión institucional y enfoque en indicadores.",
            gradient: "from-indigo-500 to-purple-500"
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Adaptabilidad & Aprendizaje",
            description: "Trayectoria de soporte IT a desarrollo Odoo y proyectos de machine learning y BI. Evolución constante, apasionado, íntegro y profesional.",
            gradient: "from-yellow-500 to-amber-500"
        }
    ];

    return (
        <section id="about" ref={sectionRef} className="py-24 bg-gradient-to-b from-black/20 to-slate-900/30 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Sobre mí</h2>
                    <p className="text-slate-300 max-w-3xl mx-auto text-lg leading-relaxed">
                        <span className="font-semibold text-white">Odoo Developer, IT & Data Analyst / Scientist.</span> Conecto el desarrollo ERP, datos y lógica de negocio para que las soluciones se usen, generen métricas claras y mejoren procesos reales.
                    </p>
                </div>

                {/* Attributes Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {attributes.map((attr, index) => (
                        <div
                            key={index}
                            className={`group relative bg-slate-900/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-800 hover:border-slate-700
                transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            {/* Gradient overlay on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${attr.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />

                            {/* Icon */}
                            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${attr.gradient} mb-4 relative z-10`}>
                                <div className="text-white">
                                    {attr.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-white mb-3 relative z-10">{attr.title}</h3>
                            <p className="text-slate-400 leading-relaxed text-sm relative z-10">
                                {attr.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className={`mt-16 text-center transition-all duration-700 delay-500 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-800/50 border border-slate-700 rounded-full">
                        <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-slate-900" />
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 border-2 border-slate-900" />
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 border-2 border-slate-900" />
                        </div>
                        <p className="text-sm text-slate-300 font-medium">
                            Perfil completo para proyectos que requieren <span className="text-primary">visión integral</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
