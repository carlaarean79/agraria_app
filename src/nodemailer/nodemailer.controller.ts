import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';

@Controller('nodemailer')
export class NodemailerController {
  constructor(private readonly nodemailerService: NodemailerService) {}

  @Post('send')
  async sendMail(@Body() body: any) {
    const { user_name, user_lastname, user_email, user_telephone, message } = body;
    const subject = `Nuevo Pedido de ${user_name} ${user_lastname}. Mensaje reenviado al número de whatsapp desde ${user_telephone}`;
    const text = message;
    const html = `<p>${message}</p>`;

    try {
      await this.nodemailerService.sendMail(user_email, subject, text, html);
      return { message: 'Correo enviado con éxito' };
    } catch (error) {
      console.error('Error al enviar correo:', error);
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Error al enviar correo',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


 
}
