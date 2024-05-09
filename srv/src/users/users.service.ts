import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { IQuery } from 'src/interfaces/query.interface';
import { PaginationService } from 'src/utils/pagination.service';
import { IResponse } from 'src/interfaces/response.interface';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UsersEntity)
    private usersRepo: Repository<UsersEntity>,
    private paginationService: PaginationService
  ) {}

  // get list of all users
  async findAll(query: IQuery): Promise<IResponse<UsersEntity[]>> {
    const { skip, limit, page } = this.paginationService.generatePaginationParams(query.limit, query.page)

    const users = await this.usersRepo.find({ skip, take: limit });

    const total = await this.usersRepo.count()

    return {
      data: users,
      total,
      limit,
      page
    }
  }
}
