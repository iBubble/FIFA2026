import type { Team, Match, Scorer, KnockoutMatch } from '../types';

export const INITIAL_TEAMS: Team[] = [
  // Group A
  { id: 'MEX', name: '墨西哥', group: 'A', flag: '🇲🇽', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 81 },
  { id: 'SCO', name: '苏格兰', group: 'A', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 79 },
  { id: 'RSA', name: '南非', group: 'A', flag: '🇿🇦', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 74 },
  { id: 'UZB', name: '乌兹别克斯坦', group: 'A', flag: '🇺🇿', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 73 },

  // Group B
  { id: 'CAN', name: '加拿大', group: 'B', flag: '🇨🇦', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 79 },
  { id: 'COL', name: '哥伦比亚', group: 'B', flag: '🇨🇴', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 85 },
  { id: 'ALG', name: '阿尔及利亚', group: 'B', flag: '🇩🇿', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 78 },
  { id: 'IRQ', name: '伊拉克', group: 'B', flag: '🇮🇶', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 71 },

  // Group C
  { id: 'BRA', name: '巴西', group: 'C', flag: '🇧🇷', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 94 },
  { id: 'AUS', name: '澳大利亚', group: 'C', flag: '🇦🇺', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 78 },
  { id: 'CIV', name: '科特迪瓦', group: 'C', flag: '🇨🇮', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 80 },
  { id: 'JOR', name: '约旦', group: 'C', flag: '🇯🇴', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 70 },

  // Group D
  { id: 'USA', name: '美国', group: 'D', flag: '🇺🇸', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 83 },
  { id: 'PAR', name: '巴拉圭', group: 'D', flag: '🇵🇾', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 77 },
  { id: 'EGY', name: '埃及', group: 'D', flag: '🇪🇬', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 79 },
  { id: 'CZE', name: '捷克', group: 'D', flag: '🇨🇿', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 80 },

  // Group E
  { id: 'ESP', name: '西班牙', group: 'E', flag: '🇪🇸', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 94 },
  { id: 'ECU', name: '厄瓜多尔', group: 'E', flag: '🇪🇨', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 81 },
  { id: 'TUN', name: '突尼斯', group: 'E', flag: '🇹🇳', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 74 },
  { id: 'CPV', name: '佛得角', group: 'E', flag: '🇨🇻', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 71 },

  // Group F
  { id: 'ENG', name: '英格兰', group: 'F', flag: '🏴%E2%80%8D󠁧󠁢󠁥󠁮󠁧󠁿', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 93 },
  { id: 'URU', name: '乌拉圭', group: 'F', flag: '🇺🇾', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 86 },
  { id: 'COD', name: '刚果民主共和国', group: 'F', flag: '🇨🇩', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 73 },
  { id: 'BIH', name: '波黑', group: 'F', flag: '🇧🇦', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 77 },

  // Group G
  { id: 'GER', name: '德国', group: 'G', flag: '🇩🇪', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 90 },
  { id: 'JPN', name: '日本', group: 'G', flag: '🇯🇵', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 84 },
  { id: 'MAR', name: '摩洛哥', group: 'G', flag: '🇲🇦', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 86 },
  { id: 'PAN', name: '巴拿马', group: 'G', flag: '🇵🇦', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 74 },

  // Group H
  { id: 'POR', name: '葡萄牙', group: 'H', flag: '🇵🇹', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 92 },
  { id: 'NOR', name: '挪威', group: 'H', flag: '🇳🇴', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 83 },
  { id: 'GHA', name: '加纳', group: 'H', flag: '🇬🇭', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 75 },
  { id: 'HAI', name: '海地', group: 'H', flag: '🇭🇹', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 68 },

  // Group I
  { id: 'NED', name: '荷兰', group: 'I', flag: '🇳🇱', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 90 },
  { id: 'SWE', name: '瑞典', group: 'I', flag: '🇸🇪', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 82 },
  { id: 'SEN', name: '塞内加尔', group: 'I', flag: '🇸🇳', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 82 },
  { id: 'QAT', name: '卡塔尔', group: 'I', flag: '🇶🇦', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 72 },

  // Group J
  { id: 'BEL', name: '比利时', group: 'J', flag: '🇧🇪', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 88 },
  { id: 'KSA', name: '沙特阿拉伯', group: 'J', flag: '🇸🇦', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 75 },
  { id: 'SUI', name: '瑞士', group: 'J', flag: '🇨🇭', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 83 },
  { id: 'CUW', name: '库拉索', group: 'J', flag: '🇨🇼', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 69 },

  // Group K
  { id: 'CRO', name: '克罗地亚', group: 'K', flag: '🇭🇷', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 88 },
  { id: 'TUR', name: '土耳其', group: 'K', flag: '🇹🇷', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 82 },
  { id: 'IRN', name: '伊朗', group: 'K', flag: '🇮🇷', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 78 },
  { id: 'NZL', name: '新西兰', group: 'K', flag: '🇳🇿', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 68 },

  // Group L
  { id: 'ARG', name: '阿根廷', group: 'L', flag: '🇦🇷', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 96 },
  { id: 'FRA', name: '法国', group: 'L', flag: '🇫🇷', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 95 },
  { id: 'AUT', name: '奥地利', group: 'L', flag: '🇦🇹', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 82 },
  { id: 'KOR', name: '韩国', group: 'L', flag: '🇰🇷', wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, strength: 81 },
];

