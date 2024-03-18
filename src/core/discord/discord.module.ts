import { Module } from '@nestjs/common'
import { DiscordController } from './discord.controller'
import { ParticipantModule } from 'src/application/participant/participant.module'

//import { DiscordService } from './discord.service';

@Module({
  controllers: [DiscordController],
  imports: [ParticipantModule],
  //providers: [DiscordService],
})
export class DiscordModule {}
