import * as bcrypt from 'bcrypt';

type ValidSizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
type ValidTypes = 'shirts' | 'pants' | 'hoodies' | 'hats';

interface SeedUser {
    email: string;
    username: string;
    fullName: string;
    password: string;
    roles: string[];
}

interface SeedParticipants {
    discordId: string
    name: string
    avatar: string
}

interface SeedDraw {
    title: string
    description: string
    state: boolean
    participants: SeedParticipants[]
}

interface SeedData {
    users: SeedUser[];
    draw: SeedDraw[]
}


export const initialData: SeedData = {

    users: [
        {
            email: 'test1@google.com',
            username: 'test1',
            fullName: 'Test One',
            password: bcrypt.hashSync('Abc123', 10),
            roles: ['admin']
        },
        {
            email: 'test2@google.com',
            username: 'test1',
            fullName: 'Test Two',
            password: bcrypt.hashSync('Abc123', 10),
            roles: ['admin', 'super']
        }
    ],

    draw: [
        {
            title: 'Sorteo 1',
            description: 'Descripcion para sorteo 1',
            state: true,
            participants: [
                {
                    name: 'Franc01_',
                    discordId: '398335713860648969',
                    avatar: 'https://cdn.discordapp.com/avatars/1213194554992361503/c9e3a3e4a5c40ed0b6485df1521f6a76.webp?size=80'
                },
                {
                    name: 'Exodiel',
                    discordId: '398335713860648969',
                    avatar: 'https://cdn.discordapp.com/avatars/398335713860648969/9513c3846a5c12653a69dac662ad3d5b.webp?size=80'
                },
                {
                    name: 'lleemoonn',
                    discordId: '398335713860648969',
                    avatar: 'https://cdn.discordapp.com/avatars/1214263413270773842/c82b3fa769ed6e6ffdea579381ed5f5c.webp?size=80'
                },
                {
                    name: 'j__sus',
                    discordId: '398335713860648969',
                    avatar: 'https://discord.com/assets/c722e74f644b4a758b11.png'
                }
            ]
        }
    ]
}