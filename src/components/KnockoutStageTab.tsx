import React from 'react';
import type { KnockoutMatch, Team } from '../types';
import { Sparkles, Trophy, ArrowLeftRight } from 'lucide-react';

interface KnockoutStageTabProps {
  knockoutMatches: { [id: string]: KnockoutMatch };
  flatTeams: { [teamId: string]: Team };
  isGroupStageComplete: boolean;
  selectKnockoutWinner: (matchId: string, winnerId: string) => void;
  updateKnockoutScore: (matchId: string, homeScore: number | null, awayScore: number | null, winnerId: string | null) => void;
  setActiveTab: (tab: 'dashboard' | 'group' | 'knockout') => void;
}

export const KnockoutStageTab: React.FC<KnockoutStageTabProps> = ({
  knockoutMatches,
  flatTeams,
  isGroupStageComplete,
  selectKnockoutWinner,
  updateKnockoutScore,
  setActiveTab,
}) => {

  const handleScoreChange = (matchId: string, homeStr: string, awayStr: string) => {
    const homeVal = homeStr.trim() === '' ? null : parseInt(homeStr, 10);
    const awayVal = awayStr.trim() === '' ? null : parseInt(awayStr, 10);

    if ((homeVal !== null && isNaN(homeVal)) || (awayVal !== null && isNaN(awayVal))) {
      return;
    }
    updateKnockoutScore(matchId, homeVal, awayVal, null);
  };

  const getTeamLabel = (teamId: string | null, placeholder: string) => {
    if (!teamId) return { name: placeholder, flag: '❓', isReal: false };
    const team = flatTeams[teamId];
    return team 
      ? { name: team.name, flag: team.flag, isReal: true, id: team.id } 
      : { name: placeholder, flag: '❓', isReal: false };
  };

  // Render a single Match box in the tree
  const renderMatch = (matchId: string) => {
    const match = knockoutMatches[matchId];
    if (!match) return null;

    const home = getTeamLabel(match.homeTeamId, match.placeholder.home);
    const away = getTeamLabel(match.awayTeamId, match.placeholder.away);
    const isReady = home.isReal && away.isReal;
    const hasWinner = match.winnerId !== null;

    return (
      <div 
        className={`w-[190px] rounded-xl p-2.5 transition-all duration-300 relative ${
          !isReady 
            ? 'bg-white/1 border border-white/5 opacity-55' 
            : hasWinner 
            ? 'glass-panel border-neon-green/30 shadow-[0_0_15px_rgba(0,255,157,0.05)]' 
            : 'glass-panel border-white/10 shadow-lg hover:border-neon-green/30'
        }`}
      >
        <div className="text-[8px] font-black text-neutral-400 uppercase tracking-widest mb-1.5 flex justify-between">
          <span>场次 {matchId}</span>
          {isReady && !hasWinner && <span className="text-neon-green animate-pulse">进行中</span>}
          {hasWinner && <span className="text-athletic-gold">已完赛</span>}
        </div>

        <div className="space-y-1.5">
          {/* Home Team Card */}
          <div 
            onClick={() => isReady && home.id && selectKnockoutWinner(matchId, home.id)}
            className={`flex items-center justify-between p-1.5 rounded-lg transition-all ${
              isReady ? 'cursor-pointer' : 'cursor-default'
            } ${
              match.winnerId === home.id 
                ? 'bg-neon-green/15 text-white border border-neon-green/30' 
                : isReady 
                ? 'bg-white/3 hover:bg-white/7 border border-transparent' 
                : 'bg-black/20'
            }`}
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-sm flex-shrink-0">{home.flag}</span>
              <span className={`text-xs truncate ${home.isReal ? 'font-extrabold text-white' : 'text-neutral-500 font-bold'}`}>
                {home.name}
              </span>
            </div>
            {isReady && (
              <input
                type="text"
                value={match.homeScore !== null ? match.homeScore : ''}
                onClick={(e) => e.stopPropagation()} // prevent triggering click winner
                onChange={(e) => handleScoreChange(matchId, e.target.value, match.awayScore !== null ? String(match.awayScore) : '')}
                placeholder="-"
                className="w-6 h-5 rounded bg-black/60 border border-white/10 text-center font-bold text-[10px] text-white focus:outline-none focus:border-neon-green"
              />
            )}
          </div>

          {/* Away Team Card */}
          <div 
            onClick={() => isReady && away.id && selectKnockoutWinner(matchId, away.id)}
            className={`flex items-center justify-between p-1.5 rounded-lg transition-all ${
              isReady ? 'cursor-pointer' : 'cursor-default'
            } ${
              match.winnerId === away.id 
                ? 'bg-neon-green/15 text-white border border-neon-green/30' 
                : isReady 
                ? 'bg-white/3 hover:bg-white/7 border border-transparent' 
                : 'bg-black/20'
            }`}
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-sm flex-shrink-0">{away.flag}</span>
              <span className={`text-xs truncate ${away.isReal ? 'font-extrabold text-white' : 'text-neutral-500 font-bold'}`}>
                {away.name}
              </span>
            </div>
            {isReady && (
              <input
                type="text"
                value={match.awayScore !== null ? match.awayScore : ''}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => handleScoreChange(matchId, match.homeScore !== null ? String(match.homeScore) : '', e.target.value)}
                placeholder="-"
                className="w-6 h-5 rounded bg-black/60 border border-white/10 text-center font-bold text-[10px] text-white focus:outline-none focus:border-neon-green"
              />
            )}
          </div>
        </div>

        {/* Micro-helper text */}
        {isReady && !hasWinner && (
          <div className="text-[7px] text-center text-neutral-400 font-medium mt-1 select-none">
            点击球队直接晋级
          </div>
        )}
      </div>
    );
  };

  if (!isGroupStageComplete) {
    return (
      <div className="glass-panel rounded-2xl p-12 text-center border-white/5 shadow-2xl space-y-6 max-w-xl mx-auto my-12">
        <div className="inline-flex p-4 rounded-2xl bg-red-500/10 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
          <Trophy className="w-10 h-10 text-red-400" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-black text-white">淘汰赛沙盘尚未解锁</h2>
          <p className="text-xs text-neutral-400 leading-relaxed max-w-md mx-auto">
            因为 32 强淘汰赛的对阵是由 12 个小组的小组第一、小组第二，以及成绩最好的 8 个小组第三共同递补组成的。所以需要您先完成小组赛的所有 72 场比赛预测。
          </p>
        </div>
        <button
          onClick={() => setActiveTab('group')}
          className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl bg-neon-green text-black font-extrabold text-xs tracking-wider shadow-[0_4px_15px_rgba(0,255,157,0.3)] hover:brightness-110 active:scale-95 transition-all"
        >
          前往小组赛录入比分 (或一键模拟)
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Top Title Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black tracking-wide">32强淘汰赛神算沙盘</h2>
          <p className="text-xs text-neutral-400 mt-0.5">小组比分已全部锁定，对阵图已完美填装！点击对战卡片中的国家队徽章，即可快速推演其晋级！</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-neon-green font-bold bg-neon-green/10 border border-neon-green/20 px-3 py-2 rounded-xl">
          <ArrowLeftRight className="w-4 h-4 flex-shrink-0 animate-pulse" />
          <span>← 左右滑动查看完整32强对阵沙盘 →</span>
        </div>
      </div>

      {/* Main Bracket Canvas with horizontal scroll */}
      <div className="w-full overflow-x-auto pb-6 pt-2">
        <div className="min-w-[1240px] flex items-center justify-between px-4 gap-2.5">
          
          {/* ==================== LEFT BRACKET ==================== */}
          
          {/* Column 1: Round of 32 (Left) */}
          <div className="flex flex-col justify-between h-[660px]">
            {renderMatch('32-1')}
            {renderMatch('32-2')}
            {renderMatch('32-3')}
            {renderMatch('32-4')}
            {renderMatch('32-5')}
            {renderMatch('32-6')}
            {renderMatch('32-7')}
            {renderMatch('32-8')}
          </div>

          {/* Column 2: Round of 16 (Left) */}
          <div className="flex flex-col justify-around h-[660px]">
            {renderMatch('16-1')}
            {renderMatch('16-2')}
            {renderMatch('16-3')}
            {renderMatch('16-4')}
          </div>

          {/* Column 3: Quarterfinals (Left) */}
          <div className="flex flex-col justify-around h-[660px]">
            {renderMatch('8-1')}
            {renderMatch('8-2')}
          </div>

          {/* Column 4: Semifinal (Left) */}
          <div className="flex flex-col justify-center h-[660px]">
            {renderMatch('4-1')}
          </div>

          {/* ==================== CENTER: CHAMPION & FINALS ==================== */}
          
          <div className="flex flex-col items-center justify-center gap-6 h-[660px] px-2 w-[220px]">
            
            {/* Crowned Champion */}
            {knockoutMatches['final'] && knockoutMatches['final'].winnerId ? (
              <div className="glass-panel border-athletic-gold/40 rounded-2xl p-5 text-center relative overflow-hidden shadow-[0_0_25px_rgba(243,198,35,0.12)] animate-bounce w-full">
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(243,198,35,0.15)_0%,transparent_70%)]" />
                <Trophy className="w-10 h-10 text-athletic-gold mx-auto filter drop-shadow-[0_0_8px_rgba(243,198,35,0.4)]" />
                <div className="text-[10px] font-black text-athletic-gold uppercase tracking-widest mt-2">新科世界冠军</div>
                <div className="text-4xl my-2.5 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] select-none">
                  {flatTeams[knockoutMatches['final'].winnerId]?.flag}
                </div>
                <div className="font-black text-xl text-white glow-text-gold">
                  {flatTeams[knockoutMatches['final'].winnerId]?.name}
                </div>
                <div className="text-[8px] text-neutral-400 font-semibold mt-1">
                  Crowned Champion
                </div>
              </div>
            ) : (
              <div className="glass-panel border-white/5 rounded-2xl p-4 text-center border-dashed w-full opacity-60">
                <Trophy className="w-8 h-8 text-neutral-600 mx-auto" />
                <div className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest mt-2">大力神杯等候区</div>
                <div className="text-xs text-neutral-400 font-medium mt-1 leading-relaxed">
                  模拟决赛决出新科世界杯得主
                </div>
              </div>
            )}

            {/* Final Match card */}
            <div className="space-y-1 w-full">
              <div className="text-[9px] font-bold text-center text-athletic-gold uppercase tracking-widest mb-1 flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3 text-athletic-gold" />
                决赛 (Grand Final)
              </div>
              {renderMatch('final')}
            </div>

            {/* Third Place Match card */}
            <div className="space-y-1 w-full">
              <div className="text-[9px] font-bold text-center text-neutral-400 uppercase tracking-widest mb-1">
                季军争夺战 (3rd Place)
              </div>
              {renderMatch('3rd')}
            </div>

          </div>

          {/* ==================== RIGHT BRACKET ==================== */}

          {/* Column 4: Semifinal (Right) */}
          <div className="flex flex-col justify-center h-[660px]">
            {renderMatch('4-2')}
          </div>

          {/* Column 3: Quarterfinals (Right) */}
          <div className="flex flex-col justify-around h-[660px]">
            {renderMatch('8-3')}
            {renderMatch('8-4')}
          </div>

          {/* Column 2: Round of 16 (Right) */}
          <div className="flex flex-col justify-around h-[660px]">
            {renderMatch('16-5')}
            {renderMatch('16-6')}
            {renderMatch('16-7')}
            {renderMatch('16-8')}
          </div>

          {/* Column 1: Round of 32 (Right) */}
          <div className="flex flex-col justify-between h-[660px]">
            {renderMatch('32-9')}
            {renderMatch('32-10')}
            {renderMatch('32-11')}
            {renderMatch('32-12')}
            {renderMatch('32-13')}
            {renderMatch('32-14')}
            {renderMatch('32-15')}
            {renderMatch('32-16')}
          </div>

        </div>
      </div>

    </div>
  );
};
