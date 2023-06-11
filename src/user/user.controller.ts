import { Req, Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { UserService } from './user.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createUserDto } from './dto/user-create.dto';
import { AccessTokenGuard } from 'src/auth/guard/accessToken.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { HasRoles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/models/role.enum';

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

  @HasRoles(Role.User)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get('/view/profile')
  getProfile(@Req() req: any) {
    console.log('Check from user.controller(getProfile): ', req.user);
    return this.userService.getUserByUsername(req?.user?.username);
  }

  @HasRoles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get('/view/admin')
  getAdmin(@Req() req: any) {
    console.log('Check from user.controller(getAmin): ', req.user);
    return this.userService.getUserByUsername(req?.user?.username);
  }
}
