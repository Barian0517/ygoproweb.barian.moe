import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, X, Search, AlertCircle, RefreshCw } from 'lucide-react';

const API_BASE = 'https://ygoproapi.barian.moe/api';
const CATEGORIES = ['全部', '怪獸', '魔法', '陷阱'];

const getAttributeString = (value: any) => {
  if (typeof value === 'string') return value;
  if (typeof value !== 'number') return '?';
  
  if (value & 0x01) return '地';
  if (value & 0x02) return '水';
  if (value & 0x04) return '炎';
  if (value & 0x08) return '風';
  if (value & 0x10) return '光';
  if (value & 0x20) return '闇';
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
  if (value & 0x1000) return '雷族';
  if (value & 0x2000) return '龍族';
  if (value & 0x4000) return '獸族';
  if (value & 0x8000) return '獸戰士族';
  if (value & 0x10000) return '恐龍族';
  if (value & 0x20000) return '魚族';
  if (value & 0x40000) return '海龍族';
  if (value & 0x80000) return '爬蟲類族';
  if (value & 0x100000) return '念動力族';
  if (value & 0x200000) return '幻神獸族';
  if (value & 0x400000) return '創造神族';
  if (value & 0x800000) return '幻龍族';
  if (value & 0x1000000) return '電子界族';
  if (value & 0x2000000) return '幻想魔族';
  return '?';
};

