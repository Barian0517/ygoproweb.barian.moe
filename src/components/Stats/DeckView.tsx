import React, { useState } from 'react';
import { CardName } from './CardName';
import { AlignLeft, LayoutGrid, Loader2 } from 'lucide-react';

interface CardGroup {
  id?: number | string;
  name: string;
  count: number;
}

function getCardId(card: any): number | undefined {
   if (typeof card === 'object' && card !== null) {
      const id = card.id || card.cardId || card.code;
      if (typeof id === 'number') return id;
      if (typeof id === 'string' && /^\d+$/.test(id)) return parseInt(id, 10);
   } else if (typeof card === 'number') {
      return card;
   } else if (typeof card === 'string' && /^\d+$/.test(card)) {
      return parseInt(card, 10);
   }
   return undefined;
}

function getCardName(card: any): string {
   if (typeof card === 'object' && card !== null) {
      return card.name || card.cardName || 'Unknown';
   }
   if (typeof card === 'string' && !/^\d+$/.test(card)) {
      return card;
   }
   return 'Unknown';
}

const cardIdCache = new Map<string, number | null>();
const pendingFetches = new Map<string, Promise<number | null>>();

async function fetchCardIdOptimized(name: string): Promise<number | null> {
  if (cardIdCache.has(name)) {
    return cardIdCache.get(name)!;
  }
  if (pendingFetches.has(name)) {
    return pendingFetches.get(name)!;
  }

  const promise = (async () => {
    try {
      const res = await fetch(`https://ygocdb.com/api/v0/?search=${encodeURIComponent(name)}`);
      const data = await res.json();
      if (data.result && data.result.length > 0) {
        const match = data.result.find((r: any) => r.cn_name === name || r.sc_name === name || r.md_name === name) || data.result[0];
        if (match && match.id) {
          cardIdCache.set(name, match.id);
          return match.id;
        }
      }
    } catch (e) {
      // Ignore ygocdb errors
    }

    // Fallback to ygoproapi for custom cards
    try {
      const res = await fetch(`https://ygoproapi.barian.moe/api/cards?search=${encodeURIComponent(name)}`);
      const cards = await res.json();
      if (Array.isArray(cards)) {
        const match = cards.find((c: any) => c.name === name);
        if (match && match.id) {
          cardIdCache.set(name, match.id);
          return match.id;
        }
      }
    } catch (e) {
      // Ignore
    }

    cardIdCache.set(name, null);
    return null;
  })();

  pendingFetches.set(name, promise);
  try {
    const result = await promise;
    return result;
  } finally {
    pendingFetches.delete(name);
  }
}

function CardImageThumbnail({ card, onLoadingStart, onLoadingEnd }: { card: any, onLoadingStart?: () => void, onLoadingEnd?: () => void }) {
  const initialId = getCardId(card);
  const name = getCardName(card);
  const [fetchedId, setFetchedId] = useState<number | undefined>(undefined);
  
  const id = initialId || fetchedId;

  React.useEffect(() => {
    let isMounted = true;
    if (!initialId && name && name !== 'Unknown') {
      onLoadingStart?.();
      fetchCardIdOptimized(name).then(resolvedId => {
        if (isMounted && resolvedId) {
          setFetchedId(resolvedId);
        }
        if (isMounted) onLoadingEnd?.();
      });
    }
    return () => { isMounted = false; };
  }, [initialId, name]);
  
  if (!id) {
     return <div className="aspect-[0.686] bg-void-black border border-outline-variant/30 flex items-center justify-center p-1 text-[8px] text-on-surface-variant text-center break-words">{name}</div>
  }

  return (
    <div className="aspect-[0.686] relative group">
      <img
        src={`https://ygoproapi.barian.moe/api/images/${id}`}
        alt={name}
        title={name}
        className="w-full h-full object-cover transition-transform group-hover:scale-110 relative z-10 cursor-help"
        onError={(e) => {
             const currentSrc = e.currentTarget.src;
             if (currentSrc.includes('ygoproapi')) {
               e.currentTarget.src = `https://cdn.233.momobako.com/ygoimg/ygopro/${id}.webp`;
             } else if (currentSrc.includes('momobako')) {
               e.currentTarget.src = `https://images.ygoprodeck.com/images/cards/${id}.jpg`;
             } else {
               e.currentTarget.style.display = 'none';
               e.currentTarget.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-void-black border border-outline-variant/30 text-[8px] text-on-surface-variant text-center p-1 break-words">${name}</div>`;
             }
        }}
      />
    </div>
  )
}

function groupCards(cards: any[]): CardGroup[] {
  if (!Array.isArray(cards)) return [];
  const map = new Map<string, CardGroup>();
  
  cards.forEach(card => {
    let id: number | string | undefined = undefined;
    let name: string = 'Unknown';
    
    if (typeof card === 'object' && card !== null) {
      id = card.id || card.cardId || card.code;
      name = card.name || card.cardName || 'Unknown';
    } else if (typeof card === 'number') {
      id = card;
    } else if (typeof card === 'string') {
      if (/^\d+$/.test(card)) {
        id = parseInt(card, 10);
      } else {
        name = card;
      }
    }
    
    const key = String(id || name);
    if (!map.has(key)) {
      map.set(key, { id, name, count: 1 });
    } else {
      map.get(key)!.count++;
    }
  });
  
  return Array.from(map.values());
}

