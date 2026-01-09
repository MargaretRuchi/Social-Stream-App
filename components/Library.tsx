
import React from 'react';
import { LibraryItem } from '../types';
import { Search, Plus, Tag, Copy, MoreVertical, Layout, Trash2 } from 'lucide-react';

interface LibraryProps {
  items: LibraryItem[];
}

const Library: React.FC<LibraryProps> = ({ items }) => {
  const [search, setSearch] = React.useState('');

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) || 
    item.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Content Library</h2>
          <p className="text-slate-500">Store and reuse your best templates, hashtags, and drafts.</p>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 flex items-center gap-2 shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]">
          <Plus size={20} />
          Create Template
        </button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Search templates, tags, or content..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white transition-all shadow-sm"
          />
        </div>
        <button className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-50">
          <Tag size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden flex flex-col">
            <div className="p-5 flex-1">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-slate-800 truncate flex-1 pr-2">{item.title}</h3>
                <button className="text-slate-400 hover:text-slate-600 p-1">
                  <MoreVertical size={16} />
                </button>
              </div>
              <p className="text-sm text-slate-600 line-clamp-4 leading-relaxed mb-4 italic">
                "{item.content}"
              </p>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-bold uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-indigo-600 bg-white rounded-lg border border-slate-200 shadow-sm transition-all">
                  <Copy size={16} />
                </button>
                <button className="p-2 text-slate-400 hover:text-indigo-600 bg-white rounded-lg border border-slate-200 shadow-sm transition-all">
                  <Layout size={16} />
                </button>
              </div>
              <button className="text-[10px] font-bold text-red-400 hover:text-red-500 flex items-center gap-1">
                <Trash2 size={12} />
                DELETE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
