export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-slate-950 py-8 text-center text-sm text-white/40">
      <p>
        © {new Date().getFullYear()} 幽影櫻的 mdpro 伺服器. All rights reserved.
      </p>
      <p className="mt-2 text-white/30">
        <a href="https://barian.moe" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">幽影櫻</a>製作
      </p>
    </footer>
  );
}
