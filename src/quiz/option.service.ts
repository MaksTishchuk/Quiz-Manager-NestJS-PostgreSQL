import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {OptionEntity} from "../entities/option.entity";
import {Repository} from "typeorm";
import {QuestionService} from "./question.service";
import {CreateOptionDto} from "./dto/create-option.dto";
import {CreateQuestionDto} from "./dto/create-question.dto";
import {QuestionEntity} from "../entities/question.entity";

@Injectable()
export class OptionService {

  constructor(
    @InjectRepository(OptionEntity) private optionRepository: Repository<OptionEntity>,
    private questionService: QuestionService
  ) {}

  async getAllOptions(): Promise<OptionEntity[]> {
    const options = await this.optionRepository.find({relations: ['question']})
    if (!options) {
      throw new NotFoundException(`Options was not found!`)
    }
    return options
  }

  async getOptionById(id: number): Promise<OptionEntity> {
    const option = await this.optionRepository.findOne({where: {id}, relations: ['question']})
    if (!option) {
      throw new NotFoundException(`Option with id ${id} was not found!`)
    }
    return option
  }

  async createOptionForQuestion(createOptionDto: CreateOptionDto): Promise<OptionEntity> {
    const question = await this.questionService.getQuestionById(createOptionDto.questionId)
    return await this.optionRepository.save({
      text: createOptionDto.text,
      isCorrect: createOptionDto.isCorrect,
      question: question
    })
  }

  async updateOption(id: number, updateOptionDto: CreateOptionDto): Promise<OptionEntity> {
    const question = await this.questionService.getQuestionById(updateOptionDto.questionId)
    const updatedOption = await this.optionRepository.update({id}, {
      text: updateOptionDto.text,
      isCorrect: updateOptionDto.isCorrect,
      question: question
    })
    if (!updatedOption.affected) {
      throw new NotFoundException(`Option with id ${id} was not updated!`)
    }
    return await this.getOptionById(id)
  }

  async deleteOption(id: number): Promise<void> {
    const result = await this.optionRepository.delete({id})
    if (!result.affected) {
      throw new NotFoundException(`Option with id ${id} was not deleted!`)
    }
  }

}
