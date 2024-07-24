import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NodemailerService {
  private transporter;

  constructor(private configService: ConfigService){
    this.transporter = nodemailer.createTransport({
      service: 'outlook',
      auth: {
        user: this.configService.get<string>('EMAIL'),
        pass: this.configService.get<string>('PASSWORD'),
      },
    });
  }
 async sendMail(to: string, subject: string, text:string, html: string) : Promise<void>{
    const mailOptions = {
      from: this.configService.get<string>('EMAIL'),
      to,
      subject,
      text,
      html
    };
    await this.transporter.sendMail(mailOptions)
    console.log(mailOptions)
  }
 

}
