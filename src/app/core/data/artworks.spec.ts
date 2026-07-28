import { ARTWORK_FILTERS, ARTWORKS, artworkTitle } from './artworks';

describe('artwork catalogue', () => {
  it('uses a unique route slug for every artwork', () => {
    const slugs = ARTWORKS.map((artwork) => artwork.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('provides an artwork image and localized catalogue copy', () => {
    ARTWORKS.forEach((artwork) => {
      expect(artwork.views.artwork).toBeTruthy();
      expect(artwork.medium.en).toBeTruthy();
      expect(artwork.medium.fr).toBeTruthy();
      expect(artwork.medium.ko).toBeTruthy();
      expect(artwork.description.en).toBeTruthy();
      expect(artwork.description.fr).toBeTruthy();
      expect(artwork.description.ko).toBeTruthy();
      expect(artworkTitle(artwork, 'en')).toBeTruthy();
      expect(artworkTitle(artwork, 'fr')).toBeTruthy();
      expect(artworkTitle(artwork, 'ko')).toBeTruthy();
    });
  });

  it('offers a filter for every category used in the catalogue', () => {
    const filters = new Set(ARTWORK_FILTERS.map((filter) => filter.id));

    ARTWORKS.forEach((artwork) => {
      expect(filters.has(artwork.category)).toBeTrue();
    });
  });
});
