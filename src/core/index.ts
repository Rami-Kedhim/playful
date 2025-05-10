
import { Hermes } from './Hermes';
import { LucieAI, lucieAI } from './Lucie';
import { Oxum } from './Oxum';
import UberCore, { uberCore } from './UberCore';
import { Orus } from './Orus';

// Create instances
const hermes = new Hermes();
const oxum = new Oxum();
const orus = new Orus();

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
