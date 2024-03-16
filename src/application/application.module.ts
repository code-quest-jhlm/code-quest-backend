import { Module } from '@nestjs/common'
import { RewardModule } from './reward/reward.module'
import { WinnerModule } from './winner/winner.module'
import { DrawModule } from './draw/draw.module'

@Module({
  imports: [RewardModule, WinnerModule, DrawModule],
})
export class ApplicationModule {}
