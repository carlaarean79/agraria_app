import { Module } from '@nestjs/common';
import { WhatsappSendController } from './whatsapp-send.controller';
import { WhatsappSendService } from './whatsapp-send.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [WhatsappSendController],

})
export class WhatsappSendModule {}
