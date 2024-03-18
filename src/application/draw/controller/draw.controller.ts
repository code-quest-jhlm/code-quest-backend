import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { DrawCRUDDTO } from '../dto/draw.dto'
import { DrawService } from '../service/draw.service'
import { DrawDTO } from '../dto/draw.dto'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { Auth } from 'src/core/auth/decorators/auth.decorator'
import { Role } from 'src/common/constants'

//@Auth(Role.ADMIN)
@Controller('/v1/draw')
@ApiTags('Sorteos')
export class DrawController {
  constructor(private drawService: DrawService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los sorteos' })
  async getAllDraw(): Promise<DrawDTO[]> {
    return await this.drawService.getAllDraw()
  }

  @Get('/user/:idUser')
  @ApiOperation({ summary: 'Obtener todos los sorteos por id de usuario' })
  async getAllDrawByUserId(
    @Param('idUser') idUser: string
  ): Promise<DrawDTO[]> {
    return await this.drawService.getAllDrawByUserId(idUser)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un sorteo por su id' })
  async getDrawById(@Param('id') id: string): Promise<DrawCRUDDTO> {
    return await this.drawService.getDrawById(id)
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo sorteo' })
  async createDraw(@Body() draw: DrawCRUDDTO): Promise<DrawCRUDDTO> {
    return await this.drawService.createDraw(draw)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un sorteo por su id' })
  async updateDraw(
    @Param('id') id: string,
    @Body() draw: DrawCRUDDTO
  ): Promise<DrawCRUDDTO> {
    return await this.drawService.updateDraw(draw)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un sorteo por su id' })
  async deleteDraw(@Param('id') id: string): Promise<void> {
    return await this.drawService.deleteDraw(id)
  }
}
