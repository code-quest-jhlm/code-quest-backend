import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, Equal } from 'typeorm'
import { Participant } from '../entity/participant.entity'

@Injectable()
export class ParticipantRepository {
  constructor(
    @InjectRepository(Participant)
    private participantRepository: Repository<Participant>
  ) {}

  async getAllParticipantByDraw(idDraw: string): Promise<Participant[]> {
    return this.participantRepository.find({
      where: { id_draw: Equal(idDraw) },
    })
  }

  async getParticipantById(id: string): Promise<Participant> {
    return this.participantRepository.findOne({ where: { id: id } })
  }

  async createParticipant(participant: Participant) {
    return this.participantRepository.save(participant)
  }

  async deleteParticipant(id: string): Promise<DeleteResult> {
    return this.participantRepository.delete(id)
  }
}
