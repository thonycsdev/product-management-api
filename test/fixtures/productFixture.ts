import { faker } from '@faker-js/faker/.';
import { ProductRequestDto } from 'src/product/dto/product.request.dto';
function buildProductRequestDTO() {
  const dto: ProductRequestDto = {
    price: +Number(faker.finance.amount()).toFixed(2),
    name: faker.commerce.product.name,
    amount: faker.number.int({ min: 1, max: 100 }),
  };
  return dto;
}

export default { buildProductRequestDTO };
