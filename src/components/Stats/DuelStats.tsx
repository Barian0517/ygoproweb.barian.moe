import { useState, useEffect } from 'react';
import { Calendar, Trophy, PlayCircle, ChevronDown, Loader2 } from 'lucide-react';
import { PlayerRankings } from './PlayerRankings';
import { Replays } from './Replays';

interface DuelStatsProps {}

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
    <div className="pt-24 pb-24 max-w-max-width mx-auto px-4 md:px-margin-desktop min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-b border-outline-variant/30 pb-6">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tighter flex items-center gap-3">
            決鬥 <span className="text-rarity-ultra">數據</span>
          </h2>
          <p className="font-body-md text-on-surface-variant max-w-xl mt-2">
            查看本伺服器近期的對局狀態、熱門卡片、玩家排行榜與精采重播。
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          {/* Tab Selection */}
          <div className="flex bg-surface-container-low p-1 border border-outline-variant">
            <button
              onClick={() => setActiveTab('ranking')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 font-label-caps text-[10px] transition-all border ${activeTab === 'ranking' ? 'bg-primary/20 text-primary border-primary/50' : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'}`}
            >
              <Trophy size={14} /> 決鬥排行
            </button>
            <button
              onClick={() => setActiveTab('replays')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 font-label-caps text-[10px] transition-all border ${activeTab === 'replays' ? 'bg-secondary/20 text-secondary border-secondary/50' : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'}`}
            >
              <PlayCircle size={14} /> 決鬥重溫
            </button>
          </div>

          {/* Month Selector */}
          <div className="relative group min-w-[140px]">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              {loadingMonths ? <Loader2 size={16} className="text-on-surface-variant animate-spin" /> : <Calendar size={16} className="text-on-surface-variant" />}
            </div>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant py-2.5 pl-10 pr-10 text-on-surface font-label-caps text-xs appearance-none outline-none hover:border-primary focus:border-primary transition-colors cursor-pointer"
            >
              {months.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
              {months.length === 0 && <option value={selectedMonth}>{selectedMonth}</option>}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-on-surface-variant group-hover:text-primary transition-colors">
              <ChevronDown size={14} />
            </div>
          </div>
        </div>
      </div>

      <div className="relative min-h-[500px]">
        {selectedMonth && activeTab === 'ranking' && <PlayerRankings month={selectedMonth} />}
        {selectedMonth && activeTab === 'replays' && <Replays month={selectedMonth} />}
      </div>
    </div>
  );
}
