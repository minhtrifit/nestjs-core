import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async getTokens(id: number, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: id,
          username,
        },
        {
          secret: 'accesskey',
          expiresIn: '10s',
        },
      ),
      this.jwtService.signAsync(
        {
          id: id,
          username,
        },
        {
          secret: 'refreshkey',
          expiresIn: '30s',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async login(username: string, password: string): Promise<any> {
    const user = await this.userService.getUserByUsername(username);
    const checkPassword = await bcrypt.compare(password, user?.password);

    if (!user) throw new NotFoundException('Not found user');
    if (user && !checkPassword) throw new UnauthorizedException();

    return await this.getTokens(user?.id, user.username);
  }

  async refreshToken(username: string) {
    const user = await this.userService.getUserByUsername(username);

    if (!user) throw new ForbiddenException('Access Denied');
    return {
      message: 'Refresh token successfully',
      tokens: await this.getTokens(user?.id, user.username),
    };
  }
}
