import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductRequestDto } from './dto/product.request.dto';
import { Response } from 'express';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async CreateProduct(@Body() req: ProductRequestDto, @Res() res: Response) {
    if (!req.name || !req.amount || !req.price)
      return res.status(HttpStatus.BAD_REQUEST).end();
    const result = await this.productService.Create(req);
    if (result === 0) res.status(HttpStatus.CREATED).end();
  }
  @Get()
  async GetAll(@Res() res: Response) {
    const result = await this.productService.GetMany();
    res.status(HttpStatus.OK).json(result);
  }
  @Put(':id')
  async UpdateProduct(
    @Param('id') id: number,
    @Body() req: ProductRequestDto,
    @Res() res: Response,
  ) {
    const request: ProductRequestDto = { ...req, id: +id };

    await this.productService.UpdateProduct(request);
    res.status(HttpStatus.OK).end();
  }

  @Delete(':id')
  async DeleteProduct(@Param('id') id: number, @Res() res: Response) {
    const result = await this.productService.Delete(+id);
    if (result === 0) res.status(HttpStatus.CREATED).end();
    return res.status(HttpStatus.NOT_FOUND).end();
  }
}
