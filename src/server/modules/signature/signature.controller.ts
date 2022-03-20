import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { SignatureService } from './signature.service';

@Controller('signature')
export class SignatureController {
    constructor(private signatureService: SignatureService) { }

    @Get('/')
    getSignatures(@Req() req: Request, @Res() res: Response) {
        const arr = Array(10).fill({
            title: "Title",
            description: "Hello World",
            imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        });
        res.send(arr);
    }
}