export function DeckView({ deck, maxHeight = "500px" }: { deck: any, maxHeight?: string }) {
  const [viewMode, setViewMode] = useState<'text' | 'image'>('image');
  const [isFetchingInfo, setIsFetchingInfo] = useState(false);
  const fetchCount = React.useRef(0);

  const handleLoadingStart = React.useCallback(() => {
    fetchCount.current += 1;
    if (fetchCount.current === 1) setIsFetchingInfo(true);
  }, []);

  const handleLoadingEnd = React.useCallback(() => {
    fetchCount.current -= 1;
    if (fetchCount.current <= 0) {
      fetchCount.current = 0;
      setIsFetchingInfo(false);
    }
  }, []);

  if (!deck) return <div className="text-center py-10 text-on-surface-variant text-sm font-body-md">無法解析牌組</div>;
  
  const isSeparated = !Array.isArray(deck) && (deck.main || deck.extra || deck.side);
  
  const renderGroup = (title: string, cards: any[]) => {
    if (!cards || cards.length === 0) return null;
    
    if (viewMode === 'image') {
       return (
         <div className="mb-8 last:mb-0">
           <div className="text-on-surface-variant font-label-caps text-[10px] mb-3 flex justify-between border-b border-outline-variant/30 pb-2 border-l-[3px] border-l-secondary pl-2 bg-surface-container-low/30">
             <span>{title}</span>
             <span>{cards.length} CARDS</span>
           </div>
           <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-[2px] overflow-visible">
             {cards.map((card, i) => (
                <CardImageThumbnail key={i} card={card} onLoadingStart={handleLoadingStart} onLoadingEnd={handleLoadingEnd} />
             ))}
           </div>
         </div>
       );
    }
    
    const grouped = groupCards(cards);
    return (
      <div className="mb-6 last:mb-0">
        <div className="text-on-surface-variant font-label-caps text-[10px] mb-2 flex justify-between border-b border-outline-variant/30 pb-1">
          <span>{title}</span>
          <span>{cards.length} CARDS</span>
        </div>
        <div className="space-y-[1px]">
          {grouped.map((g, i) => (
            <div key={i} className="flex justify-between items-center font-body-md text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest px-3 py-2 transition-colors border-l-2 border-transparent hover:border-primary group">
              <span className="truncate pr-2 group-hover:pl-1 transition-all">
                {g.id ? <CardName id={g.id as number} initialName={g.name} /> : g.name}
              </span>
              {g.count > 1 && (
                <span className="text-primary font-mono font-bold bg-primary/10 px-2 py-0.5 text-xs shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                  x{g.count}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  };

  const renderContent = () => {
    if (isSeparated) {
      const hasAny = deck.main?.length || deck.extra?.length || deck.side?.length;
      if (!hasAny) return <div className="text-center py-10 text-on-surface-variant text-sm font-body-md">無法解析牌組</div>;
      
      return (
        <div className="overflow-y-auto custom-scrollbar p-2 md:p-4" style={{ maxHeight: maxHeight === "500px" && viewMode === 'image' ? 'auto' : maxHeight }}>
          {renderGroup('主牌組 MAIN DECK', deck.main)}
          {renderGroup('額外牌組 EXTRA DECK', deck.extra)}
          {renderGroup('副牌組 SIDE DECK', deck.side)}
        </div>
      );
    }

    return (
      <div className="overflow-y-auto custom-scrollbar p-2 md:p-4" style={{ maxHeight: maxHeight === "500px" && viewMode === 'image' ? 'auto' : maxHeight }}>
        {renderGroup('所有卡片 ALL CARDS', Array.isArray(deck) ? deck : [])}
      </div>
    );
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-2 px-2 md:px-4 pt-2">
        <div className="flex items-center text-primary/80 opacity-0 transition-opacity duration-300" style={{ opacity: isFetchingInfo ? 1 : 0 }}>
          <Loader2 size={14} className="animate-spin mr-2" />
          <span className="text-[10px] font-label-caps">載入中</span>
        </div>
        <div className="flex bg-void-black border border-outline-variant z-10 shadow-sm">
          <button 
             onClick={() => setViewMode('image')}
             className={`p-1.5 transition-colors ${viewMode === 'image' ? 'bg-primary/20 text-primary' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'}`}
             title="Image View"
          >
            <LayoutGrid size={12} />
          </button>
          <div className="w-[1px] bg-outline-variant"></div>
          <button 
             onClick={() => setViewMode('text')}
             className={`p-1.5 transition-colors ${viewMode === 'text' ? 'bg-primary/20 text-primary' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'}`}
             title="Text View"
          >
            <AlignLeft size={12} />
          </button>
        </div>
      </div>
      {renderContent()}
    </div>
  );
}

export function getTotalCards(deck: any): number {
  if (!deck) return 0;
  if (!Array.isArray(deck) && (deck.main || deck.extra || deck.side)) {
    return (deck.main?.length || 0) + (deck.extra?.length || 0) + (deck.side?.length || 0);
  }
  return Array.isArray(deck) ? deck.length : 0;
}
