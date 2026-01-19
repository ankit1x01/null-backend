/**
 * Chapters Fixture Data
 * Chapter mock data for testing
 */

module.exports = {
  // Valid chapter entities
  chapter1: {
    id: 1,
    name: 'Null Pune',
    slug: 'null-pune',
    city: 'Pune',
    country: 'India',
    description: 'Security community in Pune',
    website: 'https://null.community/pune',
    twitter: 'nullpune',
    image: null,
    active: true,
    latitude: 18.5204,
    longitude: 73.8567,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01')
  },

  chapter2: {
    id: 2,
    name: 'Null Mumbai',
    slug: 'null-mumbai',
    city: 'Mumbai',
    country: 'India',
    description: 'Security community in Mumbai',
    website: 'https://null.community/mumbai',
    twitter: 'nullmumbai',
    image: null,
    active: true,
    latitude: 19.0760,
    longitude: 72.8777,
    created_at: new Date('2024-01-15'),
    updated_at: new Date('2024-01-15')
  },

  inactiveChapter: {
    id: 3,
    name: 'Null Inactive',
    slug: 'null-inactive',
    city: 'Test City',
    country: 'India',
    description: 'Inactive chapter',
    website: null,
    twitter: null,
    image: null,
    active: false,
    latitude: null,
    longitude: null,
    created_at: new Date('2024-02-01'),
    updated_at: new Date('2024-02-01')
  },

  // Create chapter payloads
  createChapterValid: {
    name: 'Null Delhi',
    city: 'Delhi',
    country: 'India',
    description: 'Security community in Delhi',
    website: 'https://null.community/delhi',
    twitter: 'nulldelhi'
  },

  createChapterMinimal: {
    name: 'Null Minimal',
    city: 'Minimal City',
    country: 'India'
  },

  createChapterDuplicateName: {
    name: 'Null Pune', // Already exists
    city: 'Pune',
    country: 'India'
  },

  createChapterMissingRequired: {
    name: 'Missing City'
    // Missing city and country
  },

  // Update chapter payloads
  updateChapterValid: {
    name: 'Null Pune Updated',
    description: 'Updated description for Pune chapter',
    website: 'https://updated.null.community/pune'
  },

  updateChapterPartial: {
    description: 'Only updating description'
  },

  // Chapter list for pagination
  chapterList: [
    { id: 1, name: 'Null Pune', city: 'Pune', active: true },
    { id: 2, name: 'Null Mumbai', city: 'Mumbai', active: true },
    { id: 3, name: 'Null Delhi', city: 'Delhi', active: true },
    { id: 4, name: 'Null Bangalore', city: 'Bangalore', active: true },
    { id: 5, name: 'Null Chennai', city: 'Chennai', active: false }
  ]
};
