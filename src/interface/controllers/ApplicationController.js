const SequelizeApplicationRepository = require('../../infrastructure/repositories/SequelizeApplicationRepository');
const PdfLibService = require('../../infrastructure/pdf/PdfLibService');
const EmailService = require('../../infrastructure/email/EmailService');
const SubmitApplication = require('../../application/use-cases/SubmitApplication');

class ApplicationController {
  constructor() {
    this.applicationRepository = new SequelizeApplicationRepository();
    this.pdfService = new PdfLibService();
    this.emailService = new EmailService();
    this.submitApplication = new SubmitApplication(
      this.applicationRepository, 
      this.pdfService,
      this.emailService
    );
  }

  async create(req, res) {
    try {
      const result = await this.submitApplication.execute(req.body);
      return res.status(201).json(result);
    } catch (error) {
      console.error('Error in ApplicationController.create:', error);
      let errorMessage = error.message;
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        errorMessage = error.errors.map(e => e.message).join(', ');
      }
      return res.status(400).json({ error: errorMessage });
    }
  }

  async getPdf(req, res) {
    try {
      const { id } = req.params;
      const application = await this.applicationRepository.findById(id);
      
      if (!application || !application.pdfPath) {
        return res.status(404).json({ error: 'PDF not found' });
      }

      const path = require('path');
      const filePath = path.join(__dirname, '../../../uploads', application.pdfPath);
      
      return res.download(filePath, application.pdfPath);
    } catch (error) {
      console.error('Error in ApplicationController.getPdf:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new ApplicationController();
