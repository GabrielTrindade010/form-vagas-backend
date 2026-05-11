const IApplicationRepository = require('../../domain/IApplicationRepository');
const ApplicationModel = require('../database/models/ApplicationModel');
const Application = require('../../domain/Application');

class SequelizeApplicationRepository extends IApplicationRepository {
  async save(application) {
    try {
      const createdApplication = await ApplicationModel.create({
        id: application.id,
        nomeVaga: application.nomeVaga,
        fullName: application.fullName,
        phone: application.phone,
        foneRes: application.foneRes,
        foneRecado: application.foneRecado,
        falarCom: application.falarCom,
        dataNascimento: application.dataNascimento || null,
        estadoNasceu: application.estadoNasceu,
        cidadeNasceu: application.cidadeNasceu,
        estadoCivil: application.estadoCivil,
        nomePai: application.nomePai,
        nomeMae: application.nomeMae,
        endereco: application.endereco,
        numero: application.numero,
        complemento: application.complemento,
        rgDataEmissao: application.rgDataEmissao || null,
        rgEstadoEmissor: application.rgEstadoEmissor,
        cnhValidade: application.cnhValidade || null,
        cnhCategoria: application.cnhCategoria,
        cpf: application.cpf,
        raca: application.raca,
        pis: application.pis,
        trabalhouNaEmpresa: application.trabalhouNaEmpresa,
        parentesNaEmpresa: application.parentesNaEmpresa,
        portadorDeficiencia: application.portadorDeficiencia,
        trabalhoTurnos: application.trabalhoTurnos,
        trabalhoTemporario: application.trabalhoTemporario,
        tamanhoCalca: application.tamanhoCalca,
        tamanhoCamiseta: application.tamanhoCamiseta,
        tamanhoSapato: application.tamanhoSapato,
        escolaridade: application.escolaridade,
        outrosCursos: application.outrosCursos,
        continuaEstudando: application.continuaEstudando,
        cidade: application.cidade,
        cep: application.cep,
        bairro: application.bairro,
        idade: application.idade,
        email: application.email,
        rg: application.rg,
        descreva: application.descreva,
        cnh: application.cnh,
        curso: application.curso,
        ano: application.ano,
        pdfPath: application.pdfPath,
      });

      return application;
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    const app = await ApplicationModel.findByPk(id);
    if (!app) return null;
    
    return new Application({
      nomeVaga: app.nomeVaga,
      fullName: app.fullName,
      phone: app.phone,
      foneRes: app.foneRes,
      foneRecado: app.foneRecado,
      falarCom: app.falarCom,
      dataNascimento: app.dataNascimento,
      estadoNasceu: app.estadoNasceu,
      cidadeNasceu: app.cidadeNasceu,
      estadoCivil: app.estadoCivil,
      nomePai: app.nomePai,
      nomeMae: app.nomeMae,
      endereco: app.endereco,
      numero: app.numero,
      complemento: app.complemento,
      rgDataEmissao: app.rgDataEmissao,
      rgEstadoEmissor: app.rgEstadoEmissor,
      cnhValidade: app.cnhValidade,
      cnhCategoria: app.cnhCategoria,
      cpf: app.cpf,
      raca: app.raca,
      pis: app.pis,
      trabalhouNaEmpresa: app.trabalhouNaEmpresa,
      parentesNaEmpresa: app.parentesNaEmpresa,
      portadorDeficiencia: app.portadorDeficiencia,
      trabalhoTurnos: app.trabalhoTurnos,
      trabalhoTemporario: app.trabalhoTemporario,
      tamanhoCalca: app.tamanhoCalca,
      tamanhoCamiseta: app.tamanhoCamiseta,
      tamanhoSapato: app.tamanhoSapato,
      escolaridade: app.escolaridade,
      outrosCursos: app.outrosCursos,
      continuaEstudando: app.continuaEstudando,
      cidade: app.cidade,
      cep: app.cep,
      bairro: app.bairro,
      idade: app.idade,
      email: app.email,
      rg: app.rg,
      descreva: app.descreva,
      cnh: app.cnh,
      curso: app.curso,
      ano: app.ano,
      pdfPath: app.pdfPath,
      createdAt: app.createdAt,
    }, app.id);
  }

  async updatePdfPath(id, path) {
    await ApplicationModel.update({ pdfPath: path }, { where: { id } });
  }
}

module.exports = SequelizeApplicationRepository;

module.exports = SequelizeApplicationRepository;
