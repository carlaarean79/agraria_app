import { Controller, Get } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('serviceId')
  getServiceId() {
    return { serviceId: this.emailService.getServiceId() }; // Retorna un objeto JSON
  }

  @Get('templateId')
  getTemplateId() {
    return { templateId: this.emailService.getTemplateId() }; // Retorna un objeto JSON
  }

  @Get('userId')
  getUserId() {
    return { userId: this.emailService.getUserId() }; // Retorna un objeto JSON
  }
}
