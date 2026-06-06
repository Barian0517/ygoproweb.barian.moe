import React from 'react';
import { CardName } from './CardName';

interface CardGroup {
  id?: number | string;
  name: string;
  count: number;
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
  if (!deck) return <div className="text-center py-10 text-white/30 text-sm">無法解析牌組</div>;
  
  const isSeparated = !Array.isArray(deck) && (deck.main || deck.extra || deck.side);
  
  const renderGroup = (title: string, cards: any[]) => {
    if (!cards || cards.length === 0) return null;
    const grouped = groupCards(cards);
    return (
      <div className="mb-6 last:mb-0">
        <div className="text-white/50 text-xs font-bold mb-2 flex justify-between border-b border-white/5 pb-1">
          <span>{title}</span>
          <span>{cards.length} 張</span>
        </div>
        <div className="space-y-1">
          {grouped.map((g, i) => (
            <div key={i} className="flex justify-between items-center text-sm text-white/80 hover:text-white hover:bg-white/5 px-2 py-1.5 rounded transition-colors group">
              <span className="truncate pr-2">
                {g.id ? <CardName id={g.id as number} initialName={g.name} /> : g.name}
              </span>
              {g.count > 1 && (
                <span className="text-emerald-400 font-mono font-bold bg-emerald-400/10 px-1.5 py-0.5 rounded text-xs shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                  x{g.count}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  };

  if (isSeparated) {
    const hasAny = deck.main?.length || deck.extra?.length || deck.side?.length;
    if (!hasAny) return <div className="text-center py-10 text-white/30 text-sm">無法解析牌組</div>;
    
    return (
      <div className={`p-4 overflow-y-auto`} style={{ maxHeight }}>
        {renderGroup('主牌組', deck.main)}
        {renderGroup('額外牌組', deck.extra)}
        {renderGroup('副牌組', deck.side)}
      </div>
    );
  }

  // legacy fallback
  return (
    <div className={`p-4 overflow-y-auto`} style={{ maxHeight }}>
      {renderGroup('所有卡片', Array.isArray(deck) ? deck : [])}
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
