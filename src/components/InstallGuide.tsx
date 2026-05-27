import { Download, FolderOpen, Puzzle, RefreshCcw, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

export function InstallGuide() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-lg flex items-center justify-center gap-4">
          <Download className="text-blue-400" size={40} />
          <span className="text-white">安裝教學</span>
        </h2>
        <p className="text-white/60 text-lg">依照以下步驟，輕鬆完成 mdpro 遊戲客戶端的安裝與更新</p>
      </motion.div>

      {/* Download Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-900/80 backdrop-blur-sm border border-blue-500/20 rounded-3xl p-6 md:p-8 shadow-xl mb-10 text-center"
      >
        <h3 className="text-2xl font-bold text-white mb-3">下載 mdpro 核心檔案</h3>
        <p className="text-white/70 mb-6">首次下載請務必下載資料夾內的所有內容，確保安裝順利。</p>
        <a 
          href="https://cloudreve.barian.moe/s/xRgtE" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-8 rounded-xl transition-all hover:scale-105 shadow-[0_0_20px_rgba(59,130,246,0.4)]"
        >
          <Download size={20} />
          前往下載頁面
        </a>
      </motion.div>

      {/* Steps Section */}
      <div className="space-y-6">
        {/* Step 1 */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/60 border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row gap-6 hover:border-blue-500/30 transition-colors"
        >
          <div className="flex-shrink-0 w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-black text-xl shadow-inner">
            1
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2"><FolderOpen size={20} className="text-blue-400" /> 集中檔案並執行安裝檔</h4>
            <p className="text-white/70 leading-relaxed mb-4">
              將所有名稱帶有 <code className="bg-black/50 text-cyan-300 px-1.5 py-0.5 rounded border border-white/10 font-mono">setup</code> 的檔案放在相同的資料夾內，接著雙擊運行結尾為 <code className="bg-black/50 text-cyan-300 px-1.5 py-0.5 rounded border border-white/10 font-mono">.setup.exe</code> 的執行檔。
            </p>
            <div className="bg-yellow-950/30 border border-yellow-500/20 rounded-xl p-4 flex gap-3 text-sm text-yellow-200/90 shadow-inner">
              <AlertTriangle className="flex-shrink-0 text-yellow-400 mt-0.5" size={16} />
              <p>安裝過程可能會出現亂碼（編碼問題），此為正常現象，請直接<strong>點擊預設選中的按鈕</strong>繼續安裝即可。</p>
            </div>
          </div>
        </motion.div>

        {/* Step 2 */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900/60 border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row gap-6 hover:border-blue-500/30 transition-colors"
        >
          <div className="flex-shrink-0 w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-black text-xl shadow-inner">
            2
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2"><Puzzle size={20} className="text-purple-400" /> 選擇分卷壓縮檔</h4>
            <p className="text-white/70 leading-relaxed">
              安裝進行到一半時，系統會跳出彈窗提示尋找下一個檔案。請點擊瀏覽，並選中剛剛下載的檔案中，結尾為 <code className="bg-black/50 text-purple-300 px-1.5 py-0.5 rounded border border-white/10 font-mono">setup.2</code> 的檔案。選中後，稍作等待即可完成主程式安裝。
            </p>
          </div>
        </motion.div>

        {/* Step 3 */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-900/60 border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row gap-6 hover:border-blue-500/30 transition-colors"
        >
          <div className="flex-shrink-0 w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-black text-xl shadow-inner">
            3
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2"><RefreshCcw size={20} className="text-emerald-400" /> 安裝後續更新套件</h4>
            <p className="text-white/70 leading-relaxed">
              主程式安裝完成後，請將資料夾內所有名稱包含 <code className="bg-black/50 text-emerald-300 px-1.5 py-0.5 rounded border border-white/10 font-mono">update</code> 的更新檔，<strong>按照結尾的版本號順序依次執行安裝</strong>。全部更新安裝完畢後，即可開啓並享受遊戲！
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
