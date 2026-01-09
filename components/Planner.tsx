
import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from 'date-fns';
import { Post, SocialAccount } from '../types';
import { PLATFORMS } from '../constants';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';

interface PlannerProps {
  posts: Post[];
  accounts: SocialAccount[];
}

const Planner: React.FC<PlannerProps> = ({ posts, accounts }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({
    start: monthStart,
    end: monthEnd,
  });

  const getDayPosts = (day: Date) => {
    return posts.filter(post => isSameDay(new Date(post.scheduleDate), day));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full animate-in fade-in duration-500">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-slate-800">{format(currentDate, 'MMMM yyyy')}</h2>
          <div className="flex items-center bg-slate-100 rounded-lg p-1">
            <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="p-1.5 hover:bg-white hover:shadow-sm rounded-md text-slate-600 transition-all">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="p-1.5 hover:bg-white hover:shadow-sm rounded-md text-slate-600 transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Filter size={16} />
            Filters
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors">
            New Event
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 border-b border-slate-100">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <div key={day} className="py-3 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {day}
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-7 auto-rows-[140px]">
          {calendarDays.map((day, idx) => {
            const dayPosts = getDayPosts(day);
            const isToday = isSameDay(day, new Date());
            
            return (
              <div 
                key={idx} 
                className={`border-r border-b border-slate-50 p-2 hover:bg-slate-50/50 transition-colors flex flex-col gap-1 overflow-hidden ${
                  !isSameDay(monthStart, day) && day < monthStart ? 'opacity-30' : ''
                }`}
              >
                <span className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full mb-1 ${
                  isToday ? 'bg-indigo-600 text-white' : 'text-slate-500'
                }`}>
                  {format(day, 'd')}
                </span>
                
                <div className="flex flex-col gap-1 overflow-y-auto custom-scrollbar">
                  {dayPosts.map(post => (
                    <div 
                      key={post.id} 
                      className="bg-indigo-50 border border-indigo-100 rounded-md p-1.5 flex items-center gap-1.5 cursor-pointer hover:bg-indigo-100 transition-colors group"
                    >
                      <div className="flex -space-x-1 shrink-0">
                        {post.accountIds.slice(0, 2).map(id => {
                          const acc = accounts.find(a => a.id === id);
                          return acc ? (
                            <div key={id} className={`w-4 h-4 rounded-full border border-white flex items-center justify-center text-[8px] text-white ${PLATFORMS[acc.platform].color}`}>
                              {PLATFORMS[acc.platform].icon}
                            </div>
                          ) : null;
                        })}
                      </div>
                      <p className="text-[10px] font-medium text-indigo-700 truncate">{post.content.substring(0, 20)}...</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Planner;
