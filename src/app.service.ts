import { Injectable } from '@nestjs/common';
import { appConnectServer } from './types/app.types';

@Injectable()
export class AppService {
  getConnectServer(): appConnectServer {
    return { message: 'Connect to server successfully' };
  }
}
