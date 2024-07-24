import { Controller } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('whatsapp-send')
export class WhatsappSendController {
    constructor(private readonly configService: ConfigService){
            }

            getPhoneNumber():string{
                return this.configService.get<string>('NUM_TELEPHONE')
            }

           
}
