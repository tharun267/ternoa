import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { CreateSignatureDto } from './dto/create-signature.dto';
import { SignatureService } from './signature.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Controller('signature')
export class SignatureController {
    constructor(private signatureService: SignatureService) { }

    @Get('/')
    async getSignatures(@Req() req: Request, @Res() res: Response) {
        const signatures = await this.signatureService.find();
        return res.send(signatures);
    }

    @Post('/')
    async create(@Body() createSignatureDto: CreateSignatureDto, @Res() res: Response) {
        const signature = await this.signatureService.create(createSignatureDto);
        return res.send(signature);
    }

    @Post('/image/upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads/images',
            filename: (req, file, cb) => {
                const randomName = uuidv4();
                return cb(null, `${randomName}${extname(file.originalname)}`.toLowerCase());
            },
        }),
    }))

    @Post('/')
    async upload(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
        return res.send({ fileName: '/uploads/images/' + file.filename });
    }

    @Delete(':id')
    async deleteSignature(@Param('id', ParseIntPipe) id,  @Res() res: Response) {
        const signature = await this.signatureService.delete(id);
        return res.send(signature);
    }
}
