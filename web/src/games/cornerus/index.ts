const Thumbnail = require('./media/thumbnail.jpg');
import { GameMode } from 'gamesShared/definitions/mode';
import { IGameDef, IGameStatus } from 'gamesShared/definitions/game';
import translation from './locales/zh.json';

export const cornerusGameDef: IGameDef = {
  code: 'cornerus',
  name: translation.name,
  imageURL: Thumbnail,
  contributors: ['JosefKuchar'],
  modes: [
    /*
            {
                mode: GameMode.AI,
                extraInfo: { type: 'slider', min: 1, max: 8 } as IGameModeExtraInfoSlider,
            },*/
    { mode: GameMode.OnlineFriend },
    { mode: GameMode.LocalFriend },
  ],
  minPlayers: 2,
  maxPlayers: 4,
  description: translation.description,
  descriptionTag: translation.descriptionTag,
  instructions: translation.instructions,
  status: IGameStatus.PUBLISHED,
  config: () => import('./config'),
  // aiConfig: () => import('./ai'),
};

export default cornerusGameDef;
