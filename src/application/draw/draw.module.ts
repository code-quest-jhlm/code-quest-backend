import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Draw } from './entity/draw.entity'
import { DrawController } from './controller/draw.controller'
import { DrawService } from './service/draw.service'
import { DrawMapper } from './mapper/draw.mapper'
import { DrawRepository } from './repository/draw.repository'
import { UserModule } from '../user/user.module'
import { RewardModule } from '../reward/reward.module'
import { DrawRewardModule } from '../drawReward/drawReward.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Draw]),
    UserModule,
    RewardModule,
    DrawRewardModule,
  ],
  controllers: [DrawController],
  providers: [DrawService, DrawMapper, DrawRepository],
  exports: [DrawService, DrawRepository],
})
export class DrawModule {}
