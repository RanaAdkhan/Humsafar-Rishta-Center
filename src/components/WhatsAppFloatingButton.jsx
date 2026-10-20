import React from 'react';
import { useRishta } from '../context/RishtaContext';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFloatingButton = () => {
  const { organizationDetails } = useRishta();

  return (
    <aside aria-label="WhatsApp Consultation" className="fixed bottom-6 right-6 z-40 group">
      <a
        href={`https://wa.me/${organizationDetails.whatsappClean}?text=Salam,%20I%20would%20like%20to%20consult%20regarding%20proposals%20at%20Humsafar%20Rishta%20Center`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3.5 px-4 sm:px-5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group-hover:ring-4 group-hover:ring-emerald-400/30"
        title={`WhatsApp Counselor: ${organizationDetails.whatsapp}`}
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline tracking-wide">
          WhatsApp: {organizationDetails.whatsapp}
        </span>
      </a>
    </aside>
  );
};
