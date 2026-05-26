import { useState, useMemo } from 'react';
import type { Team, Match, Scorer, KnockoutMatch, BestThirdRanking } from '../types';
import { INITIAL_TEAMS, INITIAL_SCORERS, INITIAL_KNOCKOUT_MATCHES, generateGroupMatches } from '../data/mockData';

export const useTournamentState = () => {
  // 1. Core State
  const [matches, setMatches] = useState<Match[]>(() => generateGroupMatches());
  const [knockoutMatches, setKnockoutMatches] = useState<{ [id: string]: KnockoutMatch }>(() => INITIAL_KNOCKOUT_MATCHES);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'group' | 'knockout'>('dashboard');

  // 2. Compute Group Standings dynamically based on matches
  const groupStandings = useMemo(() => {
    // Start with clean slate of teams
    const teamMap: { [id: string]: Team } = {};
    INITIAL_TEAMS.forEach(t => {
      teamMap[t.id] = { ...t, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 };
    });

    // Accumulate match results
    matches.forEach(m => {
      if (m.homeScore !== null && m.awayScore !== null) {
        const home = teamMap[m.homeTeamId];
        const away = teamMap[m.awayTeamId];

        if (home && away) {
          home.goalsFor += m.homeScore;
          home.goalsAgainst += m.awayScore;
          away.goalsFor += m.awayScore;
          away.goalsAgainst += m.homeScore;

          home.goalDifference = home.goalsFor - home.goalsAgainst;
          away.goalDifference = away.goalsFor - away.goalsAgainst;

          if (m.homeScore > m.awayScore) {
            home.wins += 1;
            home.points += 3;
            away.losses += 1;
          } else if (m.homeScore < m.awayScore) {
            away.wins += 1;
            away.points += 3;
            home.losses += 1;
          } else {
            home.draws += 1;
            home.points += 1;
            away.draws += 1;
            away.points += 1;
          }
        }
      }
    });

    // Group teams and sort them
    const groups: { [name: string]: Team[] } = {};
    Object.values(teamMap).forEach(team => {
      if (!groups[team.group]) {
        groups[team.group] = [];
      }
      groups[team.group].push(team);
    });

    // Sort each group: Points -> Goal Difference -> Goals For -> Strength (tiebreaker)
    const sortedGroups: { [name: string]: Team[] } = {};
    Object.keys(groups).sort().forEach(groupName => {
      sortedGroups[groupName] = [...groups[groupName]].sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
        if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
        return b.strength - a.strength;
      });
    });

    return sortedGroups;
  }, [matches]);

  // 3. Compute best third-placed teams
  const { bestThirdList, qualifiedThirdIds } = useMemo(() => {
    const thirds: BestThirdRanking[] = [];

    Object.entries(groupStandings).forEach(([groupName, teams]) => {
      // Find the 3rd placed team in this group (index 2 since it's 0-indexed and sorted)
      if (teams.length >= 3) {
        const t = teams[2];
        thirds.push({
          teamId: t.id,
          teamName: t.name,
          group: groupName,
          flag: t.flag,
          points: t.points,
          wins: t.wins,
          goalDifference: t.goalDifference,
          goalsFor: t.goalsFor,
          strength: t.strength,
          qualified: false
        });
      }
    });

    // Sort the third placed teams: Points -> Goal Difference -> Goals For -> Strength
    const sortedThirds = [...thirds].sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
      return b.strength - a.strength;
    });

    // Mark the top 8 as qualified
    const qualifiedThirdIds = new Set<string>();
    const finalizedThirds = sortedThirds.map((third, index) => {
      const qualified = index < 8;
      if (qualified) {
        qualifiedThirdIds.add(third.teamId);
      }
      return { ...third, qualified };
    });

    return {
      bestThirdList: finalizedThirds,
      qualifiedThirdIds
    };
  }, [groupStandings]);

  // 4. Flatten all teams currently
  const flatTeams = useMemo(() => {
    const map: { [id: string]: Team } = {};
    Object.values(groupStandings).forEach(teams => {
      teams.forEach(t => {
        map[t.id] = t;
      });
    });
    return map;
  }, [groupStandings]);

  // 5. Check group stage completion status
  const isGroupStageComplete = useMemo(() => {
    return matches.every(m => m.homeScore !== null && m.awayScore !== null);
  }, [matches]);

  // 6. Dynamically generate Top Scorers
  const scorers = useMemo(() => {
    // Generate scorer stats dynamically based on group and knockout matches to make it fun and responsive!
    const scorerMap: { [id: string]: Scorer } = {};
    INITIAL_SCORERS.forEach(s => {
      scorerMap[s.id] = { ...s, goals: 0, assists: 0 };
    });

    // We can distribute goals based on match scoring events. Let's make it deterministic yet realistic:
    // e.g., if ARG scores goals, we attribute some of them to Messi (S2) and Lautaro (S10)
    const distributeGoals = (teamId: string, goalsScored: number) => {
      if (goalsScored <= 0) return;
      
      const teamScorers = Object.values(scorerMap).filter(s => s.teamId === teamId);
      if (teamScorers.length === 0) return;

      // Distribute goals: primary scorer gets more, others get less
      let remainingGoals = goalsScored;
      
      // Argentine special
      if (teamId === 'ARG') {
        const messi = scorerMap['S2'];
        const lautaro = scorerMap['S10'];
        const messiGoals = Math.min(remainingGoals, Math.random() > 0.4 ? 1 : 0);
        messi.goals += messiGoals;
        messi.assists += Math.random() > 0.6 ? 1 : 0;
        remainingGoals -= messiGoals;
        
        if (remainingGoals > 0) {
          const lautaroGoals = Math.min(remainingGoals, 1);
          lautaro.goals += lautaroGoals;
          remainingGoals -= lautaroGoals;
        }
      }
      // French special
      else if (teamId === 'FRA') {
        const mbappe = scorerMap['S1'];
        const mbappeGoals = Math.min(remainingGoals, Math.random() > 0.3 ? 1 : 0);
        mbappe.goals += mbappeGoals;
        mbappe.assists += Math.random() > 0.7 ? 1 : 0;
        remainingGoals -= mbappeGoals;
      }
      // English special
      else if (teamId === 'ENG') {
        const bellingham = scorerMap['S4'];
        const kane = scorerMap['S5'];
        const kaneGoals = Math.min(remainingGoals, Math.random() > 0.4 ? 1 : 0);
        kane.goals += kaneGoals;
        remainingGoals -= kaneGoals;
        
        if (remainingGoals > 0) {
          const bellGoals = Math.min(remainingGoals, 1);
          bellingham.goals += bellGoals;
          remainingGoals -= bellGoals;
        }
      }
      // Portuguese special
      else if (teamId === 'POR') {
        const ronaldo = scorerMap['S6'];
        const ronaldoGoals = Math.min(remainingGoals, Math.random() > 0.5 ? 1 : 0);
        ronaldo.goals += ronaldoGoals;
        remainingGoals -= ronaldoGoals;
      }
      // Brazilian special
      else if (teamId === 'BRA') {
        const vinicius = scorerMap['S3'];
        const viniGoals = Math.min(remainingGoals, Math.random() > 0.4 ? 1 : 0);
        vinicius.goals += viniGoals;
        remainingGoals -= viniGoals;
      }
      // Japanese special
      else if (teamId === 'JPN') {
        const mitoma = scorerMap['S7'];
        const mitomaGoals = Math.min(remainingGoals, Math.random() > 0.6 ? 1 : 0);
        mitoma.goals += mitomaGoals;
        remainingGoals -= mitomaGoals;
      }
      // Korean special
      else if (teamId === 'KOR') {
        const son = scorerMap['S8'];
        const sonGoals = Math.min(remainingGoals, Math.random() > 0.5 ? 1 : 0);
        son.goals += sonGoals;
        remainingGoals -= sonGoals;
      }
      // Chinese special
      else if (teamId === 'CHN') {
        const wulei = scorerMap['S9'];
        const wuleiGoals = Math.min(remainingGoals, Math.random() > 0.3 ? 1 : 0);
        wulei.goals += wuleiGoals;
        remainingGoals -= wuleiGoals;
      }

      // If there are still goals left or team has no specific scorer, distribute to the first scorer of the team
      if (remainingGoals > 0 && teamScorers.length > 0) {
        teamScorers[0].goals += remainingGoals;
      }
    };

    // Calculate goals from group matches
    matches.forEach(m => {
      if (m.homeScore !== null && m.awayScore !== null) {
        distributeGoals(m.homeTeamId, m.homeScore);
        distributeGoals(m.awayTeamId, m.awayScore);
      }
    });

    // Calculate goals from knockout matches
    Object.values(knockoutMatches).forEach(k => {
      if (k.homeTeamId && k.homeScore !== null && k.awayTeamId && k.awayScore !== null) {
        distributeGoals(k.homeTeamId, k.homeScore);
        distributeGoals(k.awayTeamId, k.awayScore);
      }
    });

    // Return sorted scorers
    return Object.values(scorerMap).sort((a, b) => b.goals - a.goals || b.assists - a.assists);
  }, [matches, knockoutMatches]);

  // 7. Calculate Knockout Tree dynamically based on group results & previous winners
  const calculatedKnockoutMatches = useMemo(() => {
    const updated = { ...knockoutMatches };

    // A. Fill in Round of 32 slots from group stages if qualified
    // We only fill them when group stage is complete to ensure correct third-place ranking
    if (isGroupStageComplete) {
      // Group Winners (A1 - L1)
      const A1 = groupStandings['A'][0].id;
      const B1 = groupStandings['B'][0].id;
      const C1 = groupStandings['C'][0].id;
      const D1 = groupStandings['D'][0].id;
      const E1 = groupStandings['E'][0].id;
      const F1 = groupStandings['F'][0].id;
      const G1 = groupStandings['G'][0].id;
      const H1 = groupStandings['H'][0].id;
      const I1 = groupStandings['I'][0].id;
      const J1 = groupStandings['J'][0].id;
      const K1 = groupStandings['K'][0].id;
      const L1 = groupStandings['L'][0].id;

      // Group Runners-up (A2 - L2)
      const A2 = groupStandings['A'][1].id;
      const B2 = groupStandings['B'][1].id;
      const C2 = groupStandings['C'][1].id;
      const D2 = groupStandings['D'][1].id;
      const E2 = groupStandings['E'][1].id;
      const F2 = groupStandings['F'][1].id;
      const G2 = groupStandings['G'][1].id;
      const H2 = groupStandings['H'][1].id;
      const I2 = groupStandings['I'][1].id;
      const J2 = groupStandings['J'][1].id;
      const K2 = groupStandings['K'][1].id;
      const L2 = groupStandings['L'][1].id;

      // Best Third-placed Teams (T1 - T8)
      const T1 = bestThirdList[0].teamId;
      const T2 = bestThirdList[1].teamId;
      const T3 = bestThirdList[2].teamId;
      const T4 = bestThirdList[3].teamId;
      const T5 = bestThirdList[4].teamId;
      const T6 = bestThirdList[5].teamId;
      const T7 = bestThirdList[6].teamId;
      const T8 = bestThirdList[7].teamId;

      // Mapping Round of 32
      updated['32-1'].homeTeamId = A1;
      updated['32-1'].awayTeamId = T1;

      updated['32-2'].homeTeamId = B2;
      updated['32-2'].awayTeamId = C2;

      updated['32-3'].homeTeamId = C1;
      updated['32-3'].awayTeamId = T2;

      updated['32-4'].homeTeamId = D1;
      updated['32-4'].awayTeamId = E2;

      updated['32-5'].homeTeamId = E1;
      updated['32-5'].awayTeamId = T3;

      updated['32-6'].homeTeamId = F2;
      updated['32-6'].awayTeamId = G2;

      updated['32-7'].homeTeamId = G1;
      updated['32-7'].awayTeamId = T4;

      updated['32-8'].homeTeamId = H1;
      updated['32-8'].awayTeamId = I2;

      updated['32-9'].homeTeamId = I1;
      updated['32-9'].awayTeamId = T5;

      updated['32-10'].homeTeamId = J2;
      updated['32-10'].awayTeamId = K2;

      updated['32-11'].homeTeamId = J1;
      updated['32-11'].awayTeamId = T6;

      updated['32-12'].homeTeamId = K1;
      updated['32-12'].awayTeamId = L2;

      updated['32-13'].homeTeamId = L1;
      updated['32-13'].awayTeamId = T7;

      updated['32-14'].homeTeamId = A2;
      updated['32-14'].awayTeamId = D2;

      updated['32-15'].homeTeamId = F1;
      updated['32-15'].awayTeamId = T8;

      updated['32-16'].homeTeamId = B1;
      updated['32-16'].awayTeamId = H2;
    } else {
      // Clear Round of 32 if group stages are not complete
      Object.keys(updated).forEach(id => {
        if (id.startsWith('32-')) {
          updated[id].homeTeamId = null;
          updated[id].awayTeamId = null;
          updated[id].winnerId = null;
          updated[id].homeScore = null;
          updated[id].awayScore = null;
        }
      });
    }

    // B. Calculate advancements cascade-style (32 -> 16 -> 8 -> 4 -> final)
    const stagesCascade = [
      { current: '16-1', prevHome: '32-1', prevAway: '32-2' },
      { current: '16-2', prevHome: '32-3', prevAway: '32-4' },
      { current: '16-3', prevHome: '32-5', prevAway: '32-6' },
      { current: '16-4', prevHome: '32-7', prevAway: '32-8' },
      { current: '16-5', prevHome: '32-9', prevAway: '32-10' },
      { current: '16-6', prevHome: '32-11', prevAway: '32-12' },
      { current: '16-7', prevHome: '32-13', prevAway: '32-14' },
      { current: '16-8', prevHome: '32-15', prevAway: '32-16' },

      { current: '8-1', prevHome: '16-1', prevAway: '16-2' },
      { current: '8-2', prevHome: '16-3', prevAway: '16-4' },
      { current: '8-3', prevHome: '16-5', prevAway: '16-6' },
      { current: '8-4', prevHome: '16-7', prevAway: '16-8' },

      { current: '4-1', prevHome: '8-1', prevAway: '8-2' },
      { current: '4-2', prevHome: '8-3', prevAway: '8-4' },

      { current: 'final', prevHome: '4-1', prevAway: '4-2' }
    ];

    stagesCascade.forEach(flow => {
      const prevHome = updated[flow.prevHome];
      const prevAway = updated[flow.prevAway];
      const curr = updated[flow.current];

      curr.homeTeamId = prevHome ? prevHome.winnerId : null;
      curr.awayTeamId = prevAway ? prevAway.winnerId : null;

      // If teams changed and no longer match the winner, clear winner of current
      if (!curr.homeTeamId || !curr.awayTeamId) {
        curr.winnerId = null;
        curr.homeScore = null;
        curr.awayScore = null;
      }
    });

    // Special: Third Place Match (losing semifinalists)
    const semi1 = updated['4-1'];
    const semi2 = updated['4-2'];
    const thirdPlayoff = updated['3rd'];

    const getLoserId = (semi: KnockoutMatch) => {
      if (!semi.winnerId || !semi.homeTeamId || !semi.awayTeamId) return null;
      return semi.winnerId === semi.homeTeamId ? semi.awayTeamId : semi.homeTeamId;
    };

    thirdPlayoff.homeTeamId = semi1 ? getLoserId(semi1) : null;
    thirdPlayoff.awayTeamId = semi2 ? getLoserId(semi2) : null;

    if (!thirdPlayoff.homeTeamId || !thirdPlayoff.awayTeamId) {
      thirdPlayoff.winnerId = null;
      thirdPlayoff.homeScore = null;
      thirdPlayoff.awayScore = null;
    }

    return updated;
  }, [knockoutMatches, groupStandings, bestThirdList, isGroupStageComplete]);

  // 8. Find predicted Champion
  const champion = useMemo(() => {
    const finalMatch = calculatedKnockoutMatches['final'];
    if (finalMatch && finalMatch.winnerId) {
      return flatTeams[finalMatch.winnerId] || null;
    }
    return null;
  }, [calculatedKnockoutMatches, flatTeams]);

  // 9. Actions
  const updateMatchScore = (matchId: number, homeScore: number | null, awayScore: number | null) => {
    setMatches(prevMatches =>
      prevMatches.map(m =>
        m.id === matchId
          ? {
              ...m,
              homeScore,
              awayScore,
              status: homeScore !== null && awayScore !== null ? 'finished' : 'scheduled'
            }
          : m
      )
    );
  };

  const simulateAllGroupMatches = () => {
    setMatches(prevMatches =>
      prevMatches.map(m => {
        const homeTeam = INITIAL_TEAMS.find(t => t.id === m.homeTeamId)!;
        const awayTeam = INITIAL_TEAMS.find(t => t.id === m.awayTeamId)!;

        // Realistic score generator weighted by strength difference:
        const diff = (homeTeam.strength - awayTeam.strength) / 10; // e.g. 95 - 65 = 30 -> 3
        const lambdaHome = Math.max(0.5, 1.4 + diff * 0.2);
        const lambdaAway = Math.max(0.5, 1.4 - diff * 0.2);

        // Poisson-like distribution approximation
        const getScore = (lambda: number) => {
          const rand = Math.random();
          if (rand < Math.exp(-lambda)) return 0;
          if (rand < Math.exp(-lambda) * (1 + lambda)) return 1;
          if (rand < Math.exp(-lambda) * (1 + lambda + (lambda * lambda) / 2)) return 2;
          if (rand < Math.exp(-lambda) * (1 + lambda + (lambda * lambda) / 2 + (lambda * lambda * lambda) / 6)) return 3;
          return Math.random() > 0.5 ? 4 : 5;
        };

        const homeScore = getScore(lambdaHome);
        const awayScore = getScore(lambdaAway);

        return {
          ...m,
          homeScore,
          awayScore,
          status: 'finished'
        };
      })
    );
  };

  const resetAll = () => {
    setMatches(generateGroupMatches());
    setKnockoutMatches(INITIAL_KNOCKOUT_MATCHES);
  };

  const importTournamentState = (importedMatches: Match[], importedKnockouts?: { [id: string]: KnockoutMatch }) => {
    if (Array.isArray(importedMatches)) {
      setMatches(importedMatches);
    }
    if (importedKnockouts && typeof importedKnockouts === 'object') {
      setKnockoutMatches(importedKnockouts);
    }
  };

  const selectKnockoutWinner = (matchId: string, winnerId: string) => {
    setKnockoutMatches(prev => {
      const match = prev[matchId];
      if (!match) return prev;

      // Set score based on winner: e.g. 2-1 or 1-2, or keep original if valid
      let homeScore = match.homeScore;
      let awayScore = match.awayScore;

      if (homeScore === null || awayScore === null || homeScore === awayScore) {
        if (winnerId === match.homeTeamId) {
          homeScore = 2;
          awayScore = 1;
        } else {
          homeScore = 1;
          awayScore = 2;
        }
      } else {
        // Ensure score matches winner
        if (winnerId === match.homeTeamId && homeScore < awayScore) {
          const temp = homeScore;
          homeScore = awayScore;
          awayScore = temp;
        } else if (winnerId === match.awayTeamId && awayScore < homeScore) {
          const temp = awayScore;
          awayScore = homeScore;
          homeScore = temp;
        }
      }

      return {
        ...prev,
        [matchId]: {
          ...match,
          winnerId,
          homeScore,
          awayScore
        }
      };
    });
  };

  const updateKnockoutScore = (matchId: string, homeScore: number | null, awayScore: number | null, winnerId: string | null) => {
    setKnockoutMatches(prev => {
      const match = prev[matchId];
      if (!match) return prev;

      let resolvedWinner = winnerId;
      if (homeScore !== null && awayScore !== null) {
        if (homeScore > awayScore) {
          resolvedWinner = match.homeTeamId;
        } else if (awayScore > homeScore) {
          resolvedWinner = match.awayTeamId;
        } else if (resolvedWinner === null) {
          // In case of a draw, default to home team or require penalty winner
          resolvedWinner = match.homeTeamId;
        }
      } else {
        resolvedWinner = null;
      }

      return {
        ...prev,
        [matchId]: {
          ...match,
          homeScore,
          awayScore,
          winnerId: resolvedWinner
        }
      };
    });
  };

  return {
    // State
    matches,
    groupStandings,
    bestThirdList,
    qualifiedThirdIds,
    flatTeams,
    isGroupStageComplete,
    scorers,
    knockoutMatches: calculatedKnockoutMatches,
    champion,
    activeTab,

    // Setters / Actions
    setActiveTab,
    updateMatchScore,
    simulateAllGroupMatches,
    resetAll,
    importTournamentState,
    selectKnockoutWinner,
    updateKnockoutScore
  };
};
