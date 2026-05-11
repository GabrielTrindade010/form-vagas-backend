const request = require('supertest');
const app = require('../../app');
const sequelize = require('../../infrastructure/database');
const { setupAssociations } = require('../../infrastructure/database/associations');
const fs = require('fs');
const path = require('path');

// Mock PDF generation to avoid creating real files during tests
jest.mock('../../infrastructure/pdf/PdfKitService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      generate: jest.fn().mockResolvedValue('test_file.pdf')
    };
  });
});

beforeAll(async () => {
  setupAssociations();
  await sequelize.sync({ force: true }); // Use a clean database for testing
});

afterAll(async () => {
  await sequelize.close();
});

describe('POST /api/applications', () => {
  it('should create a new application successfully', async () => {
    const payload = {
      fullName: 'Integration Test User',
      email: 'integration@test.com',
      phone: '11999999999',
      professionalSummary: 'Summary of integration test',
      skills: 'Jest, Supertest',
      experiences: [
        {
          company: 'Test Co',
          position: 'Tester',
          startDate: '2022-01-01',
          endDate: '',
          description: 'Testing things'
        }
      ]
    };

    const response = await request(app)
      .post('/api/applications')
      .send(payload);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('pdfPath', 'test_file.pdf');
    expect(response.body.message).toBe('Application submitted successfully');
  });

  it('should return 400 for validation errors', async () => {
    const payload = {
      // missing fullName
      email: 'invalid-email',
      phone: '',
      professionalSummary: '',
      skills: 'Jest',
      experiences: []
    };

    const response = await request(app)
      .post('/api/applications')
      .send(payload);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(Array.isArray(response.body.errors)).toBeTruthy();
  });
});
