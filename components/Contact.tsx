import React, { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Send, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    // Check if env vars are set
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    console.log('Service ID:', serviceId);
    console.log('Template ID:', templateId);
    console.log('Public Key:', publicKey);

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS keys are missing');
      setStatus('error');
      return;
    }

    setStatus('sending');

    try {
      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      );
      console.log('Email sent successfully');
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-black/20">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">¿Listo para comenzar un proyecto?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Actualmente estoy disponible para trabajos freelance o posiciones a tiempo completo.
            Si tienes una idea interesante o simplemente quieres saludar, ¡no dudes en contactarme!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Contact Info */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ease-out transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-primary/30 transition-colors">
              <h3 className="text-2xl font-bold text-white mb-6">Información de Contacto</h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-slate-300 group">
                  <div className="p-3 bg-slate-800 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <a href={`mailto:${SOCIAL_LINKS.email}`} className="text-lg font-medium hover:text-primary transition-colors">
                      {SOCIAL_LINKS.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`bg-slate-900/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-800 transition-all duration-1000 delay-500 ease-out transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Nombre</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">Correo</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="tu@correo.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-400 mb-2">Asunto</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="¿Sobre qué quieres hablar?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                  placeholder="Cuéntame sobre tu proyecto..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                className={`w-full font-bold py-4 rounded-lg shadow-lg transform transition-all duration-300 flex items-center justify-center gap-2
                  ${status === 'sending' ? 'bg-slate-700 cursor-wait' :
                    status === 'success' ? 'bg-green-600 cursor-default' :
                      status === 'error' ? 'bg-red-600 hover:bg-red-700' :
                        'bg-gradient-to-r from-primary to-secondary hover:shadow-primary/50 hover:-translate-y-1 text-white'
                  }`}
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Enviando...
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle2 size={20} />
                    ¡Mensaje Enviado!
                  </>
                ) : status === 'error' ? (
                  <>
                    <XCircle size={20} />
                    Error al enviar
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Enviar Mensaje
                  </>
                )}
              </button>

              {status === 'error' && (
                <p className="text-red-400 text-sm text-center mt-2">
                  Hubo un problema. Por favor intenta contactarme directamente al correo.
                </p>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;