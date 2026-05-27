import { Globe, Github, Mail, Crown } from 'lucide-react';
import { motion } from 'motion/react';

export function About() {
  const iconVariants = {
    hover: { scale: 1.1, y: -5, backgroundColor: 'rgba(59,130,246,0.2)', color: '#60a5fa' }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-slate-900/80 backdrop-blur-sm border border-blue-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden group hover:border-blue-400/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] transition-all"
      >
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-blue-500/20 blur-[50px] rounded-full group-hover:bg-blue-400/30 transition-colors" />
        
        <div className="relative z-10 flex flex-col items-center">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative mb-6"
          >
            <div className="w-32 h-32 rounded-full border-4 border-slate-900 shadow-[0_0_0_2px_rgba(59,130,246,0.4)] bg-gradient-to-tr from-cyan-400 to-blue-600 p-1 group-hover:rotate-12 transition-transform duration-500">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden">
                {/* Generic cute anime style avatar placeholder */}
                <div className="w-full h-full bg-blue-100/10 flex flex-col items-center justify-end relative">
                    <div className="w-20 h-20 bg-white/90 rounded-full translate-y-4 shadow-inner" />
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 text-5xl group-hover:scale-110 transition-transform">🌸</div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center border border-blue-500/40 text-blue-400 shadow-lg group-hover:text-cyan-300 transition-colors">
              <Crown size={20} />
            </div>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold mb-2 tracking-tight group-hover:text-blue-300 transition-colors"
          >
            幽影櫻 (Barian)
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex gap-2 mb-8"
          >
            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs text-blue-200/80">
              伺服器創始人 & 遊戲策劃
            </span>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-white/60 leading-relaxed mb-10 text-sm group-hover:text-white/80 transition-colors"
          >
            負責 mdpro 伺服器的核心玩法設計、伺服器硬體提供、特殊規則規劃與網頁製作。
            致力於打造一個高自由度與競技性兼具的完美決鬥世界。
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4"
          >
            <motion.a variants={iconVariants} whileHover="hover" href="https://barian.moe" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 transition-all">
              <Globe size={20} />
            </motion.a>
            <motion.a variants={iconVariants} whileHover="hover" href="https://github.com" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 transition-all">
              <Github size={20} />
            </motion.a>
            <motion.a variants={iconVariants} whileHover="hover" href="mailto:barian0517@gmail.com" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 transition-all">
              <Mail size={20} />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
