import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Trophy, PlayCircle, ChevronDown, Loader2 } from 'lucide-react';
import { PlayerRankings } from './PlayerRankings';
import { Replays } from './Replays';

interface DuelStatsProps {
  // Add any needed props
}

export function DuelStats({}: DuelStatsProps) {
  const [activeTab, setActiveTab] = useState<'ranking' | 'replays'>('ranking');
  const [months, setMonths] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [loadingMonths, setLoadingMonths] = useState(true);

  useEffect(() => {
    fetch('https://ygoproapi.barian.moe/api/stats/months')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setMonths(data);
          if (data.length > 0) {
            setSelectedMonth(data[0]);
          } else {
            const d = new Date();
            const m = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            setSelectedMonth(m);
          }
        } else {
          setMonths([]);
          const d = new Date();
          const m = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
          setSelectedMonth(m);
        }
        setLoadingMonths(false);
      })
      .catch(err => {
        console.error('Failed to load months', err);
        setLoadingMonths(false);
        const d = new Date();
        const m = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        setSelectedMonth(m);
      });
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 max-w-6xl mx-auto flex flex-col gap-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-6"
      >
        <div>
          <h2 className="text-4xl font-bold mb-2 tracking-tight text-white flex items-center gap-3">
            <Trophy className="text-yellow-400" size={36} />
            決鬥一覽
          </h2>
          <p className="text-white/50 max-w-xl text-sm leading-relaxed">
            查看本伺服器近期的對局狀態、熱門卡片、玩家排行榜與精采重播。
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          {/* Tab Selection */}
          <div className="flex bg-slate-900/80 p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setActiveTab('ranking')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all text-sm ${activeTab === 'ranking' ? 'bg-blue-500/20 text-blue-400 shadow-sm' : 'text-white/50 hover:text-white/80 hover:bg-white/5'}`}
            >
              <Trophy size={16} /> 決鬥排行
            </button>
            <button
              onClick={() => setActiveTab('replays')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all text-sm ${activeTab === 'replays' ? 'bg-blue-500/20 text-blue-400 shadow-sm' : 'text-white/50 hover:text-white/80 hover:bg-white/5'}`}
            >
              <PlayCircle size={16} /> 決鬥重溫
            </button>
          </div>

          {/* Month Selector */}
          <div className="relative group min-w-[140px]">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              {loadingMonths ? <Loader2 size={16} className="text-white/40 animate-spin" /> : <Calendar size={16} className="text-white/40" />}
            </div>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full bg-slate-900/80 border border-white/10 rounded-xl py-2.5 pl-10 pr-10 text-white/80 text-sm font-medium appearance-none outline-none focus:border-blue-400 transition-colors cursor-pointer"
            >
              {months.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
              {months.length === 0 && <option value={selectedMonth}>{selectedMonth}</option>}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-white/40 group-hover:text-white/60 transition-colors">
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="relative min-h-[500px]">
        {selectedMonth && activeTab === 'ranking' && <PlayerRankings month={selectedMonth} />}
        {selectedMonth && activeTab === 'replays' && <Replays month={selectedMonth} />}
      </div>
    </div>
  );
}
