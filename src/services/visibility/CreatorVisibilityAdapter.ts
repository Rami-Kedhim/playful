
// Fix property 'region' access using optional chaining to avoid errors

import { ContentCreator } from '@/types/creator';

export class CreatorVisibilityAdapter {
  public creators: ContentCreator[];

  constructor(creators: ContentCreator[]) {
    this.creators = creators;
  }

  public getCreatorsByRegion(region: string): ContentCreator[] {
    // Safe optional chaining for region
    return this.creators.filter(creator => (creator.region ?? '') === region);
  }

  public getCreatorsByLanguage(language: string): ContentCreator[] {
    return this.creators.filter(creator => creator.languages?.includes(language) || false);
  }

  public getSortedCreators(filter?: { region?: string; tags?: string[]; limit?: number }): string[] {
    let filteredCreators = this.creators;

    if (filter?.region) {
      filteredCreators = filteredCreators.filter(c => (c.region ?? '') === filter.region);
    }
    if (filter?.tags) {
      filteredCreators = filteredCreators.filter(c =>
        filter.tags?.every(tg => c.tags?.includes(tg))
      );
    }

    return filteredCreators
      .slice(0, filter?.limit || filteredCreators.length)
      .map(c => c.id);
  }

  public recordCreatorView(creatorId: string): void {
    console.log(`Recorded view for creator ${creatorId}`);
  }
}

export default CreatorVisibilityAdapter;
