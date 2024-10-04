import { faker } from '@faker-js/faker/.';
import { AccountRequestDto } from 'src/user/dto/account.request.dto';
function buildAccountRequestDTO() {
  return {
    cpf: '99999999999',
    name: faker.person.fullName(),
    role: 'USER',
    email: faker.internet.email(),
    password: faker.internet.password(),
    username: faker.internet.userName(),
  } as AccountRequestDto;
}

export default { buildAccountRequestDTO };
