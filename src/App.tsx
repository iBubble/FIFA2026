import { useTournamentState } from './hooks/useTournamentState';
import { Header } from './components/Header';
import { DashboardTab } from './components/DashboardTab';
import { GroupStageTab } from './components/GroupStageTab';
import { KnockoutStageTab } from './components/KnockoutStageTab';

function App() {
  const {
    matches,
    groupStandings,
    bestThirdList,
    flatTeams,
    isGroupStageComplete,
    scorers,
    knockoutMatches,
    champion,
    activeTab,
    setActiveTab,
    updateMatchScore,
    simulateAllGroupMatches,
    resetAll,
    importTournamentState,
    selectKnockoutWinner,
    updateKnockoutScore
  } = useTournamentState();

  return (
    <div className="stadium-bg min-h-screen flex flex-col">
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        resetAll={resetAll}
        simulateAllGroupMatches={simulateAllGroupMatches}
        isGroupStageComplete={isGroupStageComplete}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <DashboardTab 
            champion={champion}
            scorers={scorers.slice(0, 10)} // display top 10 players
            matchesCount={matches.length}
            finishedMatchesCount={matches.filter(m => m.homeScore !== null).length}
            isGroupStageComplete={isGroupStageComplete}
            setActiveTab={setActiveTab}
            matches={matches}
            knockoutMatches={knockoutMatches}
            importTournamentState={importTournamentState}
          />
        )}

        {activeTab === 'group' && (
          <GroupStageTab 
            matches={matches}
            groupStandings={groupStandings}
            bestThirdList={bestThirdList}
            flatTeams={flatTeams}
            updateMatchScore={updateMatchScore}
          />
        )}

        {activeTab === 'knockout' && (
          <KnockoutStageTab 
            knockoutMatches={knockoutMatches}
            flatTeams={flatTeams}
            isGroupStageComplete={isGroupStageComplete}
            selectKnockoutWinner={selectKnockoutWinner}
            updateKnockoutScore={updateKnockoutScore}
            setActiveTab={setActiveTab}
          />
        )}
      </main>
      
      {/* Footer */}
      <footer className="py-6 border-t border-white/5 bg-black/30 text-center text-xs text-neutral-500 font-bold uppercase tracking-wider">
        © 2026 世界杯模拟预测沙盘 · Powered by Antigravity
      </footer>
    </div>
  );
}

export default App;
