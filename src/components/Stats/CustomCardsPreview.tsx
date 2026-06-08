import { useState, useEffect } from 'react';
import { Loader2, Zap, Presentation } from 'lucide-react';
import { motion } from 'motion/react';
import { CardName } from './CardName';

interface CustomCard {
  id: number;
  name: string;
}

export function CustomCardsPreview() {
  const [cards, setCards] = useState<CustomCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://ygoproapi.barian.moe/api/cards`)
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          // Shuffle and pick 20 random cards
          const shuffled = data.sort(() => 0.5 - Math.random());
          setCards(shuffled.slice(0, 30));
        } else {
          setCards([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load custom cards', err);
        setCards([]);
        setLoading(false);
      });
  }, []);

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
        <p className="font-body-md">暫無自製卡數據。</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-surface-container border-l-4 border-secondary p-6 flex items-start gap-4">
        <Zap className="flex-shrink-0 mt-1 text-secondary" size={24} />
        <div>
          <h4 className="font-title-md text-secondary uppercase tracking-widest mb-2">自製卡預覽</h4>
          <p className="text-on-surface-variant font-body-sm leading-relaxed">
            隨機展示幽影櫻自製卡庫中的卡片。
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-2 gap-4">
        {cards.map((card, index) => (
          <div 
            key={`${card.id}-${index}`}
            className="group bg-surface-container relative border border-outline-variant hover:border-secondary/50 transition-colors overflow-hidden flex flex-col"
          >
            {/* Card visual showcase */}
            <div className="relative aspect-[0.686] bg-void-black border-b border-outline-variant">
              <img 
                src={`https://ygoproapi.barian.moe/api/images/${card.id}`}
                alt={card.name} 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                onError={(e) => {
                   // If we failed to load custom card image, we hide the whole container
                   const parentContainer = e.currentTarget.closest('.group');
                   if (parentContainer) {
                     (parentContainer as HTMLElement).style.display = 'none';
                   }
                }}
              />
            </div>
            
            <div className="p-3 bg-gradient-to-br from-surface-container-low to-transparent flex-1 flex flex-col gap-2">
              <h4 className="font-display-hero text-sm text-on-surface uppercase truncate max-w-full" title={card.name}>
                <CardName id={card.id} initialName={card.name} />
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
