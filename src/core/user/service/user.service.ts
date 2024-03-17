import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../entity/user.entity'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto)
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email })
  }

  findByUserNameWithPassword(userId: string) {
    return this.userRepository.findOne({
      where: { userId },
      select: ['id', 'name', 'email', 'password', 'role'],
    })
  }

  findAll() {
    return this.userRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
