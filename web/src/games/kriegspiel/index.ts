const Thumbnail = require('./media/thumbnail.png?lqip-colors');
import { GameMode } from 'gamesShared/definitions/mode';
import { IGameDef, IGameStatus } from 'gamesShared/definitions/game';
import instructions from './instructions.md';

export const kriegspielGameDef: IGameDef = {
  code: 'kriegspiel',
  name: '居伊·德波的战争游戏',
  contributors: ['iamcxds'],
  imageURL: Thumbnail,
  modes: [{ mode: GameMode.AI }, { mode: GameMode.OnlineFriend }, { mode: GameMode.LocalFriend }],
  minPlayers: 2,
  maxPlayers: 2,
  description: '战争游戏（Le Jeu de la Guerre）',
  descriptionTag: `战争游戏是政治以另一种方式的延续。`,
  instructions: {
    videoId: '4l2M6vpWLAw',
    text: instructions,
  },
  status: IGameStatus.IN_DEVELOPMENT,
  aiConfig: () => import('./ai'),
  config: () => import('./config'),
};

export default kriegspielGameDef;
