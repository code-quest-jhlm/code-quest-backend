import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import axios from 'axios';

@Controller('discord')
export class DiscordController {

    @Get('login')
    login(@Res() res: Response) {
        res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.DISCORD_REDIRECT_URL)}&response_type=code&scope=identify%20email`);
    }

    @Get()
    async redirect(@Req() req: Request, @Res() res: Response) {
        
        console.log(process.env.DISCORD_CLIENT_ID)
        console.log(process.env.DISCORD_CLIENT_SECRET)
        console.log(process.env.DISCORD_REDIRECT_URL)
        const code = req.query.code;
        const data = {
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            grant_type: 'authorization_code',
            redirect_uri: process.env.DISCORD_REDIRECT_URL,
            code: code,
            scope: 'identify email'
        };
        const response = await axios.post(`https://discord.com/api/oauth2/token`, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        res.redirect(`http://localhost:3000/api/discord/welcome?token=${response.data.access_token}`);
    }

    @Get('welcome')
    async welcome(@Req() req: Request, @Res() res: Response) {
        const token = req.query.token;
        const response = await axios.get('https://discord.com/api/users/@me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response.data)
        res.send(`Welcome ${response.data.username}!`);
    }
}