export function Footer() {
  return (
    <footer className="w-full py-12 px-4 md:px-margin-desktop mt-auto border-t border-outline-variant bg-void-black">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-max-width mx-auto">
        <div className="flex flex-col items-center md:items-start gap-4">
          <span className="font-display-hero text-surface-tint text-headline-lg-mobile tracking-tighter uppercase drop-shadow-md">
            幽影櫻 MDPRO
          </span>
          <p className="font-body-md text-label-caps text-xs text-on-surface-variant max-w-sm text-center md:text-left">
            © {new Date().getFullYear()} 幽影櫻的 mdpro 伺服器. All rights reserved.
          </p>
          <p className="font-body-md text-label-caps text-xs text-on-surface-variant max-w-sm text-center md:text-left">
            <a href="https://barian.moe" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors underline decoration-secondary-fixed underline-offset-4">幽影櫻</a>製作
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <a className="font-body-md text-label-caps text-xs text-on-tertiary-fixed-variant hover:text-primary transition-all duration-300 hover:underline decoration-secondary-fixed underline-offset-4" href="#">TERMS OF SERVICE</a>
          <a className="font-body-md text-label-caps text-xs text-on-tertiary-fixed-variant hover:text-primary transition-all duration-300 hover:underline decoration-secondary-fixed underline-offset-4" href="#">PRIVACY POLICY</a>
          <a className="font-body-md text-label-caps text-xs text-on-tertiary-fixed-variant hover:text-primary transition-all duration-300 hover:underline decoration-secondary-fixed underline-offset-4" href="#">COMMUNITY GUIDELINES</a>
          <a className="font-body-md text-label-caps text-xs text-on-tertiary-fixed-variant hover:text-primary transition-all duration-300 hover:underline decoration-secondary-fixed underline-offset-4" href="#">API DOCS</a>
        </div>
        <div className="flex gap-4">
          <a className="w-10 h-10 border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all" href="#">
            <span className="material-symbols-outlined">hub</span>
          </a>
          <a className="w-10 h-10 border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all" href="#">
            <span className="material-symbols-outlined">forum</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
