import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { WinnerDTO } from '../dto/winner.dto'
import { WinnerService } from '../service/winner.service'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { Auth } from 'src/core/auth/decorators/auth.decorator'
import { Role } from 'src/common/constants'

//@Auth(Role.ADMIN)
@Controller('/v1/winner')
@ApiTags('Ganador')
export class WinnerController {
  constructor(private winnerService: WinnerService) {}

  @Get(':idDraw')
  @ApiOperation({ summary: 'Obtener ganadores por id de sorteo' })
  async getWinnerById(@Param('idDraw') idDraw: string): Promise<WinnerDTO[]> {
    return await this.winnerService.getAllWinnerByDrawId(idDraw)
  }

  @Post()
  @ApiOperation({ summary: 'Registrar un nuevo ganador' })
  async createWinner(@Body() winner: WinnerDTO): Promise<WinnerDTO> {
    return await this.winnerService.createWinner(winner)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un ganador por su id' })
  async deleteWinner(@Param('id') id: string): Promise<void> {
    return await this.winnerService.deleteWinner(id)
  }
}