export const INITIAL_SCORERS: Scorer[] = [
  { id: 'S1', name: '基利安·姆巴佩', teamId: 'FRA', teamName: '法国', flag: '🇫🇷', goals: 0, assists: 0 },
  { id: 'S2', name: '莱奥·梅西', teamId: 'ARG', teamName: '阿根廷', flag: '🇦🇷', goals: 0, assists: 0 },
  { id: 'S3', name: '维尼修斯', teamId: 'BRA', teamName: '巴西', flag: '🇧🇷', goals: 0, assists: 0 },
  { id: 'S4', name: '祖德·贝林厄姆', teamId: 'ENG', teamName: '英格兰', flag: '🏴%E2%80%8D󠁧󠁢󠁥󠁮󠁧󠁿', goals: 0, assists: 0 },
  { id: 'S5', name: '哈里·凯恩', teamId: 'ENG', teamName: '英格兰', flag: '🏴%E2%80%8D󠁧󠁢󠁥󠁮󠁧󠁿', goals: 0, assists: 0 },
  { id: 'S6', name: '克里斯蒂亚诺·罗纳尔多', teamId: 'POR', teamName: '葡萄牙', flag: '🇵🇹', goals: 0, assists: 0 },
  { id: 'S7', name: '三笘薰', teamId: 'JPN', teamName: '日本', flag: '🇯🇵', goals: 0, assists: 0 },
  { id: 'S8', name: '孙兴慜', teamId: 'KOR', teamName: '韩国', flag: '🇰🇷', goals: 0, assists: 0 },
  { id: 'S9', name: '埃尔林·哈兰德', teamId: 'NOR', teamName: '挪威', flag: '🇳🇴', goals: 0, assists: 0 },
  { id: 'S10', name: '劳塔罗·马丁内斯', teamId: 'ARG', teamName: '阿根廷', flag: '🇦🇷', goals: 0, assists: 0 },
];

const VENUES = [
  '纽约 (大都会体育场)', '洛杉矶 (苏菲体育场)', '达拉斯 (AT&T体育场)', '亚特兰大 (奔驰体育场)',
  '迈阿密 (硬石体育场)', '西雅图 (流明球场)', '多伦多 (BMO球场)', '温哥华 (卑诗体育馆)',
  '墨西哥城 (阿兹特克体育场)', '瓜达拉哈拉 (阿克伦体育场)', '蒙特雷 (BBVA体育场)'
];

