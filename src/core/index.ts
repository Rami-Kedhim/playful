
import Hermes from './Hermes';
import LucieAI from './Lucie';
import Oxum from './Oxum';
import UberCore from './UberCore';
import Orus from './Orus';

// Create instances
const hermes = new Hermes();
const lucieAI = new LucieAI();
const oxum = new Oxum();
const orus = new Orus();

// Fix the initialization call to match the updated constructor
const uberCore = new UberCore();

// Export instances and classes
export {
  hermes,
  lucieAI,
  oxum,
  orus,
  uberCore,
  Hermes,
  LucieAI,
  Oxum,
  UberCore,
  Orus
};
