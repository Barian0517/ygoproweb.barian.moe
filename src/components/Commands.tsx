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
    <div className="pt-24 pb-24 max-w-max-width mx-auto px-4 md:px-margin-desktop min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 border-b border-outline-variant/30 pb-10"
      >
        <span className="text-secondary font-label-caps text-xs tracking-[0.4em] block mb-2 w-full">SYSTEM IDENTIFIER: COMMANDS</span>
        <h2 className="font-display-hero text-headline-sm md:text-headline-lg uppercase flex items-center gap-3 text-on-surface">
          <Terminal size={40} className="text-secondary" /> 連線設定與房間代碼
        </h2>
        <p className="font-body-md text-on-surface-variant max-w-xl mt-4">在遊戲主機密碼處輸入特殊代碼，即可自訂決鬥規則</p>
      </motion.div>

      {/* Connection Info */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-surface-container border border-outline-variant p-8 mb-16 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full pointer-events-none"></div>
        <div className="flex items-center gap-3 mb-8 border-b border-outline-variant/30 pb-4">
          <Gamepad2 className="text-primary" size={24} />
          <h3 className="text-title-lg font-title-lg text-on-surface uppercase tracking-wide">基礎連線方式</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div className="space-y-4">
            <div className="bg-void-black p-4 border border-outline-variant">
              <div className="font-label-caps text-[10px] text-on-surface-variant tracking-wider uppercase mb-2">主機位置 (IP)</div>
              <div className="font-mono text-2xl text-primary font-bold">ygopro.barian.moe</div>
            </div>
            <div className="bg-void-black p-4 border border-outline-variant">
              <div className="font-label-caps text-[10px] text-on-surface-variant tracking-wider uppercase mb-2">通訊埠 (Port)</div>
              <div className="font-mono text-2xl text-primary font-bold">7911</div>
            </div>
          </div>
          <div className="text-on-surface-variant space-y-5 font-body-md leading-relaxed bg-surface-container-low p-6 border-l-4 border-l-primary/50">
            <div className="flex items-start gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
              <div>
                <strong className="text-on-surface block mb-1 text-base uppercase">隨機對戰</strong>
                不輸入主機密碼直接加入，會進入單局隨機對戰。輸入 <code className="bg-void-black border border-outline-variant/50 px-2 py-0.5 text-primary text-xs font-mono">S</code> 為純單局，<code className="bg-void-black border border-outline-variant/50 px-2 py-0.5 text-primary text-xs font-mono">M</code> 為 MATCH，<code className="bg-void-black border border-outline-variant/50 px-2 py-0.5 text-primary text-xs font-mono">T</code> 為雙打。
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
              <div>
                <strong className="text-on-surface block mb-1 text-base uppercase">私人房間</strong>
                輸入任意文字作為密碼建立房間，對手輸入相同密碼即可加入。
              </div>
            </div>
            <div className="flex items-start gap-4 mt-6 pt-4 border-t border-outline-variant/30 text-error/90 font-medium">
              <Zap size={18} className="text-error flex-shrink-0 mt-0.5" /> 
              <div className="text-sm">
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
            <Hash className="text-secondary" size={24} />
            <h3 className="text-title-lg font-title-lg text-on-surface uppercase tracking-wide">進階房間代碼</h3>
          </div>
          <p className="font-body-sm text-on-surface-variant mb-6 bg-surface-container-low p-4 border border-outline-variant border-l-4 border-l-secondary">
            在密碼處輸入 <strong className="text-on-surface font-mono">代碼#房間名</strong> 即可建立特殊規則房，多個代碼可用逗號 <code>,</code> 分隔。房間名加上代碼最長 20 個字。不區分大小寫。
          </p>
          
          <div className="bg-void-black border border-outline-variant overflow-hidden">
            <div className="overflow-y-auto max-h-[500px] custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container sticky top-0 z-10 border-b border-outline-variant">
                  <tr>
                    <th className="py-4 px-6 font-label-caps text-xs text-on-surface-variant border-r border-outline-variant/30">代碼 (縮寫)</th>
                    <th className="py-4 px-6 font-label-caps text-xs text-on-surface-variant">功能說明</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  {codes.map((item, idx) => (
                    <tr key={idx} className="hover:bg-surface-container-highest transition-colors group">
                      <td className="py-3 px-6 font-mono text-secondary text-sm whitespace-nowrap border-r border-outline-variant/30">{item.code}</td>
                      <td className="py-3 px-6 font-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">{item.desc}</td>
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
            <Zap className="text-rarity-ultra" size={24} />
            <h3 className="text-title-lg font-title-lg text-on-surface uppercase tracking-wide">密碼組合範例</h3>
          </div>
          
          <div className="space-y-4">
            {examples.map((ex, idx) => (
              <div key={idx} className="bg-surface-container border border-outline-variant p-5 hover:border-rarity-ultra/50 transition-colors group relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-rarity-ultra/50 transition-colors"></div>
                <div className="inline-block bg-void-black px-3 py-1.5 border border-outline-variant/50 font-mono text-primary font-bold mb-4 shadow-inner">
                  {ex.pwd}
                </div>
                <p className="font-body-md text-on-surface-variant leading-relaxed group-hover:text-on-surface transition-colors">
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

