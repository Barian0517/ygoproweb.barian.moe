import { useState, useEffect } from 'react';
import { Loader2, TrendingUp, Presentation, Image as ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { CardName } from './CardName';

interface PopularCard {
  id: number;
  name: string;
  deckCount?: number;
  usageCount?: number;
  count?: number;
}

export function PopularCards({ month }: { month: string }) {
  const [cards, setCards] = useState<PopularCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // 假設 API 位置，可視實際情況調整
    fetch(`https://ygoproapi.barian.moe/api/stats/cards/ranking?month=${month}`)
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setCards(data);
        } else {
          setCards([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load popular cards', err);
        setCards([]);
        setLoading(false);
      });
  }, [month]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="bg-surface-container border border-outline-variant/30 p-12 text-center text-on-surface-variant flex flex-col items-center justify-center gap-4">
        <Presentation size={48} className="text-outline-variant" />
        <p className="font-body-md">這個月份暫無熱門卡片數據。</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-surface-container border-l-4 border-rarity-ultra p-6 flex items-start gap-4">
        <TrendingUp className="flex-shrink-0 mt-1 text-rarity-ultra" size={24} />
        <div>
          <h4 className="font-title-md text-rarity-ultra uppercase tracking-widest mb-2">本月熱門卡片</h4>
          <p className="text-on-surface-variant font-body-sm leading-relaxed">
            這是在此月份被排入牌組最多次的卡片排行。
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-2 gap-4">
        {cards.slice(0, 50).map((card, index) => (
          <motion.div 
            key={card.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02 }}
            className="group bg-surface-container relative border border-outline-variant hover:border-rarity-ultra/50 transition-colors overflow-hidden flex flex-col"
          >
            {/* Card visual showcase */}
            <div className="relative aspect-[0.686] bg-void-black border-b border-outline-variant">
              <img 
                src={`https://ygoproapi.barian.moe/api/images/${card.id}`}
                alt={card.name} 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                onError={(e) => {
                   const currentSrc = e.currentTarget.src;
                   if (currentSrc.includes('ygoproapi')) {
                     e.currentTarget.src = `https://cdn.233.momobako.com/ygoimg/ygopro/${card.id}.webp`;
                   } else if (currentSrc.includes('momobako')) {
                     e.currentTarget.src = `https://images.ygoprodeck.com/images/cards/${card.id}.jpg`;
                   } else {
                     e.currentTarget.style.display = 'none';
                     e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full flex flex-col items-center justify-center text-on-surface-variant bg-void-black gap-2"><span class="material-symbols-outlined">image</span><span class="text-[10px] font-label-caps">NO IMAGE</span></div>';
                   }
                }}
              />
              {/* Rank badge */}
              <div className="absolute top-1 left-1 bg-void-black/90 text-rarity-ultra font-display-hero text-lg w-8 h-8 flex items-center justify-center border border-rarity-ultra/30 backdrop-blur-sm z-10 shadow-lg leading-none pt-1">
                {index + 1}
              </div>
            </div>
            
            <div className="p-3 bg-gradient-to-br from-surface-container-low to-transparent flex-1 flex flex-col gap-2">
              <h4 className="font-display-hero text-sm text-on-surface uppercase truncate max-w-full" title={card.name}>
                <CardName id={card.id} initialName={card.name} />
              </h4>
              
              <div className="flex gap-2 border-t border-outline-variant/30 pt-2 shrink-0">
                <div className="flex flex-col gap-0 items-start flex-1 border-r border-outline-variant/30 overflow-hidden">
                  <span className="text-[8px] text-on-surface-variant font-label-caps whitespace-nowrap scale-90 origin-left">DECKS</span>
                  <div className="flex items-center gap-1 font-mono text-primary font-bold text-xs">
                     {card.deckCount ?? card.count ?? 0}
                  </div>
                </div>
                <div className="flex flex-col gap-0 items-start flex-1 pl-2 overflow-hidden">
                  <span className="text-[8px] text-on-surface-variant font-label-caps whitespace-nowrap scale-90 origin-left">COPIES</span>
                  <div className="flex items-center gap-1 font-mono text-secondary font-bold text-xs">
                     {card.usageCount ?? card.count ?? 0}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
