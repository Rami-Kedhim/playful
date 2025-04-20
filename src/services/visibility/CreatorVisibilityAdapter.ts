
// Fixed properties to match ContentCreator interface in CreatorVisibilityAdapter
// Also adjusted language to languages

import { ContentCreator } from '@/types/creator';

export class CreatorVisibilityAdapter {
  private creators: ContentCreator[];

  constructor(creators: ContentCreator[]) {
    this.creators = creators;
  }

  public getCreatorsByRegion(region: string): ContentCreator[] {
    return this.creators.filter(creator => creator.region === region);
  }

  public getCreatorsByLanguage(language: string): ContentCreator[] {
    return this.creators.filter(creator => creator.languages?.includes(language));
  }
}

export default CreatorVisibilityAdapter;
