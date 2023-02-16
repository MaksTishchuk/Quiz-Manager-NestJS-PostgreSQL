import {TypeOrmModuleAsyncOptions, TypeOrmModuleOptions} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {QuizEntity} from "../entities/quiz.entity";
import {QuestionEntity} from "../entities/question.entity";
import {OptionEntity} from "../entities/option.entity";
import {UserEntity} from "../entities/user.entity";

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      // entities: [__dirname + '/../**/*.entity.js'],
      entities: [QuizEntity, QuestionEntity, OptionEntity, UserEntity],
      synchronize: true,
      logging: false
    }
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService):
  Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService]
}

// export const typeOrmConfig: TypeOrmModuleOptions = {
//       type: 'postgres',
//       host: process.env.DB_HOST || 'localhost',
//       port: Number(process.env.DB_PORT) || 5432,
//       username: process.env.DB_USERNAME || 'postgres',
//       password: process.env.DB_PASSWORD || '900437431940',
//       database: process.env.DB_NAME || 'quiz-manager',
//       // entities: [__dirname + '/../**/*.entity.js'],
//       entities: [QuizEntity, QuestionEntity, OptionEntity],
//       synchronize: true,
//       logging: false
// }