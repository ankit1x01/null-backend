/**
 * Venues Fixture Data
 * Venue mock data for testing
 */

module.exports = {
  // Valid venue entities
  venue1: {
    id: 1,
    name: 'Tech Hub Pune',
    address: '123 Tech Park, Hinjewadi',
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    postal_code: '411057',
    latitude: 18.5912,
    longitude: 73.7388,
    capacity: 100,
    description: 'Modern tech hub with all amenities',
    website: 'https://techhub.pune.com',
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01')
  },

  venue2: {
    id: 2,
    name: 'Innovation Center Mumbai',
    address: '456 BKC Complex',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    postal_code: '400051',
    latitude: 19.0596,
    longitude: 72.8656,
    capacity: 200,
    description: 'Large conference center',
    website: null,
    created_at: new Date('2024-01-15'),
    updated_at: new Date('2024-01-15')
  },

  virtualVenue: {
    id: 3,
    name: 'Online/Virtual',
    address: 'Virtual Event',
    city: 'Online',
    state: null,
    country: 'Virtual',
    postal_code: null,
    latitude: null,
    longitude: null,
    capacity: null,
    description: 'Virtual event platform',
    website: 'https://meet.null.community',
    created_at: new Date('2024-02-01'),
    updated_at: new Date('2024-02-01')
  },

  // Create venue payloads
  createVenueValid: {
    name: 'New Tech Space',
    address: '789 Developer Lane',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    postal_code: '560001',
    capacity: 150,
    description: 'New venue for tech events'
  },

  createVenueMinimal: {
    name: 'Minimal Venue',
    address: 'Some Address',
    city: 'City',
    country: 'India'
  },

  createVenueDuplicateName: {
    name: 'Tech Hub Pune', // Already exists
    address: 'Different Address',
    city: 'Pune',
    country: 'India'
  },

  createVenueMissingRequired: {
    name: 'Missing Address Venue'
    // Missing address, city, country
  },

  // Update venue payloads
  updateVenueValid: {
    name: 'Tech Hub Pune - Updated',
    capacity: 120,
    description: 'Updated description'
  },

  updateVenuePartial: {
    capacity: 80
  },

  // Venue list for pagination
  venueList: [
    { id: 1, name: 'Venue 1', city: 'Pune', capacity: 100 },
    { id: 2, name: 'Venue 2', city: 'Mumbai', capacity: 200 },
    { id: 3, name: 'Venue 3', city: 'Delhi', capacity: 150 },
    { id: 4, name: 'Venue 4', city: 'Bangalore', capacity: 80 },
    { id: 5, name: 'Online', city: 'Virtual', capacity: null }
  ]
};
