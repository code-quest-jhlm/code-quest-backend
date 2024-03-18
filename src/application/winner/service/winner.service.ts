import { Injectable } from '@nestjs/common'
import { WinnerDTO } from '../dto/winner.dto'
import { WinnerRepository } from '../repository/winner.repository'
import { Winner } from '../entity/winner.entity'
import { DrawRepository } from 'src/application/draw/repository/draw.repository'
import { RewardRepository } from 'src/application/reward/repository/reward.repository'

@Injectable()
export class WinnerService {
  constructor(
    private winnerRepository: WinnerRepository,
    private drawRepository: DrawRepository,
    private rewardRepository: RewardRepository
  ) {}

  async getAllWinnerByDrawId(idDraw: string): Promise<WinnerDTO[]> {
    return (await this.winnerRepository.getAllWinnerByDrawId(idDraw)).map(
      (winnerE) =>
        new WinnerDTO(
          winnerE.id,
          winnerE.id_discord,
          idDraw,
          winnerE.id_reward as unknown as string
        )
    )
  }

  async createWinner(dto: WinnerDTO) {
    const winnerE = new Winner()
    winnerE.id_discord = dto.idDiscord
    winnerE.id_draw = await this.drawRepository.getDrawById(dto.idDraw)
    winnerE.id_reward = await this.rewardRepository.getRewardById(dto.idReward)
    const winner: Winner = await this.winnerRepository.createWinner(winnerE)
    return new WinnerDTO(
      winner.id,
      winner.id_discord,
      winner.id_draw.id,
      winner.id_reward.id
    )
  }

  async deleteWinner(id: string): Promise<void> {
    await this.winnerRepository.deleteWinner(id)
  }
}
