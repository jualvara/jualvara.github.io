import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { HERO_DATA, PROJECTS, SKILLS, EXPERIENCE } from '../constants';

// Initialize Gemini Client
// Note: In a real app, ensure process.env.API_KEY is set.
let ai: GoogleGenAI | null = null;
try {
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
} catch (error) {
  console.error("Failed to initialize Gemini Client:", error);
}

const SYSTEM_INSTRUCTION = `
Estás actuando como el asistente personal de IA para el portafolio profesional de ${HERO_DATA.name}.
Tu objetivo es responder preguntas de posibles reclutadores o clientes sobre su experiencia multifacética en Data Science, Business Intelligence, Desarrollo y Odoo.

Información de contexto clave:
- Nombre: ${HERO_DATA.name}
- Perfil: ${HERO_DATA.title}
- Misión: ${HERO_DATA.tagline}
- Descripción: ${HERO_DATA.description}

Experiencia y Habilidades:
- Data Science: Python, Machine Learning, Análisis Predictivo.
- Business Intelligence: PowerBI, Tableau, Dashboards estratégicos.
- Desarrollo: Full Stack Web, Python, APIs.
- Odoo: Implementación ERP, Desarrollo de módulos personalizados, Consultoría.

Proyectos en el portafolio:
${PROJECTS.map(p => `- [${p.category}] ${p.title}: ${p.description} (Tech: ${p.tags.join(', ')})`).join('\n')}

Experiencia Laboral:
${EXPERIENCE.map(e => `- ${e.role} en ${e.company} (${e.period}): ${e.description}`).join('\n')}

Directrices de comportamiento:
1. Sé profesional, analítico y directo.
2. Habla en nombre de Juan Carlos (usando "yo", "mi experiencia") o como su asistente ("Juan Carlos tiene experiencia en...").
3. Si preguntan sobre Odoo, destaca su capacidad tanto técnica (desarrollo Python) como funcional (implementación de negocio).
4. Si preguntan sobre Data/BI, enfatiza el valor de negocio extraído de los datos.
5. El idioma de respuesta debe ser Español.
`;

export const sendMessageToGemini = async (history: { role: 'user' | 'model', text: string }[], message: string): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      return "⚠️ Error: API Key no configurada. El chat IA requiere una clave API válida para funcionar.";
    }

    const chatHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    if (!ai) {
      return "⚠️ Error: Cliente IA no inicializado. Verifica la API Key.";
    }

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: chatHistory
    });

    const result: GenerateContentResponse = await chat.sendMessage({
      message: message
    });

    return result.text || "Lo siento, no pude procesar tu solicitud en este momento.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Tuve un problema técnico momentáneo. Por favor intenta de nuevo.";
  }
};