// 模擬資料作為當本地伺服器未啟動時的備用顯示
const MOCK_CARDS = [
  { id: 19900002, name: '墮天使-伊莉絲', type: '效果怪獸', level: 8, atk: 2500, def: 2800, attribute: '闇', race: '天使族', desc: '我方1回合僅1次能將此卡特殊召喚。此卡名的①②效果1回合僅能各使用1次。\n①：向對手展示手牌中此卡發動。從牌組上方翻開五張卡，其中有「墮天使」卡片的場合，此卡特殊召喚。那之後，挑選翻開的「墮天使」卡與牌組一張「墮天使」或「禁忌的」魔法、陷阱卡送入墓地，剩下的卡回到卡組洗牌。\n②：支付1000生命值，以我方墓地1張「墮天使」魔法・陷阱卡為對象才能發動。那張魔法・陷阱卡的效果適用。那之後，墓地的那張卡回到牌組。此效果在對方回合也能發動。' },
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
    <div className="min-h-screen pt-32 pb-20 px-4 max-w-7xl mx-auto">
      {/* Header & Warning */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center relative z-10">
        <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3 text-white">
          <Layers size={36} className="text-blue-400" /> 伺服器自製卡片列表
        </h2>
        
        {isApiConnected === false && (
          <div className="max-w-2xl mx-auto mt-6 bg-red-950/50 border border-red-500/30 rounded-xl p-4 flex items-center gap-4 text-left shadow-lg">
            <AlertCircle className="text-red-400 flex-shrink-0" size={28} />
            <div>
              <h3 className="text-red-300 font-bold mb-1">無法連線到遠端 API 伺服器</h3>
              <p className="text-red-200/70 text-sm">
                目前顯示為預設展示資料。請確認 API 伺服器 (<code>ygoproapi.barian.moe</code>) 正常運行中。
              </p>
            </div>
            <button 
              onClick={fetchCards} 
              className="ml-auto px-4 py-2 bg-red-900/50 hover:bg-red-800/80 rounded-lg text-red-200 transition-colors flex items-center gap-2"
            >
              <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} /> 重試
            </button>
          </div>
        )}
      </motion.div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 bg-slate-900/50 p-4 rounded-2xl border border-blue-900/30 backdrop-blur-sm relative z-10">
        {/* Categories */}
        <div className="flex gap-2 p-1 bg-slate-950/80 rounded-xl">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                filter === cat 
                  ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="搜尋卡片名稱或效果..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 relative z-10">
        <AnimatePresence>
          {filteredCards.map(card => {
            const isMon = isMonster(card);
            const imgSrc = isApiConnected ? `${API_BASE}/images/${card.id}` : '';
            return (
              <motion.div
                layout
                key={card.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedCardId(card.id)}
                className="relative aspect-[0.686] bg-slate-900 rounded-lg overflow-hidden cursor-pointer group border border-slate-800 hover:border-blue-500/60 shadow-lg"
              >
                {!isApiConnected ? (
                  <div className="w-full h-full p-4 flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                    <span className="text-white/80 font-bold text-center text-sm mb-2">{card.name}</span>
                    <span className="text-blue-400/50 text-xs px-2 py-1 bg-slate-950 rounded uppercase tracking-wider text-center">
                      {isMon ? 'Monster' : isSpell(card) ? 'Spell' : 'Trap'}
                    </span>
                  </div>
                ) : (
                  <img 
                    src={imgSrc} 
                    alt={card.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = `<div class="w-full h-full p-4 flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900"><span class="text-white/80 font-bold text-center text-sm mb-2">${card.name}</span><span class="text-white/30 text-[10px]">Image missing</span></div>`;
                    }}
                  />
                )}
                
                {/* Hover overlay */}
                <div className="absolute inset-x-0 bottom-0 p-3 pt-8 bg-gradient-to-t from-black via-slate-950/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  <h4 className="text-white font-bold text-sm truncate">{card.name}</h4>
                  {isMon ? (
                    <div className="text-[11px] text-blue-200 mt-1 flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <span className="opacity-80">{getAttributeString(card.attribute)} • {getRaceString(card.race)}</span>
                        <span className="text-yellow-400 tracking-wider">{'★'.repeat(Math.min(card.level || 0, 12))}</span>
                      </div>
                      <div className="font-mono text-cyan-400">
                        ATK {card.atk ?? '?'} / DEF {card.def ?? '?'}
                      </div>
                    </div>
                  ) : (
                    <div className="text-[12px] text-emerald-400/90 mt-1 font-bold">
                      {typeof card.type === 'string' ? card.type : isSpell(card) ? '魔法卡' : '陷阱卡'}
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md" onClick={() => setSelectedCardId(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ ease: "easeOut", duration: 0.2 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-5xl bg-slate-900 border border-blue-500/30 rounded-2xl shadow-[0_0_50px_rgba(59,130,246,0.15)] flex flex-col md:flex-row overflow-hidden relative max-h-[90vh]"
            >
              <button onClick={() => setSelectedCardId(null)} className="absolute top-4 right-4 z-10 p-2 bg-black/60 rounded-full text-white/60 hover:text-white hover:bg-red-500 transition-colors backdrop-blur-md">
                <X size={20} />
              </button>
              
              {/* Left Side: Photo */}
              <div className="w-full md:w-[420px] p-6 flex flex-col items-center justify-center bg-[#0a0a0f] border-r border-white/5 relative">
                {/* Visual backdrop glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent pointer-events-none" />
                
                {(!isApiConnected) ? (
                  <div className="w-full max-w-[320px] aspect-[0.686] bg-slate-800 rounded-xl border border-slate-700 flex flex-col items-center justify-center shadow-2xl relative z-10">
                     <span className="text-white/80 font-bold mb-2">{selectedDetails.name}</span>
                     <span className="text-white/30 text-sm">無卡圖預覽</span>
                  </div>
                ) : (
                  <img 
                    src={`${API_BASE}/images/${selectedDetails.id}`}
                    alt="Card Full"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = `<div class="w-full max-w-[320px] aspect-[0.686] bg-slate-800 rounded-xl border border-slate-700 flex flex-col items-center justify-center shadow-2xl relative z-10"><span class="text-white/80 font-bold mb-2">${selectedDetails.name}</span><span class="text-white/30 text-sm">卡圖載入失敗</span></div>`;
                    }}
                    className="w-full max-w-[350px] rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] border border-white/10 relative z-10"
                  />
                )}
              </div>

              {/* Right Side: Details Pane */}
              <div className="flex-1 flex flex-col pt-8 pb-6 px-6 md:px-10 overflow-y-auto custom-scrollbar">
                
                {/* Header */}
                <div className="border-b border-white/10 pb-5 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-3xl font-black text-white tracking-wide">{selectedDetails.name}</h2>
                    {isMonster(selectedDetails) && selectedDetails.attribute !== undefined && selectedDetails.attribute !== null && (
                      <div className="w-10 h-10 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center font-bold text-sm shadow-inner text-white/80">
                        {getAttributeString(selectedDetails.attribute).substring(0,2)}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    {isMonster(selectedDetails) ? (
                       <>
                         <span className="text-yellow-400 tracking-widest leading-none flex items-center text-xl drop-shadow-md">
                           {'★'.repeat(Math.min(selectedDetails.level || 0, 12))}
                         </span>
                         <span className="px-3 py-0.5 rounded text-sm font-bold bg-blue-900/40 text-blue-300 border border-blue-500/20">{getAttributeString(selectedDetails.attribute)}</span>
                         <span className="px-3 py-0.5 rounded text-sm font-bold bg-orange-900/40 text-orange-200 border border-orange-500/20">{getRaceString(selectedDetails.race)}</span>
                       </>
                    ) : (
                       <span className="px-3 py-1 rounded text-sm font-bold bg-emerald-900/40 text-emerald-300 border border-emerald-500/20">
                         {typeof selectedDetails.type === 'string' ? selectedDetails.type : isSpell(selectedDetails) ? '魔法卡' : '陷阱卡'}
                       </span>
                    )}
                  </div>
                </div>

                {/* Stats Bar */}
                {isMonster(selectedDetails) && (
                  <div className="flex items-center gap-12 bg-[#050508] rounded-xl p-4 border border-blue-900/30 mb-6 shadow-inner">
                    <div className="flex items-center gap-3">
                      <span className="text-blue-400/50 font-bold text-sm tracking-widest uppercase">ATK</span>
                      <span className="text-3xl font-mono text-cyan-400 font-bold drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">{selectedDetails.atk ?? '?'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-blue-400/50 font-bold text-sm tracking-widest uppercase">DEF</span>
                      <span className="text-3xl font-mono text-cyan-400 font-bold drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">{selectedDetails.def ?? '?'}</span>
                    </div>
                  </div>
                )}

                {/* Text Area */}
                <div className="flex-1 bg-[#050508] rounded-xl p-5 border border-white/5 shadow-inner leading-relaxed">
                  <div className="font-bold text-white/50 text-xs mb-3 flex items-center gap-2">
                    <span className="h-[1px] flex-1 bg-white/10"></span>
                    卡片效果
                    <span className="h-[1px] flex-1 bg-white/10"></span>
                  </div>
                  <p className="text-blue-100/80 font-serif whitespace-pre-wrap text-[15px]">
                    {selectedDetails.desc || '無效果說明'}
                  </p>
                </div>
                
                <div className="mt-5 text-right flex justify-between items-center">
                   <div className="text-xs text-blue-400/30 font-serif italic">DIY by [幽影櫻]</div>
                   <div className="text-slate-500 text-xs font-mono bg-white/5 px-2 py-1 rounded">ID: {selectedDetails.id}</div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

