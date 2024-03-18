import { Module } from '@nestjs/common';
import { DrawService } from './draw.service';
import { DrawController } from './draw.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Draw } from './entities/draw.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    Draw
  ]), AuthModule],
  controllers: [DrawController],
  providers: [DrawService]
})
export class DrawModule {}
