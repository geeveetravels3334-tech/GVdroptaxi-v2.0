import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2, MapPin, ExternalLink } from 'lucide-react';
import { getTripAdviceWithMaps } from '../services/gemini.ts';
import { useLanguage } from '../contexts/LanguageContext.tsx';

interface Message {
  role: 'user' | 'bot';
  text: string;
  links?: { title: string; uri: string }[];
}

const FloatingAIButton: React.FC = () => {
  const { language, fontClass } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{ latitude: number, longitude: number } | undefined>();
  const chatEndRef = useRef<HTMLDivElement>(null);

  const labels = {
    en: { greeting: 'Hi! I am your Tamilnadu Taxi Tours Assistant. I can now use real-time Maps data to find the best spots for you. Where would you like to explore today?', placeholder: 'Ask for nearby hotels, food, or temples...', title: 'Smart Concierge AI', badge: 'Real-time Maps Active' },
    ta: { greeting: 'வணக்கம்! நான் உங்கள் தமிழ்நாடு டாக்ஸி டூர்ஸ் உதவியாளர். சிறந்த இடங்களை உங்களுக்குக் காட்ட இப்போது மேப்ஸ் தரவைப் பயன்படுத்த முடியும். எங்கு செல்ல விரும்புகிறீர்கள்?', placeholder: 'அருகிலுள்ள ஹோட்டல்கள் அல்லது கோயில்களைக் கேட்கவும்...', title: 'AI பயண உதவியாளர்', badge: 'வரைபடங்கள் செயலில் உள்ளன' },
    hi: { greeting: 'नमस्ते! मैं आपका तमिलनाडु टैक्सी टूर्स असिस्टेंट हूँ। मैं अब आपके लिए सर्वोत्तम स्थान खोजने के लिए रीयल-टाइम मैप्स डेटा का उपयोग कर सकता हूँ। आप आज कहाँ घूमना चाहेंगे?', placeholder: 'आस-पास के होटल, भोजन या मंदिरों के बारे में पूछें...', title: 'AI यात्रा सहायक', badge: 'रीयल-टाइम मैप्स सक्रिय' },
    te: { greeting: 'హలో! నేను మీ తమిళనాడు టాక్సీ టూర్స్ అసిస్టెంట్‌ని. మీ కోసం ఉత్తమమైన ప్రదేశాలను కనుగొనడానికి నేను ఇప్పుడు రియల్ టైమ్ మ్యాప్స్ డేటాను ఉపయోగించగలను. మీరు ఈ రోజు ఎక్కడ అన్వేషించాలనుకుంటున్నారు?', placeholder: 'సమీపంలోని హోటళ్ళు లేదా దేవాలయాల గురించి అడగండి...', title: 'AI ట్రావెల్ అసిస్టెంట్', badge: 'మ్యాప్స్ యాక్టివ్‌గా ఉంది' },
    kn: { greeting: 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ತಮಿಳುನಾಡು ಟ್ಯಾಕ್ಸಿ ಟೂರ್ಸ್ ಸಹಾಯಕ. ನಿಮಗಾಗಿ ಉತ್ತಮ ಸ್ಥಳಗಳನ್ನು ಹುಡುಕಲು ನಾನು ಈಗ ನೈಜ-ಸಮಯದ ನಕ್ಷೆಗಳ ಡೇಟಾವನ್ನು ಬಳಸಬಹುದು. ನೀವು ಇಂದು ಎಲ್ಲಿಗೆ ಭೇಟಿ ನೀಡಲು ಬಯಸುತ್ತೀರಿ?', placeholder: 'ಹತ್ತಿರದ ಹೋಟೆಲ್‌ಗಳು ಅಥವಾ ದೇವಾಲಯಗಳ ಬಗ್ಗೆ ಕೇಳಿ...', title: 'AI ಪ್ರಯಾಣ ಸಹಾಯಕ', badge: 'ನಕ್ಷೆಗಳು ಸಕ್ರಿಯವಾಗಿವೆ' },
  };

  const currentLabels = labels[language] || labels.en;

  // Reset chat when language changes if empty
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: 'bot', text: currentLabels.greeting }]);
    }
  }, [language, currentLabels.greeting]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
        (err) => console.warn("Geolocation denied or unavailable", err)
      );
    }
  }, []);

  // Handle external triggers from BookingForm
  useEffect(() => {
    const handleAITrigger = (event: any) => {
      const { pickup, drop } = event.detail;
      setIsOpen(true);
      const query = `Find top attractions, restaurants, and places worth visiting in ${drop} for a trip starting from ${pickup}. Use Maps for up-to-date data.`;
      
      setMessages(prev => {
        const lastUserMsg = [...prev].reverse().find(m => m.role === 'user');
        if (lastUserMsg?.text === query) return prev;
        return [...prev, { role: 'user', text: query }];
      });
      
      processQuery(query);
    };

    window.addEventListener('plan-ai-trip', handleAITrigger);
    return () => window.removeEventListener('plan-ai-trip', handleAITrigger);
  }, []);

  const processQuery = async (query: string) => {
    setIsLoading(true);
    const result = await getTripAdviceWithMaps(query, userLocation);
    setMessages(prev => [...prev, { role: 'bot', text: result.text || 'I am not sure how to answer that.', links: result.links }]);
    setIsLoading(false);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userText = input;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');
    await processQuery(userText);
  };

  return (
    <div className={`fixed bottom-6 right-6 z-[100] flex flex-col items-end hide-on-keyboard-mobile ${fontClass}`}>
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-6 w-[350px] md:w-[480px] h-[700px] bg-gradient-to-b from-[#0C1E38]/95 via-[#040812]/98 to-[#040812] backdrop-blur-3xl rounded-[2.5rem] shadow-[0_45px_135px_rgba(0,0,0,0.85)] border border-[#D4AF37]/25 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-500">
          <div className="bg-slate-950/80 p-8 text-white flex items-center justify-between relative overflow-hidden border-b border-[#D4AF37]/15">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <Bot size={200} />
            </div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="bg-[#D4AF37]/10 p-3 rounded-2xl shadow-lg ring-1 ring-[#D4AF37]/20 text-[#D4AF37]">
                <Bot size={28} />
              </div>
              <div>
                <h4 className="font-bold text-lg tracking-tight text-white">{currentLabels.title}</h4>
                <p className="text-[10px] text-[#D4AF37] uppercase tracking-[0.25em] font-black flex items-center gap-1.5 opacity-95">
                  <MapPin size={10} fill="currentColor" /> {currentLabels.badge}
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/5 p-3 rounded-2xl transition-all relative z-10 text-white/70 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-[#040812]/40 backdrop-blur-sm">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] flex flex-col gap-3 ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-5 rounded-[1.75rem] text-sm md:text-base leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] text-[#040812] font-semibold rounded-br-none shadow-md' 
                      : 'bg-white/5 text-slate-100 rounded-bl-none border border-white/5'
                  }`}>
                    {m.text}
                  </div>
                  
                  {m.links && m.links.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {m.links.map((link, lIdx) => (
                        <a 
                          key={lIdx}
                          href={link.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/5 px-4 py-2 rounded-full border border-white/10 text-[10px] font-bold text-[#FCF6BA] hover:bg-[#D4AF37] hover:text-[#040812] hover:border-[#D4AF37] transition-all flex items-center gap-2 shadow-sm"
                        >
                          <ExternalLink size={12} />
                          {link.title.substring(0, 24)}...
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 px-6 py-4 rounded-[1.5rem] rounded-bl-none border border-white/5 flex items-center gap-4 text-slate-300 shadow-sm animate-pulse">
                  <Loader2 className="animate-spin text-[#D4AF37]" size={20} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Consulting Knowledge Base...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-6 bg-slate-950/80 border-t border-[#D4AF37]/15 flex gap-4">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={currentLabels.placeholder}
              className="flex-grow bg-white/5 border border-white/5 px-5 py-4 rounded-2xl text-sm outline-none focus:ring-1 focus:ring-[#D4AF37]/30 transition-all font-medium text-white placeholder-slate-500 focus:border-[#D4AF37]/30"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] text-[#040812] p-4.5 rounded-2xl hover:brightness-110 transition-all shadow-xl disabled:opacity-50 active:scale-95 flex items-center justify-center shrink-0"
            >
              <Send size={24} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <div className="relative group">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`w-18 h-18 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 transform hover:scale-105 active:scale-95 border-3 border-[#D4AF37]/25 ${
            isOpen ? 'bg-[#040812] text-[#D4AF37]' : 'bg-gradient-to-b from-[#0C1E38] to-[#040812] text-[#FCF6BA]'
          }`}
        >
          {isOpen ? <X size={28} /> : (
            <div className="relative">
              <Bot size={32} />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
            </div>
          )}
        </button>
        
        {/* Floating Info Tag */}
        {!isOpen && (
          <div className="absolute right-24 top-1/2 -translate-y-1/2 bg-gradient-to-b from-[#0C1E38]/95 to-[#040812]/95 px-6 py-3 rounded-2xl shadow-3xl border border-[#D4AF37]/25 whitespace-nowrap animate-in fade-in slide-in-from-right-10 pointer-events-none group-hover:opacity-0 transition-opacity">
             <p className="text-[10px] font-bold text-[#FCF6BA] uppercase tracking-[0.2em] flex items-center gap-3">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
               Concierge Support Active
             </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingAIButton;
