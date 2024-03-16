import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return `Hour the server ${Date()}`
  }
}
