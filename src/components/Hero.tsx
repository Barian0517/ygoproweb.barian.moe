import { Copy, Server } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

export function Hero({ setCurrentTab }: { setCurrentTab?: (tab: string) => void }) {
  const [copied, setCopied] = useState(false);
  const serverAddress = 'ygopro.barian.moe';

  const handleCopy = () => {
    navigator.clipboard.writeText(serverAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background with gradient placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/80 to-slate-950 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-950 to-slate-950 z-0" />
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/15 blur-[120px] rounded-full mix-blend-screen pointer-events-none" 
        />
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600/15 blur-[150px] rounded-full mix-blend-screen pointer-events-none" 
        />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center"
      >
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-cyan-300 text-xs font-semibold tracking-wider mb-8 uppercase backdrop-blur-sm">
          <span>✨</span> SEASON 2026 • MDPRO 1.4.4
        </motion.div>

        <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-black text-center mb-4 tracking-tight drop-shadow-xl text-white">
          幽影櫻
        </motion.h2>
        <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-black text-center mb-8 text-blue-400 tracking-tight drop-shadow-2xl">
          mdpro DIY server
        </motion.h2>

        <motion.p variants={itemVariants} className="text-lg md:text-xl text-white/70 mb-16 text-center max-w-2xl font-medium leading-relaxed">
          一個提供 <span className="text-blue-400 font-bold">自製卡</span> 決鬥的 ygopro 服務器<br/>
          <span className="text-sm text-white/50">(支持 mdpro, ygopro, ygopro2, ygomobile)</span>
        </motion.p>

        {/* Server IP Box */}
        <motion.div variants={itemVariants} className="w-full max-w-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 hover:border-blue-500/30 transition-colors rounded-3xl p-4 md:p-6 flex flex-col md:flex-row items-center gap-6 shadow-2xl">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-white/50 hover:bg-blue-500/20 hover:text-blue-400 transition-all cursor-pointer">
              <Server size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold">加入伺服器</h3>
            </div>
          </div>

          <div className="flex-1 w-full flex bg-black/40 rounded-xl p-1 border border-white/5 items-center justify-between group hover:border-blue-500/40 transition-colors">
            <code className="text-white/80 font-mono pl-4 pr-2 truncate">{serverAddress}</code>
            <button
              onClick={handleCopy}
              className="p-3 text-white/40 hover:text-white hover:bg-blue-500/20 rounded-lg transition-all"
              title="複製伺服器地址"
            >
              {copied ? <span className="text-green-400 text-xs font-bold">已複製!</span> : <Copy size={18} />}
            </button>
          </div>

          <button 
            onClick={() => setCurrentTab && setCurrentTab('join')}
            className="w-full md:w-auto px-8 py-4 rounded-xl bg-blue-500 text-white font-bold text-lg hover:bg-blue-400 hover:scale-105 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-[0_0_20px_rgba(59,130,246,0.4)]"
          >
            加入遊戲 &rarr;
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
