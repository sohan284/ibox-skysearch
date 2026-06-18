interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-[#007eff] to-[#005bb5] text-white py-10 px-4 shadow-xl">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.8 19.2 16 11l3.5-3.5C21 6.5 21 5 20 4s-2.5 1-3.5 2L13 8l-8.2-1.8c-.7-.1-1.4.4-1.4 1.1 0 .5.3 1 .7 1.3L8 11l-1.7 4.9c-.2.6 0 1.3.5 1.7l1.7 1.7c.4.4 1.1.6 1.7.5L13 16l2.5 2.5c.3.4.8.7 1.3.7.1 0 .3 0 .4-.1.7-.3 1.2-1 .9-1.6z"/>
          </svg>
          {title}
        </h1>
        {subtitle && <p className="mt-3 text-white/90 text-lg">{subtitle}</p>}
      </div>
    </header>
  );
}
