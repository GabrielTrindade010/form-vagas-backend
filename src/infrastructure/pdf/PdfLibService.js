const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const IPdfService = require('../../domain/IPdfService');

class PdfLibService extends IPdfService {
  async generate(application) {
    try {
      const templatePath = path.join(__dirname, '../../../template.pdf');
      if (!fs.existsSync(templatePath)) {
        throw new Error('Arquivo template.pdf não encontrado na raiz do projeto.');
      }

      const templateBytes = fs.readFileSync(templatePath);
      const pdfDoc = await PDFDocument.load(templateBytes);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();

      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontSize = 10;

      const drawText = (text, x, y) => {
        if (!text) return;
        firstPage.drawText(String(text), {
          x,
          y: height - y,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
        });
      };

      const drawBinaryCheckbox = (isChecked, xYes, xNo, y) => {
        // Marcamos X no Sim ou no Não
        const targetX = isChecked ? xYes : xNo;
        firstPage.drawText('X', {
          x: targetX + 2,
          y: height - y - 1,
          size: fontSize + 2,
          font,
          color: rgb(0, 0, 0),
        });
      };

      const drawCheckbox = (isChecked, x, y) => {
        if (isChecked) {
          firstPage.drawText('X', {
            x: x + 2,
            y: height - y - 1,
            size: fontSize + 2,
            font,
            color: rgb(0, 0, 0),
          });
        }
      };

      // Mapeamento REFINADO (Ajustar baseado no feedback visual)
      
      // Linha 1: Nome Completo
      drawText(application.fullName, 50, 138);
      
      // Linha 2: Nome da Vaga
      drawText(application.nomeVaga, 50, 175);
      
      // Linha 3: Endereço, Número, Bairro, Cidade, CEP
      drawText(application.endereco, 50, 213);
      drawText(application.numero, 435, 193);
      drawText(application.bairro, 270, 240);
      drawText(application.cidade, 45, 240);
      drawText(application.cep, 175, 240);
      
      // Linha 4: Complemento
      drawText(application.complemento, 480, 215);
      
      // Linha 5: Fones Recado e Falar Com
      drawText(application.foneRecado, 480, 228);
      drawText(application.falarCom, 480, 246);
      
      // Linha 6: Nascimento e Idade
      drawText(application.dataNascimento, 200, 283);
      drawText(application.idade, 45, 273);
      
      // Linha 7: Celular, Fone Res, Email
      drawText(application.phone, 350, 265);
      drawText(application.foneRes, 350, 285);
      drawText(application.email, 45, 348);
      
      // Linha 8: Origem
      drawText(application.estadoNasceu, 45, 311);
      drawText(application.cidadeNasceu, 311, 311);
      
      // Sim/Não para Empresa/Família/Deficiência
      drawBinaryCheckbox(application.trabalhouNaEmpresa, 323, 370, 356);
      drawBinaryCheckbox(application.parentesNaEmpresa, 468, 515, 356);
      drawBinaryCheckbox(application.portadorDeficiencia, 156, 198, 374);
      drawText(application.descreva, 311, 385);

      // Filiação e CPF/Raça/PIS
      drawText(application.nomePai, 45, 423);
      drawText(application.nomeMae, 45, 465);
      
      drawText(application.cpf, 45, 535);
      drawText(application.raca, 175, 535);
      drawText(application.pis, 313, 535);
      
      drawText(application.rg, 175, 500);
      drawText(application.estadoCivil, 45, 500);
      drawText(application.rgDataEmissao, 313, 500);
      drawText(application.rgEstadoEmissor, 444, 500);
      
      drawText(application.cnh, 45, 567);
      drawText(application.cnhValidade, 313, 567);
      drawText(application.cnhCategoria, 449, 567);
      
      // Turnos e Prazo
      drawBinaryCheckbox(application.trabalhoTurnos, 82, 138, 609);
      drawBinaryCheckbox(application.trabalhoTemporario, 207, 253, 609);

      // Uniformes
      drawText(application.tamanhoCalca, 335, 610);
      drawText(application.tamanhoCamiseta, 425, 610);
      drawText(application.tamanhoSapato, 505, 610);

      // Escolaridade
      if (application.escolaridade) {
        if (application.escolaridade.includes('Fundamental')) {
          if (application.escolaridade.includes('Completo')) drawCheckbox(true, 140, 646);
          else drawCheckbox(true, 196, 646);
        } else if (application.escolaridade.includes('Médio')) {
          if (application.escolaridade.includes('Completo')) drawCheckbox(true, 140, 664);
          else drawCheckbox(true, 196, 664);
        } else if (application.escolaridade.includes('Superior')) {
          if (application.escolaridade.includes('Completo')) drawCheckbox(true, 140, 682);
          else drawCheckbox(true, 196, 682);
        }
      }
      
      drawText(application.curso, 345, 710);
      drawText(application.ano, 345, 730);
      drawText(application.outrosCursos, 355, 635);
      drawBinaryCheckbox(application.continuaEstudando, 133, 175, 720);

      const pdfBytes = await pdfDoc.save();
      
      const fileName = `application_${application.id}.pdf`;
      const uploadsDir = path.join(__dirname, '../../../uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);
      }
      
      const filePath = path.join(uploadsDir, fileName);
      fs.writeFileSync(filePath, pdfBytes);
      
      return fileName;
    } catch (error) {
      console.error('PdfLibService Error:', error);
      throw error;
    }
  }
}

module.exports = PdfLibService;
