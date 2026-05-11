const SubmitApplication = require('./SubmitApplication');
const Application = require('../../domain/Application');

describe('SubmitApplication Use Case', () => {
  let mockApplicationRepository;
  let mockPdfService;
  let submitApplication;

  beforeEach(() => {
    mockApplicationRepository = {
      save: jest.fn().mockResolvedValue(),
      updatePdfPath: jest.fn().mockResolvedValue(),
    };

    mockPdfService = {
      generate: jest.fn().mockResolvedValue('fake_path.pdf'),
    };

    submitApplication = new SubmitApplication(mockApplicationRepository, mockPdfService);
  });

  it('should successfully submit an application and generate a PDF', async () => {
    const inputData = {
      fullName: 'Test User',
      email: 'test@example.com',
      phone: '11999999999',
      professionalSummary: 'Summary here',
      skills: 'React, Node',
      experiences: [],
    };

    const result = await submitApplication.execute(inputData);

    expect(mockApplicationRepository.save).toHaveBeenCalledTimes(1);
    expect(mockApplicationRepository.save.mock.calls[0][0]).toBeInstanceOf(Application);
    expect(mockApplicationRepository.save.mock.calls[0][0].fullName).toBe('Test User');
    
    expect(mockPdfService.generate).toHaveBeenCalledTimes(1);
    expect(mockApplicationRepository.updatePdfPath).toHaveBeenCalledTimes(1);
    expect(mockApplicationRepository.updatePdfPath).toHaveBeenCalledWith(expect.any(String), 'fake_path.pdf');

    expect(result).toHaveProperty('id');
    expect(result.pdfPath).toBe('fake_path.pdf');
    expect(result.message).toBe('Application submitted successfully');
  });

  it('should fail if domain validation fails', async () => {
    const invalidInputData = {
      // Missing fullName and email
      phone: '11999999999',
    };

    await expect(submitApplication.execute(invalidInputData)).rejects.toThrow();
    expect(mockApplicationRepository.save).not.toHaveBeenCalled();
    expect(mockPdfService.generate).not.toHaveBeenCalled();
  });
});
