const request = require('supertest');
const app = require('../../src/index');
const eventServices = require('../../src/modules/events/services');

// Mock services
jest.mock('../../src/modules/events/services');

describe('Events API Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/events/getEvents', () => {
    it('should return all events', async () => {
      const mockEvents = [
        { id: 1, title: 'Event 1' },
        { id: 2, title: 'Event 2' }
      ];
      eventServices.getEvents.mockResolvedValue(mockEvents);

      const res = await request(app)
        .get('/api/events/getEvents')
        .expect('Content-Type', /json/);

      expect(res.status).toBe(200);
      expect(res.body.result).toEqual(mockEvents);
      expect(eventServices.getEvents).toHaveBeenCalled();
    });
  });

  describe('GET /api/events/getEventById', () => {
    it('should return an event by ID', async () => {
      const mockEvent = { id: 1, title: 'Event 1' };
      eventServices.getEventById.mockResolvedValue(mockEvent);

      const res = await request(app)
        .get('/api/events/getEventById')
        .query({ eventId: 1 })
        .expect('Content-Type', /json/);

      expect(res.status).toBe(200);
      expect(res.body.result).toEqual(mockEvent);
      expect(eventServices.getEventById).toHaveBeenCalledWith(expect.objectContaining({ eventId: 1 }));
    });
  });

  describe('POST /api/events/createEvent', () => {
    it('should create an event', async () => {
      const mockResult = { id: 1, title: 'New Event' };
      eventServices.createEvent.mockResolvedValue(mockResult);

      const res = await request(app)
        .post('/api/events/createEvent')
        .send({ title: 'New Event' })
        .expect('Content-Type', /json/);

      expect(res.status).toBe(200);
      expect(res.body.result).toEqual(mockResult);
      expect(eventServices.createEvent).toHaveBeenCalledWith(expect.objectContaining({ title: 'New Event' }));
    });
  });

  describe('PUT /api/events/updateEvent/:id', () => {
    it('should update an event', async () => {
      const mockResult = { id: 1, title: 'Updated Event' };
      eventServices.updateEvent.mockResolvedValue(mockResult);

      const res = await request(app)
        .put('/api/events/updateEvent/1')
        .send({ title: 'Updated Event' })
        .expect('Content-Type', /json/);

      expect(res.status).toBe(200);
      expect(res.body.result).toEqual(mockResult);
      expect(eventServices.updateEvent).toHaveBeenCalled();
    });
  });

  describe('DELETE /api/events/deleteEvent/:id', () => {
    it('should delete an event', async () => {
      const mockResult = { success: true };
      eventServices.deleteEvent.mockResolvedValue(mockResult);

      const res = await request(app)
        .delete('/api/events/deleteEvent/1')
        .expect('Content-Type', /json/);

      expect(res.status).toBe(200);
      expect(res.body.result).toEqual(mockResult);
      expect(eventServices.deleteEvent).toHaveBeenCalled();
    });
  });
});
