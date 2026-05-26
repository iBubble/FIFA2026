import React, { useState } from 'react';
import type { Team, Match, BestThirdRanking } from '../types';
import { ChevronDown, ChevronUp, Medal, Check, Info } from 'lucide-react';

interface GroupStageTabProps {
  matches: Match[];
  groupStandings: { [groupName: string]: Team[] };
  bestThirdList: BestThirdRanking[];
  flatTeams: { [teamId: string]: Team };
  updateMatchScore: (matchId: number, homeScore: number | null, awayScore: number | null) => void;
}

export const GroupStageTab: React.FC<GroupStageTabProps> = ({
  matches,
  groupStandings,
  bestThirdList,
  flatTeams,
  updateMatchScore,
}) => {
  // Store which groups are collapsed/expanded (expanded by default for A, others collapsed to save space, or let user toggle)
  const [expandedGroups, setExpandedGroups] = useState<{ [group: string]: boolean }>(() => {
    const initial: { [group: string]: boolean } = {};
    Object.keys(groupStandings).forEach((g, idx) => {
      initial[g] = idx === 0; // Expand first group by default
    });
    return initial;
  });

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  const handleScoreChange = (matchId: number, homeStr: string, awayStr: string) => {
    const homeVal = homeStr.trim() === '' ? null : parseInt(homeStr, 10);
    const awayVal = awayStr.trim() === '' ? null : parseInt(awayStr, 10);

    if ((homeVal !== null && isNaN(homeVal)) || (awayVal !== null && isNaN(awayVal))) {
      return; // prevent invalid inputs
    }
    updateMatchScore(matchId, homeVal, awayVal);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
      
      {/* 12 Group Cards Section (Left 2 Columns on large screens) */}
      <div className="xl:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black tracking-wide">小组赛即时预测沙盘</h2>
            <p className="text-xs text-neutral-400 mt-0.5">请在对应小组的对阵卡片中填写预测比分，积分榜将秒级完成实时更新。</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(groupStandings).map(([groupName, teams]) => {
            const isExpanded = expandedGroups[groupName];
            const groupMatches = matches.filter(m => m.group === groupName);
            
            return (
              <div 
                key={groupName} 
                className="glass-panel rounded-2xl overflow-hidden border-white/5 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:border-white/10"
              >
                {/* Group Card Header */}
                <div 
                  onClick={() => toggleGroup(groupName)}
                  className="flex items-center justify-between px-5 py-4 bg-white/2 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors select-none"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-neon-green shadow-[0_0_8px_#00ff9d]" />
                    <h3 className="font-extrabold text-base tracking-wide text-white">Group {groupName} 小组</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-neutral-400 font-bold bg-white/5 px-2 py-0.5 rounded border border-white/5">
                      {groupMatches.filter(m => m.homeScore !== null).length} / 6 场已录入
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-neutral-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neutral-400" />
                    )}
                  </div>
                </div>

                {/* Group Standings Table */}
                <div className="px-5 py-3 border-b border-white/5 bg-black/10">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="text-neutral-400 font-bold border-b border-white/5 pb-1">
                        <th className="py-2 w-8 text-center">排名</th>
                        <th className="py-2">球队</th>
                        <th className="py-2 text-center w-8">胜</th>
                        <th className="py-2 text-center w-8">平</th>
                        <th className="py-2 text-center w-8">负</th>
                        <th className="py-2 text-center w-12">得/失</th>
                        <th className="py-2 text-center w-8 font-black text-white">积分</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teams.map((t, idx) => {
                        const isQualifyDirect = idx < 2;
                        const isQualifyThird = idx === 2;
                        
                        return (
                          <tr 
                            key={t.id}
                            className={`border-b border-white/2.5 ${
                              isQualifyDirect 
                                ? 'text-white' 
                                : isQualifyThird 
                                ? 'text-neutral-300' 
                                : 'text-neutral-500'
                            }`}
                          >
                            <td className="py-2 text-center">
                              {idx === 0 ? (
                                <span className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-neon-green/10 text-neon-green border border-neon-green/20 text-[10px] font-black">1</span>
                              ) : idx === 1 ? (
                                <span className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-neon-green/5 text-neon-green/80 border border-neon-green/10 text-[10px] font-bold">2</span>
                              ) : idx === 2 ? (
                                <span className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-athletic-gold/5 text-athletic-gold/90 border border-athletic-gold/10 text-[10px] font-bold">3</span>
                              ) : (
                                <span className="text-neutral-600 font-bold">{idx + 1}</span>
                              )}
                            </td>
                            <td className="py-2 font-semibold">
                              <div className="flex items-center gap-1.5">
                                <span className="text-base select-none">{t.flag}</span>
                                <span className="truncate max-w-[80px] sm:max-w-none">{t.name}</span>
                              </div>
                            </td>
                            <td className="py-2 text-center">{t.wins}</td>
                            <td className="py-2 text-center">{t.draws}</td>
                            <td className="py-2 text-center">{t.losses}</td>
                            <td className="py-2 text-center text-neutral-400">{t.goalsFor}/{t.goalsAgainst}</td>
                            <td className={`py-2 text-center font-black ${
                              isQualifyDirect ? 'text-neon-green' : isQualifyThird ? 'text-athletic-gold' : 'text-neutral-500'
                            }`}>
                              {t.points}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Collapsible Match Predictor Panel */}
                {isExpanded && (
                  <div className="px-5 py-4 space-y-3 bg-black/20 animate-fade-in">
                    <h4 className="text-[10px] text-neutral-400 font-black uppercase tracking-wider mb-2">比分预测输入</h4>
                    {groupMatches.map(m => {
                      const home = flatTeams[m.homeTeamId];
                      const away = flatTeams[m.awayTeamId];
                      
                      return (
                        <div 
                          key={m.id} 
                          className="flex items-center justify-between bg-white/2 px-3 py-2.5 rounded-xl border border-white/5 hover:border-white/10 transition-colors gap-2 text-xs"
                        >
                          {/* Home Team */}
                          <div className="flex items-center gap-1.5 flex-1 min-w-0">
                            <span className="text-base select-none flex-shrink-0">{home.flag}</span>
                            <span className="font-extrabold text-neutral-200 truncate">{home.name}</span>
                          </div>

                          {/* Interactive Score Inputs */}
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <input
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              placeholder="-"
                              value={m.homeScore !== null ? m.homeScore : ''}
                              onChange={(e) => handleScoreChange(m.id, e.target.value, m.awayScore !== null ? String(m.awayScore) : '')}
                              className="w-10 h-8 rounded-lg bg-black/60 border border-white/10 text-center font-extrabold text-white focus:outline-none focus:border-neon-green focus:shadow-[0_0_8px_rgba(0,255,157,0.2)] text-sm transition-all"
                            />
                            <span className="text-neutral-500 font-black">:</span>
                            <input
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              placeholder="-"
                              value={m.awayScore !== null ? m.awayScore : ''}
                              onChange={(e) => handleScoreChange(m.id, m.homeScore !== null ? String(m.homeScore) : '', e.target.value)}
                              className="w-10 h-8 rounded-lg bg-black/60 border border-white/10 text-center font-extrabold text-white focus:outline-none focus:border-neon-green focus:shadow-[0_0_8px_rgba(0,255,157,0.2)] text-sm transition-all"
                            />
                          </div>

                          {/* Away Team */}
                          <div className="flex items-center justify-end gap-1.5 flex-1 min-w-0 text-right">
                            <span className="font-extrabold text-neutral-200 truncate">{away.name}</span>
                            <span className="text-base select-none flex-shrink-0">{away.flag}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating 3rd Place Standing comparison Panel (Right 1 Column) */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-black tracking-wide flex items-center gap-1.5">
            <Medal className="w-5 h-5 text-athletic-gold" />
            最好小组第三名递补排行
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">12个小组第三名横向对比，前8名获得宝贵的32强晋级席位。</p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border-white/5 shadow-2xl relative overflow-hidden">
          {/* Header Info */}
          <div className="flex items-center gap-2 p-3 bg-neutral-900/60 rounded-xl border border-white/5 text-[11px] text-neutral-400 mb-4">
            <Info className="w-4 h-4 text-athletic-gold flex-shrink-0" />
            <span>按积分、净胜球、总进球横向大排序。出线槽位自动对接淘汰赛。</span>
          </div>

          {/* Leaderboard */}
          <div className="space-y-2.5">
            {bestThirdList.map((third, idx) => {
              const isQualified = third.qualified;
              
              return (
                <div 
                  key={third.teamId}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
                    isQualified 
                      ? 'bg-neon-green/3 border-neon-green/10 hover:border-neon-green/20' 
                      : 'bg-white/1 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                      isQualified 
                        ? 'bg-neon-green/10 text-neon-green' 
                        : 'bg-white/5 text-neutral-500'
                    }`}>
                      {idx + 1}
                    </span>
                    <span className="text-base select-none flex-shrink-0">{third.flag}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="font-extrabold text-sm text-white truncate">{third.teamName}</span>
                        <span className="text-[9px] font-black px-1 py-0.2 bg-white/5 rounded text-neutral-400">
                          Group {third.group}
                        </span>
                      </div>
                      <div className="text-[10px] text-neutral-400 font-medium mt-0.5">
                        积分: <span className="text-neutral-200 font-extrabold">{third.points}</span> · 净胜球: <span className="text-neutral-200 font-extrabold">{third.goalDifference}</span> · 进球: <span className="text-neutral-200 font-extrabold">{third.goalsFor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    {isQualified ? (
                      <span className="inline-flex items-center gap-0.5 px-2 py-1 rounded-md text-[9px] font-black bg-neon-green/15 text-neon-green border border-neon-green/20 shadow-[0_0_8px_rgba(0,255,157,0.08)] uppercase tracking-wide">
                        <Check className="w-2.5 h-2.5" />
                        晋级 32强
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-0.5 px-2 py-1 rounded-md text-[9px] font-black bg-red-500/10 text-red-400 border border-red-500/10 uppercase tracking-wide">
                        淘汰
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
};
