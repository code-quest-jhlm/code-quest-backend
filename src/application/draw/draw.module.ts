import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Draw } from './entity/draw.entity'
import { DrawController } from './controller/draw.controller'
import { DrawService } from './service/draw.service'
import { DrawMapper } from './mapper/draw.mapper'
import { DrawRepository } from './repository/draw.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Draw])],
  controllers: [DrawController],
  providers: [DrawService, DrawMapper, DrawRepository],
  exports: [DrawService],
})
export class DrawModule {}
