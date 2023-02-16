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
import {OptionService} from "./option.service";
import {CreateOptionDto} from "./dto/create-option.dto";
import {OptionEntity} from "../entities/option.entity";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiSecurity,
  ApiTags
} from "@nestjs/swagger";
import {AdminRoleGuard} from "../auth/guards/admin-role.guard";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {CreateQuestionDto} from "./dto/create-question.dto";
import {QuestionEntity} from "../entities/question.entity";

@ApiTags('Options')
@Controller('options')
export class OptionController {

  constructor(
    private optionService: OptionService
  ) {}

  @Get('')
  @ApiOkResponse({ description: 'List of options' })
  async getAllOptions(): Promise<OptionEntity[]> {
    return await this.optionService.getAllOptions()
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Get an option by id' })
  async getOptionById(@Param('id', ParseIntPipe) id: number): Promise<OptionEntity> {
    return await this.optionService.getOptionById(id)
  }

  @Post('')
  @ApiCreatedResponse({ description: 'Option added to a question' })
  @ApiSecurity('bearer')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @UsePipes(ValidationPipe)
  async createOptionForQuestion(@Body() createOptionDto: CreateOptionDto): Promise<OptionEntity> {
    return await this.optionService.createOptionForQuestion(createOptionDto)
  }

  @ApiResponse({ description: 'Option has been updated' })
  @Put('/:id')
  @ApiSecurity('bearer')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @UsePipes(ValidationPipe)
  async updateOption(@Param('id', ParseIntPipe) id: number, @Body() updateOptionDto: CreateOptionDto): Promise<OptionEntity> {
    return await this.optionService.updateOption(id, updateOptionDto)
  }

  @ApiResponse({ description: 'Option has been deleted' })
  @Delete('/:id')
  @ApiSecurity('bearer')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  deleteOption(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.optionService.deleteOption(id)
  }

}
