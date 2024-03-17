import { Injectable } from '@nestjs/common'
import { Draw } from '../entity/draw.entity'
import { DrawCRUDDTO } from '../dto/draw.dto'
import { UserRepository } from '../../../core/user/repository/user.repository'
import { UsersService } from 'src/core/user/service/user.service'
import { RewardMapper } from 'src/application/reward/mapper/reward.mapper'

@Injectable()
export class DrawMapper {
  constructor(
    private userService: UsersService,
    private rewardMapper: RewardMapper,
    private userRepository: UserRepository
  ) {}

  async dtoToEntity(drawDTO: DrawCRUDDTO): Promise<Draw> {
    const drawEntity = new Draw()
    drawEntity.id = drawDTO.id
    drawEntity.title = drawDTO.title
    drawEntity.description = drawDTO.description
    drawEntity.creationDate = drawDTO.creationDate || new Date()
    drawEntity.drawDate = drawDTO.drawDate || new Date()
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
      drawEntity.id_user.id
    )
  }

  async getUser(id: string) {
    return await this.userRepository.getUserById(id)
  }
}
