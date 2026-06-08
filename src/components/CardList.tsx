import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, X, Search, AlertCircle, RefreshCw, Box } from 'lucide-react';

const API_BASE = 'https://ygoproapi.barian.moe/api';
const CATEGORIES = ['全部', '怪獸', '魔法', '陷阱'];

const getAttributeString = (value: any) => {
  if (typeof value === 'string') return value;
  if (typeof value !== 'number') return '?';
  
  if (value & 0x01) return '地';
  if (value & 0x02) return '水';
  if (value & 0x04) return '炎';
  if (value & 0x08) return '风';
  if (value & 0x10) return '光';
  if (value & 0x20) return '暗';
  if (value & 0x40) return '神';
  return '?';
};

const getRaceString = (value: any) => {
  if (typeof value === 'string') return value;
  if (typeof value !== 'number') return '?';
  
  if (value & 0x1) return '戰士族';
  if (value & 0x2) return '魔法使族';
  if (value & 0x4) return '天使族';
  if (value & 0x8) return '惡魔族';
  if (value & 0x10) return '不死族';
  if (value & 0x20) return '機械族';
  if (value & 0x40) return '水族';
  if (value & 0x80) return '炎族';
  if (value & 0x100) return '岩石族';
  if (value & 0x200) return '鳥獸族';
  if (value & 0x400) return '植物族';
  if (value & 0x800) return '昆蟲族';
  // skipping some of them for brevity, kept same logic as old
  return '其他族';
};

// 模擬資料作為當本地伺服器未啟動時的備用顯示
const MOCK_CARDS = [
  { id: 19900002, name: '墮天使-伊莉絲', type: '效果怪獸', level: 8, atk: 2500, def: 2800, attribute: '暗', race: '天使族', desc: '我方1回合僅1次能將此卡特殊召喚。此卡名的①②效果1回合僅能各使用1次。\n①：向對手展示手牌中此卡發動。從牌組上方翻開五張卡，其中有「墮天使」卡片的場合，此卡特殊召喚。那之後，挑選翻開的「墮天使」卡與牌組一張「墮天使」或「禁忌的」魔法、陷阱卡送入墓地，剩下的卡回到卡組洗牌。\n②：支付1000生命值，以我方墓地1張「墮天使」魔法・陷阱卡為對象才能發動。那張魔法・陷阱卡的效果適用。那之後，墓地的那張卡回到牌組。此效果在對方回合也能發動。' },
];

