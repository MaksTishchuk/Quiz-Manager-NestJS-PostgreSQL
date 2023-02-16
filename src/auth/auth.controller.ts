import {Body, Controller, Post, ValidationPipe} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {RegisterCredentialsDto} from "./dto/register-credentials.dto";
import {UserEntity} from "../entities/user.entity";
import {LoginCredentialsDto} from "./dto/login-credentials.dto";
import {ApiBadRequestResponse, ApiCreatedResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @ApiCreatedResponse({
    description: 'Created user object as response',
    type: UserEntity,
  })
  @ApiBadRequestResponse({ description: 'User cannot register. Try again!' })
  register(@Body(ValidationPipe) registerCredentialsDto: RegisterCredentialsDto): Promise<UserEntity> {
    return this.authService.register(registerCredentialsDto)
  }

  @Post('/login')
  @ApiCreatedResponse({
    description: 'Login user with access token as response',
  })
  login(@Body(ValidationPipe) loginCredentialsDto: LoginCredentialsDto): Promise<{accessToken: string}> {
    return this.authService.login(loginCredentialsDto)
  }
}
