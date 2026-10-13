const Thumbnail = require('./media/thumbnail.jpg');
import { GameMode } from 'gamesShared/definitions/mode';
import { IGameDef, IGameStatus } from 'gamesShared/definitions/game';
import instructions from './instructions.md';

export const mergersGameDef: IGameDef = {
  code: 'mergers',
  name: '酒店并购',
  contributors: ['lfkellogg'],
  imageURL: Thumbnail,
  modes: [{ mode: GameMode.OnlineFriend }],
  minPlayers: 3,
  maxPlayers: 6,
  description: '类似《并购》（Acquire）',
  descriptionTag: '投资酒店，主宰市场！',
  instructions: {
    text: instructions,
  },
  status: IGameStatus.PUBLISHED,
  config: () => import('./config'),
  customization: () => import('./customization'),
};

export default mergersGameDef;
