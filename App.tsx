import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import AIChat from './components/AIChat';
import Education from './components/Education';
import Languages from './components/Languages';

function App() {
  return (
    <div className="bg-dark min-h-screen text-slate-200 selection:bg-primary selection:text-white">
      <Navbar />

      <main>
        <Hero />
        <Projects />
        <Skills />
        <Education />
        <Languages />
        <Contact />
      </main>

      {/* The AI Assistant lives outside the main flow, fixed to the bottom right */}
      <AIChat />
    </div>
  );
}

export default App;