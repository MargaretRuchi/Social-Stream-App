
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import AccountSelector from './components/AccountSelector';
import Composer from './components/Composer';
import Planner from './components/Planner';
import Library from './components/Library';
import { INITIAL_ACCOUNTS } from './constants';
import { Post, SocialAccount, LibraryItem } from './types';
// Fix: Added Plus to lucide-react imports to fix "Cannot find name 'Plus'" error
import { Bell, Search, User, Plus } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [accounts, setAccounts] = useState<SocialAccount[]>(INITIAL_ACCOUNTS);
  const [selectedAccountIds, setSelectedAccountIds] = useState<string[]>([INITIAL_ACCOUNTS[0].id]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>([
    { id: 'l1', title: 'Sustainable Coffee Hooks', content: 'Ever wondered where your morning pick-me-up actually comes from? ☕️', tags: ['coffee', 'hooks', 'branding'] },
    { id: 'l2', title: 'Tech Review Template', content: 'Deep dive into the latest gadgets. Here is what we found...', tags: ['tech', 'reviews', 'product'] },
    { id: 'l3', title: 'Weekly Recap Structure', content: 'What a week! Here are the 3 big things you missed in the industry:', tags: ['recap', 'newsletter', 'linkedin'] },
  ]);

  const toggleAccount = (id: string) => {
    setSelectedAccountIds(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleSchedulePost = (post: Post) => {
    setPosts(prev => [...prev, post]);
    setActiveTab('planner');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'composer':
        return (
          <Composer 
            accounts={accounts} 
            selectedAccountIds={selectedAccountIds} 
            onSchedule={handleSchedulePost} 
          />
        );
      case 'planner':
        return <Planner posts={posts} accounts={accounts} />;
      case 'library':
        return <Library items={libraryItems} />;
      case 'dashboard':
      default:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-extrabold text-slate-800">Welcome back, Alex!</h2>
                <p className="text-slate-500 mt-1">You have 4 posts scheduled for today across 3 accounts.</p>
              </div>
              <button 
                onClick={() => setActiveTab('composer')}
                className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all hover:-translate-y-0.5"
              >
                + Create New Post
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Total Engagement', value: '24.8k', change: '+12%', color: 'text-emerald-500' },
                { label: 'Scheduled Posts', value: posts.length, change: 'Next in 2h', color: 'text-indigo-500' },
                { label: 'Library Templates', value: libraryItems.length, change: '3 new', color: 'text-amber-500' }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <div className="flex items-end justify-between">
                    <span className="text-4xl font-black text-slate-800">{stat.value}</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full bg-slate-50 ${stat.color}`}>{stat.change}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Upcoming Schedule</h3>
                <div className="space-y-4">
                  {posts.length > 0 ? posts.slice(0, 3).map((post, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex -space-x-1">
                        {post.accountIds.slice(0, 3).map(id => (
                          <img key={id} src={accounts.find(a => a.id === id)?.avatar} className="w-8 h-8 rounded-full border-2 border-white" />
                        ))}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-semibold text-slate-700 truncate">{post.content}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Today at 4:30 PM</p>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-10">
                      <p className="text-slate-400 text-sm">No upcoming posts. Start composing!</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Insights</h3>
                <div className="h-[200px] flex items-center justify-center border-2 border-dashed border-slate-100 rounded-2xl">
                   <p className="text-slate-400 text-sm italic">Analytics will appear once posts are active.</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search posts, analytics, accounts..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-xl relative transition-all">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-2 px-2 py-1 rounded-xl hover:bg-slate-50 cursor-pointer transition-all">
              <div className="text-right">
                <p className="text-xs font-bold text-slate-800 leading-none">Alex Rivera</p>
                <p className="text-[10px] font-medium text-slate-400 uppercase">Social Manager</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                AR
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {renderContent()}
          </div>

          {/* Account Selection Right Sidebar (Conditional for Composer) */}
          {activeTab === 'composer' && (
            <div className="w-72 bg-white border-l border-slate-200 p-6 overflow-y-auto shrink-0 animate-in slide-in-from-right-4 duration-500">
              <AccountSelector 
                accounts={accounts} 
                selectedIds={selectedAccountIds} 
                onToggle={toggleAccount} 
              />
              <div className="mt-8 pt-8 border-t border-slate-100">
                 <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs font-bold hover:border-indigo-400 hover:text-indigo-500 transition-all flex items-center justify-center gap-2 group">
                   <Plus size={16} className="group-hover:scale-110 transition-transform" />
                   ADD ACCOUNT
                 </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;