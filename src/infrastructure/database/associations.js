const ApplicationModel = require('./models/ApplicationModel');
const ExperienceModel = require('./models/ExperienceModel');

function setupAssociations() {
  ApplicationModel.hasMany(ExperienceModel, { as: 'experiences', foreignKey: 'applicationId' });
  ExperienceModel.belongsTo(ApplicationModel, { foreignKey: 'applicationId' });
}

module.exports = { setupAssociations };
