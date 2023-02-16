import { Injectable } from '@nestjs/common';
import {OnEvent} from "@nestjs/event-emitter";
import {events} from "../common/constants/event.constants";
import {AnswerAddEvent} from "./events/answer-add.event";

@Injectable()
export class AnswerService {


  @OnEvent(events.ANSWER_SUBMITTED)
  handleQuestionAnswerEvent(payload: AnswerAddEvent) {
    console.log('handleQuestionAnswerEvent', payload)
  }
}
