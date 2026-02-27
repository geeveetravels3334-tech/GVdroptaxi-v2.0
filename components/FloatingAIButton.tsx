
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
    <div className={`fixed bottom-6 right-6 z-[100] flex flex-col items-end ${fontClass}`}>
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[350px] md:w-[450px] h-[600px] bg-white rounded-[2rem] shadow-3xl border border-slate-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10">
          <div className="bg-geevee-dark p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-geevee-orange p-2 rounded-xl">
                <Bot className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-bold">{currentLabels.title}</h4>
                <p className="text-[10px] text-geevee-orange uppercase tracking-widest font-black flex items-center gap-1">
                  <MapPin size={10} fill="currentColor" /> {currentLabels.badge}
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-all">
              <X size={20} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] flex flex-col gap-2 ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-5 rounded-[1.5rem] text-sm font-medium shadow-sm whitespace-pre-line leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-geevee-orange text-white rounded-br-none' 
                      : 'bg-white text-slate-800 rounded-bl-none border border-slate-100'
                  }`}>
                    {m.text}
                  </div>
                  
                  {m.links && m.links.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {m.links.map((link, lIdx) => (
                        <a 
                          key={lIdx}
                          href={link.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white px-3 py-1.5 rounded-full border border-slate-200 text-[10px] font-black text-geevee-orange hover:bg-geevee-orange hover:text-white transition-all flex items-center gap-1 shadow-sm"
                        >
                          <ExternalLink size={10} />
                          {link.title.substring(0, 20)}...
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-slate-100 flex items-center gap-3 text-slate-400">
                  <Loader2 className="animate-spin text-geevee-orange" size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Accessing Maps Data...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={currentLabels.placeholder}
              className="flex-grow bg-slate-50 px-5 py-4 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-geevee-orange/10 transition-all font-medium"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-geevee-orange text-white p-4 rounded-2xl hover:bg-orange-600 transition-all shadow-lg disabled:opacity-50"
            >
              <Send size={24} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-3xl transition-all transform hover:scale-110 active:scale-95 border-2 border-white ${
          isOpen ? 'bg-slate-200 text-slate-600 rotate-90' : 'bg-geevee-dark text-white'
        }`}
      >
        {isOpen ? <X size={32} /> : (
          <div className="relative">
            <Bot size={32} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-geevee-orange rounded-full border-2 border-geevee-dark"></div>
          </div>
        )}
      </button>
      
      {/* Floating Info Tag */}
      {!isOpen && (
        <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-xl shadow-xl border border-slate-100 whitespace-nowrap animate-in fade-in slide-in-from-right-4">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ask AI For Real-time Locations</p>
        </div>
      )}
    </div>
  );
};

export default FloatingAIButton;
