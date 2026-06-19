interface NavbarProps {
  title: string;
  subtitle?: string;
}

export function Navbar({ title, subtitle }: NavbarProps) {
  return (
    <nav className="bg-gradient-to-r from-[#007eff] to-[#005bb5] text-white h-[50px] flex items-center px-4 shadow-xl fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto w-full flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.8 19.2 16 11l3.5-3.5C21 6.5 21 5 20 4s-2.5 1-3.5 2L13 8l-8.2-1.8c-.7-.1-1.4.4-1.4 1.1 0 .5.3 1 .7 1.3L8 11l-1.7 4.9c-.2.6 0 1.3.5 1.7l1.7 1.7c.4.4 1.1.6 1.7.5L13 16l2.5 2.5c.3.4.8.7 1.3.7.1 0 .3 0 .4-.1.7-.3 1.2-1 .9-1.6z"/>
        </svg>
        <div>
          <h1 className="text-lg md:text-xl font-bold tracking-tight">
            {title}
          </h1>
          {subtitle && <p className="text-white/90 text-xs">{subtitle}</p>}
        </div>
      </div>
    </nav>
  );
}
