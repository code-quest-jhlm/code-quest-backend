import { DataSource } from 'typeorm'
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot({
  envFilePath: '.env',
});


const SeedDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  schema: process.env.DB_SCHEMA,
  logging: true,
  entities: ['src/**/*.entity.ts'],
  migrations: ['database/seeds/*.ts'],
})

export default SeedDataSource