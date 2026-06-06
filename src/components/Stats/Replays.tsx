import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Loader2, Download, MonitorPlay, Calendar, Clock, Swords } from 'lucide-react';
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
      <div className="flex flex-col items-center justify-center py-32 text-white/50">
        <Loader2 className="animate-spin mb-4 text-blue-400" size={40} />
        <p>載入對戰紀錄中...</p>
      </div>
    );
  }

  if (replays.length === 0) {
    return (
      <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-16 text-center text-white/40">
        <MonitorPlay size={64} className="mx-auto mb-6 opacity-30" />
        <h3 className="text-xl font-bold mb-2 text-white/60">目前沒有重播紀錄</h3>
        <p className="text-sm">這個月還沒有產生任何決鬥重播檔案。</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-500/10 border border-blue-500/20 text-blue-300 px-6 py-4 rounded-2xl flex items-start gap-4">
        <MonitorPlay className="flex-shrink-0 mt-1" size={20} />
        <div>
          <h4 className="font-bold mb-1">關於決鬥重溫</h4>
          <p className="text-sm text-blue-200/70 leading-relaxed">
            您可以查看在此伺服器所進行過的決鬥完整紀錄，並下載 <code className="bg-black/50 px-1 py-0.5 rounded text-cyan-300">.yrp</code> 檔案放回遊戲的 replay 資料夾中觀看。
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
              className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all cursor-pointer group shadow-lg"
            >
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/5">
                <div className="flex items-center gap-2 text-xs text-white/40 font-mono">
                  <Calendar size={14} /> {dateStr}
                </div>
                <div className="flex items-center gap-2 text-xs text-white/40 font-mono">
                  <Clock size={14} /> {timeStr}
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="text-center flex-1 truncate px-2">
                  <div className="font-bold text-white text-lg truncate">{replay.player1 || 'Unknown'}</div>
                  <div className="text-xs text-cyan-400/70 mt-1 font-mono">{replay.deck1Length || 0} 張卡</div>
                </div>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-white/30 text-xs font-bold mb-1">
                    VS
                  </div>
                </div>
                <div className="text-center flex-1 truncate px-2">
                  <div className="font-bold text-white text-lg truncate">{replay.player2 || 'Unknown'}</div>
                  <div className="text-xs text-cyan-400/70 mt-1 font-mono">{replay.deck2Length || 0} 張卡</div>
                </div>
              </div>

              <div className="w-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-sm font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2">
                <Swords size={16} /> 查看詳細對戰
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
