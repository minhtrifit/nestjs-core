import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entity/user.entity';
import { User as UserType } from 'src/types/user.types';
import { createUserDto } from './dto/user-create.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUserByUsername(
    username: string,
  ): Promise<User | NotFoundException | any> {
    const user: UserType = await this.usersRepository.findOneBy({ username });

    if (user) return user;
    else throw new NotFoundException('User not found');
  }

  async createNewuser(createUserDto: createUserDto): Promise<User> {
    const username: string = createUserDto.username;

    // Check user from database
    const user = await this.usersRepository.findOneBy({ username });

    // Create new user to database
    if (!user) {
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
      return await this.usersRepository.save(createUserDto);
    }
    // Return error if user exist
    else throw new BadRequestException('Username is exist');
  }
}
