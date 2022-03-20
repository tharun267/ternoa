import { Injectable } from '@nestjs/common';
import { Signature } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { CreateSignatureDto } from './dto/create-signature.dto';

@Injectable()
export class SignatureService {
    constructor(private readonly prismaService: PrismaService) { }

    /**
    * Finds signatures
    *
    * @returns Signature[]
    */
    async find(): Promise<Signature[]> {
        return this.prismaService.signature.findMany();
    }

   /**
   * Creates a new signature
   *
   * @param CreateSignatureDto
   * @returns result of create
   */
    async create(createSignatureDto: CreateSignatureDto): Promise<Signature> {
        return this.prismaService.signature.create({ data: createSignatureDto });
    }
}
