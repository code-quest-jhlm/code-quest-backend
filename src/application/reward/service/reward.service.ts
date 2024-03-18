import { Injectable } from '@nestjs/common'
import { RewardDTO } from '../dto/reward.dto'
import { RewardMapper } from '../mapper/reward.mapper'
import { RewardRepository } from '../repository/reward.repository'
import { Reward } from '../entity/reward.entity'

@Injectable()
export class RewardService {
  constructor(
    private rewardRepository: RewardRepository,
    private mapper: RewardMapper
  ) {}

  async getAllReward(name?: string): Promise<RewardDTO[]> {
    let reward: Reward[]
    if (name && name.length > 0) {
      reward = await this.rewardRepository.getAllReward(name)
    } else {
      reward = await this.rewardRepository.getAll()
    }
    return reward.map((rewardE) => new RewardDTO(rewardE.id, rewardE.name))
  }

  async createReward(dto: RewardDTO) {
    const reward: Reward = await this.rewardRepository.createReward(
      this.mapper.dtoToEntity(dto)
    )
    return this.mapper.entityToDto(reward)
  }

  async deleteReward(id: string): Promise<void> {
    await this.rewardRepository.deleteReward(id)
  }
}
