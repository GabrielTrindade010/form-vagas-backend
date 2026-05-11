const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const ApplicationModel = sequelize.define('Application', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nomeVaga: { type: DataTypes.STRING, allowNull: false },
  fullName: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false }, // Celular
  foneRes: { type: DataTypes.STRING, allowNull: true },
  foneRecado: { type: DataTypes.STRING, allowNull: true },
  falarCom: { type: DataTypes.STRING, allowNull: true },
  
  dataNascimento: { type: DataTypes.DATEONLY, allowNull: true },
  estadoNasceu: { type: DataTypes.STRING, allowNull: true },
  cidadeNasceu: { type: DataTypes.STRING, allowNull: true },
  estadoCivil: { type: DataTypes.STRING, allowNull: true },
  nomePai: { type: DataTypes.STRING, allowNull: true },
  nomeMae: { type: DataTypes.STRING, allowNull: true },
  
  endereco: { type: DataTypes.STRING, allowNull: true },
  numero: { type: DataTypes.STRING, allowNull: true },
  complemento: { type: DataTypes.STRING, allowNull: true },
  
  rgDataEmissao: { type: DataTypes.DATEONLY, allowNull: true },
  rgEstadoEmissor: { type: DataTypes.STRING, allowNull: true },
  cnhValidade: { type: DataTypes.DATEONLY, allowNull: true },
  cnhCategoria: { type: DataTypes.STRING, allowNull: true },
  
  cpf: { type: DataTypes.STRING, allowNull: true },
  raca: { type: DataTypes.STRING, allowNull: true },
  pis: { type: DataTypes.STRING, allowNull: true },
  
  trabalhouNaEmpresa: { type: DataTypes.BOOLEAN, defaultValue: false },
  parentesNaEmpresa: { type: DataTypes.BOOLEAN, defaultValue: false },
  portadorDeficiencia: { type: DataTypes.BOOLEAN, defaultValue: false },
  trabalhoTurnos: { type: DataTypes.BOOLEAN, defaultValue: false },
  trabalhoTemporario: { type: DataTypes.BOOLEAN, defaultValue: false },
  
  tamanhoCalca: { type: DataTypes.STRING, allowNull: true },
  tamanhoCamiseta: { type: DataTypes.STRING, allowNull: true },
  tamanhoSapato: { type: DataTypes.STRING, allowNull: true },
  
  escolaridade: { type: DataTypes.STRING, allowNull: true },
  outrosCursos: { type: DataTypes.STRING, allowNull: true },
  continuaEstudando: { type: DataTypes.BOOLEAN, defaultValue: false },

  cidade: { type: DataTypes.STRING, allowNull: true },
  cep: { type: DataTypes.STRING, allowNull: true },
  bairro: { type: DataTypes.STRING, allowNull: true },
  idade: { type: DataTypes.INTEGER, allowNull: true },
  email: { type: DataTypes.STRING, allowNull: true },
  rg: { type: DataTypes.STRING, allowNull: true },
  descreva: { type: DataTypes.TEXT, allowNull: true },
  cnh: { type: DataTypes.STRING, allowNull: true },
  curso: { type: DataTypes.STRING, allowNull: true },
  ano: { type: DataTypes.STRING, allowNull: true },

  pdfPath: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'applications',
  timestamps: true,
});

module.exports = ApplicationModel;
