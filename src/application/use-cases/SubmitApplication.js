const Application = require('../../domain/Application');

class SubmitApplication {
  constructor(applicationRepository, pdfService, emailService) {
    this.applicationRepository = applicationRepository;
    this.pdfService = pdfService;
    this.emailService = emailService;
  }

  async execute(data) {
    // 1. Create Domain Entity (Validation happens here)
    const application = new Application({
      nomeVaga: data.nomeVaga,
      fullName: data.fullName,
      phone: data.phone,
      foneRes: data.foneRes,
      foneRecado: data.foneRecado,
      falarCom: data.falarCom,
      dataNascimento: data.dataNascimento,
      estadoNasceu: data.estadoNasceu,
      cidadeNasceu: data.cidadeNasceu,
      estadoCivil: data.estadoCivil,
      nomePai: data.nomePai,
      nomeMae: data.nomeMae,
      endereco: data.endereco,
      numero: data.numero,
      complemento: data.complemento,
      rgDataEmissao: data.rgDataEmissao,
      rgEstadoEmissor: data.rgEstadoEmissor,
      cnhValidade: data.cnhValidade,
      cnhCategoria: data.cnhCategoria,
      cpf: data.cpf,
      raca: data.raca,
      pis: data.pis,
      trabalhouNaEmpresa: data.trabalhouNaEmpresa,
      parentesNaEmpresa: data.parentesNaEmpresa,
      portadorDeficiencia: data.portadorDeficiencia,
      trabalhoTurnos: data.trabalhoTurnos,
      trabalhoTemporario: data.trabalhoTemporario,
      tamanhoCalca: data.tamanhoCalca,
      tamanhoCamiseta: data.tamanhoCamiseta,
      tamanhoSapato: data.tamanhoSapato,
      escolaridade: data.escolaridade,
      outrosCursos: data.outrosCursos,
      continuaEstudando: data.continuaEstudando,
      cidade: data.cidade,
      cep: data.cep,
      bairro: data.bairro,
      idade: data.idade,
      email: data.email,
      rg: data.rg,
      descreva: data.descreva,
      cnh: data.cnh,
      curso: data.curso,
      ano: data.ano,
    });

    // 2. Save to Database
    await this.applicationRepository.save(application);

    // 3. Generate PDF
    const pdfPath = await this.pdfService.generate(application);

    // 4. Update Application with PDF path
    await this.applicationRepository.updatePdfPath(application.id, pdfPath);

    // 5. Send Email with PDF attachment
    try {
      await this.emailService.sendApplicationEmail(application, pdfPath);
    } catch (emailError) {
      console.error('Falha ao enviar e-mail, mas candidatura foi salva:', emailError);
      // Não travamos o retorno para o usuário se apenas o email falhar
    }

    return {
      id: application.id,
      pdfPath: pdfPath,
      message: 'Application submitted successfully',
    };
  }
}

module.exports = SubmitApplication;
