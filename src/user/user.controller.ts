import { Req, Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { UserService } from './user.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createUserDto } from './dto/user-create.dto';
import { AccessTokenGuard } from 'src/auth/guard/accessToken.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/:username')
  getUserByUsername(@Param() param: { username: string }) {
    return this.userService.getUserByUsername(param.username);
  }

  @Post('/create')
  createUser(@Body() createUserDto: createUserDto) {
    return this.userService.createNewuser(createUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/view/profile')
  getProfile(@Req() req: any) {
    console.log('Check from user.controller(getProfile): ', req.user);
    return this.userService.getUserByUsername(req?.user?.username);
  }
}
