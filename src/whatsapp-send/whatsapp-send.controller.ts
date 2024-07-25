import { Controller, Get, HttpCode } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('whatsapp-send')
export class WhatsappSendController {
    constructor(private readonly configService: ConfigService) {
    }

    @Get('number')
    @HttpCode(200)
getPhoneNumber() {
       const phoneNumber =this.configService.get<string>('PHONE_NUMBER');
       return  {phoneNumber};
    }


}
