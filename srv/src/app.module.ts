import { Module } from '@nestjs/common';
import {UsersModule} from "./users/users.module";
import { ConfigModule } from '@nestjs/config';
import { PostgresProviderModule } from './providers/postgre/provider.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
    }),
    PostgresProviderModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
