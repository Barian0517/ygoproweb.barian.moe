import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Loader2, Layers, History, Trophy, Skull } from 'lucide-react';
import { CardName } from './CardName';
import { DeckView, getTotalCards } from './DeckView';

interface PlayerDetailsProps {
  playerName: string;
  month: string;
  onBack: () => void;
}

interface Record {
  id?: string;
  startTime?: string;
  opponentName?: string;
  winner?: boolean;
  playerDeck?: any;
  opponentDeck?: any;
}

export function PlayerDetails({ playerName, month, onBack }: PlayerDetailsProps) {
  const [decks, setDecks] = useState<any[]>([]);
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const encodedName = encodeURIComponent(playerName);
        const [decksRes, recordsRes] = await Promise.all([
          fetch(`https://ygoproapi.barian.moe/api/stats/players/${encodedName}/decks?month=${month}`),
          fetch(`https://ygoproapi.barian.moe/api/stats/players/${encodedName}/records?month=${month}`)
        ]);

        const decksData = await decksRes.json();
        const recordsData = await recordsRes.json();

        setDecks(Array.isArray(decksData) ? decksData : []);
        setRecords(Array.isArray(recordsData) ? recordsData : []);
      } catch (err) {
        console.error('Failed to load player details', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [playerName, month]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-on-surface-variant">
        <Loader2 className="animate-spin mb-4 text-primary" size={40} />
        <p className="font-label-caps uppercase text-sm tracking-wider">Loading Player Data...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface mb-6 transition-colors px-3 py-2 border border-transparent hover:border-outline-variant bg-surface-container-low font-label-caps uppercase text-xs"
      >
        <ArrowLeft size={16} /> 返回排行榜 (RANKINGS)
      </button>

      <div className="bg-surface-container border border-outline-variant p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between md:items-end gap-4">
          <div>
            <h3 className="font-display-hero text-headline-lg text-on-surface mb-2 uppercase break-all">{playerName}</h3>
            <p className="text-on-surface-variant font-label-caps text-xs tracking-wider">於 {month} 期間的決鬥紀錄與牌組資訊</p>
          </div>
          <div className="text-right">
             <span className="font-label-caps text-[10px] text-on-surface-variant block mb-1">TOTAL MATCHES</span>
             <span className="font-mono text-3xl text-primary font-bold">{records.length}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Decks Column */}
        <div className="space-y-4 xl:col-span-1">
          <h4 className="font-title-lg text-lg flex items-center gap-2 text-on-surface border-b border-outline-variant/30 pb-3 uppercase tracking-wide">
            <Layers className="text-secondary" size={20} />
            使用過的牌組 (DECKS)
          </h4>
          <div className="space-y-4">
            {decks.length === 0 ? (
              <div className="bg-void-black p-6 border border-outline-variant text-on-surface-variant text-center font-body-sm">
                無法解析牌組內容
              </div>
            ) : (
              decks.map((deck, idx) => (
                <div key={idx} className="bg-void-black border border-outline-variant overflow-hidden hover:border-secondary/50 transition-colors">
                  <div className="bg-surface-container px-4 py-3 border-b border-outline-variant font-label-caps text-[10px] text-on-surface-variant uppercase flex justify-between items-center">
                    <span>牌組 #{idx + 1}</span>
                    <span className="bg-void-black border border-outline-variant/50 px-2 py-1 text-secondary font-mono">{getTotalCards(deck)} CARDS</span>
                  </div>
                  <DeckView deck={deck} maxHeight="300px" />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Records Column */}
        <div className="space-y-4 xl:col-span-2">
          <h4 className="font-title-lg text-lg flex items-center gap-2 text-on-surface border-b border-outline-variant/30 pb-3 uppercase tracking-wide">
            <History className="text-rarity-ultra" size={20} />
            詳細對戰紀錄 (RECORDS)
          </h4>
          <div className="space-y-4">
            {records.length === 0 ? (
               <div className="bg-void-black p-6 border border-outline-variant text-on-surface-variant text-center font-body-sm">
                 沒有對戰紀錄
               </div>
            ) : (
              records.map((record, idx) => {
                const isWinner = record.winner;
                
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={idx} 
                    className="bg-void-black border border-outline-variant p-0 hover:border-primary/50 transition-colors flex flex-col sm:flex-row relative group"
                  >
                    <div className={`absolute top-0 left-0 w-1 sm:w-1.5 h-full ${isWinner ? 'bg-primary' : 'bg-error'}`}></div>
                    
                    <div className="flex-1 flex flex-col sm:flex-row items-stretch min-w-0 pl-4 sm:pl-6 divide-y sm:divide-y-0 sm:divide-x divide-outline-variant/30">
                       <div className="flex flex-col items-start justify-center py-4 pr-4 sm:w-[40%] min-w-[120px]">
                         <span className="font-label-caps text-[10px] text-on-surface-variant mb-1 uppercase">PLAYER</span>
                         <span className="font-title-md text-on-surface text-base truncate w-full">{playerName}</span>
                         <span className="font-mono text-xs text-primary mt-1">{getTotalCards(record.playerDeck)} C</span>
                       </div>
                       
                       <div className="flex flex-col items-center justify-center p-4 sm:w-[20%] flex-shrink-0 bg-surface-container-low/30 relative">
                         <span className="font-display-hero text-xl text-on-surface-variant/50 group-hover:text-rarity-ultra transition-colors">VS</span>
                         <span className="font-mono text-[10px] text-on-surface-variant mt-2 border-t border-outline-variant/30 pt-1 w-full text-center">
                           {record.startTime ? new Date(record.startTime).toLocaleDateString() : 'N/A'}
                         </span>
                       </div>

                       <div className="flex flex-col items-end sm:items-start justify-center py-4 pl-4 sm:w-[40%] min-w-[120px]">
                         <span className="font-label-caps text-[10px] text-on-surface-variant mb-1 uppercase">OPPONENT</span>
                         <span className="font-title-md text-on-surface text-base truncate w-full text-right sm:text-left">{record.opponentName || 'Unknown'}</span>
                         <span className="font-mono text-xs text-error mt-1">{getTotalCards(record.opponentDeck)} C</span>
                       </div>
                    </div>

                    <div className="flex items-center justify-center p-4 border-t sm:border-t-0 sm:border-l border-outline-variant/30 bg-surface-container-low min-w-[120px]">
                      {isWinner ? (
                        <div className="flex items-center gap-2 text-primary font-label-caps text-sm uppercase font-bold">
                          <Trophy size={16} /> WIN
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-error font-label-caps text-sm uppercase">
                          <Skull size={16} /> LOSE
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
