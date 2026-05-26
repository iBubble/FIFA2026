import React, { useState } from 'react';
import type { Team, Scorer, Match, KnockoutMatch } from '../types';
import { Trophy, Flame, Zap, CheckCircle2, ChevronRight, Award, Upload, Download, Copy, Check, Sparkles, AlertTriangle } from 'lucide-react';
import { INITIAL_TEAMS } from '../data/mockData';

interface DashboardTabProps {
  champion: Team | null;
  scorers: Scorer[];
  matchesCount: number;
  finishedMatchesCount: number;
  isGroupStageComplete: boolean;
  setActiveTab: (tab: 'dashboard' | 'group' | 'knockout') => void;
  matches: Match[];
  knockoutMatches: { [id: string]: KnockoutMatch };
  importTournamentState: (importedMatches: Match[], importedKnockouts?: { [id: string]: KnockoutMatch }) => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  champion,
  scorers,
  matchesCount,
  finishedMatchesCount,
  isGroupStageComplete,
  setActiveTab,
  matches,
  knockoutMatches,
  importTournamentState,
}) => {
  // Compute total simulated goals
  const totalGoals = scorers.reduce((acc, curr) => acc + curr.goals, 0);
  const avgGoals = finishedMatchesCount > 0 ? (totalGoals / finishedMatchesCount).toFixed(2) : '0.00';
  const progressPercent = Math.round((finishedMatchesCount / matchesCount) * 100);

  // Import/Export and Preset States
  const [subTab, setSubTab] = useState<'presets' | 'custom'>('presets');
  const [importJson, setImportJson] = useState('');
  const [importError, setImportError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Generate Scenario: Asian Powerhouses Surge
  const loadAsianSurge = () => {
    const newMatches = matches.map(m => {
      let homeScore = m.homeScore;
      let awayScore = m.awayScore;

      // Group G: Japan
      if (m.homeTeamId === 'JPN') {
        homeScore = m.awayTeamId === 'GER' ? 2 : 3;
        awayScore = m.awayTeamId === 'GER' ? 1 : 0;
      } else if (m.awayTeamId === 'JPN') {
        awayScore = m.homeTeamId === 'GER' ? 2 : 3;
        homeScore = m.homeTeamId === 'GER' ? 1 : 0;
      }
      // Group L: South Korea
      else if (m.homeTeamId === 'KOR') {
        homeScore = m.awayTeamId === 'FRA' ? 2 : 3;
        awayScore = m.awayTeamId === 'FRA' ? 1 : 0;
      } else if (m.awayTeamId === 'KOR') {
        awayScore = m.homeTeamId === 'FRA' ? 2 : 3;
        homeScore = m.homeTeamId === 'FRA' ? 1 : 0;
      }
      // Group J: Saudi Arabia
      else if (m.homeTeamId === 'KSA') {
        homeScore = m.awayTeamId === 'BEL' ? 2 : 3;
        awayScore = m.awayTeamId === 'BEL' ? 1 : 0;
      } else if (m.awayTeamId === 'KSA') {
        awayScore = m.homeTeamId === 'BEL' ? 2 : 3;
        homeScore = m.homeTeamId === 'BEL' ? 1 : 0;
      }
      // Other matches simulated realistically
      else {
        const homeTeam = INITIAL_TEAMS.find(t => t.id === m.homeTeamId)!;
        const awayTeam = INITIAL_TEAMS.find(t => t.id === m.awayTeamId)!;
        const diff = (homeTeam.strength - awayTeam.strength) / 10;
        homeScore = Math.max(0, Math.round(1.4 + diff * 0.2 + (Math.random() - 0.5)));
        awayScore = Math.max(0, Math.round(1.4 - diff * 0.2 + (Math.random() - 0.5)));
      }

      return { ...m, homeScore, awayScore, status: 'finished' as const };
    });

    importTournamentState(newMatches);
    triggerSuccessState();
  };

  // Generate Scenario: European & South American Powerhouses
  const loadEuropeanPowerhouses = () => {
    const newMatches = matches.map(m => {
      const homeTeam = INITIAL_TEAMS.find(t => t.id === m.homeTeamId)!;
      const awayTeam = INITIAL_TEAMS.find(t => t.id === m.awayTeamId)!;

      let homeScore = m.homeScore;
      let awayScore = m.awayScore;

      const giants = ['ARG', 'FRA', 'BRA', 'ENG', 'ESP', 'POR', 'GER', 'NED', 'BEL', 'CRO'];
      
      if (giants.includes(m.homeTeamId) && !giants.includes(m.awayTeamId)) {
        homeScore = Math.max(2, Math.round(2.5 + (Math.random() - 0.5)));
        awayScore = Math.max(0, Math.round(0.4 + (Math.random() - 0.5)));
      } else if (giants.includes(m.awayTeamId) && !giants.includes(m.homeTeamId)) {
        awayScore = Math.max(2, Math.round(2.5 + (Math.random() - 0.5)));
        homeScore = Math.max(0, Math.round(0.4 + (Math.random() - 0.5)));
      } else {
        const diff = (homeTeam.strength - awayTeam.strength) / 10;
        homeScore = Math.max(0, Math.round(1.4 + diff * 0.2 + (Math.random() - 0.5)));
        awayScore = Math.max(0, Math.round(1.4 - diff * 0.2 + (Math.random() - 0.5)));
      }

      return { ...m, homeScore, awayScore, status: 'finished' as const };
    });

    importTournamentState(newMatches);
    triggerSuccessState();
  };

  // Generate Scenario: Wild Dark Horse Surge
  const loadDarkHorseSurge = () => {
    const newMatches = matches.map(m => {
      const homeTeam = INITIAL_TEAMS.find(t => t.id === m.homeTeamId)!;
      const awayTeam = INITIAL_TEAMS.find(t => t.id === m.awayTeamId)!;

      let homeScore = m.homeScore;
      let awayScore = m.awayScore;

      const horses = ['MAR', 'USA', 'CAN', 'COD', 'SEN', 'CPV', 'COL'];
      
      if (horses.includes(m.homeTeamId) && !horses.includes(m.awayTeamId)) {
        homeScore = Math.max(2, Math.round(2.2 + (Math.random() - 0.5)));
        awayScore = Math.max(0, Math.round(0.5 + (Math.random() - 0.5)));
      } else if (horses.includes(m.awayTeamId) && !horses.includes(m.homeTeamId)) {
        awayScore = Math.max(2, Math.round(2.2 + (Math.random() - 0.5)));
        homeScore = Math.max(0, Math.round(0.5 + (Math.random() - 0.5)));
      } else {
        const diff = (homeTeam.strength - awayTeam.strength) / 10;
        homeScore = Math.max(0, Math.round(1.4 + diff * 0.2 + (Math.random() - 0.5)));
        awayScore = Math.max(0, Math.round(1.4 - diff * 0.2 + (Math.random() - 0.5)));
      }

      return { ...m, homeScore, awayScore, status: 'finished' as const };
    });

    importTournamentState(newMatches);
    triggerSuccessState();
  };

  const triggerSuccessState = () => {
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 2000);
  };

  // Export current state as JSON string
  const handleExport = () => {
    const stateObj = {
      matches,
      knockoutMatches
    };
    const jsonStr = JSON.stringify(stateObj);
    navigator.clipboard.writeText(jsonStr).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  // Import custom pasted JSON string
  const handleImport = () => {
    try {
      setImportError(null);
      const parsed = JSON.parse(importJson);
      
      if (!parsed || typeof parsed !== 'object') {
        throw new Error('无效的 JSON 数据格式！');
      }
      
      if (!Array.isArray(parsed.matches)) {
        throw new Error('缺少或非法的 matches 赛事列表数据！');
      }
      
      importTournamentState(parsed.matches, parsed.knockoutMatches);
      setImportJson('');
      triggerSuccessState();
    } catch (e: any) {
      setImportError(e?.message || '导入解析失败，请检查格式！');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Section: Champion Showcase & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Champion Showcase Card */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between border-neon-green/10 shadow-[0_4px_30px_rgba(0,255,157,0.03)] min-h-[260px]">
          {/* Decorative field lines in background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,255,157,0.08),transparent_50%)] pointer-events-none" />
          
          <div className="flex justify-between items-start z-10">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-neon-green/10 text-neon-green border border-neon-green/20">
                <Flame className="w-3.5 h-3.5" />
                2026 世界之巅预测
              </span>
              <h2 className="text-2xl font-black mt-3 tracking-wide">
                {champion ? '冠军已诞生！' : '寻找你的冠军得主'}
              </h2>
              <p className="text-sm text-neutral-400 mt-1 max-w-md">
                {champion
                  ? `经过激动人心的小组赛和淘汰赛厮杀，恭喜 ${champion.name} 最终夺得大力神杯！`
                  : '前往“小组赛”模拟积分，填满“32强沙盘”每轮对阵，亲手推演出你的世界杯最终冠军！'}
              </p>
            </div>
            <Trophy className={`w-14 h-14 ${champion ? 'text-athletic-gold drop-shadow-[0_0_15px_rgba(243,198,35,0.4)] animate-bounce' : 'text-neutral-600/40'}`} />
          </div>

          <div className="mt-6 flex items-center justify-between gap-4 z-10">
            {champion ? (
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 w-full animate-fade-in">
                <span className="text-5xl select-none filter drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">{champion.flag}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-white glow-text-gold">{champion.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-athletic-gold/20 text-athletic-gold border border-athletic-gold/20 uppercase tracking-wider">
                      Champion
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">小组赛首名出线 · 战斗力权重 {champion.strength}</p>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setActiveTab(isGroupStageComplete ? 'knockout' : 'group')}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-neon-green text-black font-extrabold text-sm tracking-widest shadow-[0_4px_20px_rgba(0,255,157,0.35)] hover:brightness-110 active:scale-[0.98] transition-all duration-300 cursor-pointer"
              >
                {isGroupStageComplete ? '去淘汰赛推演' : '开启小组赛预测'}
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Simulator Stats Panel */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
          <h3 className="text-sm font-extrabold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-neon-green" />
            赛事模拟统计数据
          </h3>

          <div className="grid grid-cols-2 gap-4 my-6">
            <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 flex flex-col">
              <span className="text-xs text-neutral-400 font-semibold">总进球数</span>
              <span className="text-2xl font-black mt-1 glow-text-neon text-neon-green">{totalGoals}</span>
            </div>
            <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 flex flex-col">
              <span className="text-xs text-neutral-400 font-semibold">场均进球</span>
              <span className="text-2xl font-black mt-1 text-white">{avgGoals}</span>
            </div>
            <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 flex flex-col col-span-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-neutral-400 font-semibold">模拟进度</span>
                <span className="text-xs text-neon-green font-extrabold">{progressPercent}%</span>
              </div>
              <div className="w-full bg-black/40 h-2 rounded-full mt-2 overflow-hidden border border-white/5">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-neon-green h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-[10px] text-neutral-400 mt-1.5 self-end">
                已模拟 {finishedMatchesCount} / 共 {matchesCount} 场比赛
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-neutral-900/50 px-3 py-2.5 rounded-lg border border-white/5 text-[11px] text-neutral-400">
            <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${isGroupStageComplete ? 'text-neon-green' : 'text-neutral-600'}`} />
            <span>
              {isGroupStageComplete 
                ? '小组赛已全部模拟完毕，递补出线与32强对阵已锁定。'
                : '小组赛模拟中。完成全部72场比赛可解锁完整淘汰赛。'}
            </span>
          </div>
        </div>

      </div>

      {/* 场景导入与数据备份中心 (Scenario & Backup Center) */}
      <div className="glass-panel rounded-2xl p-6 border-white/5 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
          <div>
            <h3 className="text-lg font-black tracking-wide flex items-center gap-2">
              <Upload className="w-5 h-5 text-neon-green" />
              赛事数据导入与预测备份中心 (Data Import & Presets)
            </h3>
            <p className="text-xs text-neutral-400 mt-1">一键导入预设的世界杯局势场景，或者备份与恢复您自己预测的赛事比分数据。</p>
          </div>
          
          <div className="flex p-0.5 bg-black/40 rounded-lg border border-white/5 gap-1 self-start sm:self-auto">
            <button
              onClick={() => setSubTab('presets')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-200 cursor-pointer ${
                subTab === 'presets'
                  ? 'bg-neon-green/10 text-neon-green border border-neon-green/10'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              一键局势场景
            </button>
            <button
              onClick={() => setSubTab('custom')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-200 cursor-pointer ${
                subTab === 'custom'
                  ? 'bg-neon-green/10 text-neon-green border border-neon-green/10'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              自定义导入/备份
            </button>
          </div>
        </div>

        {subTab === 'presets' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Preset 1: Asian Powerhouses Surge */}
            <div className="bg-white/2 rounded-xl p-5 border border-white/5 hover:border-emerald-500/20 transition-all group flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl">🌏</span>
                  <h4 className="font-extrabold text-sm text-emerald-400 group-hover:text-emerald-300 transition-colors">
                    “亚洲群雄崛起” 场景
                  </h4>
                </div>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  模拟亚洲劲旅狂飙：日本队（击败德国）、韩国队（力克法国）与沙特队（掀翻比利时）全胜晋级小组头名，展现亚洲足球在扩军时代的强悍崛起！
                </p>
              </div>
              <button
                onClick={loadAsianSurge}
                className="mt-4 w-full py-2.5 px-4 rounded-lg bg-emerald-600/10 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/20 hover:border-transparent font-extrabold text-xs tracking-wider transition-all duration-300 cursor-pointer animate-pulse"
              >
                加载亚洲群雄场景
              </button>
            </div>

            {/* Preset 2: European Giants */}
            <div className="bg-white/2 rounded-xl p-5 border border-white/5 hover:border-blue-500/20 transition-all group flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl">🏆</span>
                  <h4 className="font-extrabold text-sm text-blue-400 group-hover:text-blue-300 transition-colors">
                    “欧洲豪门盛宴” 场景
                  </h4>
                </div>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  传统足坛霸主统治小组赛：阿根廷、法国、巴西、英格兰、西班牙、葡萄牙、德国等顶级豪强全部强势横扫出线，锁定淘汰赛顶级神仙打架的超凡赛程。
                </p>
              </div>
              <button
                onClick={loadEuropeanPowerhouses}
                className="mt-4 w-full py-2.5 px-4 rounded-lg bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/20 hover:border-transparent font-extrabold text-xs tracking-wider transition-all duration-300 cursor-pointer"
              >
                加载豪门对决场景
              </button>
            </div>

            {/* Preset 3: Dark Horses */}
            <div className="bg-white/2 rounded-xl p-5 border border-white/5 hover:border-orange-500/20 transition-all group flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl">🦓</span>
                  <h4 className="font-extrabold text-sm text-orange-400 group-hover:text-orange-300 transition-colors">
                    “狂野黑马奔袭” 场景
                  </h4>
                </div>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  模拟黑马崛起的黑金时代：摩洛哥、喀麦隆、塞内加尔、美国、加拿大全面爆发。群雄割据，老牌豪门纷纷落马，写就草根逆袭的史诗世界杯故事！
                </p>
              </div>
              <button
                onClick={loadDarkHorseSurge}
                className="mt-4 w-full py-2.5 px-4 rounded-lg bg-orange-600/10 hover:bg-orange-600 text-orange-400 hover:text-white border border-orange-500/20 hover:border-transparent font-extrabold text-xs tracking-wider transition-all duration-300 cursor-pointer"
              >
                加载黑马狂奔场景
              </button>
            </div>

          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Backup/Export Section */}
            <div className="bg-white/2 rounded-xl p-5 border border-white/5 flex flex-col justify-between">
              <div>
                <h4 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-neon-green" />
                  预测数据备份导出
                </h4>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  点击下方按钮可直接将您当前的赛事比分预测数据打包为备份 JSON 字符串复制至剪贴板，方便您保存或发给好友分享您的神级预测！
                </p>
              </div>
              <button
                onClick={handleExport}
                className="mt-5 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-neon-green/10 hover:bg-neon-green text-neon-green hover:text-black border border-neon-green/20 hover:border-transparent font-extrabold text-xs tracking-wider transition-all duration-300 cursor-pointer"
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    已成功复制到剪贴板！
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    复制预测备份代码
                  </>
                )}
              </button>
            </div>

            {/* Custom Import Section */}
            <div className="bg-white/2 rounded-xl p-5 border border-white/5 flex flex-col justify-between">
              <div className="space-y-3">
                <h4 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-neon-green" />
                  外部预测数据还原导入
                </h4>
                <textarea
                  placeholder="在此处粘贴您之前导出的 JSON 预测备份字符串..."
                  value={importJson}
                  onChange={(e) => setImportJson(e.target.value)}
                  className="w-full h-24 rounded-lg bg-black/60 border border-white/10 p-3 text-xs text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-neon-green transition-colors resize-none"
                />
                {importError && (
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-red-400 bg-red-500/10 border border-red-500/10 p-2 rounded-lg">
                    <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{importError}</span>
                  </div>
                )}
              </div>
              <button
                onClick={handleImport}
                disabled={!importJson.trim()}
                className="mt-4 w-full py-3 px-4 rounded-lg bg-gradient-to-r from-emerald-500 to-neon-green text-black disabled:from-neutral-800 disabled:to-neutral-800 disabled:text-neutral-500 font-extrabold text-xs tracking-wider transition-all duration-300 cursor-pointer shadow-[0_4px_15px_rgba(0,255,157,0.15)] disabled:shadow-none"
              >
                确认导入外部预测数据
              </button>
            </div>
          </div>
        )}

        {/* Global Loading Scenario success feedback */}
        {isSuccess && (
          <div className="flex items-center justify-center gap-2 p-3 bg-neon-green/20 border border-neon-green/30 rounded-xl text-xs font-black text-neon-green animate-pulse">
            <Sparkles className="w-4 h-4" />
            已成功加载/导入赛事比分数据！大屏与沙盘均已更新完毕。
          </div>
        )}
      </div>

      {/* Scorers Section */}
      <div className="glass-panel rounded-2xl p-6 border-white/5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-black tracking-wide flex items-center gap-2">
            <Award className="w-5 h-5 text-athletic-gold" />
            金靴奖 · 射手榜 (Golden Boot)
          </h3>
          <span className="text-xs text-neutral-400 font-semibold">实时动态进球统计</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-neutral-400 text-xs font-bold tracking-wider">
                <th className="py-3 px-4 w-12 text-center">排名</th>
                <th className="py-3 px-4">球员</th>
                <th className="py-3 px-4">国家队</th>
                <th className="py-3 px-4 text-center w-24">进球数 (Goals)</th>
                <th className="py-3 px-4 text-center w-20">助攻数 (Assists)</th>
              </tr>
            </thead>
            <tbody>
              {scorers.map((s, idx) => {
                const isLeader = idx === 0 && s.goals > 0;
                return (
                  <tr 
                    key={s.id}
                    className={`border-b border-white/5 text-sm transition-colors hover:bg-white/2.5 ${
                      idx < 3 ? 'font-semibold' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 text-center">
                      {idx === 0 ? (
                        <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-athletic-gold/10 text-athletic-gold border border-athletic-gold/20 text-xs font-bold">1</span>
                      ) : idx === 1 ? (
                        <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-slate-300/10 text-slate-300 border border-slate-300/20 text-xs font-bold">2</span>
                      ) : idx === 2 ? (
                        <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-amber-700/10 text-amber-700 border border-amber-700/20 text-xs font-bold">3</span>
                      ) : (
                        <span className="text-neutral-500 font-bold">{idx + 1}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 flex items-center gap-2">
                      <span className="text-white font-extrabold">{s.name}</span>
                      {isLeader && (
                        <span className="px-1.5 py-0.5 rounded text-[8px] font-black bg-athletic-gold text-black uppercase tracking-wider flex items-center gap-0.5 animate-pulse">
                          Leader
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl select-none">{s.flag}</span>
                        <span className="text-neutral-300">{s.teamName}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`text-base font-black ${isLeader ? 'text-athletic-gold glow-text-gold' : 'text-white'}`}>
                        {s.goals}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center text-neutral-400 font-medium">
                      {s.assists}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
