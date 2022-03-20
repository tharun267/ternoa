import { Injectable } from '@nestjs/common';
import { Signature } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { CreateSignatureDto } from './dto/create-signature.dto';
import { UpdateSignatureDto } from './dto/update-signature.dto';

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


    /**
    * Delete Signature
    *
    * @param id
    * @returns Signature
    */
    async delete(id: number): Promise<Signature> {
        return this.prismaService.signature.delete({ where: { id } })
    }

    /**
    * Update Signature
    *
    * @param id
    * @returns Signature
    */
    async update(id: number, updateSignatureDto: UpdateSignatureDto): Promise<Signature> {
        return this.prismaService.signature.update({ data: updateSignatureDto, where: { id } })
    }


}
