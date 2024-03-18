import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Reward } from './entity/reward.entity'
import { RewardDTO } from './dto/reward.dto'
import { RewardMapper } from './mapper/reward.mapper'
import { RewardController } from './controller/reward.controller'
import { RewardService } from './service/reward.service'
import { RewardRepository } from './repository/reward.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Reward])],
  controllers: [RewardController],
  providers: [RewardDTO, RewardMapper, RewardService, RewardRepository],
  exports: [RewardDTO, RewardMapper, RewardRepository, RewardService],
})
export class RewardModule {}
