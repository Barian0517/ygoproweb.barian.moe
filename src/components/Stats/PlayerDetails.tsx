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
      <div className="flex flex-col items-center justify-center py-32 text-white/50">
        <Loader2 className="animate-spin mb-4 text-blue-400" size={40} />
        <p>載入玩家資料中...</p>
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
        className="flex items-center gap-2 text-white/50 hover:text-white mb-6 transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
      >
        <ArrowLeft size={16} /> 返回排行榜
      </button>

      <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="relative z-10">
          <h3 className="text-3xl font-bold text-white mb-2">{playerName}</h3>
          <p className="text-white/40 text-sm">於 {month} 期間的決鬥紀錄與牌組資訊</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Decks Column */}
        <div className="space-y-4 lg:col-span-1">
          <h4 className="text-xl font-bold flex items-center gap-2 text-white/90">
            <Layers className="text-cyan-400" size={20} />
            使用過的牌組
          </h4>
          <div className="space-y-4">
            {decks.length === 0 ? (
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 text-white/40 text-center text-sm">
                無法解析牌組內容
              </div>
            ) : (
              decks.map((deck, idx) => (
                <div key={idx} className="bg-slate-900/80 border border-white/10 rounded-2xl overflow-hidden shadow-lg">
                  <div className="bg-white/5 px-4 py-3 border-b border-white/10 text-xs font-bold text-white/50 uppercase tracking-wider flex justify-between items-center">
                    <span>牌組 #{idx + 1}</span>
                    <span className="bg-black/30 px-2 py-1 rounded text-cyan-300 font-mono">{getTotalCards(deck)} 張卡</span>
                  </div>
                  <DeckView deck={deck} maxHeight="300px" />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Records Column */}
        <div className="space-y-4 lg:col-span-2">
          <h4 className="text-xl font-bold flex items-center gap-2 text-white/90">
            <History className="text-indigo-400" size={20} />
            詳細對戰紀錄
          </h4>
          <div className="space-y-3">
            {records.length === 0 ? (
               <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 text-white/40 text-center text-sm">
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
                    className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all flex flex-col sm:flex-row gap-6 sm:items-center relative overflow-hidden"
                  >
                    <div className={`absolute top-0 left-0 w-1.5 h-full ${isWinner ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    
                    <div className="flex-1 min-w-0 flex items-center justify-between gap-4">
                       <div className="flex flex-col items-center justify-center flex-1 w-1/3">
                         <span className="text-sm text-white/50 mb-1">玩家</span>
                         <span className="font-bold text-white text-lg truncate w-full text-center">{playerName}</span>
                         <span className="text-xs text-cyan-400/70 mt-1">{getTotalCards(record.playerDeck)} 張卡</span>
                       </div>
                       
                       <div className="flex flex-col items-center justify-center px-4 flex-shrink-0 w-1/3">
                         <span className="text-2xl font-bold font-mono text-white/40">VS</span>
                         <span className="text-[10px] text-white/30 mt-1 bg-white/5 px-2 py-0.5 rounded-full whitespace-nowrap">
                           {record.startTime ? new Date(record.startTime).toLocaleDateString() : ''}
                         </span>
                       </div>

                       <div className="flex flex-col items-center justify-center flex-1 w-1/3">
                         <span className="text-sm text-white/50 mb-1">對手</span>
                         <span className="font-bold text-white text-lg truncate w-full text-center">{record.opponentName || 'Unknown'}</span>
                         <span className="text-xs text-pink-400/70 mt-1">{getTotalCards(record.opponentDeck)} 張卡</span>
                       </div>
                    </div>

                    <div className="flex items-center justify-center sm:justify-end gap-3 min-w-[100px]">
                      {isWinner ? (
                        <div className="flex items-center gap-1.5 text-green-400 bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20 font-bold text-sm">
                          <Trophy size={16} /> 勝利
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-red-400 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20 font-bold text-sm">
                          <Skull size={16} /> 敗北
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
