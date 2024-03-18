import { Injectable } from '@nestjs/common'
import { Reward } from '../entity/reward.entity'
import { RewardDTO } from '../dto/reward.dto'

@Injectable()
export class RewardMapper {
  dtoToEntity(rewardDTO: RewardDTO): Reward {
    const rewardEntity = new Reward()
    rewardEntity.id = rewardDTO.id
    rewardEntity.name = rewardDTO.name
    return rewardEntity
  }

  entityToDto(rewardEntity: Reward): RewardDTO {
    return new RewardDTO(rewardEntity.id, rewardEntity.name)
  }
}
