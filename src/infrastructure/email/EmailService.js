const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendApplicationEmail(application, pdfFileName) {
    const pdfPath = path.join(__dirname, '../../../uploads', pdfFileName);
    
    if (!fs.existsSync(pdfPath)) {
      throw new Error('Arquivo PDF não encontrado para envio por e-mail.');
    }

    const mailOptions = {
      from: `"Solicitação de Trabalho " <${process.env.SMTP_USER}>`,
      to: 'sidnei.trindade@formeld.com',
      subject: `Nova Candidatura: ${application.nomeVaga} - ${application.fullName}`,
      text: `Olá,\n\nUma nova candidatura foi recebida.\n\nCandidato: ${application.fullName}\nVaga: ${application.nomeVaga}\nE-mail: ${application.email || 'Não informado'}\nTelefone: ${application.phone}\n\nO formulário completo está em anexo.`,
      attachments: [
        {
          filename: `Candidatura_${application.fullName.replace(/\s+/g, '_')}.pdf`,
          path: pdfPath,
        },
      ],
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email enviado: %s', info.messageId);
      return info;
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      throw error;
    }
  }
}

module.exports = EmailService;
