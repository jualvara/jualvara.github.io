import React, { useEffect, useState } from 'react';
import { ArrowRight, Download, Database, Code2, BarChart3, Loader2 } from 'lucide-react';
import { HERO_DATA } from '../constants';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center pt-32 pb-20 overflow-hidden bg-dark">
      {/* --- Global Background Elements --- */}
      <div
        className="absolute inset-0 bg-grid-pattern z-0 pointer-events-none opacity-20"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      ></div>

      {/* Soft Ambient Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">

        {/* --- BLOCK 1: TEXT CONTENT --- */}
        <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in-up">

          {/* Tagline / Role - Centered and Wider */}
          <div className="flex justify-center w-full">
            <div className="inline-flex items-center justify-center gap-3 px-6 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              <span className="flex h-2.5 w-2.5 rounded-full bg-blue-400 animate-ping"></span>
              <span className="text-sm md:text-base font-mono font-medium text-blue-300 tracking-wider uppercase">
                {HERO_DATA.title}
              </span>
            </div>
          </div>

          {/* Main Title - Name Only */}
          <div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-none mb-2 drop-shadow-2xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                {HERO_DATA.name}
              </span>
            </h1>
          </div>

          {/* Description - Centered and Full Width relative to container */}
          <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto">
            {HERO_DATA.tagline}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center pt-4">
            <a
              href="#projects"
              className="group flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-blue-500/40 transform hover:-translate-y-1"
            >
              Ver Portafolio
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              onClick={async () => {
                setIsDownloading(true);

                // Simulate download preparation
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Trigger actual download
                const link = document.createElement('a');
                link.href = '/CV_Juan_Carlos_Alvarado.pdf';
                link.download = 'CV_Juan_Carlos_Alvarado.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Show completion briefly
                await new Promise(resolve => setTimeout(resolve, 800));
                setIsDownloading(false);
              }}
              disabled={isDownloading}
              className={`flex items-center justify-center px-8 py-4 rounded-full font-semibold transition-all border backdrop-blur-sm ${isDownloading
                  ? 'bg-blue-600/80 border-blue-500/50 cursor-wait'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-white border-slate-700 hover:border-blue-500/50'
                }`}
            >
              {isDownloading ? (
                <>
                  <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                  <span className="relative">
                    Descargando
                    <span className="inline-flex ml-0.5">
                      <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
                      <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
                      <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
                    </span>
                  </span>
                </>
              ) : (
                <>
                  <Download className="mr-2 w-5 h-5" />
                  Descargar CV
                </>
              )}
            </button>
          </div>

          {/* Tech Stack Icons Mini */}
          <div className="flex flex-col items-center gap-3 pt-6 opacity-80">
            <span className="text-xs text-slate-500 font-mono tracking-widest">TECH STACK CORE</span>
            <div className="flex gap-6 text-slate-400 bg-slate-900/50 px-6 py-2 rounded-full border border-slate-800/50">
              <div title="Data Engineering" className="cursor-help">
                <Database size={24} className="hover:text-blue-400 transition-colors" />
              </div>
              <span className="w-px h-6 bg-slate-800"></span>
              <div title="Development" className="cursor-help">
                <Code2 size={24} className="hover:text-indigo-400 transition-colors" />
              </div>
              <span className="w-px h-6 bg-slate-800"></span>
              <div title="Business Intelligence" className="cursor-help">
                <BarChart3 size={24} className="hover:text-sky-400 transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* --- BLOCK 2: ANIMATION (INTEGRATED BELOW) --- */}
        <div className="w-full max-w-6xl mt-12 md:mt-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <svg className="w-full h-auto drop-shadow-2xl opacity-90" viewBox="0 0 1000 350" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="glow-strong">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* --- CONNECTING LINES (Background) --- */}
            {/* Line from Code to DB */}
            <path d="M 280 175 L 420 175" stroke="#1e293b" strokeWidth="4" opacity="0">
              <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="1.2s" fill="freeze" />
            </path>
            <path d="M 280 175 L 420 175" stroke="url(#line-gradient)" strokeWidth="2" strokeDasharray="140" strokeDashoffset="140">
              <animate attributeName="stroke-dashoffset" values="140;0;-140" dur="2s" repeatCount="indefinite" begin="1.4s" />
            </path>

            {/* Line from DB to Charts */}
            <path d="M 580 175 L 720 175" stroke="#1e293b" strokeWidth="4" opacity="0">
              <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="2.4s" fill="freeze" />
            </path>
            <path d="M 580 175 L 720 175" stroke="url(#line-gradient)" strokeWidth="2" strokeDasharray="140" strokeDashoffset="140">
              <animate attributeName="stroke-dashoffset" values="140;0;-140" dur="2s" repeatCount="indefinite" begin="2.6s" />
            </path>


            {/* --- 1. CODE BLOCK (Left) - Appears first --- */}
            <g transform="translate(50, 50)" opacity="0">
              {/* Entrance Animation */}
              <animate attributeName="opacity" from="0" to="1" dur="0.8s" begin="0.2s" fill="freeze" />
              <animateTransform attributeName="transform" type="translate" from="50, 70" to="50, 50" dur="0.8s" begin="0.2s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1" />

              <rect x="0" y="0" width="230" height="250" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="2" />
              {/* Header */}
              <rect x="0" y="0" width="230" height="30" rx="10" fill="#1e293b" />
              <rect x="0" y="20" width="230" height="10" fill="#1e293b" />
              <circle cx="15" cy="15" r="4" fill="#ef4444" />
              <circle cx="30" cy="15" r="4" fill="#fbbf24" />
              <circle cx="45" cy="15" r="4" fill="#22c55e" />

              {/* Code Lines */}
              <g transform="translate(20, 50)">
                <rect width="60" height="6" fill="#c084fc" rx="2" />
                <rect x="70" width="80" height="6" fill="#38bdf8" rx="2" />

                {/* Typing Animation Group */}
                <g transform="translate(0, 20)">
                  <rect width="180" height="6" fill="#94a3b8" rx="2" opacity="0.5" />
                  <rect y="15" width="140" height="6" fill="#94a3b8" rx="2" opacity="0.5" />

                  {/* Active typing line */}
                  <g transform="translate(20, 30)">
                    <rect width="100" height="6" fill="#4ade80" rx="2">
                      <animate attributeName="width" values="0;100;100;0" dur="4s" repeatCount="indefinite" />
                    </rect>
                    <rect x="105" width="4" height="10" fill="#38bdf8" className="animate-cursor-blink">
                      <animate attributeName="x" values="5;105;105;5" dur="4s" repeatCount="indefinite" />
                    </rect>
                  </g>
                </g>
              </g>
              <text x="115" y="280" textAnchor="middle" fill="#64748b" fontSize="14" fontFamily="monospace" fontWeight="bold">INPUT: CODE</text>
            </g>


            {/* --- 2. DATABASE BLOCK (Center) - Appears second --- */}
            <g transform="translate(420, 80)" opacity="0">
              {/* Entrance Animation */}
              <animate attributeName="opacity" from="0" to="1" dur="0.8s" begin="1.4s" fill="freeze" />
              <animateTransform attributeName="transform" type="translate" from="420, 100" to="420, 80" dur="0.8s" begin="1.4s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1" />

              <g className="animate-pulse-db">
                {/* Stacked Cylinders */}
                <ellipse cx="80" cy="170" rx="80" ry="20" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
                <path d="M0 170 V 40 A 80 20 0 0 1 160 40 V 170" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5 5" opacity="0.5" />
                <path d="M0 170 V 40" stroke="#3b82f6" strokeWidth="2" />
                <path d="M160 170 V 40" stroke="#3b82f6" strokeWidth="2" />

                {/* Top Lid */}
                <ellipse cx="80" cy="40" rx="80" ry="20" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />

                {/* Data processing rings */}
                <ellipse cx="80" cy="80" rx="80" ry="20" fill="none" stroke="#38bdf8" strokeWidth="1" opacity="0.3">
                  <animate attributeName="ry" values="20;5;20" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="rx" values="80;70;80" dur="3s" repeatCount="indefinite" />
                </ellipse>
                <ellipse cx="80" cy="120" rx="80" ry="20" fill="none" stroke="#38bdf8" strokeWidth="1" opacity="0.3">
                  <animate attributeName="ry" values="20;5;20" dur="3s" repeatCount="indefinite" begin="0.5s" />
                  <animate attributeName="rx" values="80;70;80" dur="3s" repeatCount="indefinite" begin="0.5s" />
                </ellipse>
              </g>
              <text x="80" y="250" textAnchor="middle" fill="#64748b" fontSize="14" fontFamily="monospace" fontWeight="bold">PROCESS: DATA</text>
            </g>


            {/* --- 3. CHARTS BLOCK (Right) - Appears last --- */}
            <g transform="translate(720, 50)" opacity="0">
              {/* Entrance Animation */}
              <animate attributeName="opacity" from="0" to="1" dur="0.8s" begin="2.6s" fill="freeze" />
              <animateTransform attributeName="transform" type="translate" from="720, 70" to="720, 50" dur="0.8s" begin="2.6s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1" />

              <rect x="0" y="0" width="230" height="250" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="2" />
              {/* Header */}
              <rect x="0" y="0" width="230" height="30" rx="10" fill="#1e293b" />
              <rect x="0" y="20" width="230" height="10" fill="#1e293b" />

              {/* Graph Area */}
              <g transform="translate(30, 60)">
                {/* Grid lines */}
                <line x1="0" y1="0" x2="170" y2="0" stroke="#334155" strokeWidth="1" opacity="0.3" />
                <line x1="0" y1="40" x2="170" y2="40" stroke="#334155" strokeWidth="1" opacity="0.3" />
                <line x1="0" y1="80" x2="170" y2="80" stroke="#334155" strokeWidth="1" opacity="0.3" />
                <line x1="0" y1="120" x2="170" y2="120" stroke="#334155" strokeWidth="1" opacity="0.3" />

                {/* Bars */}
                <g transform="translate(10, 130) scale(1, -1)">
                  <rect x="0" width="30" height="0" fill="#38bdf8" rx="2">
                    <animate attributeName="height" values="0;80;80;0" dur="4s" repeatCount="indefinite" begin="3s" />
                  </rect>
                  <rect x="50" width="30" height="0" fill="#818cf8" rx="2">
                    <animate attributeName="height" values="0;110;110;0" dur="4s" repeatCount="indefinite" begin="3.2s" />
                  </rect>
                  <rect x="100" width="30" height="0" fill="#2dd4bf" rx="2">
                    <animate attributeName="height" values="0;60;60;0" dur="4s" repeatCount="indefinite" begin="3.4s" />
                  </rect>
                </g>
              </g>
              <text x="115" y="280" textAnchor="middle" fill="#64748b" fontSize="14" fontFamily="monospace" fontWeight="bold">OUTPUT: INSIGHTS</text>
            </g>

          </svg>
        </div>

      </div>
    </section>
  );
};

export default Hero;