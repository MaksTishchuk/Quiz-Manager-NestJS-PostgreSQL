import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeOrmConfigAsync} from "./config/typeorm.config";
import {ConfigModule} from "@nestjs/config";
import {QuizModule} from './quiz/quiz.module';
import {AuthModule} from './auth/auth.module';
import {ApiTokenCheckMiddleware} from "./common/middleware/api-token-check.middleware";
import {EventEmitterModule} from "@nestjs/event-emitter";
import {MulterModule} from "@nestjs/platform-express";

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    EventEmitterModule.forRoot(),
    MulterModule.register({
      dest: './uploads'
    }),
    QuizModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}

// If you need integrate middleware:

// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer): any {
//     consumer.apply(ApiTokenCheckMiddleware).forRoutes({
//       path: '*',
//       method: RequestMethod.ALL
//     })
//   }
// }
