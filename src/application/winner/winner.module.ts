import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import Winner from './entity/winner.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Winner])],
})
export class WinnerModule {}
