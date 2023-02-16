import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {QuestionEntity} from "../entities/question.entity";
import {CreateQuestionDto} from "./dto/create-question.dto";
import {QuizService} from "./quiz.service";
import {CreateQuizDto} from "./dto/create-quiz.dto";
import {QuizEntity} from "../entities/quiz.entity";

@Injectable()
export class QuestionService {

  constructor(
    @InjectRepository(QuestionEntity) private questionRepository: Repository<QuestionEntity>,
    private quizService: QuizService
  ) {}

  async getAllQuestions(): Promise<QuestionEntity[]> {
    const questions = await this.questionRepository.find({relations: ['quiz', 'options']})
    if (!questions) {
      throw new NotFoundException(`Questions was not found!`)
    }
    return questions
  }

  async getQuestionById(id: number): Promise<QuestionEntity> {
    const question = await this.questionRepository.findOne({where: {id}, relations: ['quiz', 'options']})
    if (!question) {
      throw new NotFoundException(`Question with id ${id} was not found!`)
    }
    return question
  }

  async createNewQuestion(createQuestionDto: CreateQuestionDto): Promise<QuestionEntity> {
    const quiz = await this.quizService.getQuizById(createQuestionDto.quizId)
    return await this.questionRepository.save({
      question: createQuestionDto.question,
      quiz: quiz
    })
  }

  async updateQuestion(id: number, updateQuestionDto: CreateQuestionDto): Promise<QuestionEntity> {
    const quiz = await this.quizService.getQuizById(updateQuestionDto.quizId)
    const updatedQuestion = await this.questionRepository.update({id}, {
      question: updateQuestionDto.question,
      quiz: quiz
    })
    if (!updatedQuestion.affected) {
      throw new NotFoundException(`Question with id ${id} was not updated!`)
    }
    return await this.getQuestionById(id)
  }

  async deleteQuestion(id: number): Promise<void> {
    const result = await this.questionRepository.delete({id})
    if (!result.affected) {
      throw new NotFoundException(`Question with id ${id} was not deleted!`)
    }
  }

}
