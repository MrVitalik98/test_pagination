import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgreConfigService } from './config.service';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => ({ postgre: configuration() })],
    }),
  ],
  providers: [PostgreConfigService],
  exports: [PostgreConfigService],
})
export class PostgreConfigModule {}