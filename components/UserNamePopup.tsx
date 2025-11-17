import React, { useState, useEffect } from 'react';

interface UserNamePopupProps {
  onSave: (name: string) => void;
}

const UserNamePopup: React.FC<UserNamePopupProps> = ({ onSave }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedName = name.trim();
    
    if (!trimmedName) {
      setError('कृपया तुमचे शुभ नाव लिहा');
      return;
    }
    
    if (trimmedName.length < 2) {
      setError('नाव किमान २ अक्षरांचे असावे');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      await onSave(trimmedName);
    } catch (err) {
      setError('काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.');
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    onSave('अतिथी');
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fadeInUp backdrop-blur-sm" style={{ animationDuration: '0.3s' }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-fadeInUp" style={{ animationDelay: '0.1s' }} onClick={e => e.stopPropagation()}>
        {/* Green Header with Icon */}
        <div className="bg-gradient-to-br from-primary to-secondary p-8 text-center relative">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-3 shadow-lg">
            <i className="fas fa-user text-4xl text-primary"></i>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <h3 className="text-2xl font-bold text-center text-primary mb-2">🙏 स्वागत आहे!</h3>
          <p className="text-center text-text-secondary text-sm mb-6">
            तुमचे नाव शेअर करा आणि आमच्या कम्युनिटीचा भाग व्हा
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                id="userName"
                type="text"
                value={name}
                onChange={e => {
                  setName(e.target.value);
                  setError('');
                }}
                placeholder="तुमचे नाव (उदा. राहुल पाटील)"
                className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all text-center font-medium"
                disabled={isSubmitting}
                autoFocus
                maxLength={50}
              />
              {error && (
                <p className="text-red-500 text-xs mt-2 text-center flex items-center justify-center gap-1">
                  <i className="fas fa-exclamation-circle"></i>
                  {error}
                </p>
              )}
            </div>

            {/* Buttons - Stacked vertically like screenshot */}
            <div className="space-y-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] shadow-md flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    <span>प्रोसेसिंग...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-check-circle"></i>
                    <span>नाव सेव्ह करा</span>
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={handleSkip}
                disabled={isSubmitting}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3.5 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                <i className="fas fa-forward"></i>
                <span>नाही, धन्यवाद</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserNamePopup;
