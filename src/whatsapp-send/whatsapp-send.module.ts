import { Module } from '@nestjs/common';
import { WhatsappSendController } from './whatsapp-send.controller';
import { WhatsappSendService } from './whatsapp-send.service';

@Module({
  controllers: [WhatsappSendController],
  providers: [WhatsappSendService]
})
export class WhatsappSendModule {}
