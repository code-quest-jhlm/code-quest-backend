import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, Equal } from 'typeorm'
import { Draw } from '../entity/draw.entity'

@Injectable()
export class DrawRepository {
  constructor(
    @InjectRepository(Draw)
    private drawRepository: Repository<Draw>
  ) {}

  async getAllDraw(): Promise<Draw[]> {
    return this.drawRepository.find()
  }

  async getDrawById(id: string): Promise<Draw> {
    return this.drawRepository.findOne({
      where: { id: Equal(id) },
    })
  }

  async createDraw(draw: Draw) {
    return this.drawRepository.save(draw)
  }

  async updateDraw(draw: Draw): Promise<Draw> {
    await this.drawRepository.update(draw.id, draw)
    return this.drawRepository.findOne({
      where: { id: Equal(draw.id) },
    })
  }

  async deleteDraw(id: string): Promise<DeleteResult> {
    return this.drawRepository.delete(id)
  }
}
