import { useState, useEffect } from 'react';
import { Loader2, TrendingUp, Presentation } from 'lucide-react';
import { motion } from 'motion/react';
import { CardName } from './CardName';

interface PopularCardsProps {
  month: string;
}

interface CardCount {
  id: number;
  name: string;
  count: number;
}

export function PopularCards({ month }: PopularCardsProps) {
  const [cards, setCards] = useState<CardCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!month) return;

    setLoading(true);
    let isMounted = true;

    const fetchPopularCards = async () => {
      try {
        const playersRes = await fetch(`https://ygoproapi.barian.moe/api/stats/players?month=${month}`);
        const players = await playersRes.json();

        if (!Array.isArray(players) || players.length === 0) {
          if (isMounted) {
            setCards([]);
            setLoading(false);
          }
          return;
        }

        const deckPromises = players.map(p => 
          fetch(`https://ygoproapi.barian.moe/api/stats/players/${encodeURIComponent(p.name)}/decks?month=${month}`)
            .then(res => res.json())
            .catch(() => [])
        );

        const allPlayersDecks = await Promise.all(deckPromises);
        
        const cardMap = new Map<number, CardCount>();

        allPlayersDecks.forEach(playerDecks => {
          if (Array.isArray(playerDecks)) {
            playerDecks.forEach(deck => {
              const parseDeckSection = (section: any[]) => {
                if (Array.isArray(section)) {
                  section.forEach(card => {
                    const existing = cardMap.get(card.id);
                    if (existing) {
                      existing.count++;
                    } else {
                      cardMap.set(card.id, {
                        id: card.id,
                        name: card.name || 'Unknown',
                        count: 1
                      });
                    }
                  });
                }
              };

              parseDeckSection(deck.main);
              parseDeckSection(deck.extra);
              parseDeckSection(deck.side);
            });
          }
        });

        // Convert to array and sort by count descending
        const sortedCards = Array.from(cardMap.values())
          .sort((a, b) => b.count - a.count)
          .slice(0, 30); // Top 30

        if (isMounted) {
          setCards(sortedCards);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load popular cards', err);
        if (isMounted) {
          setCards([]);
          setLoading(false);
        }
      }
    };

    fetchPopularCards();

    return () => {
      isMounted = false;
    };
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
        <p className="font-body-md">這個月暫無卡片使用數據。</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-surface-container border-l-4 border-error p-6 flex items-start gap-4">
        <TrendingUp className="flex-shrink-0 mt-1 text-error" size={24} />
        <div>
          <h4 className="font-title-md text-error uppercase tracking-widest mb-2">卡片熱門度排行</h4>
          <p className="text-on-surface-variant font-body-sm leading-relaxed">
            顯示這個月對局中最常被投入的卡片，包含主卡組、額外卡組與備牌。
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {cards.map((card, index) => (
          <div 
            key={`${card.id}-${index}`}
            className="group bg-surface-container relative border border-outline-variant hover:border-error/50 transition-colors overflow-hidden flex flex-col"
          >
            {/* Rank Badge */}
            <div className="absolute top-0 left-0 z-10 w-8 h-8 bg-void-black/80 backdrop-blur border-b border-r border-outline-variant/50 flex items-center justify-center text-xs font-mono text-on-surface-variant group-hover:text-error transition-colors">
              #{index + 1}
            </div>

            {/* Card visual showcase */}
            <div className="relative aspect-[0.686] bg-void-black border-b border-outline-variant overflow-hidden">
              <img 
                src={`https://ygoproapi.barian.moe/api/images/${card.id}`}
                alt={card.name} 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                onError={(e) => {
                   // Fallback for custom vs original cards
                   const currentSrc = e.currentTarget.src;
                   if (currentSrc.includes('ygoproapi')) {
                     e.currentTarget.src = `https://cdn.233.momobako.com/ygoimg/ygopro/${card.id}.webp`;
                   } else if (currentSrc.includes('momobako')) {
                     e.currentTarget.src = `https://images.ygoprodeck.com/images/cards/${card.id}.jpg`;
                   } else {
                     // Still failed, keep the image structure to not break layout, but hide image 
                     // since sometimes original custom cards have weird IDs
                     e.currentTarget.style.opacity = '0';
                   }
                }}
              />
              <div className="absolute top-2 right-2 bg-error/90 text-on-error font-mono text-[10px] px-2 py-0.5 shadow-md">
                x{card.count}
              </div>
            </div>
            
            <div className="p-3 bg-gradient-to-br from-surface-container-low to-transparent flex-1 flex flex-col gap-2">
              <h4 className="font-display-hero text-xs text-on-surface uppercase truncate max-w-full" title={card.name}>
                <CardName id={card.id} initialName={card.name} />
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
