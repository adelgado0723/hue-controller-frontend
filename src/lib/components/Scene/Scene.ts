/* export enum SceneEffect { */
/*   sparkle = 'sparkle', */
/*   fire = 'fire', */
/*   candle = 'candle', */
/*   no_effect = 'no_effect' */
/* } */

export interface Scene {
  id: string;
  name: string;
  image: string;
  group: string;
  owner: string;
  locked: boolean;
  recycle: boolean;
  lastUpdated: Date;
  lights: string[];
  type: string;
  version: number;
}