export const generateGroupMatches = (): Match[] => {
  const matches: Match[] = [];
  let matchId = 1;
  const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

  groups.forEach((groupName) => {
    const groupTeams = INITIAL_TEAMS.filter(t => t.group === groupName);
    
    const roundPairs = [
      [[0, 1], [2, 3]],
      [[0, 2], [3, 1]],
      [[3, 0], [1, 2]]
    ];

    const startDay = groups.indexOf(groupName) % 4;

    roundPairs.forEach((round, roundIndex) => {
      round.forEach((pair) => {
        const home = groupTeams[pair[0]];
        const away = groupTeams[pair[1]];
        const dateDay = 11 + startDay + roundIndex * 3;
        
        matches.push({
          id: matchId++,
          group: groupName,
          homeTeamId: home.id,
          awayTeamId: away.id,
          homeScore: null,
          awayScore: null,
          status: 'scheduled',
          date: `06-${dateDay < 10 ? '0' + dateDay : dateDay}`,
          venue: VENUES[matchId % VENUES.length]
        });
      });
    });
  });

  return matches;
};

export const INITIAL_KNOCKOUT_MATCHES: { [id: string]: KnockoutMatch } = {
  // Round of 32
  '32-1': { id: '32-1', stage: '32', homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winnerId: null, homePrevMatchId: null, awayPrevMatchId: null, placeholder: { home: 'A组第一', away: '递补小组第三(1)' } },
  '32-2': { id: '32-2', stage: '32', homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winnerId: null, homePrevMatchId: null, awayPrevMatchId: null, placeholder: { home: 'B组第二', away: 'C组第二' } },
  '32-3': { id: '32-3', stage: '32', homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winnerId: null, homePrevMatchId: null, awayPrevMatchId: null, placeholder: { home: 'C组第一', away: '递补小组第三(2)' } },
  '32-4': { id: '32-4', stage: '32', homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winnerId: null, homePrevMatchId: null, awayPrevMatchId: null, placeholder: { home: 'D组第一', away: 'E组第二' } },
  '32-5': { id: '32-5', stage: '32', homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winnerId: null, homePrevMatchId: null, awayPrevMatchId: null, placeholder: { home: 'E组第一', away: '递补小组第三(3)' } },
  '32-6': { id: '32-6', stage: '32', homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winnerId: null, homePrevMatchId: null, awayPrevMatchId: null, placeholder: { home: 'F组第二', away: 'G组第二' } },
  '32-7': { id: '32-7', stage: '32', homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winnerId: null, homePrevMatchId: null, awayPrevMatchId: null, placeholder: { home: 'G组第一', away: '递补小组第三(4)' } },
  '32-8': { id: '32-8', stage: '32', homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winnerId: null, homePrevMatchId: null, awayPrevMatchId: null, placeholder: { home: 'H组第一', away: 'I组第二' } },

  '32-9': { id: '32-9', stage: '32', homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winnerId: null, homePrevMatchId: null, awayPrevMatchId: null, placeholder: { home: 'I组第一', away: '递补小组第三(5)' } },
  '32-10': { id: '32-10', stage: '32', homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winnerId: null, homePrevMatchId: null, awayPrevMatchId: null, placeholder: { home: 'J组第二', away: 'K组第二' } },
  '32-11': { id: '32-11', stage: '32', homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winnerId: null, homePrevMatchId: null, awayPrevMatchId: null, placeholder: { home: 'J组第一', away: '递补小组第三(6)' } },
  '32-12': { id: '32-12', stage: '32', homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winnerId: null, homePrevMatchId: null, awayPrevMatchId: null, placeholder: { home: 'K组第一', away: 'L组第二' } },
  '32-13': { id: '32-13', stage: '32', homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winnerId: null, homePrevMatchId: null, awayPrevMatchId: null, placeholder: { home: 'L组第一', away: '递补小组第三(7)' } },
  '32-14': { id: '32-14', stage: '32', homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winnerId: null, homePrevMatchId: null, awayPrevMatchId: null, placeholder: { home: 'A组第二', away: 'D组第二' } },
  '32-15': { id: '32-15', stage: '32', homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winnerId: null, homePrevMatchId: null, awayPrevMatchId: null, placeholder: { home: 'F组第一', away: '递补小组第三(8)' } },
  '32-16': { id: '32-16', stage: '32', homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winnerId: null, homePrevMatchId: null, awayPrevMatchId: null, placeholder: { home: 'B组第一', away: 'H组第二' } },

  // Round of 16
  '16-1': { id: '16-1', stage: '16', homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winnerId: null, homePrevMatchId: '32-1', awayPrevMatchId: '32-2', placeholder: { home: '32强第1场胜者', away: '32强第2场胜者' } },
  '16-2': { id: '16-2', stage: '16', homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winnerId: null, homePrevMatchId: '32-3', awayPrevMatchId: '32-4', placeholder: { home: '32强第3场胜者', away: '32强第4场胜者' } },
  '16-3': { id: '16-3', stage: '16', homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winnerId: null, homePrevMatchId: '32-5', awayPrevMatchId: '32-6', placeholder: { home: '32强第5场胜者', away: '32强第6场胜者' } },
  '16-4': { id: '16-4', stage: '16', homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winnerId: null, homePrevMatchId: '32-7', awayPrevMatchId: '32-8', placeholder: { home: '32强第7场胜者', away: '32强第8场胜者' } },

  '16-5': { id: '16-5', stage: '16', homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winnerId: null, homePrevMatchId: '32-9', awayPrevMatchId: '32-10', placeholder: { home: '32强第9场胜者', away: '32强第10场胜者' } },
  '16-6': { id: '16-6', stage: '16', homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winnerId: null, homePrevMatchId: '32-11', awayPrevMatchId: '32-12', placeholder: { home: '32强第11场胜者', away: '32强第12场胜者' } },
  '16-7': { id: '16-7', stage: '16', homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winnerId: null, homePrevMatchId: '32-13', awayPrevMatchId: '32-14', placeholder: { home: '32强第13场胜者', away: '32强第14场胜者' } },
  '16-8': { id: '16-8', stage: '16', homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winnerId: null, homePrevMatchId: '32-15', awayPrevMatchId: '32-16', placeholder: { home: '32强第15场胜者', away: '32强第16场胜者' } },

  // Quarterfinals
  '8-1': { id: '8-1', stage: '8', homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winnerId: null, homePrevMatchId: '16-1', awayPrevMatchId: '16-2', placeholder: { home: '8强第1场胜者', away: '8强第2场胜者' } },
  '8-2': { id: '8-2', stage: '8', homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winnerId: null, homePrevMatchId: '16-3', awayPrevMatchId: '16-4', placeholder: { home: '8强第3场胜者', away: '8强第4场胜者' } },

  '8-3': { id: '8-3', stage: '8', homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winnerId: null, homePrevMatchId: '16-5', awayPrevMatchId: '16-6', placeholder: { home: '8强第5场胜者', away: '8强第6场胜者' } },
  '8-4': { id: '8-4', stage: '8', homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winnerId: null, homePrevMatchId: '16-7', awayPrevMatchId: '16-8', placeholder: { home: '8强第7场胜者', away: '8强第8场胜者' } },

  // Semifinals
  '4-1': { id: '4-1', stage: '4', homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winnerId: null, homePrevMatchId: '8-1', awayPrevMatchId: '8-2', placeholder: { home: '半决赛A胜者', away: '半决赛B胜者' } },
  '4-2': { id: '4-2', stage: '4', homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winnerId: null, homePrevMatchId: '8-3', awayPrevMatchId: '8-4', placeholder: { home: '半决赛C胜者', away: '半决赛D胜者' } },

  // Third Place Playoff & Final
  '3rd': { id: '3rd', stage: '3rd', homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winnerId: null, homePrevMatchId: '4-1', awayPrevMatchId: '4-2', placeholder: { home: '半决赛A负者', away: '半决赛B负者' } },
  'final': { id: 'final', stage: 'final', homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winnerId: null, homePrevMatchId: '4-1', awayPrevMatchId: '4-2', placeholder: { home: '半决赛A胜者', away: '半决赛B胜者' } }
};
