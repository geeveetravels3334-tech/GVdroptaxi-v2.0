
import React, { useState } from 'react';
import { Star, Quote, Send, User, MessageSquare, CheckCircle, MapPin, Loader2, ChevronDown, ChevronUp, PenTool } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.tsx';

interface Review {
  name: string;
  role: string;
  text: string;
  rating: number;
  date: string;
}

const INITIAL_REVIEWS: Review[] = [
  {
    name: 'Anirudh S.',
    role: 'Chennai to Pondicherry',
    text: 'The car was exceptionally clean and the driver was very professional. The service is truly premium!',
    rating: 5,
    date: '2 days ago'
  },
  {
    name: 'Priya Raman',
    role: 'Airport Transfer User',
    text: 'Always on time. I use Tamilnadu Taxi for all my executive travel. Best in Chennai!',
    rating: 5,
    date: '1 week ago'
  },
  {
    name: 'Mark Johnson',
    role: 'Temple Tour Visitor',
    text: 'Wonderful experience touring Madurai. The driver spoke great English and knew the history well.',
    rating: 4,
    date: '2 weeks ago'
  }
];

const Testimonials: React.FC = () => {
  const { language, fontClass } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !text) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newReview: Review = {
        name,
        role: role || 'Traveler',
        text,
        rating,
        date: 'Just now'
      };
      setReviews([newReview, ...reviews]);
      setIsSubmitting(false);
      setSubmitted(true);
      setIsFormExpanded(false);
      setTimeout(() => {
        setSubmitted(false);
        setName(''); setRole(''); setText(''); setRating(5);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="text-center mb-16">
        <h2 className={`text-geevee-orange font-black tracking-[0.3em] uppercase mb-4 text-xs ${fontClass}`}>
          {language === 'ta' ? 'கருத்துக்களம்' : 'Reviews'}
        </h2>
        <h3 className={`text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight ${fontClass}`}>
          {language === 'ta' ? 'பயணிகளின் அனுபவங்கள்' : 'Voices of Trust'}
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        
        {/* Left: Feedback Form (Glassmorphic) */}
        <div className="lg:col-span-5 sticky top-32">
          <div className="glass-card p-8 rounded-[2.5rem] border border-white/20 shadow-2xl relative overflow-hidden group">
            {/* Liquid Glow Inside Card */}
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-white/5 to-transparent rotate-45 pointer-events-none"></div>

            <div 
              className="flex items-center justify-between cursor-pointer relative z-10"
              onClick={() => !submitted && setIsFormExpanded(!isFormExpanded)}
            >
               <div className="flex items-center gap-4">
                  <div className="bg-geevee-orange text-white p-3 rounded-2xl shadow-lg">
                    <PenTool size={20} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">
                    {isFormExpanded ? 'Writing Review...' : 'Write a Review'}
                  </span>
               </div>
               {!submitted && (
                 <div className="bg-white/10 p-2 rounded-full text-slate-900 dark:text-white">
                    {isFormExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                 </div>
               )}
            </div>

            {submitted ? (
              <div className="py-12 text-center animate-in zoom-in duration-500">
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                  <CheckCircle size={32} />
                </div>
                <h4 className="text-xl font-black text-slate-900 dark:text-white">Thank You!</h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-2">Your feedback helps us improve.</p>
              </div>
            ) : (
              <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isFormExpanded ? 'max-h-[800px] mt-8 opacity-100' : 'max-h-0 mt-0 opacity-0'}`}>
                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  <input 
                    required 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-5 py-3 text-sm font-bold outline-none focus:border-geevee-orange transition-all placeholder:text-slate-400 dark:text-white"
                  />
                  <input 
                    type="text" 
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Route (e.g. Chennai to Madurai)"
                    className="w-full bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-5 py-3 text-sm font-bold outline-none focus:border-geevee-orange transition-all placeholder:text-slate-400 dark:text-white"
                  />
                  
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform active:scale-90"
                      >
                        <Star 
                          size={24} 
                          fill={star <= (hoverRating || rating) ? '#F37021' : 'none'} 
                          className={star <= (hoverRating || rating) ? 'text-geevee-orange' : 'text-slate-300 dark:text-slate-600'}
                        />
                      </button>
                    ))}
                  </div>

                  <textarea 
                    required 
                    rows={4}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Share your experience..."
                    className="w-full bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-5 py-3 text-sm font-medium outline-none focus:border-geevee-orange transition-all placeholder:text-slate-400 dark:text-white resize-none"
                  ></textarea>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-geevee-orange text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    Submit Review
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Right: Review Feed */}
        <div className="lg:col-span-7 space-y-6">
          {reviews.map((review, i) => (
            <div 
              key={i} 
              className="glass-card p-8 rounded-[2rem] border border-white/10 relative group hover:bg-white/5 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <Quote className="absolute top-8 right-8 text-geevee-orange/20 group-hover:text-geevee-orange/40 transition-colors" size={40} />
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-white/10 dark:to-white/5 flex items-center justify-center text-slate-500 dark:text-slate-300 font-black text-lg">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 dark:text-white text-base">{review.name}</h4>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                     <MapPin size={10} className="text-geevee-orange" /> {review.role}
                  </div>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} size={12} fill={idx < review.rating ? '#F37021' : 'none'} className={idx < review.rating ? 'text-geevee-orange' : 'text-slate-200 dark:text-slate-700'} />
                ))}
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-relaxed italic">
                "{review.text}"
              </p>
              
              <p className="mt-4 text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest text-right">
                {review.date}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Testimonials;
