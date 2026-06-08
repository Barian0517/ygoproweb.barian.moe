import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Loader2, Download, Trophy, Skull, Calendar, Clock, Layers } from 'lucide-react';
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
      <div className="flex flex-col items-center justify-center py-32 text-on-surface-variant">
        <Loader2 className="animate-spin mb-4 text-primary" size={40} />
      </div>
    );
  }

  if (!data || !data.player1) {
    return (
      <div className="text-center py-20 text-on-surface-variant border border-outline-variant/30 bg-surface-container">
        <p className="mb-4 font-body-md text-on-surface-variant">無法載入此對戰的詳細資訊</p>
        <button onClick={onBack} className="font-label-caps text-xs text-on-surface border border-outline-variant px-4 py-2 hover:bg-surface-container-highest transition-colors">
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
          className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors px-3 py-1.5 font-label-caps text-xs border border-transparent hover:border-outline-variant bg-surface-container-low"
        >
          <ArrowLeft size={14} /> SYSTEM: GO BACK
        </button>
      </div>

      <div className="bg-surface-container border border-outline-variant p-8 relative overflow-hidden flex flex-col items-center">
        <div className="flex flex-wrap min-h-8 items-center justify-center gap-6 text-on-surface-variant font-label-caps text-[10px] mb-8 z-10 opacity-80">
          <span className="flex items-center gap-1.5"><Calendar size={14} /> {dateStr}</span>
          <span className="flex items-center gap-1.5"><Clock size={14} /> {timeStr}</span>
          <div className="h-4 w-px bg-outline-variant/50"></div>
          <a 
            href={`https://ygoproapi.barian.moe/api/stats/replays/${id}/download`}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-secondary bg-secondary/10 hover:bg-secondary/20 border border-secondary/40 hover:border-secondary px-4 py-1.5 transition-all"
          >
            <Download size={14} /> DOWNLOAD .YRP
          </a>
        </div>

        <div className="flex items-center justify-center w-full max-w-4xl z-10 gap-4 sm:gap-12">
          {/* Player 1 */}
          <div className="flex-1 flex flex-col items-center text-center">
            {data.p1Winner ? (
              <div className="text-secondary flex items-center gap-1.5 text-[10px] font-label-caps border-b border-secondary/50 pb-1 mb-4">
                <Trophy size={14} /> WINNER
              </div>
            ) : (
              <div className="text-error flex items-center gap-1.5 text-[10px] font-label-caps border-b border-error/50 pb-1 mb-4">
                <Skull size={14} /> LOSER
              </div>
            )}
            <h2 className="font-display-hero text-3xl sm:text-5xl text-on-surface mb-0 truncate w-full uppercase">{data.player1}</h2>
            <p className="text-on-surface-variant font-label-caps text-[10px]">{getTotalCards(data.deck1)} CARDS</p>
          </div>

          <div className="flex-shrink-0 text-5xl font-display-hero text-on-surface-variant opacity-30 italic px-4">
            VS
          </div>

          {/* Player 2 */}
          <div className="flex-1 flex flex-col items-center text-center">
             {data.p2Winner ? (
              <div className="text-secondary flex items-center gap-1.5 text-[10px] font-label-caps border-b border-secondary/50 pb-1 mb-4">
                <Trophy size={14} /> WINNER
              </div>
            ) : (
              <div className="text-error flex items-center gap-1.5 text-[10px] font-label-caps border-b border-error/50 pb-1 mb-4">
                <Skull size={14} /> LOSER
              </div>
            )}
            <h2 className="font-display-hero text-3xl sm:text-5xl text-on-surface mb-0 truncate w-full uppercase">{data.player2}</h2>
            <p className="text-on-surface-variant font-label-caps text-[10px]">{getTotalCards(data.deck2)} CARDS</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-surface-container border border-outline-variant overflow-hidden flex flex-col">
          <div className="border-b border-outline-variant p-4 font-title-md text-on-surface flex justify-between items-center bg-surface-container-high">
            <span className="uppercase">{data.player1} DECK</span>
            <a 
              href={`https://ygoproapi.barian.moe/api/stats/replays/${id}/deck/1`}
              download
              className="flex items-center gap-2 text-[10px] font-label-caps bg-primary/10 hover:bg-primary/20 text-primary px-3 py-2 transition-colors border border-primary/30"
            >
              <Download size={14} /> DOWNLOAD .YDK
            </a>
          </div>
          <DeckView deck={data.deck1} maxHeight="500px" />
        </div>
        
        <div className="bg-surface-container border border-outline-variant overflow-hidden flex flex-col">
          <div className="border-b border-outline-variant p-4 font-title-md text-on-surface flex justify-between items-center bg-surface-container-high">
            <span className="uppercase">{data.player2} DECK</span>
            <a 
              href={`https://ygoproapi.barian.moe/api/stats/replays/${id}/deck/2`}
              download
              className="flex items-center gap-2 text-[10px] font-label-caps bg-primary/10 hover:bg-primary/20 text-primary px-3 py-2 transition-colors border border-primary/30"
            >
              <Download size={14} /> DOWNLOAD .YDK
            </a>
          </div>
          <DeckView deck={data.deck2} maxHeight="500px" />
        </div>
      </div>
    </motion.div>
  );
}
