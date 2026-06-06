import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Trophy, Swords, Loader2, Target, Hash, BarChart3, User } from 'lucide-react';
import { PlayerDetails } from './PlayerDetails';
import { CardName } from './CardName';

interface PlayerRankingsProps {
  month: string;
}

interface Player {
  name: string;
  winCount: number;
  totalMatches: number;
}

interface CardRank {
  id: number;
  name: string;
  usageCount: number;
}

export function PlayerRankings({ month }: PlayerRankingsProps) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [cards, setCards] = useState<CardRank[]>([]);
  const [loadingPlayers, setLoadingPlayers] = useState(false);
  const [loadingCards, setLoadingCards] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

  useEffect(() => {
    setSelectedPlayer(null); // Reset when month changes
    if (!month) return;

    setLoadingPlayers(true);
    fetch(`https://ygoproapi.barian.moe/api/stats/players?month=${month}`)
      .then(res => res.json())
      .then(data => {
        setPlayers(Array.isArray(data) ? data : []);
        setLoadingPlayers(false);
      })
      .catch(err => {
        console.error('Failed to load players', err);
        setPlayers([]);
        setLoadingPlayers(false);
      });

    setLoadingCards(true);
    fetch(`https://ygoproapi.barian.moe/api/stats/cards/ranking?month=${month}`)
      .then(res => res.json())
      .then(data => {
        setCards(Array.isArray(data) ? data : []);
        setLoadingCards(false);
      })
      .catch(err => {
        console.error('Failed to load cards ranking', err);
        setCards([]);
        setLoadingCards(false);
      });
  }, [month]);

  if (selectedPlayer) {
    return (
     <PlayerDetails 
       playerName={selectedPlayer} 
       month={month} 
       onBack={() => setSelectedPlayer(null)} 
     />
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Players List */}
      <div className="lg:col-span-2 space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2 text-white">
          <Trophy className="text-blue-400" size={20} />
          玩家勝率排行
        </h3>
        
        {loadingPlayers ? (
          <div className="flex flex-col items-center justify-center py-20 text-white/50">
            <Loader2 className="animate-spin mb-4 text-blue-400" size={32} />
            <p className="text-sm">載入資料中...</p>
          </div>
        ) : players.length === 0 ? (
          <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-8 text-center text-white/40">
            <User size={48} className="mx-auto mb-4 opacity-50" />
            <p>這個月還沒有任何決鬥紀錄呢。</p>
          </div>
        ) : (
          <div className="bg-slate-900/80 border border-white/10 rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-white/50 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold text-center w-16">排名</th>
                  <th className="px-6 py-4 font-semibold">玩家名稱</th>
                  <th className="px-6 py-4 font-semibold text-center">勝場</th>
                  <th className="px-6 py-4 font-semibold text-center">總局數</th>
                  <th className="px-6 py-4 font-semibold text-right">勝率</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {players.map((player, idx) => {
                  const winRate = player.totalMatches > 0 
                    ? Math.round((player.winCount / player.totalMatches) * 100) 
                    : 0;
                  
                  return (
                    <motion.tr 
                      key={player.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => setSelectedPlayer(player.name)}
                      className="group hover:bg-blue-500/10 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 text-center">
                        {idx === 0 && <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm border border-yellow-500/30">1</span>}
                        {idx === 1 && <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-slate-300/20 text-slate-300 font-bold text-sm border border-slate-300/30">2</span>}
                        {idx === 2 && <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-amber-600/20 text-amber-500 font-bold text-sm border border-amber-600/30">3</span>}
                        {idx > 2 && <span className="text-white/40 font-mono text-sm">{idx + 1}</span>}
                      </td>
                      <td className="px-6 py-4 font-bold text-white group-hover:text-blue-300 transition-colors">
                        {player.name}
                      </td>
                      <td className="px-6 py-4 text-center text-green-400 font-mono font-bold">
                        {player.winCount}
                      </td>
                      <td className="px-6 py-4 text-center text-white/50 font-mono">
                        {player.totalMatches}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-white/80 font-mono text-sm">{winRate}%</span>
                          <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${winRate}%` }}></div>
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Popular Cards */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2 text-white">
          <BarChart3 className="text-pink-400" size={20} />
          熱門卡片排行
        </h3>
        
        {loadingCards ? (
          <div className="flex flex-col items-center justify-center py-20 text-white/50">
            <Loader2 className="animate-spin mb-4 text-pink-400" size={32} />
          </div>
        ) : cards.length === 0 ? (
          <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 text-center text-white/40">
            <p className="text-sm">暫無卡片資料</p>
          </div>
        ) : (
          <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
            <div className="space-y-3">
              {cards.slice(0, 50).map((card, idx) => (
                <motion.div 
                  key={card.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="text-xs font-mono font-bold text-white/40 w-5 flex-shrink-0">{idx + 1}.</span>
                    <span className="text-sm text-white/90 truncate font-medium" title={card.name}>
                      <CardName id={card.id} initialName={card.name} />
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1.5 text-xs text-pink-300/80 bg-pink-500/10 px-2 py-1 rounded-md font-mono border border-pink-500/20 whitespace-nowrap">
                      <span>投入次數:</span>
                      <span className="font-bold">{card.usageCount}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
