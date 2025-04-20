
// Fix CreatorVisibilityAdapter filter property name to languages, and usage of region.

import { ContentCreator } from '@/types/creator';

export class CreatorVisibilityAdapter {
  public creators: ContentCreator[];

  constructor(creators: ContentCreator[]) {
    this.creators = creators;
  }

  public getCreatorsByRegion(region: string): ContentCreator[] {
    return this.creators.filter(creator => creator.region === region);
  }

  public getCreatorsByLanguage(language: string): ContentCreator[] {
    return this.creators.filter(creator => creator.languages?.includes(language));
  }

  // Add placeholders for methods so interface matches usage
  public getSortedCreators(filter?: { region?: string; tags?: string[]; limit?: number }): string[] {
    // Just return ids from filtered creators based on filter criteria
    let filteredCreators = this.creators;

    if (filter?.region) {
      filteredCreators = filteredCreators.filter(c => c.region === filter.region);
    }
    if (filter?.tags) {
      filteredCreators = filteredCreators.filter(c =>
        filter.tags?.every(tg => c.tags?.includes(tg))
      );
    }

    // Return IDs, limited if set
    return filteredCreators.slice(0, filter?.limit || filteredCreators.length).map(c => c.id);
  }

  public recordCreatorView(creatorId: string): void {
    // Just a stub for record view
    console.log(`Recorded view for creator ${creatorId}`);
  }
}

export default CreatorVisibilityAdapter;
