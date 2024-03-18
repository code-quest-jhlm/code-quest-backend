import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  @Auth(ValidRoles.superUser, ValidRoles.admin)
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantsService.create(createParticipantDto);
  }

  @Get()
  @Auth(ValidRoles.superUser, ValidRoles.admin)
  findAll() {
    return this.participantsService.findAll();
  }

  @Get('draw/:id')
  @Auth(ValidRoles.superUser, ValidRoles.admin)
  findByDraw(@Param('id') id: string) {
    return this.participantsService.findByDraw(id);
  }

  @Get(':id')
  @Auth(ValidRoles.superUser, ValidRoles.admin)
  findOne(@Param('id') id: string) {
    return this.participantsService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.superUser, ValidRoles.admin)
  update(@Param('id') id: string, @Body() updateParticipantDto: UpdateParticipantDto) {
    return this.participantsService.update(id, updateParticipantDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.superUser, ValidRoles.admin)
  remove(@Param('id') id: string) {
    return this.participantsService.remove(id);
  }
}
