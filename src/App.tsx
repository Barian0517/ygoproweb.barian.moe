import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Commands } from './components/Commands';
import { About } from './components/About';
import { CardList } from './components/CardList';
import { Join } from './components/Join';
import { Footer } from './components/Footer';
import { InstallGuide } from './components/InstallGuide';
import { DuelStats } from './components/Stats/DuelStats';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');

  // Render view based on tab
  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return <Hero setCurrentTab={setCurrentTab} />;
      case 'commands':
        return <Commands />;
      case 'install':
        return <InstallGuide />;
      case 'stats':
        return <DuelStats />;
      case 'about':
        return <About />;
      case 'cards':
        return <CardList />;
      case 'join':
        return <Join setCurrentTab={setCurrentTab} />;
      default:
        return <Hero setCurrentTab={setCurrentTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30 font-sans">
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

