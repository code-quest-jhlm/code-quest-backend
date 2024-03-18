import { Injectable } from '@nestjs/common';
import { CreateDrawDto } from './dto/create-draw.dto';
import { UpdateDrawDto } from './dto/update-draw.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Draw } from './entities/draw.entity';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class DrawService {
  constructor(
    @InjectRepository(Draw)
    private readonly drawRepository: Repository<Draw>,
  ) {}
  async create(createDrawDto: CreateDrawDto) {
    const draw = this.drawRepository.create(createDrawDto)
    await this.drawRepository.save(draw)
    return draw;
  }

  async findAll() {
    const draws = await this.drawRepository.find({
      relations: ['participants']
    })
    return draws;
  }

  async findOne(id: string) {
    const draw = await this.drawRepository.findOneOrFail({
      where: { id }
    })
    return draw;
  }

  async update(id: string, updateDrawDto: UpdateDrawDto) {
    await this.drawRepository.update(id, updateDrawDto)
    return await this.drawRepository.findOne({
      where: { id: Equal(id) },
    })
  }

  async remove(id: string) {
    const draw = await this.findOne(id);
    await this.drawRepository.remove(draw);
    return `This action removes a #${id} draw`;
  }
}
