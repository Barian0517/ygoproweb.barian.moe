import { Globe, Github, Mail, Crown } from 'lucide-react';
import { motion } from 'motion/react';

export function About() {
  return (
    <div className="pt-24 pb-24 max-w-max-width mx-auto px-4 md:px-margin-desktop min-h-screen flex flex-col items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center relative z-10 border-b border-outline-variant/30 pb-10 w-full max-w-3xl"
      >
        <span className="text-primary font-label-caps text-xs tracking-[0.4em] block mb-2 w-full text-center">SYSTEM ADMINISTRATOR</span>
        <h2 className="font-display-hero text-headline-sm md:text-headline-lg uppercase flex flex-col items-center gap-3 text-on-surface">
          ABOUT BRS
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 gap-8 max-w-md mx-auto w-full">
        {/* Barian */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative bg-surface-container border border-outline-variant hover:border-rarity-ultra/50 p-10 transition-all duration-500 overflow-hidden"
        >
          {/* Accent Line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-outline-variant group-hover:bg-rarity-ultra/50 transition-colors"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="relative mb-8 group-hover:scale-105 transition-transform duration-500">
              <img src="https://cloudreve.barian.moe/f/44ir/avator.jpg" alt="幽影櫻 (Barian)" className="w-32 h-32 border-2 border-outline-variant object-cover relative z-10 shadow-xl bg-void-black block" />
              <div className="absolute -bottom-3 -right-3 p-2 bg-void-black border border-outline-variant text-rarity-ultra z-20 shadow-lg">
                <Crown size={20} />
              </div>
            </div>
            
            <h3 className="font-display-hero text-[32px] text-on-surface uppercase mb-3 leading-none">幽影櫻 (Barian)</h3>
            <span className="text-[10px] font-label-caps text-on-surface-variant tracking-[0.2em] mb-6 border-b border-outline-variant/50 pb-2 inline-block">SERVER OPERATOR & DEVELOPER</span>
            
            <p className="font-body-md text-on-surface-variant leading-relaxed mb-10">
              負責本 ygopro 伺服器的架設管理與微調、伺服器硬體提供、特殊規則規劃卡片製作與網頁製作。致力於打造一個自由度與競技性兼具的決鬥服務器。
            </p>
            
            <div className="flex gap-4">
              <a href="https://home.barian.moe/" target="_blank" rel="noopener noreferrer" className="p-3 bg-void-black border border-outline-variant hover:border-primary text-on-surface-variant hover:text-primary transition-all shadow-lg group-hover:shadow-[0_0_15px_rgba(31,162,255,0.15)]" title="Website"><Globe size={20} /></a>
              <a href="https://github.com/Barian0517" target="_blank" rel="noopener noreferrer" className="p-3 bg-void-black border border-outline-variant hover:border-primary text-on-surface-variant hover:text-primary transition-all shadow-lg group-hover:shadow-[0_0_15px_rgba(31,162,255,0.15)]" title="GitHub"><Github size={20} /></a>
              <a href="mailto:barianjapan@gmail.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-void-black border border-outline-variant hover:border-primary text-on-surface-variant hover:text-primary transition-all shadow-lg group-hover:shadow-[0_0_15px_rgba(31,162,255,0.15)]" title="Email"><Mail size={20} /></a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
