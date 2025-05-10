
import Hermes from './Hermes';
import LucieAI from './Lucie';
import Oxum from './Oxum';
import UberCore from './UberCore';
import { Orus } from './Orus';

// Create instances
const hermes = new Hermes();
const lucieAI = new LucieAI();
const oxum = new Oxum();
const orus = new Orus();
const uberCore = new UberCore();

// Export instances and classes
export {
  // Instances
  hermes,
  lucieAI,
  oxum,
  orus,
  uberCore,
  
  // Classes
  Hermes,
  LucieAI,
  Oxum,
  UberCore,
  Orus
};
