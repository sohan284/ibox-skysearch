interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8 px-4 shadow-lg">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-2 text-blue-100">{subtitle}</p>}
      </div>
    </header>
  );
}
