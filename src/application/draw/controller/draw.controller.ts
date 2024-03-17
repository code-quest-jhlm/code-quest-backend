import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { DrawCRUDDTO } from '../dto/draw.dto'
import { DrawService } from '../service/draw.service'
import { DrawDTO } from '../dto/draw.dto'

@Controller('/v1/draw')
export class DrawController {
  constructor(private drawService: DrawService) {}

  @Get()
  async getAllDraw(): Promise<DrawDTO[]> {
    return await this.drawService.getAllDraw()
  }

  @Get(':id')
  async getDrawById(@Param('id') id: string): Promise<DrawCRUDDTO> {
    return await this.drawService.getDrawById(id)
  }

  @Post()
  async createDraw(@Body() draw: DrawCRUDDTO): Promise<DrawCRUDDTO> {
    return await this.drawService.createDraw(draw)
  }

  @Put(':id')
  async updateDraw(
    @Param('id') id: string,
    @Body() draw: DrawCRUDDTO
  ): Promise<DrawCRUDDTO> {
    return await this.drawService.updateDraw(draw)
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.drawService.deleteDraw(id)
  }
}
