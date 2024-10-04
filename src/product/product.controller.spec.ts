import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductRequestDto } from './dto/product.request.dto';
import productFixture from '../../test/fixtures/productFixture';
import { HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker/.';

describe('ProductController', () => {
  let controller: ProductController;
  let prisma: PrismaService;
  let dto: ProductRequestDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [ProductService, PrismaService],
      controllers: [ProductController],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    prisma = module.get<PrismaService>(PrismaService);
    dto = productFixture.buildProductRequestDTO();
  });

  afterEach(async () => {
    await prisma.product.deleteMany();
  });

  it('Should return CREATED status when passed a product DTO request', async () => {
    const response = await fetch('http://localhost:3000/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });

    expect(response.status).toBe(HttpStatus.CREATED);
  });
  it('Should return BAD REQUEST WHEN NO BODY IS SENDED', async () => {
    const response = await fetch('http://localhost:3000/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
  });
  it('Should Return a list of products from the database containing tha amount of products inserted', async () => {
    const amountOfProducts = 10;
    for (let i = 0; i < amountOfProducts; i++) {
      await prisma.product.create({
        data: {
          amount: dto.amount,
          name: dto.name,
          price: dto.price,
        },
      });
    }

    const response = await fetch('http://localhost:3000/product');
    expect(response.status).toBe(HttpStatus.OK);

    const responseBody = await response.json();
    expect(responseBody.length).toBe(amountOfProducts);
  });
  it('Should update the correct product', async () => {
    const product = await prisma.product.create({
      data: {
        amount: dto.amount,
        name: dto.name,
        price: new Prisma.Decimal(dto.price),
      },
    });
    const productWithNewInfo = productFixture.buildProductRequestDTO();
    productWithNewInfo.price = +faker.finance.amount();

    productWithNewInfo.id = product.id;

    const response = await fetch(
      `http://localhost:3000/product/${productWithNewInfo.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: productWithNewInfo.name,
          amount: productWithNewInfo.amount,
          price: productWithNewInfo.price,
          id: productWithNewInfo.id,
        } as ProductRequestDto),
      },
    );

    expect(response.status).toBe(HttpStatus.OK);

    const updatedProduct = await prisma.product.findFirst({
      where: {
        id: product.id,
      },
    });
    //prisma retorna seus decimals como string
    expect(+updatedProduct.price).toBe(productWithNewInfo.price);
    expect(updatedProduct.name).toBe(productWithNewInfo.name);
    expect(updatedProduct.amount).toBe(productWithNewInfo.amount);
  });
});
