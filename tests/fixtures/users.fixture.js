/**
 * Users Fixture Data
 * Mock user data for testing
 */

module.exports = {
  // Valid user entities
  adminUser: {
    id: 1,
    email: 'admin@nullchapter.com',
    name: 'Admin User',
    handle: 'admin_user',
    admin: true,
    bio: 'System administrator',
    avatar: null,
    email_confirmed: true,
    locked: false,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01')
  },

  regularUser: {
    id: 2,
    email: 'user@example.com',
    name: 'John Doe',
    handle: 'johndoe',
    admin: false,
    bio: 'Regular community member',
    avatar: null,
    email_confirmed: true,
    locked: false,
    created_at: new Date('2024-01-15'),
    updated_at: new Date('2024-01-15')
  },

  speakerUser: {
    id: 3,
    email: 'speaker@example.com',
    name: 'Jane Speaker',
    handle: 'janespeaker',
    admin: false,
    bio: 'Tech speaker and developer',
    avatar: 'avatar.jpg',
    email_confirmed: true,
    locked: false,
    created_at: new Date('2024-02-01'),
    updated_at: new Date('2024-02-01')
  },

  unconfirmedUser: {
    id: 4,
    email: 'unconfirmed@example.com',
    name: 'Unconfirmed User',
    handle: 'unconfirmed',
    admin: false,
    bio: null,
    avatar: null,
    email_confirmed: false,
    locked: false,
    created_at: new Date('2024-03-01'),
    updated_at: new Date('2024-03-01')
  },

  lockedUser: {
    id: 5,
    email: 'locked@example.com',
    name: 'Locked User',
    handle: 'locked',
    admin: false,
    bio: null,
    avatar: null,
    email_confirmed: true,
    locked: true,
    created_at: new Date('2024-03-01'),
    updated_at: new Date('2024-03-01')
  },

  // User list for pagination tests
  userList: [
    { id: 1, email: 'user1@example.com', name: 'User One', admin: false },
    { id: 2, email: 'user2@example.com', name: 'User Two', admin: false },
    { id: 3, email: 'user3@example.com', name: 'User Three', admin: false },
    { id: 4, email: 'user4@example.com', name: 'User Four', admin: false },
    { id: 5, email: 'user5@example.com', name: 'User Five', admin: true }
  ]
};
