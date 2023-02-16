import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {QuizEntity} from "../entities/quiz.entity";
import {QuestionController} from "./question.controller";
import {QuestionService} from "./question.service";
import {QuestionEntity} from "../entities/question.entity";
import {OptionEntity} from "../entities/option.entity";
import {OptionService} from "./option.service";
import {OptionController} from "./option.controller";
import {PassportModule} from "@nestjs/passport";
import {AuthModule} from "../auth/auth.module";
import {AnswerController} from "./answer.controller";
import {AnswerService} from "./answer.service";
import {FileController} from "./file.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([QuizEntity, QuestionEntity, OptionEntity]),
    AuthModule
  ],
  controllers: [
    QuizController,
    QuestionController,
    OptionController,
    AnswerController,
    FileController
  ],
  providers: [
    QuizService,
    QuestionService,
    OptionService,
    AnswerService
  ],

})
export class QuizModule {}
