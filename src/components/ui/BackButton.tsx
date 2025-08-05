// src/components/ui/BackButton.tsx
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/')}
      className="flex items-center gap-2 bg-gradient-to-r from-orange-500 hover:from-orange-600 to-yellow-400 hover:to-yellow-500 px-4 py-2 rounded-full font-semibold text-white transition-all"
    >
      <ArrowLeft size={16} />
      Back to Home
    </button>
  );
};
