import { Module } from '@nestjs/common'
import { UsersModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { DiscordModule } from './discord/discord.module'

@Module({
  imports: [UsersModule, AuthModule, DiscordModule],
})
export class CoreModule {}
