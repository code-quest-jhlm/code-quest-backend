import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, Equal } from 'typeorm'
import { Winner } from '../entity/winner.entity'

@Injectable()
export class WinnerRepository {
  constructor(
    @InjectRepository(Winner)
    private winnerRepository: Repository<Winner>
  ) {}

  async getAllWinnerByDrawId(idDraw: string): Promise<Winner[]> {
    return await this.winnerRepository.find({
      where: { id_draw: Equal(idDraw) },
      loadRelationIds: true,
    })
  }

  async createWinner(winner: Winner) {
    return await this.winnerRepository.save(winner)
  }

  async deleteWinner(id: string): Promise<DeleteResult> {
    return await this.winnerRepository.delete(id)
  }
}
