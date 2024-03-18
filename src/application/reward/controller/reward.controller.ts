import { Controller, Get, Param, Query, Optional } from '@nestjs/common'
import { RewardService } from '../service/reward.service'
import { RewardDTO } from '../dto/reward.dto'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { Auth } from 'src/core/auth/decorators/auth.decorator'
import { Role } from 'src/common/constants'

@Auth(Role.ADMIN)
@Controller('/v1/reward')
@ApiTags('Premios')
export class RewardController {
  constructor(private rewardService: RewardService) {}

  @Get('')
  @ApiOperation({
    summary: 'Obtener todos los premios, y filtrar usando filtroName',
  })
  async getAllReward(
<<<<<<< HEAD
    @Optional() @Query('filtroName') filtroName?: string
=======
    @Query('filtroName') @Optional() filtroName?: string
>>>>>>> 55a353a9563452495255927019c276e0339af4f2
  ): Promise<RewardDTO[]> {
    return await this.rewardService.getAllReward(filtroName)
  }
}
