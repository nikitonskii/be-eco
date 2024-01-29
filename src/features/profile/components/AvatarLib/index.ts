import Croco from './Croco';
import Crab from './Crab';
import Rabbit from './Rabbit';
import Lion from './Lion';
import Jellyfish from './Jellyfish';
import Fox from './Fox';
import Elk from './Elk';
import Dyno from './Dyno';
import Raccon from './Raccon';
import Whale from './Whale';
import { AvatarCodes } from '@/types';

export const avatarLib: Record<AvatarCodes, any> = {
  [AvatarCodes.Croco]: Croco,
  [AvatarCodes.Crab]: Crab,
  [AvatarCodes.Rabbit]: Rabbit,
  [AvatarCodes.Lion]: Lion,
  [AvatarCodes.Jellyfish]: Jellyfish,
  [AvatarCodes.Fox]: Fox,
  [AvatarCodes.Elk]: Elk,
  [AvatarCodes.Dyno]: Dyno,
  [AvatarCodes.Raccon]: Raccon,
  [AvatarCodes.Whale]: Whale,
};
