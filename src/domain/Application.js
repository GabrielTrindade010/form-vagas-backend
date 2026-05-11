const crypto = require('crypto');

class Application {
  constructor(props, id = null) {
    this.id = id || crypto.randomUUID();
    this.nomeVaga = props.nomeVaga;
    this.fullName = props.fullName;
    this.phone = props.phone;
    this.foneRes = props.foneRes;
    this.foneRecado = props.foneRecado;
    this.falarCom = props.falarCom;
    
    this.dataNascimento = props.dataNascimento;
    this.estadoNasceu = props.estadoNasceu;
    this.cidadeNasceu = props.cidadeNasceu;
    this.estadoCivil = props.estadoCivil;
    this.nomePai = props.nomePai;
    this.nomeMae = props.nomeMae;
    
    this.endereco = props.endereco;
    this.numero = props.numero;
    this.complemento = props.complemento;
    
    this.rgDataEmissao = props.rgDataEmissao;
    this.rgEstadoEmissor = props.rgEstadoEmissor;
    this.cnhValidade = props.cnhValidade;
    this.cnhCategoria = props.cnhCategoria;
    
    this.cpf = props.cpf;
    this.raca = props.raca;
    this.pis = props.pis;
    
    this.trabalhouNaEmpresa = props.trabalhouNaEmpresa;
    this.parentesNaEmpresa = props.parentesNaEmpresa;
    this.portadorDeficiencia = props.portadorDeficiencia;
    this.trabalhoTurnos = props.trabalhoTurnos;
    this.trabalhoTemporario = props.trabalhoTemporario;
    
    this.tamanhoCalca = props.tamanhoCalca;
    this.tamanhoCamiseta = props.tamanhoCamiseta;
    this.tamanhoSapato = props.tamanhoSapato;
    
    this.escolaridade = props.escolaridade;
    this.outrosCursos = props.outrosCursos;
    this.continuaEstudando = props.continuaEstudando;

    this.cidade = props.cidade;
    this.cep = props.cep;
    this.bairro = props.bairro;
    this.idade = props.idade;
    this.email = props.email;
    this.rg = props.rg;
    this.descreva = props.descreva;
    this.cnh = props.cnh;
    this.curso = props.curso;
    this.ano = props.ano;

    this.pdfPath = props.pdfPath || null;
    this.createdAt = props.createdAt || new Date();
    
    this.validate();
  }

  validate() {
    if (!this.fullName || this.fullName.length < 3) {
      throw new Error('Full name is required and must be at least 3 characters long.');
    }
    if (!this.nomeVaga) {
      throw new Error('Nome da vaga é obrigatório.');
    }
  }
}

module.exports = Application;
