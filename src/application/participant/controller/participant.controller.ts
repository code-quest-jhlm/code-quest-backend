import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { ParticipantDTO } from '../dto/participant.dto'
import { ParticipantService } from '../service/participant.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller('/v1/participant')
@ApiTags('Partipantes')
export class ParticipantController {
  constructor(private participantService: ParticipantService) {}

  @Get('/draw/:idDraw')
  @ApiOperation({ summary: 'Obtener todos los participantes de un sorteo' })
  async getAllParticipantByDraw(
    @Param('idDraw') idDraw: string
  ): Promise<ParticipantDTO[]> {
    return await this.participantService.getAllParticipantByDraw(idDraw)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener participante por id' })
  async getParticipantById(@Param('id') id: string): Promise<ParticipantDTO> {
    return await this.participantService.getParticipantById(id)
  }

  @Post()
  @ApiOperation({ summary: 'Registrar participante en el sorteo' })
  async registerParticipant(@Body() participant: ParticipantDTO) {
    return await this.participantService.registerParticipant(participant)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar a participante del sorteo' })
  async deleteParticipant(@Param('id') id: string): Promise<void> {
    return await this.participantService.deleteParticipant(id)
  }
}
