import { Download, AlertTriangle, Settings, ChevronRight, Copy, MonitorPlay, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

export function Join({ setCurrentTab }: { setCurrentTab?: (tab: string) => void }) {
  const [copied, setCopied] = useState(false);
  const serverAddress = 'ygopro.barian.moe';
  const port = '7911';

  const handleCopy = () => {
    navigator.clipboard.writeText(`${serverAddress}:${port}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-lg">
          <span className="text-white">加入伺服器</span>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">JOIN US</span>
        </h2>
        <p className="text-white/60 text-lg">按照以下步驟，只需幾分鐘即可開始您的對戰。</p>
      </motion.div>

      <div className="space-y-8">
        {/* Step 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900/80 backdrop-blur-sm border border-white/5 rounded-3xl p-6 md:p-8 shadow-xl"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-300 font-bold text-lg shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              1
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              下載遊戲主程式與卡包 <Download size={20} className="text-white/40" />
            </h3>
          </div>

          <div className="space-y-3 mb-8">
            <div className="bg-slate-950/60 border border-white/5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 px-4 gap-4 hover:border-white/10 transition-colors">
              <div className="flex items-center gap-4">
                <span className="bg-slate-800 text-blue-300 font-bold text-sm px-3 py-1.5 rounded-lg shadow-inner">Step 1</span>
                <span className="text-white/80 font-medium whitespace-break-spaces">完成 mdpro 安裝</span>
              </div>
              <button 
                onClick={() => setCurrentTab && setCurrentTab('install')}
                className="whitespace-nowrap flex items-center gap-2 bg-blue-500/10 text-blue-300 border border-blue-500/30 px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-500/20 hover:border-blue-500/50 transition-all ml-14 sm:ml-0 shadow-lg"
              >
                <BookOpen size={16} /> 安裝教學
              </button>
            </div>

            <div className="bg-slate-950/60 border border-white/5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 px-4 gap-4 hover:border-white/10 transition-colors">
              <div className="flex items-center gap-4">
                <span className="bg-slate-800 text-blue-300 font-bold text-sm px-3 py-1.5 rounded-lg shadow-inner">Step 2</span>
                <span className="text-white/80 font-medium">下載最新版本的自製卡包檔案</span>
              </div>
              <a href="https://ygoproapi.barian.moe/api/download/ypk" download className="whitespace-nowrap flex items-center gap-2 bg-pink-500/10 text-pink-300 border border-pink-500/30 px-4 py-2 rounded-xl text-sm font-bold hover:bg-pink-500/20 hover:border-pink-500/50 transition-all ml-14 sm:ml-0 shadow-lg">
                <Download size={16} /> 下載卡包
              </a>
            </div>
            
            <div className="bg-slate-950/60 border border-white/5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 px-4 gap-4 hover:border-white/10 transition-colors leading-relaxed">
              <div className="flex items-center gap-4">
                <span className="bg-slate-800 text-blue-300 font-bold text-sm px-3 py-1.5 rounded-lg shadow-inner">Step 3</span>
                <span className="text-white/80 font-medium">將卡包內容覆蓋至遊戲根目錄的 <code className="bg-black/50 text-cyan-200 px-1.5 py-0.5 rounded border border-white/5">expansions</code> 資料夾內</span>
              </div>
            </div>
          </div>

          <div className="bg-red-950/20 border border-red-500/20 rounded-2xl p-5 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-red-400 mt-0.5 flex-shrink-0" size={20} />
              <div>
                <h4 className="text-red-300 font-bold mb-1">重要設定：防毒軟體判定</h4>
                <p className="text-red-200/70 text-sm leading-relaxed">
                  由於程式未包含數位簽章，部分防毒軟體（如 Windows Defender）可能會發生誤判而隔離遊戲核心檔案 <code>ygopro.exe</code>，請務必將遊戲資料夾加入防毒軟體白名單或排除清單中，否則遊戲將無法正常啟動。
                </p>
              </div>
            </div>
          </div>


        </motion.div>

        {/* Step 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/80 backdrop-blur-sm border border-white/5 rounded-3xl p-6 md:p-8 shadow-xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-300 font-bold text-lg shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              2
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              開始連線 <MonitorPlay size={20} className="text-white/40" />
            </h3>
          </div>

          <p className="text-white/70 mb-6 font-medium leading-relaxed">
            啟動遊戲後，進入多人連線介面。輸入我們的 IP 位址與通訊埠 (Port)，如果不設定密碼將進入隨機對戰。
          </p>

          <div className="space-y-2 mb-8">
            <p className="flex items-start gap-2 text-sm text-yellow-500/80">
              <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
              <span>第一次載入自製卡時，可能需要較長的時間才會看到卡圖與效果。</span>
            </p>
            <p className="flex items-start gap-2 text-sm text-yellow-500/80">
              <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
              <span>請勿使用原版遊戲的「建立主機」功能，直接在多人連線填入 IP 資訊後點擊「加入遊戲」。</span>
            </p>
          </div>

          <div className="bg-slate-950 border border-white/5 rounded-2xl p-4 md:p-5 relative group hover:border-blue-500/20 transition-colors shadow-inner">
            <div className="text-xs text-white/30 font-bold tracking-widest uppercase mb-2">
              Server IP & Port
            </div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div className="font-mono text-xl sm:text-2xl text-cyan-300 font-bold">
                {serverAddress} <span className="text-white/30 px-1">:</span> {port}
              </div>
              <button 
                onClick={handleCopy}
                className="w-full sm:w-auto p-3 bg-white/5 hover:bg-blue-500/20 text-white/60 hover:text-white rounded-xl transition-all border border-transparent hover:border-blue-500/30 flex items-center justify-center gap-2"
                title="複製伺服器地址"
              >
                {copied ? (
                  <span className="text-green-400 font-bold text-sm tracking-wide">已複製!</span>
                ) : (
                  <>
                    <Copy size={18} />
                    <span className="text-sm font-bold sm:hidden">複製地址</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
