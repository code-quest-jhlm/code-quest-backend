import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Draw } from './entity/draw.entity'
import { DrawController } from './controller/draw.controller'
import { DrawService } from './service/draw.service'
import { DrawMapper } from './mapper/draw.mapper'
import { DrawRepository } from './repository/draw.repository'
import { UsersModule } from '../../core/user/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([Draw]), UsersModule],
  controllers: [DrawController],
  providers: [DrawService, DrawMapper, DrawRepository],
  exports: [DrawService],
})
export class DrawModule {}