export function CardList() {
  const [cards, setCards] = useState<any[]>(MOCK_CARDS);
  const [filter, setFilter] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [selectedDetails, setSelectedDetails] = useState<any | null>(null);
  const [isApiConnected, setIsApiConnected] = useState<boolean | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchCards = () => {
    setIsRefreshing(true);
    fetch(`${API_BASE}/cards`)
      .then(res => {
        if (!res.ok) throw new Error('API Response not ok');
        return res.json();
      })
      .then(data => {
        setIsApiConnected(true);
        if (Array.isArray(data) && data.length > 0) setCards(data);
      })
      .catch(() => {
        setIsApiConnected(false);
      })
      .finally(() => setIsRefreshing(false));
  };

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    if (selectedCardId) {
      if (isApiConnected) {
        fetch(`${API_BASE}/cards/${selectedCardId}`)
          .then(res => res.json())
          .then(data => setSelectedDetails(data))
          .catch(() => {
            setSelectedDetails(cards.find(c => c.id === selectedCardId));
          });
      } else {
        setSelectedDetails(cards.find(c => c.id === selectedCardId));
      }
    } else {
      setSelectedDetails(null);
    }
  }, [selectedCardId, isApiConnected, cards]);

  const isMonster = (card: any) => {
    if (typeof card.type === 'string') return !!card.type.match(/怪獸|Monster/i);
    if (typeof card.type === 'number') return (card.type & 0x1) !== 0;
    return true; 
  };
  const isSpell = (card: any) => {
    if (typeof card.type === 'string') return !!card.type.match(/魔法|Spell/i);
    if (typeof card.type === 'number') return (card.type & 0x2) !== 0;
    return false;
  };
  const isTrap = (card: any) => {
    if (typeof card.type === 'string') return !!card.type.match(/陷阱|Trap/i);
    if (typeof card.type === 'number') return (card.type & 0x4) !== 0;
    return false;
  };

  const filteredCards = cards.filter(card => {
    if (searchQuery && !card.name?.includes(searchQuery) && !card.desc?.includes(searchQuery)) {
      return false;
    }
    if (filter === '全部') return true;
    if (filter === '怪獸') return isMonster(card);
    if (filter === '魔法') return isSpell(card);
    if (filter === '陷阱') return isTrap(card);
    return true;
  });

  return (
    <div className="pt-24 pb-24 max-w-[1600px] mx-auto px-4 md:px-margin-desktop min-h-screen">
      {/* Header & Warning */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center relative z-10 border-b border-outline-variant/30 pb-10">
        <span className="text-primary font-label-caps text-xs tracking-[0.4em] block mb-2 text-center w-full">SYSTEM DATABASE</span>
        <h2 className="font-display-hero text-headline-sm md:text-headline-lg uppercase flex items-center justify-center gap-3 text-on-surface">
          <Layers size={36} className="text-secondary" /> 伺服器自製卡片
        </h2>
        
        {isApiConnected === false && (
          <div className="max-w-2xl mx-auto mt-6 bg-error/10 border border-error/30 p-4 font-body-md text-on-surface flex items-center gap-4 text-left shadow-lg">
            <AlertCircle className="text-error flex-shrink-0" size={28} />
            <div>
              <h3 className="text-error font-title-md font-bold mb-1 uppercase">無法連線到遠端 API 伺服器</h3>
              <p className="text-on-surface-variant font-body-sm">
                目前顯示為預設展示資料。請確認 API 伺服器 (<code>ygoproapi.barian.moe</code>) 正常運行中。
              </p>
            </div>
            <button 
              onClick={fetchCards} 
              className="ml-auto px-4 py-2 border border-error/50 hover:bg-error/20 text-error font-label-caps text-xs transition-colors flex items-center gap-2 uppercase"
            >
              <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} /> 重試
            </button>
          </div>
        )}
      </motion.div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 bg-surface-container-low p-2 border border-outline-variant relative z-10">
        {/* Categories */}
        <div className="flex gap-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 font-label-caps text-xs transition-all border ${
                filter === cat 
                  ? 'bg-primary/20 border-primary text-primary shadow-[0_0_10px_rgba(31,162,255,0.2)]' 
                  : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="搜尋卡片名稱或效果..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-void-black border border-outline-variant py-2.5 pl-9 pr-4 font-body-md text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 relative z-10">
        <AnimatePresence>
          {filteredCards.map(card => {
            const isMon = isMonster(card);
            const imgSrc = isApiConnected ? `${API_BASE}/images/${card.id}` : '';
            return (
              <motion.div
                layout
                key={card.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => setSelectedCardId(card.id)}
                className="group cursor-pointer flex flex-col gap-3"
              >
                <div className="relative aspect-[0.686] bg-surface-container-low border border-outline-variant hover:border-rarity-ultra/50 transition-all duration-300 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  {!isApiConnected ? (
                    <div className="w-full h-full p-4 flex flex-col items-center justify-center bg-void-black">
                      <Box className="opacity-20 mb-2" size={32} />
                      <span className="text-on-surface-variant font-bold text-center text-xs mb-2 uppercase">{card.name}</span>
                    </div>
                  ) : (
                    <img 
                      src={imgSrc} 
                      alt={card.name} 
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
                      onError={(e) => {
                         const currentSrc = e.currentTarget.src;
                         if (currentSrc.includes('barian.moe')) {
                           e.currentTarget.src = `https://cdn.233.momobako.com/ygoimg/ygopro/${card.id}.webp`;
                         } else if (currentSrc.includes('momobako')) {
                           e.currentTarget.src = `https://images.ygoprodeck.com/images/cards/${card.id}.jpg`;
                         } else {
                           e.currentTarget.style.display = 'none';
                           e.currentTarget.parentElement!.innerHTML = `<div class="w-full h-full flex flex-col items-center justify-center text-on-surface-variant gap-2 bg-void-black"><span class="material-symbols-outlined">image</span><span class="text-[10px] font-label-caps uppercase">No Image</span></div>`;
                         }
                      }}
                    />
                  )}
                  {/* Status Tag Overlay */}
                  <div className="absolute top-2 right-2 flex flex-col gap-1 items-end pointer-events-none">
                     {isMon ? (
                        <span className="bg-void-black/80 text-primary border border-primary/30 px-2 py-0.5 font-label-caps text-[9px] backdrop-blur-sm shadow-sm scale-90 group-hover:scale-100 transition-transform origin-right">
                          MONSTER
                        </span>
                     ) : (
                        <span className="bg-void-black/80 text-secondary border border-secondary/30 px-2 py-0.5 font-label-caps text-[9px] backdrop-blur-sm shadow-sm scale-90 group-hover:scale-100 transition-transform origin-right">
                          {isSpell(card) ? 'SPELL' : 'TRAP'}
                        </span>
                     )}
                  </div>
                </div>

                <div className="flex flex-col gap-1 px-1">
                  <h4 className="font-display-hero text-[16px] text-on-surface uppercase truncate" title={card.name}>{card.name}</h4>
                  
                  {isMon ? (
                    <div className="flex items-center gap-2 text-[10px] font-label-caps text-on-surface-variant opacity-80 group-hover:opacity-100 transition-opacity whitespace-nowrap overflow-hidden text-ellipsis">
                      <span>L{card.level || 0}</span>
                      <span className="w-1 h-1 bg-outline-variant rounded-full"></span>
                      <span>ATK {card.atk ?? '?'}</span>
                      <span className="w-1 h-1 bg-outline-variant rounded-full"></span>
                      <span>DEF {card.def ?? '?'}</span>
                    </div>
                  ) : (
                    <div className="text-[10px] font-label-caps text-on-surface-variant opacity-80 group-hover:opacity-100 transition-opacity">
                      {typeof card.type === 'string' ? card.type : isSpell(card) ? 'SPELL CARD' : 'TRAP CARD'}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Card Details Modal */}
      <AnimatePresence>
        {selectedDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-void-black/95 backdrop-blur-[20px]" onClick={() => setSelectedCardId(null)}>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ ease: "easeOut", duration: 0.2 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-5xl bg-surface-container border border-outline-variant shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-hidden"
            >
              <button 
                onClick={() => setSelectedCardId(null)} 
                className="absolute top-4 right-4 z-40 p-2 font-label-caps text-xs border border-transparent hover:border-outline-variant bg-surface-container-low text-on-surface hover:bg-error/20 hover:text-error transition-colors flex gap-2 items-center"
              >
                CLOSE <X size={14} />
              </button>
              
              {/* Left Side: Photo */}
              <div className="w-full md:w-[420px] p-6 lg:p-10 flex flex-col items-center justify-center bg-void-black border-r border-outline-variant/30 relative">
                {(!isApiConnected) ? (
                  <div className="w-full max-w-[320px] aspect-[0.686] bg-surface-container border border-outline-variant flex flex-col items-center justify-center shadow-2xl relative z-10">
                     <Box className="opacity-20 mb-4" size={48} />
                     <span className="text-on-surface font-title-md uppercase mb-2 text-center px-4">{selectedDetails.name}</span>
                     <span className="text-on-surface-variant text-xs font-label-caps">NO IMAGE</span>
                  </div>
                ) : (
                  <img 
                    src={`${API_BASE}/images/${selectedDetails.id}`}
                    alt="Card Full"
                    onError={(e) => {
                       const currentSrc = e.currentTarget.src;
                       if (currentSrc.includes('barian.moe')) {
                         e.currentTarget.src = `https://cdn.233.momobako.com/ygoimg/ygopro/${selectedDetails.id}.webp`;
                       } else if (currentSrc.includes('momobako')) {
                         e.currentTarget.src = `https://images.ygoprodeck.com/images/cards/${selectedDetails.id}.jpg`;
                       } else {
                         e.currentTarget.style.display = 'none';
                         e.currentTarget.parentElement!.innerHTML = `<div class="w-full max-w-[320px] aspect-[0.686] bg-surface-container border border-outline-variant flex flex-col items-center justify-center shadow-2xl relative z-10"><span class="text-on-surface font-title-md uppercase mb-2 text-center px-4">${selectedDetails.name}</span><span class="text-on-surface-variant text-xs font-label-caps">IMAGE ERROR</span></div>`;
                       }
                    }}
                    className="w-full max-w-[350px] shadow-[0_10px_40px_rgba(0,0,0,0.8)] border border-white/5"
                  />
                )}
              </div>

              {/* Right Side: Details Pane */}
              <div className="flex-1 flex flex-col pt-10 pb-6 px-6 lg:px-12 overflow-y-auto custom-scrollbar bg-surface-container">
                
                {/* Header */}
                <div className="border-b border-outline-variant/50 pb-6 mb-8 mt-4 md:mt-0">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="font-display-hero text-3xl md:text-5xl text-on-surface uppercase leading-none truncate">{selectedDetails.name}</h2>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    {isMonster(selectedDetails) ? (
                       <>
                         <span className="px-3 py-1 font-label-caps text-[10px] bg-primary/20 text-primary border border-primary/50">LEVEI {selectedDetails.level || 0}</span>
                         <span className="px-3 py-1 font-label-caps text-[10px] bg-surface-container-high text-on-surface border border-outline-variant">{getAttributeString(selectedDetails.attribute)}</span>
                         <span className="px-3 py-1 font-label-caps text-[10px] bg-surface-container-high text-on-surface border border-outline-variant">{getRaceString(selectedDetails.race)}</span>
                       </>
                    ) : (
                       <span className="px-3 py-1 font-label-caps text-[10px] bg-secondary/20 text-secondary border border-secondary/50">
                         {typeof selectedDetails.type === 'string' ? selectedDetails.type : isSpell(selectedDetails) ? 'SPELL' : 'TRAP'}
                       </span>
                    )}
                  </div>
                </div>

                {/* Stats Bar */}
                {isMonster(selectedDetails) && (
                  <div className="flex bg-void-black border border-outline-variant mb-8 divide-x divide-outline-variant">
                    <div className="flex-1 p-4 flex flex-col md:flex-row md:items-center justify-between gap-1">
                      <span className="text-on-surface-variant font-label-caps text-[10px]">ATK Pts</span>
                      <span className="font-display-hero text-2xl text-primary">{selectedDetails.atk ?? '?'}</span>
                    </div>
                    <div className="flex-1 p-4 flex flex-col md:flex-row md:items-center justify-between gap-1">
                      <span className="text-on-surface-variant font-label-caps text-[10px]">DEF Pts</span>
                      <span className="font-display-hero text-2xl text-primary">{selectedDetails.def ?? '?'}</span>
                    </div>
                  </div>
                )}

                {/* Text Area */}
                <div className="flex-1 bg-void-black p-6 border border-outline-variant/30 leading-relaxed overflow-y-auto mb-4 custom-scrollbar shadow-inner relative">
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-on-surface-variant/50"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-on-surface-variant/50"></div>
                  <div className="font-label-caps text-on-surface-variant text-[10px] mb-4 border-b border-outline-variant/30 pb-2">EFFECT DIRECTIVE</div>
                  <p className="text-on-surface font-body-md whitespace-pre-wrap text-[14px]">
                    {selectedDetails.desc || 'NO TARGET DATA FOUND.'}
                  </p>
                </div>
                
                <div className="flex justify-between items-center mt-auto border-t border-outline-variant/30 pt-4">
                   <div className="text-[10px] text-on-surface-variant font-label-caps opacity-50">DESIGNED BY BRS YU-GI-OH SERVER</div>
                   <div className="text-on-surface-variant text-[10px] font-mono bg-surface-container px-2 py-1 border border-outline-variant">SYS.ID: {selectedDetails.id}</div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

