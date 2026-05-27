import { Terminal, Gamepad2, Hash, Zap, Info } from 'lucide-react';
import { motion } from 'motion/react';

export function Commands() {
  const codes = [
    { code: 'M / MATCH', desc: '比賽模式（三局兩勝）' },
    { code: 'T / TAG', desc: '2V2雙打模式（預設 16000 血量）' },
    { code: 'OT / TCG', desc: '同時允許 TCG 與 OCG 獨有卡（預設 OCG 最新禁卡表）' },
    { code: 'TO / TCGONLY', desc: '純 TCG，不允許 OCG 獨有卡（預設 TCG 最新禁卡表）' },
    { code: 'LP4000', desc: '生命值 4000（可改為 1-99999 任意數字）' },
    { code: 'TM / TIME5', desc: '每回合時間 5 分鐘（可改為 1分-999秒，0為不限時）' },
    { code: 'ST / START8', desc: '起手抽 8 張卡（可改為 1-40 任意數字）' },
    { code: 'DR / DRAW2', desc: '每回合抽 2 張卡（可改為 0-35 任意數字）' },
    { code: 'LF / LFLIST2', desc: '使用伺服器上第 2 個禁卡表（可改為伺服器上的編號）' },
    { code: 'NF / NOLFLIST', desc: '不使用禁限卡表' },
    { code: 'NU / NOUNIQUE', desc: '不允許 TCG 與 OCG 獨有卡' },
    { code: 'NC / NOCHECK', desc: '不檢查卡組' },
    { code: 'NS / NOSHUFFLE', desc: '不洗切卡組（任何情況包含卡片效果都不洗）' },
    { code: 'MR1~5', desc: '指定規則版本（大師規則1~3, MR4 新大師, MR5 大師2020）' }
  ];

  const examples = [
    { pwd: 'M#大會模式', desc: '建立一個 MATCH 房，無其他特殊設定。' },
    { pwd: 'T#決鬥學園', desc: '建立一個雙打房，生命值自動變為 16000，無其他特殊設定。' },
    { pwd: 'M,TIME10#說書狂魔', desc: '建立一個 MATCH 房，每回合 10 分鐘。' },
    { pwd: 'OT#神仙打架', desc: '建立一個單局房，允許使用 TCG 與 OCG 的所有卡片。' },
    { pwd: 'T,OT,LP36000#血牛大戰', desc: '建立一個雙打房，允許所有卡片且生命值高達 36000。' },
    { pwd: 'M,NF#為所欲為', desc: '建立一個 MATCH 房，不使用任何禁限卡表（無限制）。' },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 max-w-5xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold mb-4 font-mono text-cyan-400 flex items-center justify-center gap-3">
          <Terminal size={36} /> 連線設定與房間代碼
        </h2>
        <p className="text-white/50">在遊戲主機密碼處輸入特殊代碼，即可自訂決鬥規則</p>
      </motion.div>

      {/* Connection Info */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-slate-900/80 backdrop-blur-sm border border-blue-500/20 rounded-3xl p-8 shadow-2xl mb-12 hover:border-blue-400/40 transition-colors"
      >
        <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
          <Gamepad2 className="text-blue-400" size={28} />
          <h3 className="text-2xl font-bold text-white">基礎連線方式</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-slate-950 rounded-xl p-4 border border-white/5">
              <div className="text-sm text-white/50 mb-1">主機位置 (IP)</div>
              <div className="font-mono text-xl text-cyan-300 font-bold">ygopro.barian.moe</div>
            </div>
            <div className="bg-slate-950 rounded-xl p-4 border border-white/5">
              <div className="text-sm text-white/50 mb-1">通訊埠 (Port)</div>
              <div className="font-mono text-xl text-cyan-300 font-bold">7911</div>
            </div>
          </div>
          <div className="text-white/70 space-y-4 text-sm leading-relaxed bg-blue-950/20 p-5 rounded-xl border border-blue-500/10">
            <div className="flex items-start gap-3">
              <Info size={20} className="text-blue-400 flex-shrink-0 mt-0.5" /> 
              <div>
                <strong className="text-blue-200 block mb-1 text-base">隨機對戰：</strong>
                不輸入主機密碼直接加入，會進入單局隨機對戰。輸入 <code className="bg-black/30 border border-white/10 px-1.5 py-0.5 rounded text-cyan-300">S</code> 為純單局，<code className="bg-black/30 border border-white/10 px-1.5 py-0.5 rounded text-cyan-300">M</code> 為 MATCH，<code className="bg-black/30 border border-white/10 px-1.5 py-0.5 rounded text-cyan-300">T</code> 為雙打。
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Info size={20} className="text-blue-400 flex-shrink-0 mt-0.5" /> 
              <div>
                <strong className="text-blue-200 block mb-1 text-base">私人房間：</strong>
                輸入任意文字作為密碼建立房間，對手輸入相同密碼即可加入。
              </div>
            </div>
            <div className="flex items-start gap-3 text-yellow-300/90 font-medium">
              <Zap size={20} className="text-yellow-400 flex-shrink-0 mt-0.5" /> 
              <div>
                原版 YGOPro 的「建立主機」按鈕不適用於此伺服器，請直接填寫資訊並點擊「加入遊戲」。
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Codes Table */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Hash className="text-cyan-400" size={24} />
            <h3 className="text-2xl font-bold text-white">進階房間代碼</h3>
          </div>
          <p className="text-sm text-white/50 mb-6 bg-slate-900/50 p-4 rounded-xl border border-white/5">
            在密碼處輸入 <strong className="text-white">代碼#房間名</strong> 即可建立特殊規則房，多個代碼可用逗號 <code>,</code> 分隔。房間名加上代碼最長 20 個字。不區分大小寫。
          </p>
          
          <div className="bg-slate-900/80 border border-blue-500/20 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-y-auto max-h-[500px] custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-950 sticky top-0 z-10">
                  <tr>
                    <th className="py-3 px-4 text-sm font-bold text-blue-300 border-b border-white/10">代碼 (縮寫)</th>
                    <th className="py-3 px-4 text-sm font-bold text-blue-300 border-b border-white/10">功能說明</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {codes.map((item, idx) => (
                    <tr key={idx} className="hover:bg-blue-900/20 transition-colors group">
                      <td className="py-3 px-4 font-mono text-cyan-400/90 text-sm whitespace-nowrap group-hover:text-cyan-300">{item.code}</td>
                      <td className="py-3 px-4 text-sm text-white/70 group-hover:text-white/90">{item.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Examples */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Zap className="text-yellow-400" size={24} />
            <h3 className="text-2xl font-bold text-white">密碼組合範例</h3>
          </div>
          
          <div className="space-y-4">
            {examples.map((ex, idx) => (
              <div key={idx} className="bg-slate-900/80 border border-blue-500/10 p-5 rounded-2xl hover:border-blue-500/40 hover:-translate-y-1 transition-all shadow-lg group">
                <div className="inline-block bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 font-mono text-cyan-300 font-bold mb-3 shadow-inner group-hover:bg-blue-950/40 transition-colors">
                  {ex.pwd}
                </div>
                <p className="text-sm text-white/70 leading-relaxed font-serif group-hover:text-white/90 transition-colors">
                  {ex.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

