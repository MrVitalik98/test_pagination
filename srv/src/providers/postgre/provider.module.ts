import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { PostgreConfigModule } from '../../config/database/config.module';
import { PostgreConfigService } from '../../config/database/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [PostgreConfigModule],
      useFactory: async (configService: PostgreConfigService) =>
        configService.getPostgreConfig(),
      inject: [PostgreConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class PostgresProviderModule {}