import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostgreConfigService {
  constructor(private readonly configService: ConfigService) {}

  getPostgreConfig(): any {
    return this.configService.get('postgre');
  }
}