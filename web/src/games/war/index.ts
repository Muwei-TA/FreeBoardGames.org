const Thumbnail = require('./media/thumbnail.jpg');
import { GameMode } from 'gamesShared/definitions/mode';
import { IGameDef, IGameStatus } from 'gamesShared/definitions/game';
import instructions from './instructions.md';

export const warGameDef: IGameDef = {
  code: 'war',
  name: '比大小',
  contributors: ['ignoreintuition'],
  imageURL: Thumbnail,
  modes: [{ mode: GameMode.OnlineFriend }, { mode: GameMode.LocalFriend }],
  minPlayers: 2,
  maxPlayers: 2,
  description: '比大小是一款简单的纸牌游戏，通常由两名玩家使用一副标准扑克牌进行。',
  descriptionTag: '比大小是一款简单的纸牌游戏。',
  instructions: {
    videoId: '23QQ1Hz2-jY',
    text: instructions,
  },
  status: IGameStatus.IN_DEVELOPMENT,
  config: () => import('./config'),
};
export default warGameDef;
