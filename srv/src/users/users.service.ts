import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { IQuery } from 'src/interfaces/query.interface';
import { PaginationService } from 'src/utils/pagination.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UsersEntity)
    private usersRepo: Repository<UsersEntity>,
    private paginationService: PaginationService
  ) {}

  // get list of all users
  async findAll(query: IQuery): Promise<UsersEntity[]> {
    const { limit = 10, page = 1 } = query ?? {}

    const { skip, take } = this.paginationService.generatePaginationParams(limit, page)

    return await this.usersRepo.find({ skip, take });
  }
}
