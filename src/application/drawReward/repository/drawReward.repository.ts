import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, Equal } from 'typeorm'
import { DrawReward } from '../entity/drawReward.entity'

@Injectable()
export class DrawRewardRepository {
  constructor(
    @InjectRepository(DrawReward)
    private drawRewardRepository: Repository<DrawReward>
  ) {}

  async getAllByDrawId(idDraw: string): Promise<DrawReward[]> {
    return await this.drawRewardRepository.find({
      where: { id_draw: Equal(idDraw) },
    })
  }

  async createDraw(drawReward: DrawReward) {
    return await this.drawRewardRepository.save(drawReward)
  }

  async updateDraw(id: string, drawReward: DrawReward): Promise<DrawReward> {
    await this.drawRewardRepository.update(id, drawReward)
    return await this.drawRewardRepository.findOne({
      where: { id: Equal(id) },
    })
  }

  async deleteDraw(id: string): Promise<DeleteResult> {
    return this.drawRewardRepository.delete(id)
  }
}
