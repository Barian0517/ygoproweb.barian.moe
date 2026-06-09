import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Trophy, Loader2, User } from 'lucide-react';
import { PlayerDetails } from './PlayerDetails';
import { PopularCards } from './PopularCards';

interface PlayerRankingsProps {
  month: string;
}

interface Player {
  name: string;
  winCount: number;
  totalMatches: number;
}

export function PlayerRankings({ month }: PlayerRankingsProps) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loadingPlayers, setLoadingPlayers] = useState(false);
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
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
      {/* Players List */}
      <div className="xl:col-span-2 space-y-6 xl:sticky xl:top-24 xl:h-[calc(100vh-7rem)] overflow-y-auto custom-scrollbar pb-20 xl:pb-0">
        <div className="bg-surface-container border-l-4 border-primary p-6 flex items-start gap-4">
          <Trophy className="flex-shrink-0 mt-1 text-primary" size={24} />
          <div>
            <h4 className="font-title-md text-primary uppercase tracking-widest mb-2">玩家勝率一覽</h4>
            <p className="text-on-surface-variant font-body-md leading-relaxed">
              此頁面顯示結算月份的對局排行榜，點擊玩家可以查看該玩家在該月的詳細對戰數據以及牌組組件。
            </p>
          </div>
        </div>
        
        {loadingPlayers ? (
          <div className="flex flex-col items-center justify-center py-32 text-on-surface-variant">
            <Loader2 className="animate-spin mb-4 text-primary" size={40} />
          </div>
        ) : players.length === 0 ? (
          <div className="bg-surface-container border border-outline-variant/30 p-16 text-center text-on-surface-variant flex flex-col items-center justify-center gap-4">
            <User size={48} className="text-outline-variant" />
            <h3 className="font-title-md text-on-surface">無決鬥紀錄</h3>
            <p className="font-body-md">這個月還沒有任何決鬥紀錄呢。</p>
          </div>
        ) : (
          <div className="bg-surface-container border border-outline-variant/30 overflow-hidden shadow-xl backdrop-blur-sm relative group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-rarity-ultra"></div>
            <table className="w-full text-left border-collapse font-body-md">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant text-on-surface-variant text-xs uppercase tracking-wider font-label-caps">
                  <th className="px-6 py-4 font-semibold text-center w-16">RANK</th>
                  <th className="px-6 py-4 font-semibold">PLAYER INTEL</th>
                  <th className="px-6 py-4 font-semibold text-center">WINS</th>
                  <th className="px-6 py-4 font-semibold text-center hidden sm:table-cell">TOTAL</th>
                  <th className="px-6 py-4 font-semibold text-right">WIN RATE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
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
                      className="group hover:bg-surface-container-highest cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 text-center">
                        {idx === 0 && <span className="inline-flex w-8 h-8 items-center justify-center bg-rarity-ultra/20 text-rarity-ultra font-display-hero border border-rarity-ultra/50">1</span>}
                        {idx === 1 && <span className="inline-flex w-8 h-8 items-center justify-center bg-outline-variant/50 text-white font-display-hero border border-outline-variant">2</span>}
                        {idx === 2 && <span className="inline-flex w-8 h-8 items-center justify-center bg-secondary/20 text-secondary font-display-hero border border-secondary/50">3</span>}
                        {idx > 2 && <span className="text-on-surface-variant font-display-hero opacity-60 text-lg">{idx + 1}</span>}
                      </td>
                      <td className="px-6 py-4 font-display-hero text-on-surface text-[16px] uppercase tracking-wide group-hover:text-primary transition-colors max-w-[120px] truncate md:max-w-none">
                        {player.name}
                      </td>
                      <td className="px-6 py-4 text-center text-primary font-mono font-bold text-lg drop-shadow-md">
                        {player.winCount}
                      </td>
                      <td className="px-6 py-4 text-center text-on-surface-variant font-mono text-lg hidden sm:table-cell">
                        {player.totalMatches}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3 font-mono">
                          <span className="text-on-surface text-lg font-bold">{winRate}%</span>
                          <div className="w-16 h-1 bg-void-black overflow-hidden flex items-end hidden md:flex">
                            <div className="h-full bg-primary" style={{ width: `${winRate}%` }}></div>
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

      {/* Popular Cards Column content */}
      <div className="xl:col-span-1 xl:sticky xl:top-24 xl:h-[calc(100vh-7rem)] overflow-y-auto custom-scrollbar space-y-6 pb-20 xl:pb-0">
         <PopularCards month={month} />
      </div>
    </div>
  );
}
