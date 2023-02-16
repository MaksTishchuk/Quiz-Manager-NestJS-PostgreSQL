import {
  Body,
  Controller, DefaultValuePipe, Delete, Get,
  Param,
  ParseIntPipe,
  Post, Put, Query, UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import {QuizService} from "./quiz.service";
import {CreateQuizDto} from "./dto/create-quiz.dto";
import {QuizEntity} from "../entities/quiz.entity";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiSecurity,
  ApiTags
} from "@nestjs/swagger";
import {IPaginationOptions, Pagination} from "nestjs-typeorm-paginate";
import {AuthGuard} from "@nestjs/passport";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {AdminRoleGuard} from "../auth/guards/admin-role.guard";
import {UserEntity} from "../entities/user.entity";
import {GetUserDecorator} from "../auth/decorators/get-user.decorator";
import {RolesGuard} from "../auth/guards/roles.guard";
import {Roles} from "../auth/decorators/roles.decorator";


@ApiTags('Quizzes')
@Controller('quizzes')
export class QuizController {

  constructor(private quizService: QuizService) {}

  @Get('/')
  @ApiOkResponse({ description: 'List of quizzes' })
  async getAllQuizzes(): Promise<[QuizEntity[], number]> {
    return await this.quizService.getAllQuizzes()
  }

  @Get('/paginated')
  @ApiOkResponse({ description: 'Paginated list of quizzes' })
  // @UseGuards(AuthGuard())
  async getPaginateQuizzes(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 1,
  ): Promise<Pagination<QuizEntity>> {
    const options: IPaginationOptions = {limit, page}
    return await this.quizService.getPaginateQuizzes(options)
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Get a quiz by id' })
  // @UseGuards(AuthGuard())
  @ApiSecurity('bearer')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'member')
  async getQuizById(@Param('id', ParseIntPipe) id: number): Promise<QuizEntity> {
    return await this.quizService.getQuizById(id)
  }

  @ApiCreatedResponse({ description: 'The quiz has been created' })
  @Post('')
  // @UseGuards(AuthGuard())
  @ApiSecurity('bearer')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @UsePipes(ValidationPipe)
  async createQuiz(@Body() createQuizDto: CreateQuizDto): Promise<QuizEntity> {
    return await this.quizService.createNewQuiz(createQuizDto)
  }

  @ApiResponse({ description: 'The quiz has been updated' })
  @Put('/:id')
  @ApiSecurity('bearer')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @UsePipes(ValidationPipe)
  async updateQuiz(@Param('id', ParseIntPipe) id: number, @Body() updateQuizDto: CreateQuizDto): Promise<QuizEntity> {
    return await this.quizService.updateQuiz(id, updateQuizDto)
  }

  @ApiResponse({ description: 'The quiz has been deleted' })
  @Delete('/:id')
  @ApiSecurity('bearer')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  deleteQuiz(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.quizService.deleteQuiz(id)
  }
}
