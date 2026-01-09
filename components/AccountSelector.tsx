
import React from 'react';
import { SocialAccount, Platform } from '../types';
import { PLATFORMS } from '../constants';
import { Check } from 'lucide-react';

interface AccountSelectorProps {
  accounts: SocialAccount[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

const AccountSelector: React.FC<AccountSelectorProps> = ({ accounts, selectedIds, onToggle }) => {
  // Group accounts by platform
  const grouped = accounts.reduce((acc, account) => {
    if (!acc[account.platform]) acc[account.platform] = [];
    acc[account.platform].push(account);
    return acc;
  }, {} as Record<Platform, SocialAccount[]>);

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Select Accounts</h3>
      {/* Fix: Cast Object.entries to resolve 'map' does not exist on type 'unknown' error */}
      {(Object.entries(grouped) as [Platform, SocialAccount[]][]).map(([platform, platformAccounts]) => (
        <div key={platform} className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 capitalize">
            {PLATFORMS[platform].icon}
            {platform}
          </div>
          <div className="grid grid-cols-1 gap-2">
            {platformAccounts.map((account) => {
              const selected = selectedIds.includes(account.id);
              return (
                <button
                  key={account.id}
                  onClick={() => onToggle(account.id)}
                  className={`flex items-center gap-3 p-2 rounded-xl border transition-all ${
                    selected 
                      ? 'border-indigo-500 bg-indigo-50/50 shadow-sm' 
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="relative">
                    <img src={account.avatar} alt={account.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-white ${PLATFORMS[account.platform].color}`}>
                      <span className="scale-[0.6]">{PLATFORMS[account.platform].icon}</span>
                    </div>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-slate-800 leading-tight">{account.name}</p>
                    <p className="text-xs text-slate-500">{account.handle}</p>
                  </div>
                  {selected && (
                    <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center text-white">
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccountSelector;