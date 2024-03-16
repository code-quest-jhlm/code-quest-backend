import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import Draw from './entity/draw.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Draw])],
})
export class DrawModule {}
