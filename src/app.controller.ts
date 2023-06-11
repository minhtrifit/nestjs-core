import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { appConnectServer } from './types/app.types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getConnectServer(): appConnectServer {
    return this.appService.getConnectServer();
  }
}
