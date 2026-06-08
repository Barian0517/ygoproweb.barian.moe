import { Copy, Server } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export function SubmissionShowcase() {
  const images = [
    "https://cloudreve.barian.moe/f/3nXFj/716762473_1338702608371802_5137108124084239418_n.png", // Allow user to change image direct link here later
    "https://cloudreve.barian.moe/f/geaUx/708468275_1526512899216831_1838781026175208371_n.png", // Allow user to change image direct link here later
    "https://cloudreve.barian.moe/f/5BLIj/718587456_989117477307906_5976776300709250429_n.png" // Allow user to change image direct link here later
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="py-24 px-4 md:px-margin-desktop max-w-max-width mx-auto">
      <div className="flex flex-col md:flex-row items-stretch border border-outline-variant bg-surface-container relative overflow-hidden group min-h-[500px]">
        <div className="flex-1 p-8 md:p-16 flex flex-col justify-center relative z-20 bg-void-black/80 backdrop-blur-sm md:bg-void-black/60 md:backdrop-blur-md border-r border-outline-variant/30">
          <span className="text-secondary font-label-caps text-xs tracking-[0.4em] block mb-4">CREATION STUDIO</span>
          <h2 className="font-display-hero text-[40px] md:text-[56px] uppercase leading-tight mb-6">卡包製作與投稿</h2>
          <p className="text-on-surface-variant font-body-lg leading-relaxed mb-8 max-w-xl">
            提供完善的自製卡製作系統，不需要下載額外的卡片編輯器撰寫 Lua 設定卡片資料。自帶卡圖生成器讓您及時預覽卡片在決鬥中的樣子，並提供完善的投稿審核系統，讓您的創意能夠及時的加入到決鬥中。
          </p>
          <a
            href="https://ygoserver.barian.moe/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-secondary/10 hover:bg-secondary/20 text-secondary border border-secondary p-4 w-fit transition-colors"
          >
            <span className="font-label-caps tracking-widest text-sm">前往製卡器</span>
            <span className="material-symbols-outlined">launch</span>
          </a>
        </div>
        <div className="md:w-1/2 absolute md:relative inset-0 opacity-40 md:opacity-100 transition-opacity z-10 bg-void-black">
          {images.map((src, index) => (
             <div key={index} className="absolute inset-0 z-0">
               <motion.img 
                 src={src} 
                 alt={`製作與投稿網頁預覽 ${index + 1}`}
                 className="w-full h-full object-cover"
                 initial={{ opacity: 0 }}
                 animate={{ 
                   opacity: index === currentIndex ? 1 : 0, 
                   scale: index === currentIndex ? 1.05 : 1 
                 }}
                 transition={{ duration: 1.2, ease: "easeInOut" }}
               />
             </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-surface-container md:from-surface-container/20 md:via-transparent to-transparent z-10 pointer-events-none"></div>
          
          {/* Controls */}
          <div className="absolute bottom-6 left-1/2 md:left-auto md:right-12 -translate-x-1/2 md:translate-x-0 flex gap-3 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 transition-all outline-none rounded-full ${
                  index === currentIndex ? 'bg-secondary w-8 shadow-[0_0_8px_rgba(var(--color-secondary),0.6)]' : 'bg-outline-variant/60 hover:bg-secondary/50 w-4'
                }`}
                aria-label={`切換至圖片 ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Hero({ setCurrentTab }: { setCurrentTab?: (tab: string) => void }) {
  const [copied, setCopied] = useState(false);
  const serverAddress = 'ygopro.barian.moe';

  const handleCopy = () => {
    navigator.clipboard.writeText(serverAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
      const bg = document.getElementById('hero-image');
      if (bg) {
        bg.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative pt-20 overflow-hidden circuit-pattern min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Massive Immersive Background */}
        <div className="absolute inset-0 z-0">
          <img 
            id="hero-image" 
            alt="Hero background" 
            className="w-full h-full object-cover object-top origin-top parallax-bg scale-110 opacity-60" 
            src="https://cloudreve.barian.moe/f/jadhb/161286074_2805390906344898_1172348832472649761_n%281%29.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void-black via-void-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-margin-mobile max-w-4xl mx-auto">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1 bg-primary/10 border border-primary/30 text-primary font-label-caps tracking-widest text-[10px]">
            <span className="w-2 h-2 bg-primary animate-pulse"></span>
            MDPRO DIY COMMUNITY
          </div>
          <h1 className="font-display-hero text-headline-lg-mobile md:text-display-hero uppercase tracking-tighter leading-tight mb-4">
            <span className="text-secondary-fixed text-glow-gold drop-shadow-md">幽影櫻 </span>
            <span className="text-on-surface">mdpro DIY SERVER</span>
          </h1>
          <p className="font-title-md text-on-surface-variant mb-2 tracking-wide">
            一個提供 <span className="text-primary font-bold">自製卡</span> 決鬥的 <span className="italic">ygopro</span> 伺服器
          </p>
          <p className="font-body-md text-on-surface-variant mb-12 tracking-wide opacity-70">
            (支持 mdpro, ygopro, ygopro2, ygomobile)
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => setCurrentTab && setCurrentTab('join')}
              className="group relative px-10 py-5 bg-primary-container text-on-primary-container font-display-hero text-[20px] uppercase tracking-widest gold-border-top hover:brightness-110 active:scale-95 transition-all shadow-[0_0_30px_rgba(0,163,255,0.4)] overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                加入遊戲
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>

            {/* Server Info Card */}
            <div className="glass-panel bg-surface-container-low/40 backdrop-blur-md border border-white/10 p-4 min-w-[320px] flex items-center justify-between gap-4">
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
                  <span className="font-label-caps text-[10px] text-green-500 leading-none">ONLINE</span>
                </div>
                <code className="text-secondary-fixed font-label-caps text-base leading-none">{serverAddress}</code>
              </div>
              <button 
                onClick={handleCopy}
                className={`p-3 border transition-colors flex items-center justify-center ${copied ? 'bg-green-500 text-white border-green-500' : 'border-outline-variant bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface-variant'}`}
                title="複製伺服器地址"
              >
                {copied ? <span className="material-symbols-outlined text-sm">check</span> : <span className="material-symbols-outlined text-sm">content_copy</span>}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-20 py-24 px-4 md:px-margin-desktop max-w-max-width mx-auto border-t border-outline-variant/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* Feature 1 */}
          <div className="group p-8 bg-surface-container-lowest border-l-4 border-primary/40 hover:border-primary transition-all bg-gradient-to-br from-surface-container-low to-transparent">
            <div className="mb-6 w-16 h-16 flex items-center justify-center bg-surface-container-high border border-outline-variant text-primary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'wght' 300" }}>style</span>
            </div>
            <h3 className="font-display-hero text-[20px] text-primary uppercase mb-4 tracking-widest">自製卡片</h3>
            <p className="text-on-surface-variant font-body-md leading-relaxed">
              發揮你的想像力，讓您可以在伺服器中實踐最具想像力的連鎖與構築。或者還原動漫中，尚未實卡卡化的卡片。
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group p-8 bg-surface-container-lowest border-l-4 border-secondary-fixed/40 hover:border-secondary-fixed transition-all bg-gradient-to-br from-surface-container-low to-transparent">
            <div className="mb-6 w-16 h-16 flex items-center justify-center bg-surface-container-high border border-outline-variant text-secondary-fixed group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'wght' 300" }}>military_tech</span>
            </div>
            <h3 className="font-display-hero text-[20px] text-secondary-fixed uppercase mb-4 tracking-widest">公平競技</h3>
            <p className="text-on-surface-variant font-body-md leading-relaxed">
              不論是 DIY 卡片還是經典構築，我們致力於營造一個公平、具有競爭性的決鬥環境。當自製卡過強時，可以調整效果，或者使用禁卡表平衡強度。
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group p-8 bg-surface-container-lowest border-l-4 border-primary/40 hover:border-primary transition-all bg-gradient-to-br from-surface-container-low to-transparent">
            <div className="mb-6 w-16 h-16 flex items-center justify-center bg-surface-container-high border border-outline-variant text-primary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'wght' 300" }}>lan</span>
            </div>
            <h3 className="font-display-hero text-[20px] text-primary uppercase mb-4 tracking-widest">低門檻</h3>
            <p className="text-on-surface-variant font-body-md leading-relaxed">
              我們提供完善的自製卡製作系統，讓你不需要下載額外的卡片編輯器撰寫lua設定卡片資料，且自帶卡圖生成器讓你及時預覽你的卡片在決鬥中的樣子，並提供完善的投稿審核系統，讓你的創意能夠及時的加入到決鬥中。
            </p>
          </div>
        </div>
      </section>

      {/* Deck Showcase */}
      <SubmissionShowcase />
    </div>
  );
}
