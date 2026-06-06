import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Loader2, Download, Trophy, Skull, Calendar, Clock, Layers } from 'lucide-react';
import { CardName } from './CardName';
import { DeckView, getTotalCards } from './DeckView';

interface ReplayDetailsProps {
  id: string;
  onBack: () => void;
}

interface ReplayDetailData {
  id: string;
  startTime: string;
  endTime: string;
  player1: string;
  player2: string;
  p1Winner: boolean;
  p2Winner: boolean;
  deck1: any;
  deck2: any;
}

export function ReplayDetails({ id, onBack }: ReplayDetailsProps) {
  const [data, setData] = useState<ReplayDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://ygoproapi.barian.moe/api/stats/replays/${id}`, { cache: 'no-store' })
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load replay details', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-white/50">
        <Loader2 className="animate-spin mb-4 text-blue-400" size={40} />
        <p>載入對戰詳細資訊中...</p>
      </div>
    );
  }

  if (!data || !data.player1) {
    return (
      <div className="text-center py-20 text-white/50">
        <p className="mb-4">無法載入此對戰的詳細資訊</p>
        <button onClick={onBack} className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
          返回上一頁
        </button>
      </div>
    );
  }
  
  const dateObj = new Date(data.startTime);
  const dateStr = dateObj.toLocaleDateString();
  const timeStr = dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
        >
          <ArrowLeft size={16} /> 返回重播列表
        </button>
      </div>

      <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden flex flex-col items-center">
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="flex gap-6 text-white/40 font-mono text-sm mb-8 z-10">
          <span className="flex items-center gap-1.5"><Calendar size={16} /> {dateStr}</span>
          <span className="flex items-center gap-1.5"><Clock size={16} /> {timeStr}</span>
        </div>

        <div className="flex items-center justify-center w-full max-w-4xl z-10 gap-4 sm:gap-12">
          {/* Player 1 */}
          <div className="flex-1 flex flex-col items-center text-center">
            {data.p1Winner ? (
              <div className="text-green-400 flex items-center gap-1.5 text-sm font-bold bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20 mb-4">
                <Trophy size={14} /> Winner
              </div>
            ) : (
              <div className="text-red-400 flex items-center gap-1.5 text-sm font-bold bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20 mb-4">
                <Skull size={14} /> Loser
              </div>
            )}
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 truncate w-full">{data.player1}</h2>
            <p className="text-cyan-400 font-mono text-sm">{getTotalCards(data.deck1)} 張卡片</p>
          </div>

          <div className="flex-shrink-0 text-5xl font-bold font-mono text-white/20 italic">
            VS
          </div>

          {/* Player 2 */}
          <div className="flex-1 flex flex-col items-center text-center">
             {data.p2Winner ? (
              <div className="text-green-400 flex items-center gap-1.5 text-sm font-bold bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20 mb-4">
                <Trophy size={14} /> Winner
              </div>
            ) : (
              <div className="text-red-400 flex items-center gap-1.5 text-sm font-bold bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20 mb-4">
                <Skull size={14} /> Loser
              </div>
            )}
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 truncate w-full">{data.player2}</h2>
            <p className="text-cyan-400 font-mono text-sm">{getTotalCards(data.deck2)} 張卡片</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl overflow-hidden flex flex-col">
          <div className="bg-white/5 border-b border-white/10 p-4 font-bold text-white flex justify-between items-center">
            <span>{data.player1} 的牌組</span>
            <a 
              href={`https://ygoproapi.barian.moe/api/stats/replays/${id}/deck/1`}
              download
              className="flex items-center gap-1.5 text-xs bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 py-1.5 rounded-lg transition-colors border border-blue-500/20"
            >
              <Download size={14} /> 下載 .ydk
            </a>
          </div>
          <DeckView deck={data.deck1} maxHeight="500px" />
        </div>
        
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl overflow-hidden flex flex-col">
          <div className="bg-white/5 border-b border-white/10 p-4 font-bold text-white flex justify-between items-center">
            <span>{data.player2} 的牌組</span>
            <a 
              href={`https://ygoproapi.barian.moe/api/stats/replays/${id}/deck/2`}
              download
              className="flex items-center gap-1.5 text-xs bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 py-1.5 rounded-lg transition-colors border border-blue-500/20"
            >
              <Download size={14} /> 下載 .ydk
            </a>
          </div>
          <DeckView deck={data.deck2} maxHeight="500px" />
        </div>
      </div>
    </motion.div>
  );
}
