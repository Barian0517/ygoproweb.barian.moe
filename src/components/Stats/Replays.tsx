import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Loader2, MonitorPlay, Calendar, Clock, Swords } from 'lucide-react';
import { ReplayDetails } from './ReplayDetails';

interface ReplaysProps {
  month: string;
}

interface ReplaySummary {
  id: string;
  player1: string;
  player2: string;
  deck1Length: number;
  deck2Length: number;
  startTime: string;
}

export function Replays({ month }: ReplaysProps) {
  const [replays, setReplays] = useState<ReplaySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReplayId, setSelectedReplayId] = useState<string | null>(null);

  useEffect(() => {
    if (!month) return;
    setLoading(true);
    setSelectedReplayId(null);
    fetch(`https://ygoproapi.barian.moe/api/stats/replays?month=${month}`)
      .then(res => res.json())
      .then(data => {
        setReplays(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load replays', err);
        setReplays([]);
        setLoading(false);
      });
  }, [month]);

  if (selectedReplayId) {
    return (
      <ReplayDetails 
        id={selectedReplayId} 
        onBack={() => setSelectedReplayId(null)} 
      />
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-on-surface-variant">
        <Loader2 className="animate-spin mb-4 text-secondary" size={40} />
      </div>
    );
  }

  if (replays.length === 0) {
    return (
      <div className="bg-surface-container border border-outline-variant/30 p-16 text-center text-on-surface-variant flex flex-col items-center justify-center gap-4">
        <MonitorPlay size={48} className="text-outline-variant" />
        <h3 className="font-title-md text-on-surface">目前沒有重播紀錄</h3>
        <p className="font-body-md">這個月還沒有產生任何決鬥重播檔案。</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-surface-container border-l-4 border-secondary p-6 flex items-start gap-4">
        <MonitorPlay className="flex-shrink-0 mt-1 text-secondary" size={24} />
        <div>
          <h4 className="font-title-md text-secondary uppercase tracking-widest mb-2">關於決鬥重溫</h4>
          <p className="text-on-surface-variant font-body-md leading-relaxed">
            您可以查看在此伺服器所進行過的決鬥完整紀錄，並可以直接下載對局玩家的 <code className="bg-void-black px-2 py-0.5 border border-primary/30 text-primary font-mono text-xs">.ydk</code> 牌組檔案以供自己參考與使用。
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {replays.map((replay, idx) => {
          const dateObj = new Date(replay.startTime || new Date());
          const dateStr = dateObj.toLocaleDateString();
          const timeStr = dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

          return (
            <motion.div 
              key={replay.id || idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedReplayId(replay.id)}
              className="bg-surface-container border border-outline-variant p-5 hover:border-secondary transition-all cursor-pointer group shadow-lg flex flex-col"
            >
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-outline-variant/30">
                <div className="flex items-center gap-2 text-[10px] text-on-surface-variant font-label-caps">
                  <Calendar size={14} /> {dateStr}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-on-surface-variant font-label-caps">
                  <Clock size={14} /> {timeStr}
                </div>
              </div>

              <div className="flex items-center justify-between mb-8 flex-1">
                <div className="text-center flex-1 min-w-0 px-2">
                  <div className="font-display-hero text-on-surface text-lg truncate uppercase">{replay.player1 || 'Unknown'}</div>
                  <div className="text-[10px] text-on-surface-variant mt-1 font-label-caps">{replay.deck1Length || 0} CARDS</div>
                </div>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="font-display-hero text-xl italic text-on-tertiary-fixed-variant opacity-50 px-2">
                    VS
                  </div>
                </div>
                <div className="text-center flex-1 min-w-0 px-2">
                  <div className="font-display-hero text-on-surface text-lg truncate uppercase">{replay.player2 || 'Unknown'}</div>
                  <div className="text-[10px] text-on-surface-variant mt-1 font-label-caps">{replay.deck2Length || 0} CARDS</div>
                </div>
              </div>

              <div className="w-full border border-secondary/50 text-secondary bg-secondary/10 group-hover:bg-secondary group-hover:text-on-secondary font-label-caps text-xs py-3 transition-colors flex items-center justify-center gap-2 mt-auto">
                <Swords size={16} /> DATA UPLINK
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
