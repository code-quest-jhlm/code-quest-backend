import { Injectable } from '@nestjs/common'
import { DrawCRUDDTO, DrawDTO } from '../dto/draw.dto'
import { DrawMapper } from '../mapper/draw.mapper'
import { DrawRepository } from '../repository/draw.repository'
import { Draw } from '../entity/draw.entity'

@Injectable()
export class DrawService {
  constructor(
    private drawRepository: DrawRepository,
    private mapper: DrawMapper
  ) {}

  async getAllDraw(): Promise<DrawDTO[]> {
    const draw: Draw[] = await this.drawRepository.getAllDraw()
    return draw.map(
      (drawE) => new DrawDTO(drawE.id, drawE.title, drawE.drawDate, drawE.state)
    )
  }

  async getDrawById(id: string): Promise<DrawCRUDDTO> {
    try {
      const draw: Draw = await this.drawRepository.getDrawById(id)
      return this.mapper.entityToDto(draw)
    } catch (error) {
      console.log('The id cannot be null ')
    }
  }

  async createDraw(dto: DrawCRUDDTO) {
    const draw: Draw = await this.drawRepository.createDraw(
      await this.mapper.dtoToEntity(dto)
    )
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
