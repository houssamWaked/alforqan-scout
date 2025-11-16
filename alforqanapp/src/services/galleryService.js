import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_KEY = 'cache_gallery';

// Local mock data for albums / photos.
// Each item represents an album entry with year + category.
const MOCK_GALLERY = [
  {
    id: 1,
    title: 'Summer Camp 2023',
    year: 2023,
    category: 'camp',
    image:
      'https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=800',
  },
  {
    id: 2,
    title: 'District Parade',
    year: 2022,
    category: 'parade',
    image:
      'https://images.unsplash.com/photo-1500534314211-0a24cd03f2c0?q=80&w=800',
  },
  {
    id: 3,
    title: 'Community Service',
    year: 2024,
    category: 'service',
    image:
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800',
  },
  {
    id: 4,
    title: 'Night Hike',
    year: 2023,
    category: 'hike',
    image:
      'https://images.unsplash.com/photo-1500534316287-38cbb94f8fd1?q=80&w=800',
  },
  {
    id: 5,
    title: 'Nature Exploration',
    year: 2022,
    category: 'nature',
    image:
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=800',
  },
  {
    id: 6,
    title: 'Unit Gathering',
    year: 2024,
    category: 'meeting',
    image:
      'https://images.unsplash.com/photo-1500534314211-0a24cd03f2c0?q=80&w=800',
  },
];

export async function getGallery(forceRefresh = false) {
  let images = [];

  try {
    if (!forceRefresh) {
      const cached = await AsyncStorage.getItem(CACHE_KEY);
      if (cached) {
        images = JSON.parse(cached);
      }
    }

    if (!images.length) {
      images = MOCK_GALLERY;
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(MOCK_GALLERY));
    }
  } catch (err) {
    console.error('Gallery fetch error:', err.message);
    images = MOCK_GALLERY;
  }

  return { images, error: null };
}

export default getGallery;
