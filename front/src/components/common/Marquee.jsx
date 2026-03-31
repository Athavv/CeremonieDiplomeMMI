import React from 'react';

const Marquee = ({ text, outline = false }) => {
  const textStyle = outline 
    ? { WebkitTextStroke: '2px #B8AB38', color: 'transparent' }
    : { color: '#B8AB38' };

  return (
    <div className="relative flex overflow-hidden w-full items-center bg-[#071341] border-y border-[#B8AB38]/20 py-8">
      <style>{`
        @keyframes custom-marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div 
        className="flex whitespace-nowrap min-w-full"
        style={{ animation: 'custom-marquee 30s linear infinite' }}
      >
        <div className="flex shrink-0">
          <span className="px-6 text-5xl md:text-8xl font-playfair font-black italic tracking-wider transition-colors hover:text-white" style={textStyle}>{text}</span>
          <span className="px-6 text-5xl md:text-8xl font-playfair font-black italic tracking-wider transition-colors hover:text-white" style={textStyle}>{text}</span>
          <span className="px-6 text-5xl md:text-8xl font-playfair font-black italic tracking-wider transition-colors hover:text-white" style={textStyle}>{text}</span>
          <span className="px-6 text-5xl md:text-8xl font-playfair font-black italic tracking-wider transition-colors hover:text-white" style={textStyle}>{text}</span>
        </div>
        <div className="flex shrink-0">
          <span className="px-6 text-5xl md:text-8xl font-playfair font-black italic tracking-wider transition-colors hover:text-white" style={textStyle}>{text}</span>
          <span className="px-6 text-5xl md:text-8xl font-playfair font-black italic tracking-wider transition-colors hover:text-white" style={textStyle}>{text}</span>
          <span className="px-6 text-5xl md:text-8xl font-playfair font-black italic tracking-wider transition-colors hover:text-white" style={textStyle}>{text}</span>
          <span className="px-6 text-5xl md:text-8xl font-playfair font-black italic tracking-wider transition-colors hover:text-white" style={textStyle}>{text}</span>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
