import { Injectable } from '@nestjs/common'
import { Participant } from '../entity/participant.entity'
import { ParticipantDTO } from '../dto/participant.dto'
import { DrawRepository } from 'src/application/draw/repository/draw.repository'

@Injectable()
export class ParticipantMapper {
  constructor(private drawRepository: DrawRepository) {}

  async dtoToEntity(participantDTO: ParticipantDTO): Promise<Participant> {
    const participantEntity = new Participant()
    participantEntity.id = participantDTO.id
    participantEntity.full_name = participantDTO.fullName
    participantEntity.id_discord = participantDTO.idDiscord
    participantEntity.id_draw = await this.getDraw(participantDTO.idDraw)
    return participantEntity
  }

  entityToDto(participantEntity: Participant): ParticipantDTO {
    return new ParticipantDTO(
      participantEntity.id,
      participantEntity.full_name,
      participantEntity.id_discord,
      participantEntity.id_draw.id
    )
  }

  async getDraw(id: string) {
    return await this.drawRepository.getDrawById(id)
  }
}
