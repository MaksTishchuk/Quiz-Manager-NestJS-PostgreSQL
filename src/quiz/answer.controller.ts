import {Controller, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {ApiCreatedResponse, ApiSecurity, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {AdminRoleGuard} from "../auth/guards/admin-role.guard";
import {EventEmitter2} from "@nestjs/event-emitter";
import {events} from "../common/constants/event.constants";
import {AnswerAddEvent} from "./events/answer-add.event";

@ApiTags('Answers')
@Controller('answers')
export class AnswerController {

  constructor(private eventEmitter: EventEmitter2) {}

  @ApiCreatedResponse({ description: 'The answer has been given' })
  @Post('')
  @ApiSecurity('bearer')
  @UseGuards(JwtAuthGuard)
  // @UsePipes(ValidationPipe)
  async handleQuestionAnswer() {
    console.log('This is handle question answer!')
    const payload = new AnswerAddEvent()
    payload.userId = 1
    payload.optionId = 13
    this.eventEmitter.emit(events.ANSWER_SUBMITTED, payload)
    return {message: 'Answer Taken'}
  }
}
