import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UsersEntity} from "./users.entity";
import {UserService} from "./users.service";
import {UserController} from "./user.controller";
import { PaginationService } from 'src/utils/pagination.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity ])],
  providers: [UserService, PaginationService],
  controllers: [UserController],
  exports: [UserService],
})
export class UsersModule {}
