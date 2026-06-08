import { AlertTriangle, Copy, MonitorPlay, BookOpen, Download } from 'lucide-react';
import { useState } from 'react';
import step3Image from '../../pic/step3.png';

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
    <div className="pt-24 pb-24 max-w-max-width mx-auto px-4 md:px-margin-desktop min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tighter">
            加入 <span className="text-secondary">伺服器</span>
          </h2>
          <p className="font-body-md text-on-surface-variant max-w-lg mt-2">
            按照以下步驟，只需幾分鐘即可開始您的對戰。
          </p>
        </div>
        <div className="flex gap-4">
          <div className="w-12 h-1 bg-secondary"></div>
          <div className="w-12 h-1 bg-surface-container-highest"></div>
          <div className="w-12 h-1 bg-surface-container-highest"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
        {/* Step 1 */}
        <div className="bg-surface-container p-8 border border-outline-variant/30 card-glow transition-all relative group overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary group-hover:w-2 transition-all"></div>
          
          <h3 className="font-title-md text-title-md text-primary mb-6 uppercase flex items-center gap-2">
            <Download size={24} /> 1. 下載遊戲主程式與卡包
          </h3>
          
          <div className="space-y-4 mb-8">
            <div className="bg-surface-container-low border border-outline-variant/20 rounded p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col">
                <span className="text-primary font-label-caps text-[10px] mb-1">STEP 1</span>
                <span className="text-on-surface-variant font-body-md">完成 mdpro 安裝</span>
              </div>
              <button 
                onClick={() => setCurrentTab && setCurrentTab('install')}
                className="whitespace-nowrap px-4 py-2 bg-primary/20 text-primary font-label-caps flex items-center gap-2 border border-primary/30 hover:bg-primary hover:text-on-primary transition-colors"
              >
                <BookOpen size={16} /> 安裝教學
              </button>
            </div>

            <div className="bg-surface-container-low border border-outline-variant/20 rounded p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col">
                <span className="text-primary font-label-caps text-[10px] mb-1">STEP 2</span>
                <span className="text-on-surface-variant font-body-md">下載更新器，放入 mdpro3 根目錄並執行</span>
              </div>
              <a 
                href="https://cloudreve.barian.moe/f/APJfq/MDPro3_launcher.exe" 
                className="whitespace-nowrap px-4 py-2 bg-secondary/20 text-secondary font-label-caps flex items-center gap-2 border border-secondary/30 hover:bg-secondary hover:text-on-secondary transition-colors"
              >
                <Download size={16} /> 下載更新器
              </a>
            </div>

            <div className="bg-surface-container-low border border-outline-variant/20 rounded p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col">
                <span className="text-rarity-ultra font-label-caps text-[10px] mb-1">FINISH</span>
                <span className="text-on-surface-variant font-body-md">之後請使用 <code className="bg-void-black text-primary px-2 py-0.5 border border-primary/20 text-sm">MDPro3_launcher.exe</code> 啟動遊戲</span>
              </div>
            </div>
          </div>

          {/* Manual Update */}
          <div className="pt-6 border-t border-outline-variant/30">
            <h4 className="font-label-caps text-outline mb-4">手動更新方法</h4>
            
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="bg-surface-container-highest px-2 py-1 text-[10px] font-label-caps border border-outline-variant/50">手動 1</span>
                  <span className="text-on-surface-variant text-sm">下載最新版本的自製卡包檔案</span>
                </div>
                <a 
                  href="https://ygoproapi.barian.moe/api/download/ypk" 
                  download 
                  className="w-fit text-xs font-label-caps bg-outline-variant/20 text-on-surface hover:text-primary px-3 py-1 flex items-center gap-1 border border-outline-variant/50 transition-colors"
                >
                  <Download size={14} /> 下載卡包
                </a>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="bg-surface-container-highest px-2 py-1 text-[10px] font-label-caps border border-outline-variant/50">手動 2</span>
                <span className="text-on-surface-variant text-sm leading-relaxed">將卡包內容覆蓋至 <code className="bg-void-black text-primary px-1 border border-primary/20">expansions</code> 資料夾</span>
              </div>
            </div>
          </div>

          <div className="mt-8 border border-outline-variant/30 p-2 bg-void-black rounded-lg">
            <img src={step3Image} alt="Step 3 Guide" className="w-full object-contain opacity-80 hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-surface-container p-8 border border-outline-variant/30 card-glow transition-all relative group overflow-hidden h-fit">
          <div className="absolute top-0 left-0 w-1 h-full bg-secondary group-hover:w-2 transition-all"></div>
          
          <h3 className="font-title-md text-title-md text-secondary mb-6 uppercase flex items-center gap-2">
            <MonitorPlay size={24} /> 2. 開始連線
          </h3>

          <p className="text-on-surface-variant font-body-md mb-8 leading-relaxed">
            啟動遊戲後，進入多人連線介面。輸入我們的 IP 位址與通訊埠 (Port)，如果不設定密碼將進入隨機對戰。
          </p>

          <div className="bg-void-black p-6 font-mono text-sm border border-secondary/20 mb-8 relative hover:border-secondary transition-colors">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs text-secondary font-label-caps">SERVER SECURE PROTOCOL</span>
              <button 
                onClick={handleCopy}
                className="text-secondary hover:text-white transition-colors"
              >
                {copied ? <span className="material-symbols-outlined text-sm">check</span> : <span className="material-symbols-outlined text-sm">content_copy</span>}
              </button>
            </div>
            <div className="text-2xl md:text-3xl text-primary font-black tracking-wider break-all">
              {serverAddress}
              <span className="text-outline-variant mx-2">:</span>
              {port}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3 text-sm text-on-surface-variant bg-surface-container-low p-4 border-l-2 border-secondary">
              <AlertTriangle size={18} className="text-secondary flex-shrink-0 mt-0.5" />
              <span>第一次載入自製卡時，可能需要較長的時間才會看到卡圖與效果。</span>
            </div>
            <div className="flex gap-3 text-sm text-on-surface-variant bg-surface-container-low p-4 border-l-2 border-rarity-ultra">
              <AlertTriangle size={18} className="text-rarity-ultra flex-shrink-0 mt-0.5" />
              <span>請勿使用原版遊戲的「建立主機」功能，直接在多人連線填入 IP 資訊後點擊「加入遊戲」。</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
