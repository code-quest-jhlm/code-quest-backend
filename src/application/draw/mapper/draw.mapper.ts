import { Injectable } from '@nestjs/common'
import { Draw } from '../entity/draw.entity'
import { DrawCRUDDTO } from '../dto/draw.dto'
import { UsersService } from '../../../core/user/service/user.service'
import { RewardMapper } from 'src/application/reward/mapper/reward.mapper'

@Injectable()
export class DrawMapper {
  constructor(
    private userService: UsersService,
    private rewardMapper: RewardMapper
  ) {}

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
      drawEntity.idServer
    )
  }

  async getUser(id: string) {
    return await this.userService.findOne(id)
  }
}
