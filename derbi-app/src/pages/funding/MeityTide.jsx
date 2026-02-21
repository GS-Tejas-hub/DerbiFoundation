import React from 'react';
import SEO from '../../components/SEO';

const MeityTide = () => {
  return (
    <div className="flex-grow w-full bg-pitch-black flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      {/* Subtle background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-royal-gold/5 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none"></div>

      <SEO 
        title="MeitY Tide 2.0"
        description="Explore the MeitY Tide 2.0 page of Derbi Foundations, where innovation meets majestic design."
        keywords="meity tide 2.0, derbi, startups, innovation"
      />
      
      <div className="relative z-10 bg-pitch-900 border border-royal-gold/10 rounded-2xl shadow-2xl p-8 sm:p-16 max-w-4xl w-full text-center transition-transform hover:scale-[1.01] duration-500">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif text-royal-gold mb-6 sm:mb-8 tracking-wide drop-shadow-md">
          MeitY Tide 2.0
        </h1>
        <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-transparent via-royal-gold to-transparent mx-auto mb-6 sm:mb-8 opacity-60"></div>
        <p className="text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed font-light">
          Welcome to the absolute premium <strong className="text-royal-gold-light font-medium">MeitY Tide 2.0</strong> experience.
          This interface is strictly designed following mobile-first principles and the <span className="text-white">Pitch Black & Royal Gold</span> theme.
        </p>
        
        <button className="mt-10 sm:mt-12 px-6 sm:px-8 py-3 sm:py-4 bg-transparent border border-royal-gold text-royal-gold rounded-sm opacity-90 hover:bg-royal-gold hover:text-pitch-black hover:opacity-100 transition-all duration-300 tracking-[0.2em] text-xs sm:text-sm uppercase font-medium focus:ring-2 focus:ring-royal-gold focus:ring-offset-2 focus:ring-offset-pitch-black outline-none min-h-[48px]">
          Explore Details
        </button>
      </div>
    </div>
  );
};

export default MeityTide;