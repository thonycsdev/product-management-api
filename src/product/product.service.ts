import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductRequestDto } from './dto/product.request.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}

  async Create(request: ProductRequestDto): Promise<number> {
    try {
      await this.prismaService.product.create({
        data: {
          name: request.name,
          amount: request.amount,
          price: request.amount,
        },
      });
      return 0;
    } catch (error) {
      console.error(error);
      return -1;
    }
  }
  async GetMany() {
    try {
      const result = await this.prismaService.product.findMany();
      return result ? result : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async UpdateProduct(request: ProductRequestDto) {
    const entity = await this.prismaService.product.findFirst({
      where: {
        id: request.id,
      },
    });

    if (!entity) return -1;
    entity.name = request.name;
    entity.amount = request.amount;
    entity.price = request.price as Prisma.Decimal;
    entity.updatedAt = new Date();
    try {
      await this.prismaService.product.update({
        data: entity,
        where: {
          id: request.id,
        },
      });
      return 0;
    } catch (error) {
      console.error(error);
      return -1;
    }
  }

  async Delete(id: number) {
    try {
      await this.prismaService.product.delete({
        where: {
          id: id,
        },
      });
      return 0;
    } catch (error) {
      return -1;
    }
  }
}
