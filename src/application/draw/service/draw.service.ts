import { Injectable } from '@nestjs/common'
import { DrawCRUDDTO, DrawDTO } from '../dto/draw.dto'
import { DrawMapper } from '../mapper/draw.mapper'
import { DrawRepository } from '../repository/draw.repository'
import { Draw } from '../entity/draw.entity'
import { DrawRewardRepository } from 'src/application/drawReward/repository/drawReward.repository'
import { RewardRepository } from 'src/application/reward/repository/reward.repository'
import { RewardMapper } from 'src/application/reward/mapper/reward.mapper'

@Injectable()
export class DrawService {
  constructor(
    private drawRepository: DrawRepository,
    private drawRewardRepository: DrawRewardRepository,
    private rewardRepository: RewardRepository,
    private rewardMapper: RewardMapper,
    private mapper: DrawMapper
  ) {}

  async getAllDraw(): Promise<DrawDTO[]> {
    const draw: Draw[] = await this.drawRepository.getAllDraw()
    return draw.map(
      (drawE) => new DrawDTO(drawE.id, drawE.title, drawE.drawDate, drawE.state)
    )
  }

  async getAllDrawByUserId(idUser: string): Promise<DrawDTO[]> {
    const draw: Draw[] = await this.drawRepository.getAllDrawByUserId(idUser)
    return draw.map(
      (drawE) => new DrawDTO(drawE.id, drawE.title, drawE.drawDate, drawE.state)
    )
  }

  async getDrawById(id: string): Promise<DrawCRUDDTO> {
    try {
      const draw: Draw = await this.drawRepository.getDrawById(id)
      console.log()
      const res = this.mapper.entityToDto(draw)
      res.rewards = (
        await this.drawRewardRepository.getAllRewardsByDrawId(id)
      ).map((e) => this.rewardMapper.entityToDto(e))
      return res
    } catch (error) {
      console.log('The id cannot be null ', error)
    }
  }

  async createDraw(dto: DrawCRUDDTO) {
    dto.state = 'ACTIVO'
    const draw: Draw = await this.drawRepository.createDraw(
      await this.mapper.dtoToEntity(dto)
    )
    try {
      dto.rewards.forEach(async (reward) => {
        if (reward.id) {
          const rewardE = await this.rewardRepository.getRewardById(reward.id)
          if (rewardE) {
            this.drawRewardRepository.createDraw({
              id_draw: draw,
              id_reward: rewardE,
            })
          }
        } else {
          const newReward = await this.rewardRepository.createReward({
            name: reward.name,
          })
          if (newReward) {
            this.drawRewardRepository.createDraw({
              id_draw: draw,
              id_reward: newReward,
            })
          }
        }
      })
    } catch (error) {
      console.log(error)
    }
    return this.mapper.entityToDto(draw)
  }

  async updateDraw(dto: DrawCRUDDTO): Promise<DrawCRUDDTO> {
    const updateDraw = await this.drawRepository.updateDraw(
      await this.mapper.dtoToEntity(dto)
    )
    return this.mapper.entityToDto(updateDraw)
  }

  async deleteDraw(id: string): Promise<void> {
    await this.drawRepository.deleteDraw(id)
  }
}
