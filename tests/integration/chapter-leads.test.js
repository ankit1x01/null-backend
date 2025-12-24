const request = require('supertest');
const app = require('../../src/index');
const chapterLeadsServices = require('../../src/modules/chapter-leads/services');

// Mock the services
jest.mock('../../src/modules/chapter-leads/services');

describe('Chapter Leads API Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/chapter-leads/createChapterLead', () => {
    it('should create a new chapter lead successfully', async () => {
      const mockResult = { id: 1, name: 'John Doe', email: 'john@example.com' };
      chapterLeadsServices.createChapterLead.mockResolvedValue(mockResult);

      const res = await request(app)
        .post('/api/chapter-leads/createChapterLead')
        .send({ name: 'John Doe', email: 'john@example.com' })
        .expect('Content-Type', /json/);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('result');
      expect(res.body.result).toEqual(mockResult);
      expect(chapterLeadsServices.createChapterLead).toHaveBeenCalledWith(expect.objectContaining({
        name: 'John Doe', 
        email: 'john@example.com'
      }));
    });
  });

  describe('GET /api/chapter-leads/getChapterLeads', () => {
    it('should retrieve all chapter leads', async () => {
      const mockResult = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' }
      ];
      chapterLeadsServices.getChapterLeads.mockResolvedValue(mockResult);

      const res = await request(app)
        .get('/api/chapter-leads/getChapterLeads')
        .expect('Content-Type', /json/);

      expect(res.status).toBe(200);
      expect(res.body.result).toEqual(mockResult);
      expect(chapterLeadsServices.getChapterLeads).toHaveBeenCalled();
    });
  });

  describe('GET /api/chapter-leads/getChapterLeadById', () => {
    it('should retrieve a chapter lead by ID via query', async () => {
      const mockResult = { id: 1, name: 'John Doe' };
      chapterLeadsServices.getChapterLeadById.mockResolvedValue(mockResult);

      const res = await request(app)
        .get('/api/chapter-leads/getChapterLeadById')
        .query({ id: 1 })
        .expect('Content-Type', /json/);

      expect(res.status).toBe(200);
      expect(res.body.result).toEqual(mockResult);
      // Note: query parameters come as strings
      expect(chapterLeadsServices.getChapterLeadById).toHaveBeenCalledWith(expect.objectContaining({ id: '1' }));
    });
  });

  describe('PUT /api/chapter-leads/updateChapterLead/:id', () => {
    it('should update a chapter lead successfully', async () => {
      const mockResult = { id: 1, name: 'John Updated' };
      chapterLeadsServices.updateChapterLead.mockResolvedValue(mockResult);

      const res = await request(app)
        .put('/api/chapter-leads/updateChapterLead/1')
        .send({ name: 'John Updated' })
        .expect('Content-Type', /json/);

      expect(res.status).toBe(200);
      expect(res.body.result).toEqual(mockResult);
    });
  });

  describe('DELETE /api/chapter-leads/deleteChapterLead/:id', () => {
    it('should delete a chapter lead successfully', async () => {
      const mockResult = { success: true };
      chapterLeadsServices.deleteChapterLead.mockResolvedValue(mockResult);

      const res = await request(app)
        .delete('/api/chapter-leads/deleteChapterLead/1')
        .expect('Content-Type', /json/);

      expect(res.status).toBe(200);
      expect(res.body.result).toEqual(mockResult);
    });
  });
});
