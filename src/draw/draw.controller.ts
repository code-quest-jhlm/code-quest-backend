import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DrawService } from './draw.service';
import { CreateDrawDto } from './dto/create-draw.dto';
import { UpdateDrawDto } from './dto/update-draw.dto';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@ApiTags('Draw')
@Controller('draw')
export class DrawController {
  constructor(private readonly drawService: DrawService) {}

  @Post()
  @Auth(ValidRoles.superUser, ValidRoles.admin)
  create(@Body() createDrawDto: CreateDrawDto) {
    return this.drawService.create(createDrawDto);
  }

  @Get()
  @Auth(ValidRoles.superUser, ValidRoles.admin)
  findAll() {
    return this.drawService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.drawService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.superUser, ValidRoles.admin)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDrawDto: UpdateDrawDto) {
    return this.drawService.update(id, updateDrawDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.superUser, ValidRoles.admin)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.drawService.remove(id);
  }
}
