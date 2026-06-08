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
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)] h-20">
      <div className="flex justify-between items-center px-4 md:px-margin-desktop h-full w-full max-w-max-width mx-auto">
        <div className="flex items-center gap-8">
          <div 
            className="font-headline-lg text-[24px] md:text-[32px] text-primary drop-shadow-[0_0_8px_rgba(152,203,255,0.5)] tracking-widest uppercase cursor-pointer"
            onClick={() => setCurrentTab('home')}
          >
            幽影櫻 MDPRO
          </div>
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`font-label-caps uppercase tracking-tighter transition-colors ${
                  currentTab === item.id 
                    ? 'text-secondary border-b-2 border-secondary font-bold pb-1 scale-105 transition-transform' 
                    : 'text-on-surface-variant font-medium hover:text-primary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-4">
          <button 
            onClick={() => setCurrentTab('join')}
            className="font-label-caps text-label-caps bg-secondary text-on-secondary px-6 py-2 hover:brightness-110 transition-all duration-300 active:scale-95 shadow-[0_0_10px_rgba(233,195,73,0.3)]"
          >
            加入伺服器
          </button>
        </div>
        <div className="lg:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-on-surface-variant hover:text-primary transition-colors"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-surface border-b border-outline-variant/30 px-4 pb-4 overflow-hidden"
          >
            <div className="flex flex-col gap-4 pt-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setMobileOpen(false);
                  }}
                  className={`text-left px-3 py-2 text-base font-label-caps uppercase rounded-md transition-all ${
                    currentTab === item.id 
                      ? 'bg-primary/20 text-primary' 
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-primary'
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
                className="mt-2 w-full px-4 py-3 bg-secondary text-on-secondary font-label-caps uppercase justify-center flex items-center shadow-[0_0_10px_rgba(233,195,73,0.3)] border border-secondary"
              >
                加入伺服器
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
