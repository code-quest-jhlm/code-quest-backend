import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Participant } from './entities/participant.entity';
import { DrawService } from '../draw/draw.service';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,
    private readonly drawService: DrawService,
  ) {}
  async create(createParticipantDto: CreateParticipantDto) {
    const { avatar, discordId, drawId, name } = createParticipantDto
    const draw = await this.findByDraw(drawId)
    const found = draw.participants.find((p) => p.discordId === discordId)
    if (found) {
      return {
        isEnrolled: true
      }
    }
    const participant = this.participantRepository.create({
      avatar,
      discordId,
      name,
      draw
    })
    await this.participantRepository.save(participant);
    return {
      isEnrolled: false
    }
  }

  async findByDraw(drawId: string) {
    return this.drawService.findOne(drawId)
  }

  findAll() {
    return this.participantRepository.find();
  }

  findOne(id: string) {
    return this.participantRepository.findOne({
      where: {
        id
      }
    });
  }

  update(id: string, updateParticipantDto: UpdateParticipantDto) {
    return `This action updates a #${id} participant`;
  }

  remove(id: string) {
    return `This action removes a #${id} participant`;
  }
}
