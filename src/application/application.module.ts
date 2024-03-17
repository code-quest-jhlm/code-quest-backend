import { Module } from '@nestjs/common'
import { RewardModule } from './reward/reward.module'
import { WinnerModule } from './winner/winner.module'
import { DrawModule } from './draw/draw.module'
import { ParticipantModule } from './participant/participant.module'
import { UserModule } from './user/user.module'
import { DrawRewardModule } from './drawReward/drawReward.module'

@Module({
  imports: [
    RewardModule,
    WinnerModule,
    DrawModule,
    ParticipantModule,
    UserModule,
    DrawRewardModule,
  ],
})
export class ApplicationModule {}
