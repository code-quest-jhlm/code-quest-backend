import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Reward } from './entity/reward.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Reward])],
})
export class RewardModule {}
