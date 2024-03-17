import { Injectable } from '@nestjs/common'
import { Draw } from '../entity/draw.entity'
import { DrawCRUDDTO } from '../dto/draw.dto'
import { UserRepository } from 'src/application/user/repository/user.repository'

@Injectable()
export class DrawMapper {
  constructor(private userRepository: UserRepository) {}

  async dtoToEntity(drawDTO: DrawCRUDDTO): Promise<Draw> {
    const drawEntity = new Draw()
    drawEntity.id = drawDTO.id
    drawEntity.title = drawDTO.title
    drawEntity.description = drawDTO.description
    drawEntity.creationDate = drawDTO.creationDate
    drawEntity.drawDate = drawDTO.drawDate
    drawEntity.idServer = drawDTO.idServer
    drawEntity.id_user = await this.getUser(drawDTO.idUser)
    return drawEntity
  }

  entityToDto(drawEntity: Draw): DrawCRUDDTO {
    return new DrawCRUDDTO(
      drawEntity.id,
      drawEntity.title,
      drawEntity.description,
      drawEntity.creationDate,
      drawEntity.drawDate,
      drawEntity.state,
      drawEntity.id_user.id,
      drawEntity.idServer
    )
  }

  async getUser(id: string) {
    return await this.userRepository.getUserById(id)
  }
}
