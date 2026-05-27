import { Globe, Github, Mail, Crown } from 'lucide-react';
import { motion } from 'motion/react';

export function About() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
      <div className="grid grid-cols-1 gap-8 max-w-md mx-auto">
        {/* Barian */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative bg-slate-900/80 border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden backdrop-blur-sm"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-pink-500/10 blur-[80px] rounded-full -mr-16 -mt-16 transition-opacity opacity-40 group-hover:opacity-80"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="relative mb-6 group-hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-0 rounded-full bg-pink-500/10 blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <img src="https://cloudreve.barian.moe/f/44ir/avator.jpg" alt="幽影櫻 (Barian)" className="w-32 h-32 rounded-full border-4 border-pink-500/30 object-cover relative z-10 shadow-xl bg-slate-950" />
              <div className="absolute bottom-0 right-0 p-2.5 rounded-full bg-slate-900 border border-pink-500/30 text-pink-400 z-20 shadow-lg">
                <Crown size={20} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">幽影櫻 (Barian)</h3>
            <span className="text-xs font-mono font-bold uppercase tracking-wider mb-6 text-pink-400 px-3 py-1 rounded-full bg-white/5 border border-white/5">服務器擁有者 & 管理者</span>
            <p className="text-gray-400 leading-relaxed mb-8 max-w-sm">負責本 ygopro 伺服器的架設管理與微調、伺服器硬體提供、特殊規則規劃卡片製作與網頁製作。致力於打造一個自由度與競技性兼具的決鬥服務器。</p>
            <div className="flex gap-4">
              <a href="https://home.barian.moe/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all hover:scale-110 border border-transparent hover:border-white/10 shadow-lg" title="Website"><Globe size={18} /></a>
              <a href="https://github.com/Barian0517" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all hover:scale-110 border border-transparent hover:border-white/10 shadow-lg" title="GitHub"><Github size={18} /></a>
              <a href="mailto:barianjapan@gmail.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all hover:scale-110 border border-transparent hover:border-white/10 shadow-lg" title="Email"><Mail size={18} /></a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
