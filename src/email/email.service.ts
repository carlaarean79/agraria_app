import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(private configService: ConfigService) {}

  getServiceId(): string {
    return this.configService.get<string>('EMAILJS_SERVICE_ID');
  }

  getTemplateId(): string {
    return this.configService.get<string>('EMAILJS_TEMPLATE_ID');
  }

  getUserId(): string {
    return this.configService.get<string>('EMAILJS_USER_ID');
  }
}
