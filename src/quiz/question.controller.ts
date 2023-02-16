import {
  Body,
  Controller, Delete,
  Get,
  Param,
  ParseIntPipe,
  Post, Put, UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import {CreateQuestionDto} from "./dto/create-question.dto";
import {QuestionService} from "./question.service";
import {QuestionEntity} from "../entities/question.entity";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiSecurity,
  ApiTags
} from "@nestjs/swagger";
import {AdminRoleGuard} from "../auth/guards/admin-role.guard";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {CreateQuizDto} from "./dto/create-quiz.dto";
import {QuizEntity} from "../entities/quiz.entity";

@ApiTags('Questions')
@Controller('questions')
export class QuestionController {

  constructor(private questionService: QuestionService) {}

  @Get('')
  @ApiOkResponse({ description: 'List of questions' })
  async getAllQuestion(): Promise<QuestionEntity[]> {
    return await this.questionService.getAllQuestions()
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Get a question by id' })
  async getQuestionById(@Param('id', ParseIntPipe) id: number): Promise<QuestionEntity> {
    return await this.questionService.getQuestionById(id)
  }

  @Post('')
  @ApiCreatedResponse({ description: 'Question added to a quiz' })
  @ApiSecurity('bearer')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @UsePipes(ValidationPipe)
  async createQuestion(@Body() createQuestionDto: CreateQuestionDto): Promise<QuestionEntity> {
    return await this.questionService.createNewQuestion(createQuestionDto)
  }

  @ApiResponse({ description: 'Question has been updated' })
  @Put('/:id')
  @ApiSecurity('bearer')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @UsePipes(ValidationPipe)
  async updateQuestion(@Param('id', ParseIntPipe) id: number, @Body() updateQuestionDto: CreateQuestionDto): Promise<QuestionEntity> {
    return await this.questionService.updateQuestion(id, updateQuestionDto)
  }

  @ApiResponse({ description: 'Question has been deleted' })
  @Delete('/:id')
  @ApiSecurity('bearer')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  deleteQuestion(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.questionService.deleteQuestion(id)
  }

}
