import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, Equal, Raw } from 'typeorm'
import { Reward } from '../entity/reward.entity'

@Injectable()
export class RewardRepository {
  constructor(
    @InjectRepository(Reward)
    private rewardRepository: Repository<Reward>
  ) {}

  async getAllReward(filterName?: string): Promise<Reward[]> {
    const queryBuilder = this.rewardRepository.createQueryBuilder('reward')
    if (filterName) {
      queryBuilder.where('reward.name LIKE :filterName', {
        filterName: `%${filterName}%`,
      })
    }
    return await queryBuilder.getMany()
  }

  async getRewardById(id: string): Promise<Reward> {
    return this.rewardRepository.findOne({
      where: { id: Equal(id) },
    })
  }

  async createReward(reward: Reward) {
    return this.rewardRepository.save(reward)
  }

  async deleteReward(id: string): Promise<DeleteResult> {
    return this.rewardRepository.delete(id)
  }
}
