import {
  Controller,
  Get,
  Param,
  PreconditionFailedException,
  Req,
  Res,
} from '@nestjs/common'
import { Request, Response } from 'express'
import axios from 'axios'
import { ParticipantService } from 'src/application/participant/service/participant.service'

@Controller('discord')
export class DiscordController {
  constructor(
    private participantServicio: ParticipantService){}
  private refreshToken: string

  @Get('login/:id')
  login(@Res() res: Response, @Param('id') sorteoId: string) {
    res.redirect(
      `https://discord.com/api/oauth2/authorize?client_id=${
        process.env.DISCORD_CLIENT_ID
      }&redirect_uri=${encodeURIComponent(
        process.env.DISCORD_REDIRECT_URL
      )}&response_type=code&scope=identify%20email&state=${sorteoId}`
    )
  }

  @Get()
  async redirect(@Req() req: Request, @Res() res: Response) {
    console.log(process.env.DISCORD_CLIENT_ID)
    console.log(process.env.DISCORD_CLIENT_SECRET)
    console.log(process.env.DISCORD_REDIRECT_URL)
    const code = req.query.code
    const sorteoId = req.query.state
    const data = {
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: process.env.DISCORD_REDIRECT_URL,
      code: code,
      scope: 'identify email',
    }
    const response = await axios.post(
      `https://discord.com/api/oauth2/token`,
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    this.refreshToken = response.data.refresh_token
    res.redirect(
      `http://localhost:3000/api/discord/welcome/sorteo/${sorteoId}?token=${response.data.access_token}`
    )
  }

  @Get('refresh')
  async refresh(@Res() res: Response) {
    const data = {
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: this.refreshToken,
      redirect_uri: process.env.DISCORD_REDIRECT_URL,
      scope: 'identify email',
    }
    const response = await axios.post(
      `https://discord.com/api/oauth2/token`,
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    this.refreshToken = response.data.refresh_token
    res.send(`New access token: ${response.data.access_token}`)
  }

  @Get('welcome/sorteo/:id')
  async welcome(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string
  ) {
    const token = req.query.token
    const response = await axios.get('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const servers = await axios.get(
      'https://discord.com/api/users/@me/guilds',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    console.log('data', response.data)
    console.log('servers', servers.data)
    console.log('refresh_token', this.refreshToken)
    console.log(process.env.SERVER_DISCORD_ID)
    const serverExist = servers.data.find(
      (server) => server.id === process.env.SERVER_DISCORD_ID
    )
    if (serverExist) {
      await this.participantServicio.registerParticipant({
        fullName: response.data.username,
        idDiscord: response.data.id,
        idDraw: id
      })
    } else {
      throw new PreconditionFailedException(
        'No puedes participar si no estas en el servidor de DevTalles'
      )
    }
    res.send(`Welcome ${response.data.username} sorteo: ${id}!`)
  }
  //Solo para obtener los servidores de fomra separada
  @Get('guilds')
  async guilds(@Req() req: Request, @Res() res: Response) {
    const token = req.query.token
    const response = await axios.get(
      'https://discord.com/api/users/@me/guilds',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    console.log(response.data)
    res.send(response.data)
  }
}
