import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RewardModule } from '../reward/reward.module'
import { DrawRewardRepository } from './repository/drawReward.repository'
import { DrawModule } from '../draw/draw.module'
import { DrawReward } from './entity/drawReward.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([DrawReward]),
    forwardRef(() => DrawModule),
    forwardRef(() => RewardModule),
  ],
  providers: [DrawRewardRepository],
  exports: [DrawRewardRepository],
})
export class DrawRewardModule {}
