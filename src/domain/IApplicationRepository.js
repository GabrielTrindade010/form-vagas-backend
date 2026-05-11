class IApplicationRepository {
  async save(application) {
    throw new Error('Method not implemented');
  }

  async findById(id) {
    throw new Error('Method not implemented');
  }

  async findAll() {
    throw new Error('Method not implemented');
  }

  async updatePdfPath(id, path) {
    throw new Error('Method not implemented');
  }
}

module.exports = IApplicationRepository;
