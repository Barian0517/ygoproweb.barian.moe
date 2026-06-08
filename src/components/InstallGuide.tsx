import { AlertTriangle, Download, FolderOpen, Puzzle, RefreshCcw } from 'lucide-react';

export function InstallGuide() {
  return (
    <div className="pt-24 pb-24 max-w-max-width mx-auto px-4 md:px-margin-desktop min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tighter">
            安裝 <span className="text-primary">教學</span>
          </h2>
          <p className="font-body-md text-on-surface-variant max-w-lg mt-2">
            依照以下步驟，輕鬆完成 mdpro 遊戲客戶端的安裝與更新
          </p>
        </div>
        <div className="flex gap-4">
          <div className="w-12 h-1 bg-primary"></div>
          <div className="w-12 h-1 bg-surface-container-highest"></div>
          <div className="w-12 h-1 bg-surface-container-highest"></div>
        </div>
      </div>

      <div className="bg-surface-container p-8 border border-outline-variant/30 card-glow transition-all relative group overflow-hidden mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-title-md text-title-md text-primary mb-2 uppercase">下載 mdpro 核心檔案</h3>
          <p className="text-on-surface-variant font-body-md">首次下載請務必下載資料夾內的所有內容，確保安裝順利。</p>
        </div>
        <a 
          href="https://cloudreve.barian.moe/s/xRgtE" 
          target="_blank" 
          rel="noopener noreferrer"
          className="whitespace-nowrap px-8 py-4 bg-primary text-on-primary font-label-caps flex items-center justify-center gap-2 gold-border hover:brightness-110 active:scale-95 transition-all shadow-lg"
        >
          <Download size={20} />
          前往下載頁面
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {/* Step 1 */}
        <div className="bg-surface-container p-8 border border-outline-variant/30 card-glow transition-all relative group overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary group-hover:w-2 transition-all"></div>
          <div className="text-6xl font-headline-lg text-surface-container-highest mb-6">01</div>
          <h3 className="font-title-md text-title-md text-primary mb-4 uppercase flex items-center gap-2">
            <FolderOpen size={20} /> 集中與執行
          </h3>
          <p className="text-on-surface-variant font-body-md mb-8">
            將所有名稱帶有 <code className="bg-void-black text-primary px-2 py-1 border border-primary/20 font-mono text-sm ml-1 mr-1">setup</code> 的檔案放在相同的資料夾內，接著雙擊運行結尾為 <code className="bg-void-black text-primary px-2 py-1 border border-primary/20 font-mono text-sm ml-1 mr-1">.setup.exe</code> 的執行檔。
          </p>
          <div className="bg-void-black p-4 font-body-md text-sm text-secondary border border-secondary/20 flex gap-3">
            <AlertTriangle className="flex-shrink-0 mt-0.5" size={16} />
            <div>
              安裝過程可能會出現亂碼（編碼問題），此為正常現象，請直接<strong className="text-white">點擊預設選中的按鈕</strong>繼續安裝即可。
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-surface-container p-8 border border-outline-variant/30 card-glow transition-all relative group overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-secondary group-hover:w-2 transition-all"></div>
          <div className="text-6xl font-headline-lg text-surface-container-highest mb-6">02</div>
          <h3 className="font-title-md text-title-md text-secondary mb-4 uppercase flex items-center gap-2">
            <Puzzle size={20} /> 選擇分卷
          </h3>
          <p className="text-on-surface-variant font-body-md mb-8 leading-relaxed">
            安裝進行到一半時，系統會跳出彈窗提示尋找下一個檔案。請點擊瀏覽，並選中剛剛下載的檔案中，結尾為 <code className="bg-void-black text-secondary px-2 py-1 border border-secondary/20 font-mono text-sm ml-1 mr-1">setup.2</code> 的檔案。選中後，稍作等待即可完成主程式安裝。
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-surface-container p-8 border border-outline-variant/30 card-glow transition-all relative group overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-rarity-ultra group-hover:w-2 transition-all"></div>
          <div className="text-6xl font-headline-lg text-surface-container-highest mb-6">03</div>
          <h3 className="font-title-md text-title-md text-rarity-ultra mb-4 uppercase flex items-center gap-2">
            <RefreshCcw size={20} /> 後續更新
          </h3>
          <p className="text-on-surface-variant font-body-md mb-4 leading-relaxed">
            主程式安裝完成後，請將資料夾內所有名稱包含 <code className="bg-void-black text-rarity-ultra px-2 py-1 border border-rarity-ultra/20 font-mono text-sm ml-1 mr-1">update</code> 的更新檔，<strong className="text-white">按照結尾的版本號順序依次執行安裝</strong>。全部更新安裝完畢後，即可開啓並享受遊戲！
          </p>
        </div>
      </div>
    </div>
  );
}
