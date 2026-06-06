import { Menu, X, Swords } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export function Navbar({ currentTab, setCurrentTab }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'home', label: '首頁' },
    { id: 'cards', label: '卡片列表' },
    { id: 'commands', label: '指令大全' },
    { id: 'install', label: '安裝教學' },
    { id: 'stats', label: '決鬥一覽' },
    { id: 'about', label: '關於作者' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => setCurrentTab('home')}
          >
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30 transition-colors">
              <Swords size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight hover:text-blue-300 transition-colors">幽影櫻的 mdpro 伺服器</h1>
              <p className="text-xs text-white/50 tracking-widest uppercase">DIY Server</p>
            </div>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            <motion.button 
              onClick={() => setCurrentTab('join')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 rounded-full bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] font-bold hover:bg-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all flex items-center gap-2"
            >
              加入伺服器 <span>&rarr;</span>
            </motion.button>
            <div className="flex gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`relative px-1 py-2 text-sm font-medium transition-colors ${
                    currentTab === item.id ? 'text-white' : 'text-white/60 hover:text-white hover:scale-105'
                  } transition-transform`}
                >
                  {item.label}
                  {currentTab === item.id && (
                    <motion.span 
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-400" 
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-white/70 hover:text-white transition-colors"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-slate-950 border-b border-white/5 px-4 pb-4 overflow-hidden"
          >
            <div className="flex flex-col gap-4 pt-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setMobileOpen(false);
                  }}
                  className={`text-left px-3 py-2 text-base font-medium rounded-md transition-all ${
                    currentTab === item.id ? 'bg-blue-500/20 text-blue-400' : 'text-white/60 hover:bg-white/5 hover:text-white hover:translate-x-1'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button 
                onClick={() => {
                  setCurrentTab('join');
                  setMobileOpen(false);
                }}
                className="mt-2 w-full px-4 py-3 rounded-xl bg-blue-500 text-white font-bold justify-center flex items-center gap-2 hover:bg-blue-400 transition-colors"
              >
                加入伺服器 <span>&rarr;</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
