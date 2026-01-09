
import React from 'react';
import { NAV_ITEMS } from '../constants';
import { Sparkles } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 h-screen border-r border-slate-200 bg-white flex flex-col shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
          <Sparkles size={24} />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-800">SocialStream</h1>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === item.id
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4 text-white">
          <p className="text-xs font-semibold opacity-80 uppercase tracking-wider mb-1">Plan: Pro</p>
          <p className="text-sm font-medium mb-3">5/10 Accounts connected</p>
          <button className="w-full bg-white/20 hover:bg-white/30 transition-colors py-2 rounded-lg text-xs font-semibold">
            Manage Plan
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
