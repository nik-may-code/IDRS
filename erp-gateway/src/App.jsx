import React from 'react';

const modules = [
  {
    id: 'admin',
    title: 'Administrator',
    description: 'Centralized control panel for system administration, configuration, and holistic oversight.',
    colorClass: 'text-red-500',
    bgClass: 'bg-red-50',
    borderClass: 'group-hover:border-red-500',
    url: 'http://localhost:5174',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    )
  },
  {
    id: 'faculty',
    title: 'Faculty Portal',
    description: 'Manage curriculum, assess student progress, and oversee department operations.',
    colorClass: 'text-blue-500',
    bgClass: 'bg-blue-50',
    borderClass: 'group-hover:border-blue-500',
    url: 'http://localhost:5173',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
      </svg>
    )
  },
  {
    id: 'student',
    title: 'Student Hub',
    description: 'Access academic records, track attendance, submit assignments, and view announcements.',
    colorClass: 'text-emerald-500',
    bgClass: 'bg-emerald-50',
    borderClass: 'group-hover:border-emerald-500',
    url: 'http://localhost:5175',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    )
  },
  {
    id: 'alumni',
    title: 'Alumni Network',
    description: 'Connect with peers, explore job opportunities, and engage with the alma mater community.',
    colorClass: 'text-yellow-500',
    bgClass: 'bg-yellow-50',
    borderClass: 'group-hover:border-yellow-500',
    url: 'http://localhost:5176',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    )
  }
];

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f9fbfc] text-gray-800 px-6 py-12">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full border-b border-gray-300 bg-white p-4 text-sm font-semibold flex justify-between items-center">
        <span>Institute Data Retrieval System</span>
        <span className="text-gray-500 text-xs">v1.0</span>
      </div>

      <header className="text-center mb-16 mt-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900">
          IDRS Enterprise Portal
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Welcome to the centralized hub. Please select your workspace module to continue.
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {modules.map((mod) => (
          <a
            key={mod.id}
            href={mod.url}
            className={`group bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start ${mod.borderClass} hover:-translate-y-1`}
          >
            <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-6 ${mod.bgClass} ${mod.colorClass} transition-transform duration-300 group-hover:scale-110`}>
              {mod.icon}
            </div>
            <h2 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-black transition-colors">
              {mod.title}
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed flex-grow">
              {mod.description}
            </p>
            <div className={`inline-flex items-center font-semibold text-sm ${mod.colorClass} mt-auto`}>
              Enter Portal
              <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </a>
        ))}
      </main>

      <footer className="mt-20 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} Institute Data Retrieval System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
