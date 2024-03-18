import { HttpService } from '@nestjs/axios';
import { Controller, Get, Param, PreconditionFailedException, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { ParticipantsService } from '../participants/participants.service';

@Controller('discord')
export class DiscordController {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly participantService: ParticipantsService
  ) {}
  @Get('login/:id')
  login(@Res() res: Response, @Param('id') drawId: string) {
    res.json({
      discordUrl: `https://discord.com/api/oauth2/authorize?client_id=${this.configService.get('DISCORD_CLIENT_ID')
        }&redirect_uri=${encodeURIComponent(
          this.configService.get('DISCORD_REDIRECT_URL')
        )}&response_type=code&scope=identify%20email%20guilds&state=${drawId}`
    })
  }

  @Get()
  async redirect(@Req() req: Request, @Res() res: Response) {
    const code = req.query.code
    const drawId = req.query.state
    const data = {
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: process.env.DISCORD_REDIRECT_URL,
      code: code,
      scope: 'identify email',
    }
    const response = await this.httpService.axiosRef.post(
      `https://discord.com/api/oauth2/token`,
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    res.redirect(
      `http://localhost:3000/api/discord/welcome/draw/${drawId}?token=${response.data.access_token}`
    )
  }

  @Get('welcome/draw/:id')
  async welcome(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string
  ) {
    const token = req.query.token
    const response = await this.httpService.axiosRef.get('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const servers = await this.httpService.axiosRef.get(
      'https://discord.com/api/users/@me/guilds',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const serverExist = servers.data.find(
      (server) => server.id === this.configService.get('SERVER_DISCORD_ID')
    )
    if (serverExist) {
      const drawResponse = await this.participantService.create({
        avatar: `https://cdn.discordapp.com/avatars/${response.data.id}/${response.data.avatar}.webp?size=80`,
        discordId: response.data.id,
        name: response.data.username,
        drawId: id
      })
      if (drawResponse.isEnrolled) {
        res.redirect(
          `${this.configService.get('FRONTEND_URL')}/draw/${id}?enroll=0`
        )
        return;
      }
      res.redirect(
        `${this.configService.get('FRONTEND_URL')}/draw/${id}?enroll=1`
      )
    } else {
      res.redirect(
        `${this.configService.get('FRONTEND_URL')}/draw/${id}?enroll=0`
      )
    }
  }

  @Get('guilds')
  async guilds(@Req() req: Request, @Res() res: Response) {
    const token = req.query.token
    const response = await this.httpService.axiosRef.get(
      'https://discord.com/api/users/@me/guilds',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    res.send(response.data)
  }
}
