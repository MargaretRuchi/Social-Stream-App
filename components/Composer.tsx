
import React, { useState, useEffect } from 'react';
import { SocialAccount, Platform, AIRepurposeResponse } from '../types';
import { PLATFORMS } from '../constants';
import { generatePostContent } from '../services/gemini';
import { Sparkles, Send, Calendar, Clock, Image as ImageIcon, Loader2, X, Plus } from 'lucide-react';

interface ComposerProps {
  accounts: SocialAccount[];
  selectedAccountIds: string[];
  onSchedule: (post: any) => void;
}

const Composer: React.FC<ComposerProps> = ({ accounts, selectedAccountIds, onSchedule }) => {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [variations, setVariations] = useState<AIRepurposeResponse | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);

  useEffect(() => {
    const platforms = accounts
      .filter(a => selectedAccountIds.includes(a.id))
      .map(a => a.platform);
    setSelectedPlatforms(Array.from(new Set(platforms)));
  }, [selectedAccountIds, accounts]);

  const handleGenerate = async () => {
    if (!topic || selectedPlatforms.length === 0) return;
    setIsGenerating(true);
    try {
      const result = await generatePostContent(topic, selectedPlatforms);
      setVariations(result);
    } catch (error) {
      alert("AI generation failed. Please check your API key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePost = () => {
    if (!variations) return;
    onSchedule({
      id: Math.random().toString(36).substr(2, 9),
      content: variations.variations[0].content,
      accountIds: selectedAccountIds,
      scheduleDate: new Date(),
      status: 'scheduled',
      variations: variations
    });
    setTopic('');
    setVariations(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="text-indigo-500" size={20} />
            AI Content Composer
          </h2>
          <div className="flex gap-2">
            {selectedPlatforms.map(p => (
              <span key={p} className={`px-2 py-1 rounded-md text-[10px] font-bold text-white uppercase flex items-center gap-1 ${PLATFORMS[p].color}`}>
                {PLATFORMS[p].icon}
                {p}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Post Idea / Topic</label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="What do you want to share? e.g. New coffee blend launch with a focus on sustainable sourcing..."
              className="w-full h-32 p-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none text-slate-700"
            />
          </div>

          <div className="flex gap-3">
             <button
              onClick={handleGenerate}
              disabled={isGenerating || !topic || selectedAccountIds.length === 0}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
                isGenerating || !topic || selectedAccountIds.length === 0
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200 active:scale-[0.98]'
              }`}
            >
              {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
              {isGenerating ? 'AI is brainstorming...' : 'Generate Platform Variations'}
            </button>
            <button className="px-4 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50">
              <ImageIcon size={20} />
            </button>
          </div>
        </div>
      </div>

      {variations && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-bottom-4 duration-500">
          {variations.variations.map((v, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-3 relative group">
              <div className="flex items-center justify-between mb-2">
                <span className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold text-white ${PLATFORMS[v.platform].color}`}>
                  {PLATFORMS[v.platform].icon}
                  {v.platform.toUpperCase()}
                </span>
                <button className="text-slate-400 hover:text-indigo-500 transition-colors">
                  <Plus size={18} />
                </button>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{v.content}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {v.hashtags.map((tag, i) => (
                  <span key={i} className="text-xs text-indigo-500 font-medium">#{tag}</span>
                ))}
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase">CTA: {v.cta}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {variations && (
        <div className="flex justify-end gap-3 pb-10">
          <button className="px-6 py-3 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-white flex items-center gap-2 bg-white/50">
            <Calendar size={18} />
            Schedule All
          </button>
          <button 
            onClick={handlePost}
            className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 flex items-center gap-2 active:scale-[0.98] transition-all"
          >
            <Send size={18} />
            Post Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Composer;
