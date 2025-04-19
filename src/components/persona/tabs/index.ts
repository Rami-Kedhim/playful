
// Since `PersonaContentTab` is not exported from this index.ts, and user code attempted to import it, remove it to fix import errors

export { default as PersonaAboutTab } from './PersonaAboutTab';
// export { default as PersonaMediaTab } from './PersonaMediaTab';
// export { default as PersonaReviewsTab } from './PersonaReviewsTab';
import PersonaBookingTab from './PersonaBookingTab';
import PersonaChatTab from './PersonaChatTab';
import PersonaLiveTab from './PersonaLiveTab';
import PersonaStoriesTab from './PersonaStoriesTab';

export {
  PersonaBookingTab,
  PersonaChatTab,
  PersonaLiveTab,
  PersonaStoriesTab
};

