import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {CreateQuizDto} from "./dto/create-quiz.dto";
import {Repository} from "typeorm";
import {QuizEntity} from "../entities/quiz.entity";
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";

@Injectable()
export class QuizService {

  constructor(
    @InjectRepository(QuizEntity) private quizRepository: Repository<QuizEntity>
  ) {}

  async getAllQuizzes(): Promise<[QuizEntity[], number]> {
    return await this.quizRepository
      .createQueryBuilder('q')
      .leftJoinAndSelect('q.questions', 'qt')
      .leftJoinAndSelect('qt.options', 'opt')
      // .take(1) // take necessary qty
      .getManyAndCount()
  }

  //   async getAllQuizzes(): Promise<QuizEntity[]> {
  //     const quizzes = await this.quizRepository.find({relations: ['questions']})
  //     if (!quizzes) {
  //       throw new NotFoundException(`Quizzes was not found!`)
  //     }
  //     return quizzes
  // }

  async getPaginateQuizzes(options: IPaginationOptions): Promise<Pagination<QuizEntity>> {
    const qb = this.quizRepository
      .createQueryBuilder('q')
      // .leftJoinAndSelect('q.questions', 'qt')
      // .leftJoinAndSelect('qt.options', 'opt')
      .orderBy('q.id', 'DESC')
    return paginate<QuizEntity>(qb, options)
  }

  async getQuizById(id: number): Promise<QuizEntity> {
    const quiz = await this.quizRepository.findOne({where: {id}, relations: ['questions', 'questions.options']})
    if (!quiz) {
      throw new NotFoundException(`Quiz with id ${id} was not found!`)
    }
    return quiz
  }

  async createNewQuiz(createQuizDto: CreateQuizDto): Promise<QuizEntity> {
    return await this.quizRepository.save(createQuizDto)
  }

  async updateQuiz(id: number, updateQuizDto: CreateQuizDto): Promise<QuizEntity> {
    const updatedQuiz = await this.quizRepository.update({id}, updateQuizDto)
    if (!updatedQuiz.affected) {
      throw new NotFoundException(`Quiz with id ${id} was not updated!`)
    }
    return await this.getQuizById(id)
  }

  async deleteQuiz(id: number): Promise<void> {
    const result = await this.quizRepository.delete({id})
    if (!result.affected) {
      throw new NotFoundException(`Quiz with id ${id} was not deleted!`)
    }
  }

}
