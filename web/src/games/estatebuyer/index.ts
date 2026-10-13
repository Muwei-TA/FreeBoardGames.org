const Thumbnail = require('./media/thumbnail.jpg');
import { GameMode } from 'gamesShared/definitions/mode';
import { IGameDef, IGameStatus } from 'gamesShared/definitions/game';
import instructions from './instructions.md';

export const estateBuyerGameDef: IGameDef = {
  code: 'estatebuyer',
  name: '地产大买家',
  contributors: ['ryandriskel'],
  imageURL: Thumbnail,
  modes: [{ mode: GameMode.OnlineFriend }, { mode: GameMode.LocalFriend }],
  minPlayers: 2,
  maxPlayers: 6,
  description: '买卖楼房',
  descriptionTag: `本地或在线与好友一起玩地产大买家！`,
  instructions: {
    text: instructions,
  },
  status: IGameStatus.PUBLISHED,
  config: () => import('./config'),
};

export default estateBuyerGameDef;
