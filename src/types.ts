export interface Team {
  id: string; // e.g. "ARG"
  name: string; // e.g. "阿根廷"
  group: string; // "A" - "L"
  flag: string; // Emoji flag, e.g. "🇦🇷"
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  strength: number; // 战斗力值 (1-100)，用于快速模拟比分和深层平分时作决胜依据
}

export interface Match {
  id: number; // 1 - 72 for group stage matches
  group: string; // "A" - "L"
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number | null;
  awayScore: number | null;
  status: 'scheduled' | 'finished';
  date: string;
  venue: string;
}

export interface GroupStandings {
  groupName: string;
  teams: Team[];
}

export interface BestThirdRanking {
  teamId: string;
  teamName: string;
  group: string;
  flag: string;
  points: number;
  wins: number;
  goalDifference: number;
  goalsFor: number;
  strength: number;
  qualified: boolean;
}

export interface Scorer {
  id: string;
  name: string;
  teamId: string;
  teamName: string;
  flag: string;
  goals: number;
  assists: number;
}

export interface KnockoutMatch {
  id: string; // e.g. "32-1", "16-1", "8-1", "4-1", "3rd", "final"
  stage: '32' | '16' | '8' | '4' | '3rd' | 'final';
  homeTeamId: string | null;
  awayTeamId: string | null;
  homeScore: number | null;
  awayScore: number | null;
  winnerId: string | null;
  homePrevMatchId: string | null; // 指向上一轮产生该主队的比赛ID
  awayPrevMatchId: string | null; // 指向上一轮产生该客队的比赛ID
  placeholder: {
    home: string;
    away: string;
  };
}

export interface TournamentState {
  matches: Match[];
  groupTeams: { [teamId: string]: Team };
  scorers: Scorer[];
  knockoutMatches: { [matchId: string]: KnockoutMatch };
  activeTab: 'dashboard' | 'group' | 'knockout';
}
