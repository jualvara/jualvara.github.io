import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#home' },
    { name: 'Proyectos', href: '#projects' },
    { name: 'Habilidades', href: '#skills' },
    { name: 'Experiencia', href: '#experience' },
    { name: 'Formación', href: '#education' },
    { name: 'Idiomas', href: '#languages' },
    { name: 'Contacto', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end md:justify-center items-center h-16 relative">

          {/* Desktop Menu - Centered Floating Dock */}
          <div className={`hidden md:flex items-center space-x-1 px-8 py-3 rounded-full border transition-all duration-300 ${scrolled
            ? 'bg-dark/80 backdrop-blur-md border-slate-700/50 shadow-lg shadow-black/20'
            : 'bg-transparent border-transparent'
            }`}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all text-sm font-medium"
              >
                {link.name}
              </a>
            ))}

            <div className="w-px h-5 bg-slate-700 mx-4"></div>

            <div className="flex items-center space-x-3">
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all">
                <Github size={18} />
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white p-2 bg-slate-800/50 rounded-lg border border-slate-700"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-20 right-4 w-64 bg-slate-900/95 backdrop-blur-xl shadow-2xl border border-slate-800 rounded-2xl overflow-hidden animate-fade-in-up">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;