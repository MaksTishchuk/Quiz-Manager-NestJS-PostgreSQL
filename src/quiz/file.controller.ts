import {Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import { extname } from 'path'
import e from "express";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Files')
@Controller('files')
export class FileController {

  @Post('')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename(req: e.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
      }
    })
  }))
  handleUploadFile(@UploadedFile() file: Express.Multer.File) {
    if (file) return file.filename
  }

}
