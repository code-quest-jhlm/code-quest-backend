import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Winner } from './entity/winner.entity'
import { WinnerDTO } from './dto/winner.dto'
import { WinnerService } from './service/winner.service'
import { WinnerRepository } from './repository/winner.repository'
import { WinnerController } from './controller/winner.controller'
import { DrawModule } from '../draw/draw.module'
import { RewardModule } from '../reward/reward.module'

@Module({
  imports: [TypeOrmModule.forFeature([Winner]), DrawModule, RewardModule],
  providers: [WinnerDTO, WinnerService, WinnerRepository],
  controllers: [WinnerController],
})
export class WinnerModule {}
