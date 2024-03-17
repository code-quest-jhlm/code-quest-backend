import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ParticipantDTO } from '../dto/participant.dto'
import { ParticipantService } from '../service/participant.service'

@Controller('/v1/participant')
export class ParticipantController {
  constructor(private participantService: ParticipantService) {}

  @Get()
  async getAllParticipantByDraw(
    @Param('idDraw') idDraw: string
  ): Promise<ParticipantDTO[]> {
    return await this.participantService.getAllParticipantByDraw(idDraw)
  }

  @Get(':id')
  async getParticipantById(@Param('id') id: string): Promise<ParticipantDTO> {
    return await this.participantService.getParticipantById(id)
  }

  @Post()
  async createParticipant(
    @Body() participant: ParticipantDTO
  ): Promise<ParticipantDTO> {
    return await this.participantService.registerParticipant(participant)
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.participantService.deleteParticipant(id)
  }
}
