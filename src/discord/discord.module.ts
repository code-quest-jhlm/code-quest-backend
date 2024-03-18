import { Module } from '@nestjs/common';
import { DiscordController } from './discord.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ParticipantsModule } from '../participants/participants.module';

@Module({
  imports: [ConfigModule, HttpModule, ParticipantsModule],
  controllers: [DiscordController]
})
export class DiscordModule {}
