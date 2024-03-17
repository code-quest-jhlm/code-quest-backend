import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { User } from '../../../core/user/entity/user.entity'

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async getAllUser(): Promise<User[]> {
    return this.userRepository.find()
  }

  async getUserById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id: id } })
  }

  async createUser(user: User) {
    return this.userRepository.save(user)
  }

  async updateUser(user: User): Promise<User> {
    await this.userRepository.update(user.id, user)
    return this.userRepository.findOne({ where: { id: user.id } })
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id)
  }
}
