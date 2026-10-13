import { GameMode } from 'gamesShared/definitions/mode';
import { IGameDef, IGameStatus } from 'gamesShared/definitions/game';

export const picnicGoTGameDef: IGameDef = {
  code: 'picnicGoT',
  name: '野餐 GO 测试',
  contributors: ['tuxor1337'],
  imageURL: null,
  modes: [{ mode: GameMode.OnlineFriend }],
  minPlayers: 2,
  maxPlayers: 2,
  description: '这只是野餐 GO 卡牌统计的测试场地',
  descriptionTag: '请勿使用此游戏！',
  instructions: { text: '没有说明，如果你不知道自己在做什么，请不要使用。' },
  status: IGameStatus.IN_DEVELOPMENT,
  config: () => import('./config'),
};

export default picnicGoTGameDef;
