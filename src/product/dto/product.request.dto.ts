import { Prisma } from '@prisma/client';

export class ProductRequestDto {
  id?: number;
  price: number | Prisma.Decimal;
  name: string;
  amount: number;
}
