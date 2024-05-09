import { UserService } from './users.service';
import { Controller, Get, Logger, Query } from '@nestjs/common';
import {UsersResponseDto} from "./users.response.dto";
import { IQuery } from '../interfaces/query.interface';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(@Query() query: IQuery) {
    this.logger.log('Get all users');
    const users = await this.userService.findAll(query);
    return users.map((user) => UsersResponseDto.fromUsersEntity(user));
  }
}
