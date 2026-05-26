import React from 'react';
import { Trophy, RefreshCw, Sparkles, LayoutDashboard, CalendarDays, GitMerge } from 'lucide-react';

interface HeaderProps {
  activeTab: 'dashboard' | 'group' | 'knockout';
  setActiveTab: (tab: 'dashboard' | 'group' | 'knockout') => void;
  resetAll: () => void;
  simulateAllGroupMatches: () => void;
  isGroupStageComplete: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  resetAll,
  simulateAllGroupMatches,
  isGroupStageComplete,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/5 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4">
          
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-neon-green/10 rounded-xl border border-neon-green/20 shadow-[0_0_15px_rgba(0,255,157,0.15)]">
              <Trophy className="w-7 h-7 text-neon-green" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-wider bg-gradient-to-r from-white via-neutral-200 to-neon-green bg-clip-text text-transparent glow-text-neon flex items-center gap-2">
                2026 美加墨世界杯模拟沙盘
              </h1>
              <p className="text-xs text-neutral-400 font-semibold tracking-wide uppercase mt-0.5">
                48 支球队 · 12 个小组 · 32 强淘汰赛 · 殿堂级数据大屏
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex p-1 bg-black/40 rounded-xl border border-white/5 gap-1 w-full md:w-auto">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 ${
                activeTab === 'dashboard'
                  ? 'bg-neon-green/10 text-neon-green border border-neon-green/20 shadow-[0_0_10px_rgba(0,255,157,0.1)]'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              赛事看板
            </button>
            <button
              onClick={() => setActiveTab('group')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 ${
                activeTab === 'group'
                  ? 'bg-neon-green/10 text-neon-green border border-neon-green/20 shadow-[0_0_10px_rgba(0,255,157,0.1)]'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              小组赛预测
            </button>
            <button
              onClick={() => setActiveTab('knockout')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 ${
                activeTab === 'knockout'
                  ? 'bg-neon-green/10 text-neon-green border border-neon-green/20 shadow-[0_0_10px_rgba(0,255,157,0.1)]'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
              }`}
            >
              <GitMerge className="w-4 h-4" />
              淘汰赛沙盘
            </button>
          </div>

          {/* Direct Sandbox Controls */}
          <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
            {!isGroupStageComplete && activeTab === 'group' && (
              <button
                onClick={simulateAllGroupMatches}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-neon-green to-emerald-500 text-black hover:brightness-110 shadow-[0_4px_15px_rgba(0,255,157,0.3)] transition-all duration-300"
              >
                <Sparkles className="w-3.5 h-3.5" />
                快捷一键模拟
              </button>
            )}
            <button
              onClick={resetAll}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold border border-white/5 hover:border-red-500/30 hover:bg-red-500/10 text-neutral-300 hover:text-red-400 transition-all duration-300"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              清空重置
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
