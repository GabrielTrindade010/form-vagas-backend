const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const IPdfService = require('../../domain/IPdfService');

class PdfKitService extends IPdfService {
  async generate(application) {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50 });
        const fileName = `application_${application.id}.pdf`;
        const uploadsDir = path.join(__dirname, '../../../uploads');
        
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir);
        }

        const filePath = path.join(uploadsDir, fileName);
        const stream = fs.createWriteStream(filePath);

        doc.pipe(stream);

        // Header
        doc.fillColor('#000000').fontSize(16).text('SOLICITAÇÃO DE TRABALHO', { align: 'center', underline: true, bold: true });
        doc.moveDown(2);

        // Define helper for rows
        const field = (label, value) => {
          doc.fontSize(10).font('Helvetica-Bold').text(`${label}: `, { continued: true })
             .font('Helvetica').text(value || '___________________________');
          doc.moveDown(0.5);
        };

        const checkbox = (label, isChecked) => {
          doc.fontSize(10).font('Helvetica').text(`[ ${isChecked ? 'X' : '  '} ] ${label}`);
          doc.moveDown(0.2);
        };

        field('NOME COMPLETO (SEM ABREVIAÇÃO)', application.fullName);
        field('NOME DA VAGA', application.nomeVaga);
        
        doc.moveDown();
        field('ENDEREÇO', application.endereco);
        field('Nº', application.numero);
        field('COMPLEMENTO', application.complemento);
        
        doc.moveDown();
        field('FONE CEL.', application.phone);
        field('FONE RES.', application.foneRes);
        field('FONE RECADO', application.foneRecado);
        field('FALAR COM', application.falarCom);
        
        doc.moveDown();
        field('DATA DE NASCIMENTO', application.dataNascimento);
        field('ESTADO ONDE NASCEU', application.estadoNasceu);
        field('CIDADE ONDE NASCEU', application.cidadeNasceu);
        
        doc.moveDown();
        checkbox('Trabalhou na empresa', application.trabalhouNaEmpresa);
        checkbox('Possui familiares que trabalham na empresa', application.parentesNaEmpresa);
        checkbox('Portador de deficiência', application.portadorDeficiencia);
        
        doc.moveDown();
        field('NOME DO PAI (SEM ABREVIAÇÃO)', application.nomePai);
        field('NOME DA MÃE (SEM ABREVIAÇÃO)', application.nomeMae);
        field('ESTADO CIVIL', application.estadoCivil);
        
        doc.moveDown();
        field('DATA EMISSÃO RG', application.rgDataEmissao);
        field('ESTADO EMISSOR', application.rgEstadoEmissor);
        field('DATA DE VALIDADE CNH', application.cnhValidade);
        field('CATEGORIA CNH', application.cnhCategoria);
        
        doc.moveDown();
        checkbox('Concorda trabalhar em turnos de revezamento', application.trabalhoTurnos);
        checkbox('Aceita serviço por prazo determinado', application.trabalhoTemporario);
        
        doc.moveDown();
        doc.fontSize(12).font('Helvetica-Bold').text('UNIFORMES', { underline: true });
        doc.moveDown(0.5);
        field('Calça', application.tamanhoCalca);
        field('Camiseta', application.tamanhoCamiseta);
        field('Sapato', application.tamanhoSapato);
        
        doc.moveDown();
        doc.fontSize(12).font('Helvetica-Bold').text('ESCOLARIDADE', { underline: true });
        doc.moveDown(0.5);
        field('Nível', application.escolaridade);
        field('Outros cursos', application.outrosCursos);
        checkbox('Continua estudando', application.continuaEstudando);

        doc.end();

        stream.on('finish', () => resolve(fileName));
        stream.on('error', (err) => reject(err));
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = PdfKitService;
