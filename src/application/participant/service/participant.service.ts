import { Injectable } from '@nestjs/common'
import { ParticipantDTO } from '../dto/participant.dto'
import { ParticipantMapper } from '../mapper/participant.mapper'
import { ParticipantRepository } from '../repository/participant.repository'
import { Participant } from '../entity/participant.entity'

@Injectable()
export class ParticipantService {
  constructor(
    private participantRepository: ParticipantRepository,
    private mapper: ParticipantMapper
  ) {}

  async getAllParticipantByDraw(idDraw: string): Promise<ParticipantDTO[]> {
    const participant: Participant[] =
      await this.participantRepository.getAllParticipantByDraw(idDraw)
    return participant.map((participantE) =>
      this.mapper.entityToDto(participantE)
    )
  }

  async getParticipantById(id: string): Promise<ParticipantDTO> {
    try {
      const participant: Participant =
        await this.participantRepository.getParticipantById(id)
      return this.mapper.entityToDto(participant)
    } catch (error) {
      console.log('The id cannot be null ')
    }
  }

  async registerParticipant(dto: ParticipantDTO) {
    const list = await this.participantRepository.getAllParticipantByDraw(
      dto.idDraw
    )
    const exist = list.find((p) => dto.idDiscord == p.id_discord)
    let participant = null
    if (!exist) {
      participant = await this.participantRepository.createParticipant(
        await this.mapper.dtoToEntity(dto)
      )
    }
    return {
      finalizado: true,
      mensaje: 'Operacion Exitosa',
      datos: participant,
    }
  }

  async deleteParticipant(id: string): Promise<void> {
    await this.participantRepository.deleteParticipant(id)
  }
}
