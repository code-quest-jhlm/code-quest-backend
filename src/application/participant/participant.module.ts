import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Participant } from './entity/participant.entity'
import { ParticipantController } from './controller/participant.controller'
import { ParticipantService } from './service/participant.service'
import { ParticipantMapper } from './mapper/participant.mapper'
import { ParticipantRepository } from './repository/participant.repository'
import { DrawModule } from '../draw/draw.module'

@Module({
  imports: [TypeOrmModule.forFeature([Participant]), DrawModule],
  controllers: [ParticipantController],
  providers: [ParticipantService, ParticipantMapper, ParticipantRepository],
  exports: [ParticipantService],
})
export class ParticipantModule {}
