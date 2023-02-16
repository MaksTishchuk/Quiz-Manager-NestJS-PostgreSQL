import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import * as bcryptjs from 'bcryptjs'
import {UserEntity} from "../entities/user.entity";
import {RegisterCredentialsDto} from "./dto/register-credentials.dto";
import {JwtService} from "@nestjs/jwt";
import {JwtPayloadInterface} from "./dto/jwt-payload.interface";
import {LoginCredentialsDto} from "./dto/login-credentials.dto";

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    private jwtService: JwtService
  ) {}


  async register(registerCredentialsDto: RegisterCredentialsDto): Promise<UserEntity> {
    let {name, email, password} = registerCredentialsDto

    password = await bcryptjs.hash(password, 10)
    const user = this.userRepository.create({name, email, password})
    try {
      await user.save()
      return user
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Email already exists!')
      } else {
        throw new InternalServerErrorException()
      }
    }
  }

  async login(loginCredentialsDto: LoginCredentialsDto) :  Promise<{accessToken: string}> {
    let {email, password} = loginCredentialsDto
    const user = await this.userRepository.findOne({where: {email}})
    if (!user || !(await bcryptjs.compare(password, user.password))) {
      throw new UnauthorizedException('User with this credentials was not found!')
    }
    const {id, name} = user
    const payload: JwtPayloadInterface = {id, name, email}
    const accessToken = await this.jwtService.sign(payload)
    return {accessToken}
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await UserEntity.findOne({where: {email}})
  }
}
